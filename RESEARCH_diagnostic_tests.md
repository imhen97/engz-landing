# Research: English Diagnostic / Placement Tests

**Compiled:** 2026-05-03
**Author:** ENGZ Research
**Purpose:** Inform redesign of `eng-z.com/diagnostic.html` (current spec: 5-min, 20Q, 객관식 5 + 주관식 5 + 듣기 5 + 스피킹 5 → email recommendation).

---

## Table of Contents

1. [Methodology](#methodology)
2. [Site-by-site analysis](#site-by-site-analysis)
   - [Korean market](#korean-market)
   - [International references](#international-references)
3. [Comparison tables](#comparison-tables)
4. [Common patterns](#common-patterns)
5. [Best-in-class examples](#best-in-class-examples)
6. [Anti-patterns to avoid](#anti-patterns-to-avoid)
7. [Recommendations for ENGZ](#recommendations-for-engz)

---

## Methodology

We surveyed 25 candidates across two buckets — Korean B2C English-learning brands and international "world standard" reference tests. For each, we documented:

- URL of test entry point
- Length (questions, time)
- Question types (MC, listening, speaking, writing, AI-evaluated)
- Adaptive vs linear branching
- Auth gating (anonymous vs sign-up vs login)
- Result format (number / CEFR / skill breakdown / recs)
- CTA after test (paid plan / free trial / book / sales call)
- Mobile UX shape (full SPA / multi-page / progressive disclosure)
- Conversion mechanics (email / phone / Kakao)
- Notable patterns and weaknesses

Three sites listed in the brief had **no real placement test** at the entry point and are noted accordingly: Cambly (no pre-signup test — uses self-rating + free trial lesson), 김재우의 영어회화 100 (book/course product, no diagnostic), 매쓰프레소·뤼튼 (math/writing AI, not English placement).

---

## Site-by-site analysis

### Korean market

#### 1. 야나두 (Yanadoo) — 하루 10분

| Field | Value |
|---|---|
| URL | https://www.yanadoo.co.kr/levelTest/levelTestStart |
| Length | Short character-driven funnel test (~5 min) |
| Question types | MC + persona/style branching ("AI 오드리" tutor avatar asks questions) |
| Adaptive | Light branching by self-reported goal (왕초보 / 기초 / 실전) more than performance |
| Auth | Anonymous to start, signup gate before final result |
| Result | "당신의 학습 유형" persona + recommended 강좌 (paid course) |
| CTA | 패키지 강좌 결제 (PT결합형 상품) — push to high-AOV bundle |
| Mobile UX | Full-page, single-question advance, large illustrated tutor avatar |
| Conversion | 이메일 + 휴대폰번호 + 마케팅 수신동의 — also Kakao alert opt-in |
| Notable | The "AI 오드리" character makes the test feel like a chat with a known TV instructor; very gamified, low-stress |
| Weakness | Result feels predetermined by self-reported level; questions don't really discriminate skill. Heavy marketing wall on result page. |

#### 2. 시원스쿨 LAB — 토익 레벨테스트

| Field | Value |
|---|---|
| URL | https://lab.siwonschool.com/?s=free&p=leveltest |
| Length | 50 questions, ~40 min (LC 25 in 13 min + RC 25 in 27 min) |
| Question types | LC: Part 1–4 mock TOEIC. RC: Part 5–7. Pure MC, no speaking. |
| Adaptive | Linear, mirrors actual TOEIC structure |
| Auth | Login required |
| Result | Predicted TOEIC score, part-by-part breakdown vs cohort average, item-level feedback |
| CTA | ₩20,000 강좌 패키지 할인 쿠폰 — direct revenue motion |
| Mobile UX | PC + mobile, but listening on Bluetooth earbuds is flagged as risky |
| Conversion | Login email + course purchase funnel |
| Notable | Most "test-like" experience among Korean players — actual mock exam, real scoring report |
| Weakness | 40 minutes is brutal for a "free try" funnel. Optimized for TOEIC score-seekers, not casual learners. |

Siwonschool's main site (siwonschool.com) also runs a shorter 성향분석 + 문제풀이 hybrid that branches into 왕초보/비즈니스/오픽 funnels, but it leans on self-classification more than measurement.

#### 3. 스픽 (Speak) — Korea

| Field | Value |
|---|---|
| URL (web) | https://www.speak.com/ko/level-test |
| URL (app) | In-app onboarding |
| Length | Web: 5 MC questions. App: 5 spoken questions to AI Speak Tutor. |
| Question types | Web = MC self-rating. App = open speaking responses graded by AI |
| Adaptive | No — fixed 5 |
| Auth | Web: anonymous, email gate at result. App: account required. |
| Result | CEFR A1–C2 + curriculum level (왕초보/초보/중급/고급) |
| CTA | "맞춤 수업 시작하기" — 7-day free trial → subscription |
| Mobile UX | App-first; very smooth chat-style UI with tap-to-speak |
| Conversion | App download → trial → auto-renew. Heavy use of celebrity (조정석) marketing. |
| Notable | **The in-app speaking test is the closest analog to what ENGZ wants**: AI tutor speaks the question aloud, user replies in voice, AI evaluates. Feels like talking to a person in 3 minutes. |
| Weakness | Web 5-question version is essentially a placement quiz — too short to differentiate. App test gates everything behind install + signup. |

#### 4. 캠블리 (Cambly)

**No pre-signup diagnostic test.** Cambly's onboarding is: pick your goal, pick a tutor, book a free trial 15-min lesson. The tutor "knows your level after a few minutes of conversation." Their CEFR mapping happens implicitly via their A1–C1 curriculum in-platform after you start lessons.

- CTA: free 15-min lesson (gated by credit card after promo)
- Conversion mechanic: card capture into auto-renewing weekly minutes plan

#### 5. 링글 (Ringle)

| Field | Value |
|---|---|
| URL | https://www.ringleplus.com/ — CAF 진단 inside platform |
| Length | Diagnosed during a real lesson; CAF report delivered within 24h |
| Question types | Free-form speaking with Ivy League tutor; AI parses recording |
| Adaptive | N/A — natural conversation |
| Auth | Paid lesson purchase required (~₩4,000 첫 수업 trial) |
| Result | **CAF report**: Complexity, Accuracy, Fluency — each with sub-metrics. Complexity = vocab difficulty, sentence types, vocab diversity. Accuracy = 13 grammar error types frequency. Fluency = WPM, repetition, fillers. Top 25% threshold shown. |
| CTA | Continue with paid 1:1 lessons (₩30k+/lesson) |
| Mobile UX | Web + mobile, very polished; report has audio scrubber to specific mistakes |
| Conversion | Already converted at trial purchase; CAF is a retention and upsell tool |
| Notable | **Best-in-class skill-decomposition.** The CAF framework + audio playback of your own mistakes is genuinely innovative. ENGZ should study this. |
| Weakness | Not a free anonymous diagnostic — it's a post-purchase deliverable. Useless as a top-of-funnel acquisition tool. |

#### 6. 튜터링 (Tutoring) / 링고라

| Field | Value |
|---|---|
| URL | https://tutoring.co.kr/home/aiLevelTest |
| Length | 30 questions (vocab 10 + writing 5 + listening 5 + pronunciation 5 + speaking 5) |
| Question types | All four skills + vocab. Speaking and pronunciation graded by AI. |
| Adaptive | Yes — real-time difficulty adjustment based on answer correctness |
| Auth | Login required. First test free, retakes paid (~₩1,000) |
| Result | Per-section level + predicted official exam scores |
| CTA | Personalized course recommendation → 1:1 회화 ticket purchase |
| Mobile UX | Mobile + Chrome PC. Headphones + mic required for L/S. |
| Conversion | Logged-in coupon issuance |
| Notable | **Most structurally similar to what ENGZ is building** (multi-modal, skill-balanced, AI-graded). 30 questions is heavier than ENGZ's 20. |
| Weakness | Login gate at the start kills funnel. Charging for retakes signals product-led-growth weakness. |

#### 7. 민병철유폰 (Uphone)

| Field | Value |
|---|---|
| URL | https://app.uphone.co.kr/adv/flguide |
| Length | 10 minutes live with a tutor (phone or video) |
| Question types | Conversational; tutor scores 5 dimensions: communication, comprehension, pronunciation, fluency, grammar |
| Adaptive | Tutor-driven |
| Auth | Web form signup with phone number |
| Result | "내 영어 캐릭터와 레벨" character profile + 5-axis scores + audio recording + tutor feedback report |
| CTA | "100% 만족 환불보장" 4-week trial → subscription |
| Mobile UX | Phone-call native, web is just a request form |
| Notable | Human tutor diagnosis, audio playback, "English character" framing makes it personal |
| Weakness | High-effort: scheduling required, 10 min live call, phone capture upfront. Not zero-friction. |

#### 8. 영어회화 100일의 기적 / 김재우 영어회화 100

**No diagnostic found.** These are book/course products; entry is via book purchase or course subscription. Some have a self-paced "Day 1" preview but no skill assessment.

#### 9. 청크 영어 / 청춘영어

**No standardized diagnostic found.** Chunk English emphasizes a chunking methodology; their "체험" CTA goes straight to a sample chunk lesson video, not a placement test.

#### 10. 해커스 영어 (Hackers)

| Field | Value |
|---|---|
| URL | https://www.hackers.co.kr/?c=s_speak/speak_special/tos_full_service&tab=level |
| Length | 1-minute 토스 점수 예측 (multiple variants for TOEIC, TOS, OPIc) |
| Question types | TOS 모의고사: full speaking sample answered to recording. TOEIC: MC mock. |
| Adaptive | Linear |
| Auth | Login required for some, anonymous quick check for others |
| Result | Predicted score + 파트별 코멘트 + 답변 첨삭 |
| CTA | 무료 교재 PDF + 인강 패키지 |
| Mobile UX | Mobile-friendly, but heavy site chrome and ad density |
| Notable | **"1분 점수 예측"** is a standout micro-funnel — extremely low commitment, immediate score |
| Weakness | Hackers homepage is busy; finding the right test among toeic/toefl/opic/teps is confusing. |

#### 11. YBM

| Field | Value |
|---|---|
| URL | https://www.ybmbooks.com/customer/ai_leveltest.asp |
| Length | 23 questions, 10–20 min |
| Question types | 5 skills: vocab, reading, listening, writing, speaking |
| Adaptive | Yes — difficulty adjusts naturally based on responses |
| Auth | YBM membership required (free tier) |
| Result | Level + per-skill strength/weakness + percentile vs other test-takers + recommended textbook |
| CTA | 맞춤 교재 처방 (book purchase) |
| Mobile UX | Web responsive, separate native app (YBM레벨테스트) |
| Notable | **Cohort comparison ("다른 응시생과 비교")** — humans love seeing percentile |
| Weakness | Membership wall; aimed at book-buyers, not AI-curious learners. |

#### 12. 파고다 (Pagoda)

| Field | Value |
|---|---|
| URL | https://www.pagoda21.com/html/leveltest/leveltest.jsp |
| Length | Online self-test ~15–20 min; offline 30 min with instructor |
| Question types | Online: MC for TOEIC/TOEFL/IELTS. Offline: live with instructor (visit/phone). |
| Adaptive | Linear online; instructor-adaptive offline |
| Auth | Login + reservation for offline |
| Result | Level certified valid for 100 days (180 for SLE conversation) |
| CTA | Class enrollment with level-locked discount |
| Mobile UX | Mobile responsive but quite dated UI |
| Notable | Hybrid model — recognizes online can't replace human judgment for speaking |
| Weakness | UX feels like a 2015 academy site. Dual online/offline path is confusing. |

#### 13. 매쓰프레소 / 뤼튼 영어

**No English placement test.** 매쓰프레소 = math photo solver; 뤼튼 = Korean GPT wrapper for writing. Neither runs a structured English diagnostic.

#### 14. 스피킹맥스 (Speakingmax)

| Field | Value |
|---|---|
| URL | https://www.speakingmax.com/ → 무료 레벨테스트 |
| Length | Not publicly disclosed; positioned as a quick check |
| Question types | Speaking with AI voice analysis (patented native pronunciation feedback) |
| Adaptive | Unclear |
| Auth | Account creation suggested |
| Result | Level + 학습자 성향 + tailored solution recommendation |
| CTA | "돈버는영어" (study and earn refund) subscription |
| Notable | Pronunciation visual feedback (waveform / stress marks) is a real differentiator. |
| Weakness | Test details opaque; the marketing-first homepage buries actual test specs. |

#### 15. 스피쿠스 (Spicus)

| Field | Value |
|---|---|
| URL | https://www.spicus.com/lt/intro.asp |
| Length | Varies; combined with free trial booking |
| Question types | Tutor-led with Gemini AI assist; 어색한 문장 교정 + tutor feedback |
| Adaptive | Tutor + AI hybrid |
| Auth | Email signup, 800 corporate clients listed as social proof |
| Result | Level + tutor feedback + Gemini-corrected sentences |
| CTA | 무료 체험 phone/video lesson booking |
| Notable | Marketing copy emphasizes B2B (47만 직장인). Positions diagnostic as recruiting funnel. |
| Weakness | Test mechanics not clearly documented; mostly a lead-gen form. |

---

### International references

#### 16. EF SET — efset.org

| Field | Value |
|---|---|
| URL | https://www.efset.org/ |
| Length | Three tiers: 15-min Quick Check (20 Q), 50-min Standard (reading + listening), 90-min 4-skill |
| Question types | MC for reading + listening; the 90-min adds short writing + recorded speaking |
| Adaptive | **Yes — adaptive sectioning**. Each question pool calibrates to estimated level |
| Auth | Quick Check anonymous; Certificate version requires email |
| Result | 0–100 score mapped to CEFR A1–C2; **free shareable certificate URL** |
| CTA | LinkedIn share button + EF course referral |
| Mobile UX | Mobile-friendly, full-page test; clean, no tutor avatar — feels like a real exam |
| Conversion | EF doesn't push hard — they're a B2C school using EF SET as a brand halo |
| Notable | **Most "credible" feeling test** — mimics IELTS/TOEFL aesthetics. Free certificate is the conversion hook. Built with academic researchers. |
| Weakness | 50–90 min is a major commitment. Doesn't feel personal — no AI tutor element. |

#### 17. Cambridge — Test your English

| Field | Value |
|---|---|
| URL | https://www.cambridgeenglish.org/test-your-english/ |
| Length | ~25 questions, ~30 min, untimed |
| Question types | MC reading + listening + grammar/vocab; 4 variants (General, Schools, Business, Young Learners) |
| Adaptive | **Yes** — questions adjust to consistency point |
| Auth | Anonymous |
| Result | 0–50 score → CEFR; instant; explicitly "not proof of language ability" |
| CTA | Recommend which Cambridge exam to take (FCE/CAE/CPE) |
| Mobile UX | Clean responsive site; minimalist typography |
| Notable | The institutional gravitas alone makes users trust the score. Adaptive done quietly. Multi-segment variants (kids/business/general) are smart. |
| Weakness | Marketing-light. CTA pushes to paid Cambridge exam ($200+) which is overkill for casual users. |

#### 18. British Council — Take a free English test

| Field | Value |
|---|---|
| URL | https://learnenglish.britishcouncil.org/english-levels/online-english-level-test |
| Length | 25 MC questions, ~10 min |
| Question types | Pure MC, 3 options each, grammar/vocab/phrasing |
| Adaptive | No |
| Auth | Anonymous |
| Result | A1–C2 level + recommended LearnEnglish content |
| CTA | Free LearnEnglish portal (their content marketing engine) + paid IELTS prep |
| Notable | Linked into a free content ecosystem — the test is the gateway to a content funnel rather than a sales funnel |

#### 18b. British Council EnglishScore (mobile)

- 40-min mobile test (Core Skills + optional Speaking + Writing modules)
- AI-secured (face check), CEFR-aligned A2–C1, **free score with paid certificate** option
- Native mobile app, results in 24h. Paid certificate is the monetization.

#### 19. Duolingo English Test (DET)

| Field | Value |
|---|---|
| URL | https://englishtest.duolingo.com/ |
| Length | ~1 hour total |
| Question types | Computer-adaptive: read-aloud, write what you hear, fill-in-the-blank, listen-and-speak, picture description, interview, writing sample |
| Adaptive | **Fully adaptive end-to-end**, AI-generated items, ML-based scoring |
| Auth | Account + ID verification (proctored) |
| Cost | $70 USD per attempt ($118 for 2) |
| Result | 10–160 score + sub-scores in literacy, comprehension, conversation, production. Comparable to TOEFL/IELTS (correlation .73) |
| CTA | Free score sending to unlimited universities |
| Mobile UX | Desktop only with proctor, very strict |
| Notable | **The technical reference for AI-graded tests.** Item pool is so large you'd take 1,000 tests before repeating. Used for visa/admission decisions. Open-ended speaking + writing analyzed automatically. |
| Weakness | Heavy proctoring, paid, not a marketing tool. Pure assessment product. |

#### 20. Test Your English by Cambridge Assessment

Same as #17 — Cambridge consolidates "Test your English" as their public-facing free entry. There's no separate Cambridge Assessment branded test for individuals.

#### 21. Open English (LATAM)

| Field | Value |
|---|---|
| URL | openenglish.com (LATAM) |
| Length | Short MC + self-rating + free trial lesson |
| Question types | MC + tutor live screening |
| Auth | Aggressive lead capture (name, email, phone, country) |
| Result | Recommended program tier (Basic / Intermediate / Advanced / Business) |
| CTA | **Sales call** — Open English is famously sales-heavy. Test result triggers an outbound call from a sales rep. |
| Notable | Treats the test purely as a lead-gen tool. ROI of the test is measured in sales-call conversion, not learning insight. |
| Weakness | Users complain about persistent sales calls post-test. |

#### 22. Babbel — Placement quiz

| Field | Value |
|---|---|
| URL | In-app on first launch (also web) |
| Length | 12 multiple-choice questions, ~3–5 min |
| Question types | Pure MC, grammar/vocab in target language |
| Adaptive | Mild — questions vary in difficulty but no full adaptive engine |
| Auth | Account required |
| Result | CEFR A1–C1 placement → drops user into matching course |
| CTA | Subscription unlock |
| Notable | **Smartest "lesson-aware" test**: every question is from real lessons, so placement directly maps to where they drop you. No wasted assessment effort. |
| Weakness | Only available for Spanish/French/Italian/German on Babbel (not their English-for-Korean product). |

Babbel's design team published a Medium article on building this — worth reading: emphasis on minimal questions, fast time-to-value.

#### 23. Lingoda — Placement test

| Field | Value |
|---|---|
| URL | https://www.lingoda.com/en/placement-tests/ |
| Length | ~5 min, MC |
| Question types | Multiple choice, intermediate-beginner phrases |
| Adaptive | Light |
| Auth | Account required |
| Result | CEFR A1–C1 |
| CTA | **7-day free trial (3 group classes or 1 private)** with auto-billing card on file |
| Conversion | Card capture upfront — strong but aggressive |
| Notable | Test is friction-light; the conversion engine is the auto-billing trial, not the test itself |
| Weakness | Card-on-file friction; placement test feels almost incidental |

#### 24. Italki — Placement test

| Field | Value |
|---|---|
| URL | italki.com (after signup) |
| Length | Optional Oxford Online Placement Test ($10) or Italki test ($30) |
| Auth | Account required, **paid test** |
| Result | CEFR + score certificate |
| CTA | Book a tutor (italki marketplace) |
| Notable | Italki explicitly positions the test as optional — "a good tutor will know your level after a few minutes of conversation." Marketplace model means they don't need a hard placement gate. |
| Weakness | Paid test on a marketplace where the value is the tutors, not the test. Most users skip it. |

#### 25. Preply — Placement test

| Field | Value |
|---|---|
| URL | https://preply.com/en/language-tests/english |
| Length | 36 single-select questions, ~20 min |
| Question types | Pure MC grammar |
| Adaptive | Linear, all users see same questions |
| Auth | **Anonymous, no signup required** |
| Result | Instant CEFR A0–C2 with descriptions |
| CTA | "Find a private tutor" with featured tutor cards + "Book trial lesson" |
| Notable | **Best anonymous-to-result UX of the bunch.** No login. Result is a clear CEFR card with definitions, then tutor marketplace inline below. Multiple language variants (EN/ES/FR/DE) using the same template. |
| Weakness | Grammar-only — no listening, no speaking. Skill-narrow. |

---

## Comparison tables

### Length & question structure

| Site | Time | # Questions | Skills covered | AI grading |
|---|---|---|---|---|
| ENGZ (current) | 5 min | 20 (MC5+주관식5+L5+S5) | All 4 + vocab | Partial |
| Yanadoo | ~5 min | ~10 persona | 1 (self-rate) | No |
| Siwonschool LAB TOEIC | 40 min | 50 | 2 (R+L) | No |
| Speak (web) | 2 min | 5 | 1 (self-rate MC) | No |
| Speak (app) | 3–5 min | 5 spoken | 1 (S) | Yes |
| Tutoring (링고라) | ~15 min | 30 | 5 (V+W+L+P+S) | Yes |
| Uphone | 10 min live | tutor-led | 5 (5 axes) | No (human) |
| Hackers TOS | 1 min | 1 sample | 1 (S) | Yes |
| YBM | 10–20 min | 23 | 5 | Yes |
| Pagoda online | 15–20 min | ~20 | 2 | No |
| EF SET Quick | 15 min | 20 | 2 (R+L) | No |
| EF SET Cert | 50 min | many | 2 | No |
| EF SET 4-skill | 90 min | many | 4 | Yes |
| Cambridge | 30 min | 25 | 2 | No |
| British Council | 10 min | 25 | 2 | No |
| EnglishScore | 40 min | many | 4 | Yes |
| Duolingo DET | 60 min | adaptive | 4 | Yes (heavy) |
| Babbel | 3–5 min | 12 | 1 (lesson-aware) | No |
| Lingoda | 5 min | ~15 | 1 | No |
| Italki | varies | varies | varies | No |
| Preply | 20 min | 36 | 1 (grammar) | No |

### Auth gating & conversion

| Site | Auth before test | Auth before result | Primary CTA | Result format |
|---|---|---|---|---|
| ENGZ (current) | Anonymous | Email gate | Email recommendation | Recommendation |
| Yanadoo | Anonymous | Email + phone | Course bundle purchase | Persona + course |
| Siwonschool LAB | Login | Login | ₩20k coupon | Predicted TOEIC |
| Speak | Anonymous (web) | Email | Free trial → sub | CEFR |
| Tutoring | Login | Login | 1:1 ticket | Per-skill levels |
| Uphone | Phone signup | Form | 4-week trial | 5-axis tutor report |
| Hackers | Mixed | Login | 인강 package | Predicted score |
| YBM | Membership | Membership | Textbook recommendation | 5-skill + percentile |
| EF SET | Anonymous | Anonymous (email for cert) | Certificate share | CEFR + cert |
| Cambridge | Anonymous | Anonymous | Cambridge exam booking | CEFR |
| British Council | Anonymous | Anonymous | Free LearnEnglish content | CEFR |
| Duolingo DET | Account + ID | Account | University score send | 10–160 score |
| Babbel | Account | Account | Subscription | CEFR + drop-in lesson |
| Lingoda | Account + card | Account | 7-day trial | CEFR |
| Preply | **Anonymous** | **Anonymous** | Tutor marketplace | CEFR + tutor cards |
| Open English | Phone + email | Form | **Outbound sales call** | Tier recommendation |

### Adaptive engine

| Tier | Sites |
|---|---|
| Fully adaptive (CAT) | Duolingo DET, EF SET (Cert), Cambridge Test Your English |
| Mild branching | Tutoring (링고라), YBM, Babbel |
| Linear | Most Korean and most marketing tests (Yanadoo, Speak web, Preply, BC, Lingoda, Hackers, Siwonschool) |
| Human-adaptive | Uphone, Pagoda offline, Cambly, Italki (live tutor) |
| Hybrid AI+human | Ringle CAF, Spicus, Speakingmax |

---

## Common patterns

**1. CEFR is the default rubric.** Every international test and most Korean speaking-focused tests use A1–C2. TOEIC/TOEFL/IELTS scoring is a Korean-specific overlay. ENGZ should default to CEFR with optional TOEIC equivalence shown.

**2. Five skill axes recur.** Communication / Pronunciation / Grammar / Fluency / Comprehension (Uphone, Ringle CAF — slightly different framing) appear repeatedly. Tutoring uses vocab/writing/listening/pronunciation/speaking. The "5 skills" mental model is sticky.

**3. Adaptive is rare in marketing tests.** True CAT (computer-adaptive testing) is reserved for high-stakes tests (DET, EF SET Cert, Cambridge). Korean B2C tests are mostly linear because adaptive engines are expensive to build and the marketing payoff is unclear — users don't perceive "adaptive" as a feature unless it shortens the test dramatically.

**4. Length follows purpose.**
- 1–5 min → marketing/funnel (Speak, Yanadoo, Hackers 1-min, Babbel)
- 10–25 min → diagnostic with credibility (BC, Cambridge, Preply, YBM)
- 40–90 min → certification credibility (EF SET, EnglishScore, DET)

**5. Speaking + AI grading is the new wedge.** Speak, Tutoring, Speakingmax, Ringle, EnglishScore all do voice grading. Five years ago this was rare; now it's table stakes for any "AI English" brand.

**6. Result page = CTA page.** Almost no site shows a result without a tightly bound CTA. The "result" is functionally a sales asset.

**7. Email gate is the dominant conversion mechanic.** Phone capture (Open English, Uphone) is high-intent but feels invasive. KakaoTalk push opt-in (야나두) is uniquely Korean and effective.

**8. Mobile-first but app-resistant for first encounter.** Most tests run on mobile web; app install gate (Speak app test) is reserved for users already convinced. Top-of-funnel = mobile web SPA.

**9. Multi-page progressive disclosure beats single-page form.** Every modern test (Speak, Babbel, Yanadoo, Cambridge) uses one-question-per-screen with a progress bar. Old-school single-page tests (Pagoda, parts of Hackers) feel dated.

**10. Anchor + comparison is the dopamine hit.** YBM ("compared to other test takers"), Ringle ("top 25% threshold"), Siwonschool ("part-by-part vs cohort") all use cohort percentiles. People love seeing where they rank.

---

## Best-in-class examples

**Best AI-assessed speaking test:** **Speak app**'s 5-question voice-only test. The AI tutor speaks the question aloud (TTS), waits, evaluates the recording, gives instant CEFR + a screen of micro-feedback. Time-to-value is ~3 minutes. The chat interface makes a test feel like a conversation.

**Best skill-decomposition report:** **Ringle CAF**. Three axes (Complexity / Accuracy / Fluency), each with sub-metrics (Complexity = vocab difficulty + sentence types + diversity; Accuracy = 13 grammar error types tracked; Fluency = WPM + filler + repetition). Click into any axis and you can play your audio at the exact mistake. ENGZ should consider this depth as an aspirational ceiling.

**Best anonymous-to-CEFR funnel:** **Preply**. No signup, 36 questions, instant CEFR card with descriptions, tutor marketplace inlined. Friction is near-zero. The downside is grammar-only.

**Best adaptive engine:** **Duolingo English Test**. End-to-end ML, item generation, scoring, fraud detection. Item pool so large repetition is statistically negligible. It's a paid product so directly copying it isn't possible, but the design is the reference.

**Best marketing wrapper:** **EF SET**. Free, 50 minutes, generates a shareable certificate URL with a verification page — that certificate is the viral hook. People put EF SET scores on LinkedIn. ENGZ should consider issuing a shareable result page.

**Best Korean credibility play:** **Siwonschool LAB TOEIC**. The mock-exam format and predicted score report mimics official TOEIC outputs so closely that users trust it as preparation, not just a marketing test.

**Best persona-driven UX:** **Yanadoo "AI 오드리"**. Embedding a known TV instructor's avatar into the test makes the funnel feel less transactional. Korean users respond to instructor-led products.

**Best 5-skill rubric:** **Uphone (민병철유폰)**. Communication / Comprehension / Pronunciation / Fluency / Grammar — clear, defensible, and live-tutor scored. The "내 영어 캐릭터" framing turns a score into an identity.

---

## Anti-patterns to avoid

**1. Login-before-test (Tutoring, Hackers, YBM membership).** Every gate before the test halves your funnel. Save signup for after the user sees a partial result they want to keep.

**2. 40+ minute "free" tests as top-of-funnel (EF SET 50-min, Siwonschool 40-min).** Acceptable for credentialing intent; lethal for executive professionals just trying ENGZ. Our user is short on time.

**3. Card capture on free trial (Lingoda, Cambly).** Aggressive, lifts trial→sub but craters trial-start rates. Not appropriate for a free diagnostic.

**4. Outbound sales call as result CTA (Open English).** Korean executives will not tolerate this. Burns brand goodwill.

**5. Membership wall on first test (YBM).** Treats the diagnostic as an existing-user benefit instead of an acquisition tool.

**6. Single-page form-style test (older Pagoda screens).** Feels like a survey. Progressive disclosure is the standard now.

**7. Persona quiz disguised as skill test (Yanadoo).** Lets you self-declare your level then "confirms" it. Smart for low-end CTR but builds zero credibility with executives. ENGZ's audience will see through it.

**8. Self-rating only (Cambly, Speak web 5-Q, Babbel partial).** No actual measurement = no actual differentiation. Loses to anything that grades real production.

**9. Result with no audio playback (most Korean tests).** Ringle's audio-replay-of-mistakes feature is overwhelmingly compelling. Tests that grade speaking but don't let you re-listen to the recording feel hollow.

**10. Generic result cards.** "You are intermediate. Try our courses!" is not a result — it's a placeholder. The result page should make the user feel seen (specific feedback, specific next action, specific weakness).

**11. Free-but-paid-retake (Tutoring's ₩1,000 retake).** Petty monetization signals weak product confidence. Either the test is free or it isn't.

**12. Phone number as primary capture (Uphone, Open English).** Korean professionals don't like phone-first capture. Email + optional Kakao is the right ladder.

---

## Recommendations for ENGZ

ENGZ's user is a Korean executive/professional. The decision criteria are: short on time, doesn't trust marketing, wants a credible read on their actual level, will pay for 1:1 if convinced. Here's what to steal and what to skip.

### Steal these

**A. Speak's voice-first test feel for the speaking section.** ENGZ already has 5 speaking questions. Make them feel like a 1:1 with a tutor, not a recording booth. TTS the question aloud, show a transcript, give 30-second silent-detection auto-stop. Show a brief "typed" thinking indicator on the avatar before the next question. This is the cheapest way to add warmth.

**B. Ringle CAF as the skill decomposition for the result page.** Even if we can't ship the full CAF engine on day 1, frame the report as Complexity / Accuracy / Fluency for speaking + Vocabulary / Listening / Reading-equivalent (objective MC) for the rest. Three-axis radar charts are visually compelling. Show 1–2 specific examples per axis ("당신은 'I have to' 대신 'I'm supposed to' 같은 표현을 시도했어요" — that level of specificity).

**C. EF SET's shareable certificate / result URL.** Generate a unique URL per result (engz.com/r/abc123) that the user can share, see again, or send to themselves. Don't lock results behind an email-only delivery — that creates "where's my email?" friction. Email is a copy of a result that already exists on the web.

**D. Preply's anonymous-to-CEFR flow.** Don't gate the test or the topline result behind email. Email gate goes on the deeper result (skill breakdown, recommendation, learning plan) — the top-line CEFR + 1-line summary should be free. This will roughly double organic completion rates and the email gate captures only motivated users.

**E. Cohort comparison from YBM/Ringle.** "ENGZ를 시도한 1,200명의 직장인 중 상위 23%" is a far better hook than "B2 (Upper-Intermediate)". Run as a backend stat once we have ≥100 completions.

**F. Cambridge's adaptivity, quietly.** Don't market "adaptive" — users don't care about the word. But within each section, after question 2 if they're getting them right, jump them to harder items in questions 3–5. Saves time and improves measurement at the same target length.

**G. Uphone's 5-axis rubric naming.** The Korean executive understands "의사소통 / 발음 / 문법 / 유창성 / 이해력" instinctively. Use those Korean axis names rather than CEFR jargon as primary labels; show CEFR as secondary.

**H. Hackers' "1분 점수 예측" entry funnel.** Consider a pre-funnel: 30-second mini-test ("당신의 영어는 몇 분 안에 회사에서 발표할 수 있을까요?") that produces a teaser and offers the full 5-min diagnostic. Two-step funnels convert better than single-step at the long-form end.

### Skip these

**A. Don't try to compete with Duolingo DET on adaptive depth.** That's a $70 paid test built by 50 PhDs. Our wedge is "5 minutes, executive-relevant, AI-graded enough."

**B. Don't gate behind login.** ENGZ's mobile app install or signup before any value = funnel death. Auth comes after the result reveal.

**C. Don't ask for phone or KakaoTalk number first.** Email only at the email gate. Optional Kakao opt-in on the result page after value delivery.

**D. Don't push to "book a sales call" as the primary CTA.** ENGZ is a SaaS, not a 학원. The right CTA after a diagnostic is "Try a 1:1 lesson with [recommended tutor based on result]" or "Start your free 7-day plan tailored to your weakness." Save sales call for high-AOV enterprise inquiries.

**E. Don't issue a "certificate" we can't defend.** EF SET has 10 years of psychometric calibration. ENGZ doesn't. Issue a "Diagnostic Report" — explicitly not a credential. Avoiding the certificate language sidesteps a credibility trap.

**F. Don't use a celebrity instructor avatar (Yanadoo style).** Our brand is professional, not edutainment. The AI tutor should feel like a competent coach, not a TV personality. Borrow the persona shell, not the celebrity.

**G. Don't charge for retakes.** It's petty. Retake limit by IP if abuse becomes a problem; never by payment.

### Specific recommendations for the current 5-min/20-Q structure

The 객5 + 주5 + 듣5 + 스5 split is good. Tighten it as follows:

**Mode 1 — Anonymous flow (default):**
1. Landing tap → "5분 영어 진단 시작" with 1 sentence of social proof (X명이 진단받았어요)
2. Q1–5 객관식: vocab/grammar discrimination, adaptive within
3. Q6–10 주관식 (sentence completion / cloze): tests production without speaking gate
4. Q11–15 듣기: 3 short clips (15s each) + 5 MC about them; one clip slightly fast-native to discriminate B2/C1
5. Q16–20 스피킹: 5 voice prompts. **Key**: prompt is contextually relevant to executives ("Introduce a project status update to a global client"). Auto-stop at 30s.
6. Result reveal: top-line CEFR + 5-axis radar (의사소통 / 발음 / 문법 / 유창성 / 이해력) + 2 specific feedback bullets per axis + cohort percentile.
7. Email gate ONLY for: full PDF report, learning plan, lesson recommendations.

**Mode 2 — Logged-in flow:** skip email gate, send report to account email automatically.

**Mode 3 — Retake (returning users):** save delta vs last test; show progress chart. This is the retention play.

**Result page must include:**
- Shareable URL (engz.com/r/{nanoid})
- "Listen to your answer" audio playback for at least 1 speaking question (Ringle pattern)
- 1 specific, named weakness ("당신은 과거형보다 현재완료를 자주 빼먹어요 — 'I have worked here for 3 years' 같은 표현 연습 추천")
- 1 specific recommended ENGZ feature/lesson (not a generic course bundle)
- Optional: invite to book a free 15-min 진단 follow-up with a real tutor (lifts B2B exec conversion)

### Implementation priority order

1. **Now:** Strip login gate. Make first 20 questions and topline result anonymous. Email gate only for deeper report.
2. **Now:** Add shareable result URL.
3. **Next 4 weeks:** 5-axis radar + 2 specific feedback bullets per axis (templated, then ML-improved later).
4. **Next 8 weeks:** Audio playback of speaking answers on result page.
5. **Next 12 weeks:** Cohort percentile (after ≥500 results collected).
6. **Next 16 weeks:** Within-section mild adaptivity for objective sections.
7. **Backlog:** Full CAF engine for speaking. Out-of-scope until ≥10k results to calibrate against.

---

## References

### Korean tests

- [야나두 레벨테스트](https://www.yanadoo.co.kr/levelTest/levelTestStart)
- [시원스쿨 LAB 토익 레벨테스트](https://lab.siwonschool.com/?s=free&p=leveltest)
- [스픽 레벨테스트 (블로그 설명)](https://speakenglish.kr/스픽-레벨테스트/)
- [캠블리 한국](https://www.cambly.com/?lang=ko)
- [링글 CAF 진단](https://www.ringleplus.com/en/student/landing/blog/caf-analysis-about)
- [튜터링 AI 레벨테스트](https://tutoring.co.kr/home/aiLevelTest)
- [민병철유폰 무료수업](https://app.uphone.co.kr/adv/flguide)
- [해커스 토스 레벨테스트](https://www.hackers.co.kr/?c=s_speak/speak_special/tos_full_service&tab=level)
- [YBM AI 레벨테스트](https://www.ybmbooks.com/customer/ai_leveltest.asp)
- [파고다 레벨테스트](https://www.pagoda21.com/html/leveltest/leveltest.jsp)
- [스피킹맥스](https://www.speakingmax.com/)
- [스피쿠스](https://www.spicus.com/lt/intro.asp)

### International tests

- [EF SET](https://www.efset.org/)
- [EF SET Quick Check](https://www.efset.org/quick-check/)
- [Cambridge Test Your English](https://www.cambridgeenglish.org/test-your-english/)
- [British Council LearnEnglish Level Test](https://learnenglish.britishcouncil.org/english-levels/online-english-level-test)
- [British Council EnglishScore](https://www.englishscore.com/)
- [Duolingo English Test](https://englishtest.duolingo.com/)
- [Duolingo blog on AI-driven assessment](https://blog.englishtest.duolingo.com/the-duolingo-english-test-ai-driven-language-assessment/)
- [Babbel Placement Quiz Help](https://support.babbel.com/hc/en-us/articles/20202703767442-Placement-quiz)
- [Babbel design Medium post](https://medium.com/babbeldesign/testing-testing-how-we-created-an-assessment-tool-for-babbel-users-9051407ca3be)
- [Lingoda Placement Test](https://www.lingoda.com/en/placement-tests/)
- [Preply English Level Test](https://preply.com/en/language-tests/english)
- [Italki Placement discussion](https://www.italki.com/en/post/discussion-138283)
- [Open English](https://en.wikipedia.org/wiki/Open_English)
