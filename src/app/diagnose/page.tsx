"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  QB_INTERMEDIATE,
  QB_BEGINNER,
  QB_ADVANCED,
  type Axis,
  type Question,
  type Level,
  AXIS_KO,
} from "./_data";
import { loadHistory, type HistoryEntry } from "./_history";

/* ---------------------------------------------------------------------------
 * ENGZ 무료 영어 진단 — /diagnose
 *
 * Phase 1 구현 (RESEARCH_diagnostic_tests.md 우선순위):
 *   ✓ Anonymous funnel (가입·로그인 0회, 결과까지 익명)
 *   ✓ Shareable URL (/diagnose/result?r=encoded)
 *   ✓ 5축 한글 rubric (의사소통/발음/문법/유창성/이해력)
 *   ✓ AI 채점 — /api/grade 서버 프록시 (브라우저 직접 호출 X)
 *   ✓ 모바일 최적화 (single column, 큰 탭 타겟, no nested scroll)
 *
 * Phase 2 (later): 적응형 난이도, 오답 음성 재생, 동급 직군 백분위.
 *
 * 디자인: 흰 배경 + 오렌지 액센트 #FF5C39 + Geist 타이포 (랜딩과 동일)
 * ------------------------------------------------------------------------- */

type Screen = "intro" | "quiz" | "loading" | "result";

interface AnswerRecord {
  type: Question["type"];
  correct: 0 | 0.5 | 1;
  feedback?: string;
  domain?: "grammar" | "vocab"; // mc만
}

const BANKS = {
  beginner: QB_BEGINNER,
  intermediate: QB_INTERMEDIATE,
  advanced: QB_ADVANCED,
};

// 적응형 분기: 첫 5 MC 점수 → 다음 15문제 난이도.
//   0~1 정답 → beginner
//   2~3 정답 → intermediate
//   4~5 정답 → advanced
// 분기 결과는 결과 산출 시에도 사용 (점수 보정).
function decideLevel(mcCorrect: number): Level {
  if (mcCorrect <= 1) return "beginner";
  if (mcCorrect <= 3) return "intermediate";
  return "advanced";
}

const BRAND = "#FF5C39";

export default function DiagnosePage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [level, setLevel] = useState<Level>("intermediate");

  // 적응형 문제 시퀀스:
  //   1~5: 항상 intermediate MC (calibration 용도)
  //   6~10: 결정된 level의 SA
  //   11~15: 결정된 level의 LI
  //   16~20: 결정된 level의 SP
  const questions: Question[] = useMemo(() => {
    const b = BANKS[level];
    return [
      ...QB_INTERMEDIATE.mc, // calibration은 고정
      ...b.sa,
      ...b.li,
      ...b.sp,
    ];
  }, [level]);

  const total = 20;
  const current = questions[qIdx];
  const progress = (qIdx / total) * 100;

  function recordAnswer(rec: AnswerRecord) {
    setAnswers((prev) => [...prev, rec]);
  }

  function nextQuestion() {
    // 5번째 MC 정답 직후 → 난이도 결정 후 다음 15문제 분기
    if (qIdx === 4) {
      const mc = answers.filter((a) => a.type === "mc");
      const mcScore = mc.reduce((s, v) => s + v.correct, 0);
      setLevel(decideLevel(mcScore));
    }
    if (qIdx + 1 >= total) {
      setScreen("loading");
      // loading 잠깐 보여주고 결과로 — UX 호흡
      setTimeout(() => {
        const encoded = encodeResult(answers, level);
        // 결과 페이지로 push (replace 아님 — 뒤로 가기로 다시 진단 가능하게)
        window.location.href = `/diagnose/result?r=${encoded}`;
      }, 1400);
    } else {
      setQIdx((i) => i + 1);
    }
  }

  // ─── Intro 화면 ───
  if (screen === "intro") {
    return <IntroScreen onStart={() => setScreen("quiz")} />;
  }

  // ─── Loading 화면 (마지막 문제 후 결과 산출 사이) ───
  if (screen === "loading") {
    return <LoadingScreen />;
  }

  // ─── Quiz 화면 ───
  return (
    <main className="min-h-[100dvh] bg-zinc-50 text-zinc-900">
      {/* 상단 진행 바 — 모바일에서도 항상 보이게 sticky */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-zinc-200">
        <div className="mx-auto max-w-2xl px-5 py-3">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-500 mb-2">
            <span>
              {qIdx + 1} / {total}
            </span>
            <TypeBadge type={current.type} />
          </div>
          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full transition-[width] duration-300"
              style={{ width: `${progress}%`, background: BRAND }}
            />
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-2xl px-5 py-8 sm:py-10">
        <QuestionView
          key={qIdx}
          q={current}
          onAnswered={(rec) => recordAnswer(rec)}
          onNext={nextQuestion}
          isLast={qIdx + 1 >= total}
        />
      </section>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  Intro
 * ══════════════════════════════════════════════════════════════════════ */

function IntroScreen({ onStart }: { onStart: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  return (
    <main className="min-h-[100dvh] bg-white text-zinc-900">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-20">
        {/* 브랜드 */}
        <a
          href="/"
          className="inline-flex items-center gap-2 mb-12 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
        >
          <span>←</span> ENGZ로 돌아가기
        </a>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-zinc-600">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: BRAND }}
          />
          Free Diagnosis
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5">
          5분 만에,<br />
          내 영어 레벨을 정확히.
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-10">
          객관식·주관식·듣기·스피킹 4유형 20문제로 정밀 진단해드려요.
          완료 후 5축 분석 리포트 + 김해나 강사의 학습 방향을 받으세요.
        </p>

        {/* 4 type 카드 */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { i: "📝", n: "객관식", d: "문법·어휘 4지선다", c: "5문제" },
            { i: "✏️", n: "주관식", d: "AI 정밀 채점", c: "5문제" },
            { i: "🎧", n: "듣기", d: "음성 재생 후 답변", c: "5문제" },
            { i: "🎙", n: "스피킹", d: "마이크 입력 + AI 분석", c: "5문제" },
          ].map((t) => (
            <div
              key={t.n}
              className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5"
            >
              <div className="text-xl mb-2">{t.i}</div>
              <div className="text-sm font-semibold text-zinc-900">{t.n}</div>
              <div className="text-xs text-zinc-500 mt-0.5 leading-snug">
                {t.d}
              </div>
              <div
                className="mt-3 inline-block text-[10px] font-bold tracking-wide rounded-full px-2 py-0.5"
                style={{ background: "#FFF5F0", color: "#B83A1F" }}
              >
                {t.c}
              </div>
            </div>
          ))}
        </div>

        {/* 통계 라인 */}
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          {[
            { n: "20", l: "문제" },
            { n: "5분", l: "소요" },
            { n: "5축", l: "분석" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: BRAND }}
              >
                {s.n}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="block w-full rounded-2xl py-5 text-base sm:text-lg font-bold text-white shadow-lg active:scale-[0.99] transition-transform"
          style={{ background: BRAND }}
        >
          진단 시작하기 →
        </button>
        <p className="mt-4 text-center text-xs text-zinc-400">
          완전 무료 · 회원가입 불필요 · 결과 URL 즉시 발급
        </p>

        {/* 지난 진단 결과 (브라우저에 5개까지 자동 저장) */}
        {history.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-3">
              지난 진단 결과 ({history.length})
            </h2>
            <div className="space-y-2">
              {history.map((h) => (
                <a
                  key={h.ts}
                  href={`/diagnose/result?r=${h.encoded}`}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-3.5 hover:border-orange-300 transition-colors"
                >
                  <div
                    className="text-2xl font-extrabold tabular-nums"
                    style={{ color: BRAND }}
                  >
                    {h.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-zinc-900">
                      CEFR {h.level} · 상위 {Math.round(h.topPercent)}%
                    </div>
                    <div className="text-xs text-zinc-500">
                      {new Date(h.ts).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-zinc-300">→</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  Loading (마지막 답변 후 결과 산출)
 * ══════════════════════════════════════════════════════════════════════ */

function LoadingScreen() {
  return (
    <main className="min-h-[100dvh] bg-white grid place-items-center px-6">
      <div className="text-center">
        <div className="flex justify-center gap-2 mb-6">
          {[0, 0.15, 0.3].map((d) => (
            <span
              key={d}
              className="block h-2.5 w-2.5 rounded-full animate-bounce"
              style={{
                background: BRAND,
                animationDelay: `${d}s`,
                animationDuration: "0.9s",
              }}
            />
          ))}
        </div>
        <div className="text-base font-semibold text-zinc-900">
          AI가 4영역을 분석하고 있어요
        </div>
        <div className="text-sm text-zinc-500 mt-1">
          5축 점수 · 학습 방향 · 추천 다음 단계
        </div>
      </div>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  Type badge (객관식 / 주관식 / 듣기 / 스피킹)
 * ══════════════════════════════════════════════════════════════════════ */

function TypeBadge({ type }: { type: Question["type"] }) {
  const map: Record<Question["type"], { label: string; bg: string; fg: string }> =
    {
      mc: { label: "객관식", bg: "#FFF5F0", fg: "#B83A1F" },
      sa: { label: "주관식", bg: "#ECFDF5", fg: "#065F46" },
      li: { label: "듣기", bg: "#FFFBEB", fg: "#92400E" },
      sp: { label: "스피킹", bg: "#F5F3FF", fg: "#4C1D95" },
    };
  const m = map[type];
  return (
    <span
      className="inline-block text-[11px] font-bold tracking-wide rounded-full px-2.5 py-0.5"
      style={{ background: m.bg, color: m.fg }}
    >
      {m.label}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  Question view dispatcher
 * ══════════════════════════════════════════════════════════════════════ */

function QuestionView({
  q,
  onAnswered,
  onNext,
  isLast,
}: {
  q: Question;
  onAnswered: (rec: AnswerRecord) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<{
    result: "pass" | "partial" | "fail";
    feedback_ko?: string;
  } | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  function finish(rec: AnswerRecord, expl?: string) {
    onAnswered(rec);
    setFeedback({
      result: rec.correct === 1 ? "pass" : rec.correct === 0.5 ? "partial" : "fail",
      feedback_ko: rec.feedback,
    });
    if (expl) setExplanation(expl);
    setDone(true);
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-base sm:text-lg font-bold text-zinc-900 leading-snug mb-2">
          {q.q}
        </div>
        {q.type === "li" && (
          <div className="text-sm text-zinc-500 mt-1">{q.prompt}</div>
        )}
        {q.type === "sp" && (
          <div className="mt-3 rounded-xl bg-violet-50 border-l-4 border-violet-300 px-4 py-3 text-sm text-violet-900 leading-relaxed">
            {q.prompt}
          </div>
        )}
      </div>

      {q.type === "mc" && !done && (
        <MCBody
          q={q}
          onAnswer={(idx) => {
            const correct = idx === q.a ? 1 : 0;
            finish(
              { type: "mc", correct, domain: q.domain },
              q.exp
            );
          }}
        />
      )}
      {q.type === "sa" && !done && (
        <SABody
          q={q}
          onAnswer={(rec) => finish(rec, q.exp)}
        />
      )}
      {q.type === "li" && !done && (
        <LIBody
          q={q}
          onAnswer={(idx) => {
            const correct = idx === q.a ? 1 : 0;
            finish({ type: "li", correct }, q.exp);
          }}
        />
      )}
      {q.type === "sp" && !done && (
        <SPBody
          q={q}
          onAnswer={(rec) => finish(rec, undefined)}
        />
      )}

      {/* 피드백 + 해설 (답변 후에만) */}
      {done && feedback && (
        <div className="mt-4 space-y-3">
          {feedback.feedback_ko && (
            <div
              className="rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed"
              style={{
                background:
                  feedback.result === "pass"
                    ? "#ECFDF5"
                    : feedback.result === "partial"
                    ? "#FFFBEB"
                    : "#FEF2F2",
                borderColor:
                  feedback.result === "pass"
                    ? "#10B981"
                    : feedback.result === "partial"
                    ? "#F59E0B"
                    : "#EF4444",
                color:
                  feedback.result === "pass"
                    ? "#065F46"
                    : feedback.result === "partial"
                    ? "#92400E"
                    : "#991B1B",
              }}
            >
              {feedback.result === "pass"
                ? "✓ "
                : feedback.result === "partial"
                ? "⏤ "
                : "✕ "}
              {feedback.feedback_ko}
            </div>
          )}
          {explanation && (
            <div className="rounded-xl bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-600 leading-relaxed">
              💡 {explanation}
            </div>
          )}
          {/* 듣기 오답일 때만 — 다시 들으며 어디서 놓쳤는지 확인 */}
          {q.type === "li" && feedback.result !== "pass" && (
            <button
              type="button"
              onClick={() => {
                if (typeof window === "undefined" || !window.speechSynthesis)
                  return;
                const u = new SpeechSynthesisUtterance(q.tts);
                u.lang = "en-US";
                u.rate = 0.85;
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(u);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-100 hover:bg-amber-200 px-4 py-2.5 text-sm font-bold text-amber-900 transition-colors"
            >
              🔁 다시 들으며 확인하기
            </button>
          )}
        </div>
      )}

      {/* 다음 버튼 */}
      <button
        disabled={!done}
        onClick={onNext}
        className="mt-8 w-full rounded-2xl py-4 text-base font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        style={{ background: BRAND }}
      >
        {isLast ? "결과 보기 →" : "다음 문제 →"}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  MC body (객관식)
 * ══════════════════════════════════════════════════════════════════════ */

function MCBody({
  q,
  onAnswer,
}: {
  q: Extract<Question, { type: "mc" }>;
  onAnswer: (i: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="space-y-2.5">
      {q.ch.map((c, i) => {
        const isSel = selected === i;
        const isCorrect = selected !== null && i === q.a;
        const isWrong = isSel && i !== q.a;
        return (
          <button
            key={i}
            disabled={selected !== null}
            onClick={() => {
              setSelected(i);
              setTimeout(() => onAnswer(i), 350);
            }}
            className={`w-full text-left rounded-xl border-2 px-4 py-3.5 text-sm sm:text-base flex items-center gap-3 transition-colors disabled:cursor-default ${
              isCorrect
                ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                : isWrong
                ? "border-rose-400 bg-rose-50 text-rose-900"
                : "border-zinc-200 bg-white hover:border-orange-300 text-zinc-800"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isCorrect
                  ? "bg-emerald-500 text-white"
                  : isWrong
                  ? "bg-rose-500 text-white"
                  : "border border-zinc-300 text-zinc-500"
              }`}
            >
              {["A", "B", "C", "D"][i]}
            </span>
            {c}
          </button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  SA body (주관식 — AI 채점)
 * ══════════════════════════════════════════════════════════════════════ */

function SABody({
  q,
  onAnswer,
}: {
  q: Extract<Question, { type: "sa" }>;
  onAnswer: (rec: AnswerRecord) => void;
}) {
  const [text, setText] = useState("");
  const [checking, setChecking] = useState(false);

  async function submit() {
    if (!text.trim() || checking) return;
    setChecking(true);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sa",
          question: q.q,
          expected: q.ans,
          studentAnswer: text.trim(),
        }),
      });
      const data = await res.json();
      onAnswer({
        type: "sa",
        correct: data.score === 1 ? 1 : data.score === 0.5 ? 0.5 : 0,
        feedback: data.feedback_ko,
      });
    } catch {
      // 네트워크 실패 — 키워드 매칭 fallback
      const lower = text.toLowerCase();
      const hit = q.ans.some((k) => lower.includes(k.toLowerCase()));
      onAnswer({
        type: "sa",
        correct: hit ? 1 : 0,
        feedback: hit
          ? "정답으로 인정돼요."
          : "기대했던 표현이 빠졌어요. 해설을 참고하세요.",
      });
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3.5 text-base text-zinc-900 outline-none transition-colors focus:border-orange-400 disabled:bg-zinc-50"
        rows={3}
        placeholder="여기에 영어로 답변을 입력하세요..."
        value={text}
        disabled={checking}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        disabled={!text.trim() || checking}
        onClick={submit}
        className="ml-auto block rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 transition-opacity"
      >
        {checking ? "AI 채점 중..." : "AI 채점 →"}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  LI body (듣기)
 * ══════════════════════════════════════════════════════════════════════ */

function LIBody({
  q,
  onAnswer,
}: {
  q: Extract<Question, { type: "li" }>;
  onAnswer: (i: number) => void;
}) {
  const [played, setPlayed] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  function play() {
    if (played >= 2) return;
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("이 브라우저는 음성 재생을 지원하지 않아요. Chrome을 권장합니다.");
      return;
    }
    const u = new SpeechSynthesisUtterance(q.tts);
    u.lang = "en-US";
    u.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    const en = voices.find((v) => v.lang.startsWith("en-"));
    if (en) u.voice = en;
    utterRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setPlayed((n) => n + 1);
  }

  // iOS Safari voices race condition — voiceschanged 이벤트로 한 번 더 트리거
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const handler = () => {
      // voices 채워지면 자동으로 다음 play()에서 영어 voice 잡음
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-3">
        <button
          onClick={play}
          disabled={played >= 2}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-md disabled:opacity-50"
          aria-label="음성 재생"
        >
          ▶
        </button>
        <div className="flex-1">
          <div className="text-sm font-semibold text-amber-900">음성 듣기</div>
          <div className="text-xs text-amber-700 mt-0.5">
            {played === 0
              ? "최대 2회 들을 수 있어요"
              : `${2 - played}회 더 들을 수 있어요`}
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold text-zinc-900 mb-1">{q.prompt}</div>
      <div className="space-y-2.5">
        {q.ch.map((c, i) => {
          const isSel = selected === i;
          const isCorrect = selected !== null && i === q.a;
          const isWrong = isSel && i !== q.a;
          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => {
                setSelected(i);
                window.speechSynthesis?.cancel();
                setTimeout(() => onAnswer(i), 350);
              }}
              className={`w-full text-left rounded-xl border-2 px-4 py-3.5 text-sm sm:text-base flex items-center gap-3 disabled:cursor-default ${
                isCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                  : isWrong
                  ? "border-rose-400 bg-rose-50 text-rose-900"
                  : "border-zinc-200 bg-white hover:border-orange-300 text-zinc-800"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isCorrect
                    ? "bg-emerald-500 text-white"
                    : isWrong
                    ? "bg-rose-500 text-white"
                    : "border border-zinc-300 text-zinc-500"
                }`}
              >
                {["A", "B", "C", "D"][i]}
              </span>
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  SP body (스피킹 — webkitSpeechRecognition + AI 채점)
 * ══════════════════════════════════════════════════════════════════════ */

function SPBody({
  q,
  onAnswer,
}: {
  q: Extract<Question, { type: "sp" }>;
  onAnswer: (rec: AnswerRecord) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const recRef = useRef<unknown>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // 컴포넌트 unmount / 다음 문제 진입 시 blob URL 정리 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // audioUrl 변경 시에도 이전 URL 해제
  }, [audioUrl]);

  async function start() {
    type SRConstructor = new () => SpeechRecognitionLike;
    interface SpeechRecognitionLike {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult:
        | ((e: { results: ArrayLike<{ 0: { transcript: string } }> }) => void)
        | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    }
    const w = window as unknown as {
      webkitSpeechRecognition?: SRConstructor;
      SpeechRecognition?: SRConstructor;
    };
    const SR = w.webkitSpeechRecognition || w.SpeechRecognition;
    if (!SR) {
      alert(
        "이 브라우저는 음성 인식을 지원하지 않아요. Chrome 또는 데스크탑 Safari에서 시도해주세요. 아래에 직접 답변을 적으셔도 돼요."
      );
      return;
    }

    // 1) MediaRecorder — 실제 오디오 캡처해서 본인 음성 재생용 blob 만듦.
    //    webkitSpeechRecognition은 자체 mic 캡처하므로 둘이 동시에 mic 잡아도
    //    Chrome / 데스크탑 Safari에선 충돌 X. iOS Safari는 webkitSpeech 자체
    //    미지원이라 어차피 textarea fallback.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        if (chunksRef.current.length === 0) return;
        const blob = new Blob(chunksRef.current, {
          type: mr.mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };
      mediaRecRef.current = mr;
      mr.start();
    } catch {
      // mic 권한 거부 — speechRecognition만 (transcript는 살아있으면 됨)
    }

    // 2) Speech recognition
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    let acc = "";
    r.onresult = (e: {
      results: ArrayLike<{ 0: { transcript: string } }>;
    }) => {
      acc = "";
      for (let i = 0; i < e.results.length; i++) {
        acc += e.results[i][0].transcript;
      }
      setTranscript(acc);
    };
    r.onend = () => {
      setRecording(false);
    };
    recRef.current = r;
    setTranscript("");
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl("");
    }
    setRecording(true);
    r.start();
  }

  function stop() {
    const r = recRef.current as { stop: () => void } | null;
    try {
      r?.stop();
    } catch {
      // ignore
    }
    try {
      mediaRecRef.current?.stop();
    } catch {
      // ignore
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setRecording(false);
  }

  async function submit() {
    if (checking) return;
    const t = transcript.trim();
    if (!t) {
      alert("음성이 인식되지 않았어요. 다시 녹음하거나 직접 입력해주세요.");
      return;
    }
    setChecking(true);
    setSubmitted(true);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sp",
          question: q.prompt,
          rubric: q.rubric,
          studentAnswer: t,
        }),
      });
      const data = await res.json();
      onAnswer({
        type: "sp",
        correct: data.score === 1 ? 1 : data.score === 0.5 ? 0.5 : 0,
        feedback: data.feedback_ko,
      });
    } catch {
      // 네트워크 실패 — 길이 기반 fallback
      const len = t.split(/\s+/).filter(Boolean).length;
      onAnswer({
        type: "sp",
        correct: len >= 12 ? 1 : len >= 4 ? 0.5 : 0,
        feedback:
          len >= 12
            ? "충분히 발화했어요."
            : "조금 더 길게 답해보면 좋아요.",
      });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-violet-50 border border-violet-200 p-5 flex flex-col items-center gap-3">
        <button
          onClick={recording ? stop : start}
          disabled={submitted}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 ${
            recording
              ? "bg-rose-500 animate-pulse"
              : "bg-violet-600"
          }`}
          aria-label={recording ? "녹음 중지" : "녹음 시작"}
        >
          🎙
        </button>
        <div className="text-sm font-semibold text-violet-900">
          {recording
            ? "녹음 중... 다시 누르면 정지"
            : transcript
            ? "녹음 완료"
            : "버튼을 눌러 영어로 말해보세요"}
        </div>
        {transcript && (
          <div className="w-full rounded-lg bg-white border border-violet-200 px-3 py-2 text-sm text-zinc-800">
            {transcript}
          </div>
        )}
        {/* 본인 음성 재생 — 발음·억양 자가 점검용. 녹음 끝났고 blob 있을 때만 */}
        {!recording && audioUrl && (
          <audio
            src={audioUrl}
            controls
            preload="metadata"
            className="w-full mt-1"
          />
        )}
        {!recording && (
          <textarea
            className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:border-violet-400"
            rows={2}
            placeholder="음성 인식이 안 될 경우 직접 적어주세요"
            value={transcript}
            disabled={submitted}
            onChange={(e) => setTranscript(e.target.value)}
          />
        )}
      </div>
      <button
        disabled={!transcript.trim() || submitted || recording}
        onClick={submit}
        className="ml-auto block rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
      >
        {checking ? "AI 채점 중..." : "AI 채점 →"}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  결과 인코딩 — answers 배열을 URL-safe base64로
 * ══════════════════════════════════════════════════════════════════════ */

function encodeResult(answers: AnswerRecord[], level: Level): string {
  // 5축 점수 산출 — domain별 / type별 평균
  const axes = computeAxes(answers);
  // 난이도 보정: beginner는 쉬운 문제만 풀었으니 천장 65, advanced는 60+ 시작.
  // 단순 mean이 아니라 level이 반영된 보정 점수.
  const baseTotal =
    Object.values(axes).reduce((s, v) => s + v, 0) / Object.keys(axes).length;
  const totalAdj =
    level === "beginner"
      ? Math.min(baseTotal * 0.6, 45) // 쉬운 문제 만점 ≈ 45 (A2 상한)
      : level === "advanced"
      ? Math.min(baseTotal * 0.9 + 15, 100) // 어려운 문제 정답 가중
      : baseTotal;
  const payload = {
    v: 2, // 스키마 버전 (적응형 + 난이도 보정 추가)
    t: Math.round(totalAdj),
    a: axes,
    l: level,
    ts: Date.now(),
  };
  const json = JSON.stringify(payload);
  // URL-safe base64
  const b64 = btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return b64;
}

export function computeAxes(answers: AnswerRecord[]): Record<Axis, number> {
  // 매핑 규칙:
  //   문법(grammar)        ← mc(domain=grammar) 정답률
  //   의사소통(communication) ← sa 정답률 + sp 평균
  //   발음(pronunciation)  ← sp 평균
  //   유창성(fluency)      ← sa + sp 평균
  //   이해력(comprehension) ← li 정답률
  // 표본 부족 시 50점 fallback (모름 가운데값)
  const avg = (xs: number[]) =>
    xs.length ? Math.round((xs.reduce((s, v) => s + v, 0) / xs.length) * 100) : 50;

  const mcGrammar = answers.filter((a) => a.type === "mc" && a.domain === "grammar").map((a) => a.correct);
  const mcVocab = answers.filter((a) => a.type === "mc" && a.domain === "vocab").map((a) => a.correct);
  const sa = answers.filter((a) => a.type === "sa").map((a) => a.correct);
  const li = answers.filter((a) => a.type === "li").map((a) => a.correct);
  const sp = answers.filter((a) => a.type === "sp").map((a) => a.correct);

  return {
    grammar: avg(mcGrammar),
    communication: avg([...sa, ...sp]),
    pronunciation: avg(sp),
    fluency: avg([...sa, ...sp]),
    comprehension: avg(li),
  };
}

// 5축 라벨은 _data.ts AXIS_KO에서 가져옴 — re-export
export { AXIS_KO };
