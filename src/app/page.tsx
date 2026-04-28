import Image from "next/image";
import Link from "next/link";

/* ---------------------------------------------------------------------------
 * eng-z.com — 김해나 1:1 프리미엄 영어 (warm orange edition)
 *
 * 8 섹션 구조는 동일, 색상만 ENGZ 브랜드 오렌지 (#FF5C39) 계열로 재도색.
 * Hero의 trust-badge row는 사장님 요청으로 제거.
 *
 * 가격 / 후기 본문 / 프로필 사진 등은 [TBD] 마커로 두고 자료 받는 즉시
 * 채울 수 있게 잡아두었음.
 * ------------------------------------------------------------------------ */

const APP_URL = "https://app.eng-z.com/login";
const KAKAO_CHANNEL = "https://pf.kakao.com/_engz_korea";
const PHONE = "010-7566-2391";
const PHONE_TEL = "tel:+821075662391";
const EMAIL = "imhen97@eng-z.com";

const STUDENT_GROUPS: Array<{ icon: string; title: string; desc: string }> = [
  { icon: "👔", title: "기업 대표·임원", desc: "협상·미팅 영어로 글로벌 의사결정" },
  { icon: "🏥", title: "의사·연구자", desc: "학회 발표·논문 영어를 매일 쓰는 분" },
  { icon: "✈️", title: "파일럿", desc: "관제 통신과 글로벌 운항 표준 영어" },
  { icon: "💼", title: "컨설턴트·전문직", desc: "고객·파트너에게 영어로 신뢰를 주는 직군" },
  { icon: "📺", title: "모델·아티스트", desc: "글로벌 캐스팅·인터뷰가 잦은 분" },
];

const DIFFERENTIATORS: Array<{
  badge: string;
  title: string;
  body: string;
  hint?: string;
}> = [
  {
    badge: "01",
    title: "자체 개발 AI 수업 시스템",
    body:
      "수업 전 자동으로 학습자에 맞는 커리큘럼·교안·숙제·복습 자료가 생성됩니다. 체계적 학생·숙제·진도 관리는 기본.",
    hint: "Powered by 자체 AI",
  },
  {
    badge: "02",
    title: "당신만의 1:1 커리큘럼",
    body:
      "직군·영어 수준·목표가 다르면 매 수업이 다릅니다. CEO에겐 협상 영어, 의사에겐 학회 영어 — 한 사람도 같은 수업을 받지 않습니다.",
  },
  {
    badge: "03",
    title: "9년 누적 데이터의 노하우",
    body:
      "9년 동안 30+개 별점 5.0 후기, 비즈니스 영어 1위. 데이터로 검증된 학습 설계입니다.",
  },
];

const COURSES: Array<{
  emoji: string;
  title: string;
  audience: string;
  highlights: string[];
  duration: string;
  pricing: string;
}> = [
  {
    emoji: "💼",
    title: "비즈니스 영어",
    audience: "임원·대표·컨설턴트",
    highlights: ["협상 영어", "프레젠테이션", "미팅·이메일"],
    duration: "[기간 입력 필요]",
    pricing: "[가격 입력 필요]",
  },
  {
    emoji: "🎯",
    title: "OPIc · IELTS",
    audience: "시험 준비생·유학 준비",
    highlights: ["시험 전략", "실력 향상", "1:1 모의테스트"],
    duration: "[기간 입력 필요]",
    pricing: "[가격 입력 필요]",
  },
  {
    emoji: "🗣️",
    title: "영어회화",
    audience: "전문직 일상 영어",
    highlights: ["네트워킹 영어", "여행·생활", "문화·뉘앙스"],
    duration: "[기간 입력 필요]",
    pricing: "[가격 입력 필요]",
  },
];

const TESTIMONIALS: Array<{ name: string; role: string; quote: string }> = [
  {
    name: "[수강생 1]",
    role: "[직업]",
    quote: "[후기 텍스트 입력 필요]",
  },
  {
    name: "[수강생 2]",
    role: "[직업]",
    quote: "[후기 텍스트 입력 필요]",
  },
  {
    name: "[수강생 3]",
    role: "[직업]",
    quote: "[후기 텍스트 입력 필요]",
  },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "다른 1:1 영어 과외와 무엇이 다른가요?",
    a: "9년차 검증된 강사가 직접 개발한 AI 기반 스마트 수업 시스템으로 1:1 맞춤 커리큘럼과 교안을 생성합니다. 체계적인 학생·숙제·진도 관리로 일반 과외와 차원이 다른 학습 경험을 제공합니다.",
  },
  {
    q: "1:1 프리미엄 영어 수업료는 얼마인가요?",
    a: "수업 종류와 기간에 따라 다르며, 무료 영어 레벨 진단 후 맞춤 견적을 안내해드립니다.",
  },
  {
    q: "수업은 어떻게 진행되나요?",
    a: "1:1 화상 수업으로 진행되며, 자체 개발한 스마트 수업 시스템에서 매 수업 맞춤 커리큘럼·교안·숙제·복습 자료가 생성·관리됩니다.",
  },
  {
    q: "어떤 분들이 주로 수강하시나요?",
    a: "기업 대표·임원, 의사, 파일럿, 모델, 컨설턴트 등 전문직 1:1 수강생이 중심입니다.",
  },
  {
    q: "강사 이력이 어떻게 되나요?",
    a: "9년차 1:1 영어 과외 강사로, 비즈니스 영어 분야 1위(국내 주요 과외 플랫폼)이며 OPIc AL, TOEIC 975, 동국대학교 화공생물공학과 출신입니다. 별점 5.0 후기 30+건을 보유하고 있습니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "[환불 정책 입력 필요]",
  },
  {
    q: "수업 시간은 어떻게 정하나요?",
    a: "[수업 시간 정책 입력 필요]",
  },
];

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      {/* ===========================================================
          1. HERO — warm cream/orange wash, no trust-badge row
          =========================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
        {/* soft orange glow behind the headline */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,92,57,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold text-[#FF5C39] shadow-sm backdrop-blur">
            ✨ 9년차 비즈니스 영어 1위 강사
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            대표님 영어,
            <br />
            <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF8562] bg-clip-text text-transparent">
              9년차 1위 강사
            </span>
            가 직접 1:1로 가르칩니다
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg">
            자체 개발 AI 수업 시스템으로,
            <br className="sm:hidden" /> 당신만을 위한 영어 커리큘럼.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#diagnose"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF5C39] to-[#FF8562] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200/60 transition hover:opacity-90"
            >
              무료 영어 레벨 진단 받기 →
            </a>
            <a
              href={KAKAO_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50"
            >
              💬 카카오톡으로 상담하기
            </a>
          </div>

          {/* 강사 미니 카드 */}
          <div className="mt-12 flex items-center gap-4 rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:max-w-md">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#FF5C39]/30 shadow">
              <Image
                src="/profile.jpg"
                alt="김해나 강사"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-zinc-900">김해나</p>
              <p className="text-xs text-zinc-500">9년차 1:1 영어 과외 강사 · ENGZ 대표</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          2. SOCIAL PROOF — 누가 배우고 있나
          =========================================================== */}
      <section className="border-y border-orange-100 bg-orange-50/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
            누가 배우고 있나
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
            대표·임원·전문직이 선택한 영어
          </h2>
          <p className="mt-3 text-center text-sm text-zinc-600 sm:text-base">
            매일 영어로 의사결정해야 하는 분들의 1:1 영어 파트너입니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STUDENT_GROUPS.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-orange-100 bg-white p-5 text-center transition hover:-translate-y-0.5 hover:border-[#FF5C39] hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{g.icon}</div>
                <p className="text-sm font-semibold text-zinc-900">{g.title}</p>
                <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          3. WHY — 차별점 3가지
          =========================================================== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
            왜 김해나 수업인가
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
            일반 과외와 차원이 다른 이유
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.badge}
                className="relative rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50/40 via-white to-white p-7 transition hover:-translate-y-1 hover:border-[#FF5C39] hover:shadow-xl"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5C39] to-[#FF8562] text-sm font-bold text-white shadow">
                  {d.badge}
                </div>
                <h3 className="text-lg font-bold leading-tight">{d.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{d.body}</p>
                {d.hint && (
                  <p className="mt-4 inline-block rounded-md bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-[#FF5C39]">
                    {d.hint}
                  </p>
                )}
                {d.badge === "01" && (
                  <div className="mt-5 rounded-xl border border-dashed border-orange-200 bg-orange-50/50 p-3 text-center text-[11px] text-orange-400">
                    [시스템 스크린샷 영역 — 자료 받으면 교체]
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          4. COURSES — 수업 종류 3개
          =========================================================== */}
      <section className="bg-orange-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
            수업 종류
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
            목표에 맞는 1:1 코스
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {COURSES.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-3xl border border-orange-100 bg-white p-7 transition hover:-translate-y-1 hover:border-[#FF5C39] hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{c.emoji}</div>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-1 text-xs font-semibold text-[#FF5C39]">{c.audience}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-600">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-[#FF5C39]">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-orange-100 pt-4 text-xs">
                  <div>
                    <p className="text-zinc-400">기간</p>
                    <p className="mt-0.5 font-semibold text-zinc-900">{c.duration}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">가격</p>
                    <p className="mt-0.5 font-semibold text-zinc-900">{c.pricing}</p>
                  </div>
                </div>
                <a
                  href="#diagnose"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF5C39] to-[#FF8562] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200/60 transition hover:opacity-90"
                >
                  무료 진단 받기
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          5. TESTIMONIALS — 수강생 후기
          =========================================================== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
            수강생 후기
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
            별점 5.0 · 30+개의 검증된 후기
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50/40 via-white to-white p-6 transition hover:border-[#FF5C39] hover:shadow-md"
              >
                <div className="flex text-[#FF5C39]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-zinc-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-orange-100 pt-4 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-900">{t.name}</span>
                  <span className="mx-2 text-zinc-300">·</span>
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 text-center text-[11px] text-zinc-400">
            ※ 실제 수강생 후기 — 사장님 자료 받는 즉시 교체
          </p>
        </div>
      </section>

      {/* ===========================================================
          6. INSTRUCTOR — 강사 이력
          =========================================================== */}
      <section className="bg-orange-50/40 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5C39] via-[#FF8562] to-orange-200 p-1 shadow-md">
                <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-white">
                  <Image
                    src="/profile.jpg"
                    alt="김해나 강사 프로필"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
                About 김해나
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                9년 동안 한 사람, 한 사람의 영어를 책임져 왔습니다
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-zinc-700 sm:text-base">
                대학교 시절부터 9년간 1:1 영어 과외만 해왔습니다. 평범한 영어
                교습이 아니라, 학습자 한 명 한 명에게 맞는 커리큘럼을 직접
                설계하는 일이었습니다. 그 노하우를 시스템에 담은 것이 지금의
                자체 AI 수업 시스템입니다.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-5 text-sm">
                <Stat label="강의 경력" value="9년" />
                <Stat label="별점 5.0 후기" value="30+" />
                <Stat label="비즈니스 영어" value="플랫폼 1위" />
                <Stat label="OPIc · TOEIC" value="AL · 975" />
              </dl>

              <h3 className="mt-10 text-sm font-bold">학력 · 자격</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                <li>· 동국대학교 화공생물공학과</li>
                <li>· OPIc AL (최고 등급)</li>
                <li>· TOEIC 975</li>
                <li>· 비즈니스 영어 1위 (국내 주요 과외 플랫폼)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          7. DIAGNOSE — 무료 영어 레벨 진단
          =========================================================== */}
      <section
        id="diagnose"
        className="relative overflow-hidden bg-gradient-to-br from-[#FF5C39] via-[#FF7A5C] to-[#FF8562] py-16 text-white sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.18),_transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-xl backdrop-blur sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              무료 영어 레벨 진단
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              내 영어 수준은 어디쯤일까?
            </h2>
            <p className="mt-3 text-sm text-white/90 sm:text-base">
              5분 진단 → 결과 + 1:1 맞춤 커리큘럼 제안을 카톡으로 보내드립니다.
            </p>

            {/*
              TODO: 실제 진단 폼 — 백엔드 연결 시 form action 으로 교체.
              지금은 이메일/카톡 ID만 수집하는 형태로 두고, 제출 시 백엔드
              엔드포인트(예: /api/diagnose) 또는 외부 폼(Tally / Typeform)
              으로 보낼 것.
            */}
            <form className="mt-8 space-y-4" action="/api/diagnose" method="post">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-white focus:bg-white/25"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  카카오톡 ID (선택)
                </label>
                <input
                  type="text"
                  name="kakaoId"
                  placeholder="@your_id"
                  className="mt-2 w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-white focus:bg-white/25"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#FF5C39] transition hover:bg-orange-50"
              >
                진단 시작하기 →
              </button>
              <p className="text-center text-[11px] text-white/70">
                진단 결과와 맞춤 커리큘럼 제안을 카톡으로 보내드립니다
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===========================================================
          8. FAQ + CTA + Footer
          =========================================================== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#FF5C39]">
            자주 묻는 질문
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">FAQ</h2>

          <div className="mt-10 divide-y divide-orange-100 rounded-2xl border border-orange-100 bg-orange-50/30">
            {FAQS.map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-zinc-900">
                  <span>{f.q}</span>
                  <span className="text-[#FF5C39] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>

          {/* CTA 3가지 */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            <a
              href={KAKAO_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-yellow-300 bg-yellow-50 p-5 text-center transition hover:bg-yellow-100"
            >
              <p className="text-2xl">💬</p>
              <p className="mt-2 text-sm font-bold text-zinc-900">카카오톡 상담</p>
              <p className="mt-0.5 text-xs text-zinc-600">@engz_korea</p>
            </a>
            <a
              href={PHONE_TEL}
              className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-center transition hover:bg-orange-100"
            >
              <p className="text-2xl">📞</p>
              <p className="mt-2 text-sm font-bold text-zinc-900">전화 상담</p>
              <p className="mt-0.5 text-xs text-zinc-600">{PHONE}</p>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center transition hover:bg-white"
            >
              <p className="text-2xl">✉️</p>
              <p className="mt-2 text-sm font-bold text-zinc-900">이메일 문의</p>
              <p className="mt-0.5 text-xs text-zinc-600">{EMAIL}</p>
            </a>
          </div>

          {/* 앱 사용 진입 */}
          <div className="mt-10 rounded-2xl border border-orange-200 bg-gradient-to-br from-[#FF5C39] to-[#FF8562] p-6 text-center text-white shadow-lg shadow-orange-200/50">
            <p className="text-xs uppercase tracking-wider text-white/80">
              이미 수강생이신가요?
            </p>
            <p className="mt-2 text-sm">
              과외노트 앱에서 수업 보드와 숙제·복습을 확인하세요.
            </p>
            <Link
              href={APP_URL}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#FF5C39] transition hover:bg-orange-50"
            >
              과외노트 앱 열기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================================================
          FOOTER
          =========================================================== */}
      <footer className="border-t border-orange-100 bg-orange-50/30 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#FF5C39]">ENGZ</p>
              <p className="mt-1 text-xs text-zinc-500">대표자: 김해나</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">
                © 2026 ENGZ. All rights reserved.
              </p>
            </div>
            <div className="text-xs text-zinc-500">
              <p className="mb-1.5 font-semibold text-zinc-700">다른 프로젝트</p>
              <p>
                <a
                  href="https://aiinnercircle.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5C39]"
                >
                  AI Inner Circle ↗
                </a>
              </p>
              <p>
                <Link href={APP_URL} className="hover:text-[#FF5C39]">
                  과외노트 (학생·강사 전용) ↗
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ----- 작은 helper 컴포넌트 ----- */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-orange-100 bg-white p-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#FF5C39]/80">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-bold text-zinc-900">{value}</dd>
    </div>
  );
}
