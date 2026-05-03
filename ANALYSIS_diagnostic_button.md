# 진단 시작하기 버튼 문제 — 정밀 분석

## TL;DR (한 줄 결론)

**`public/diagnostic.html` line 692의 syntax error 한 줄 때문에 스크립트 전체가 로드 실패 → `go()`, `pickLevel()` 등 모든 함수가 정의되지 않음 → 버튼 클릭 시 silent fail.** 이 한 줄이 원인이었음. 이번 커밋에서 수정.

---

## 1. 사용자 신고 증상 (시간 순)

| 시각 | 신고 |
|---|---|
| #1 | "진단 시작하기 안 눌린다" — 페이지 로드 시 버튼이 disabled (intended) |
| #2 | "예상 실력 눌러도 진단 시작하기 버튼이 안 떠" — 칩 클릭해도 활성화 안 됨 |
| #3 | "진단 시작하기 버튼을 눌러도 진단이 안 되고 다음 페이지로 안 넘어가" — 활성 버튼 클릭해도 화면 전환 안 됨 |

`#3`이 결정적 단서. 버튼이 활성화는 됐는데 클릭이 무반응 → JavaScript 자체가 죽었다는 뜻.

## 2. 루트 코즈

### 2.1 발견된 버그 — line 692 syntax error

```js
// BEFORE (broken)
fb.textContent=(parsed.result==="pass"?"✅ ":"parsed.result==="partial"?"🔶 ":"❌ ")+parsed.feedback_ko;
//                                       ↑ 여기 따옴표가 한 칸 뒤로 잘못 들어감
```

작성자 의도는 3-way nested ternary였음:
```js
parsed.result === "pass"     ? "✅ " :
parsed.result === "partial"  ? "🔶 " :
                               "❌ "
```

근데 `:` 다음에 `"parsed.result==="`라는 **문자열 리터럴**을 만들어버려서 그 뒤의 `partial`이 bare identifier로 파싱됨 → `Unexpected identifier 'partial'`.

### 2.2 검증

```bash
$ node -e '
  eval(`(()=>{
    const parsed={result:"partial"};
    return (parsed.result==="pass"?"✅ ":"parsed.result==="partial"?"🔶 ":"❌ ");
  })()`)
'
ERROR: Unexpected identifier 'partial'
```

확정 — JavaScript 파서가 이 줄을 만나면 SyntaxError를 throw.

### 2.3 왜 전체가 죽는가

JavaScript 명세상 함수 본문도 **early errors**를 위해 스크립트 로드 시점에 파싱됨. 따라서 함수 안의 syntax error도 스크립트 전체 로드 실패로 이어짐. 결과:

```
<script>
  function go(){...}        // ← 정의 안 됨
  function pickLevel(){...} // ← 정의 안 됨
  function startQuiz(){...} // ← 정의 안 됨
  function submitSA(){      // ← 본문에 syntax error
    ...
    fb.textContent=(parsed.result==="pass"?"✅ ":"parsed.result===" ... // 💥
  }
</script>
```

브라우저 콘솔에는 `Uncaught SyntaxError: Unexpected identifier 'partial'` 한 줄만 찍힘. UI엔 아무런 에러 표시 없음 — 그냥 모든 onclick이 silent fail.

### 2.4 그럼 왜 이전엔 chip 클릭으로 색이 바뀌었나?

이전 커밋에서 우리가 markup에 직접 `class="lv-card sel"`을 박아놨기 때문 (HTML 정적 표시). JS 의존 없는 시각 효과만 있었던 것. 사용자는 "선택된 것 같음"으로 착각.

## 3. 부수적 문제 (수정 필요한 다른 이슈들)

### 3.1 [HIGH] Anthropic API를 브라우저에서 직접 호출

라인 657, 832에서:
```js
fetch("https://api.anthropic.com/v1/messages", {
  headers: {"Content-Type": "application/json"}, // ← x-api-key 없음
  body: JSON.stringify({ model: "claude-sonnet-4-20250514", ... })
});
```

문제:
1. **API key 누락** → 401 Unauthorized
2. **CORS 차단** — Anthropic API는 브라우저 직접 호출 허용 안 함
3. **공개 사이트에서 API key를 노출하면 탈취 위험** (만약 키가 있더라도)

영향:
- 주관식 (SA) 5문제: catch 블록 fallback으로 키워드 매칭 → **동작은 함** (정확도만 떨어짐)
- 스피킹 (SP) 5문제: catch 블록 fallback으로 0.5 점수 일률 부여 → **동작은 함** (실질 채점 X)

수정 옵션:
- A) Vercel / Cloudflare serverless function으로 프록시 (권장)
- B) AI 채점 빼고 더 간단한 규칙 기반 채점으로 대체
- C) 그냥 두기 (현재 fallback이 나쁘지 않음)

### 3.2 [MED] 듣기 TTS — iOS Safari voices race condition

라인 728-741 `playTTS`:
```js
const voices = speechSynthesis.getVoices();
const enVoice = voices.find(v => v.lang.startsWith("en-"));
```

iOS Safari는 `getVoices()`가 첫 호출 시 빈 배열을 반환하고, `voiceschanged` 이벤트 후에야 채워짐. 첫 사용자가 첫 듣기 문제에서 영어 voice를 못 받을 수 있음 → 한국어 기본 voice로 영어 텍스트가 발음됨.

수정:
```js
let voicesReady = false;
speechSynthesis.addEventListener("voiceschanged", () => { voicesReady = true; });
function playTTS(text) {
  if (!voicesReady) {
    setTimeout(() => playTTS(text), 200);
    return;
  }
  ...
}
```

### 3.3 [MED] Speech Recognition — Safari 호환성

라인 780:
```js
if("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {...}
```

iOS Safari는 `webkitSpeechRecognition` 미지원. `MediaRecorder`로 녹음만 되고 STT는 빈 transcript → 라인 823의 `if(!transcript) {...}` 분기로 fallback. 동작은 하지만 사용자 경험은 "녹음했는데 인식이 안 됐어요". 아래 두 가지가 가능:
- whisper API 서버 프록시 추가 (스피킹은 정확한 채점 가능)
- 안내 문구로 "iOS Safari는 음성 인식 미지원, Chrome 권장" 표시

### 3.4 [LOW] 모바일 viewport — `100dvh` 사용 중이지만 외부 iframe에선 무용

`body { min-height: 100dvh }`은 좋음. 단 사용자가 새 탭으로 열면 잘 동작. iframe 안에 들어가면 의미 없음 (iframe 자체 height에 종속).

### 3.5 [LOW] 키보드 접근성 — 칩이 `<div onclick>`

```html
<div class="lv-card" onclick="pickLevel(this)">
```

`<button>` 또는 `role="button" tabindex="0"`이 안전. 키보드 사용자나 보이스오버에서 누락됨. 진단 테스트는 컨버전 도구라 결정적 영향은 작지만 폴리시.

### 3.6 [LOW] selectedLevel default를 markup만 의존

이번에 markup에 `sel` class 직접 박아서 일관성 맞춰놨지만, 만약 누군가 lv-card의 순서를 바꾸면 또 깨짐. JS init에서:
```js
document.addEventListener("DOMContentLoaded", () => {
  const sel = document.querySelector(".lv-card.sel");
  if (sel) selectedLevel = sel.dataset.lv;
});
```
방어 한 줄 더 박아두면 견고.

### 3.7 [LOW] 결제 화면 (S4) — `goToPay()` 정의 위치 미확인

이 분석에선 트레이스 안 함. 별도 점검 필요.

## 4. 적용한 수정

### Commit 1 (이미 적용)
```diff
- fb.textContent=(parsed.result==="pass"?"✅ ":"parsed.result==="partial"?"🔶 ":"❌ ")+parsed.feedback_ko;
+ fb.textContent=(parsed.result==="pass"?"✅ ":parsed.result==="partial"?"🔶 ":"❌ ")+parsed.feedback_ko;
```

### 검증
```bash
$ node -e "
const html = require('fs').readFileSync('public/diagnostic.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new Function(script);
console.log('parses cleanly');
"
parses cleanly
```

## 5. 권장 후속 작업 (우선순위 순)

1. **[HIGH] Anthropic API 호출 → Vercel serverless function으로 이동** — 주관식·스피킹 AI 채점이 정상 동작해야 진단 결과가 의미 있어짐. 안 그러면 이 진단의 핵심 가치 절반이 사라짐.

2. **[MED] iOS Safari 호환성** — TTS voices race + STT 미지원 두 가지가 모바일 UX 핵심 마찰점. 모바일 트래픽이 80%+ 일 가능성이 높은 K-tutoring 시장에서 결정적.

3. **[MED] error boundary** — 위와 같은 silent fail이 또 발생하지 않도록 `window.addEventListener("error", ...)`로 catch해서 화면에 토스트 띄우기.

4. **[LOW] 접근성 + 코드 품질** — `<button>` 태그 사용, JSDoc 주석, ESLint 적용.

5. **[LOW/장기] CEFR 매핑 + adaptive difficulty** — 현재는 사용자가 자기 레벨 미리 고름. 진짜 진단이라면 첫 5문제 결과로 다음 15문제 난이도를 동적 조절해야 함. 다른 사이트 분석 (`RESEARCH_diagnostic_tests.md`)에서 best practice 확인 후 결정.

## 6. 학습 — 비슷한 버그 예방

**브라우저 JS는 syntax error를 화면에 띄우지 않음**. 콘솔만 봄. 따라서:
- 빌드 단계에 lint/typecheck 추가 (이 파일은 정적 HTML이라 누락됨)
- CI에서 정기적으로 `node -c diagnostic.html`로 sanity check
- 프로덕션 배포 전에 실제 브라우저로 한 번 클릭해보기 (smoke test)

이 한 줄짜리 문법 오타가 며칠간 사용자 신고 누적의 원인이었음. **정적 HTML이라도 자동 검증 파이프라인 필요**.
