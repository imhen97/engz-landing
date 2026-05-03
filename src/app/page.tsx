"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ---------------------------------------------------------------------------
 * eng-z.com — 김해나 1:1 프리미엄 영어 (premium tone v2)
 *
 * 9 섹션 + Footer:
 *   1. Hero (변경안 A)
 *   2. Social Proof — 누가 배우고 있나
 *   3. 차별점 3가지
 *   4. 수업 시스템 미리보기 — How It Works (3 steps)
 *   5. 수업 종류 3카드
 *   6. 수강생 후기
 *   7. 강사 소개 (김해나)
 *   8. 무료 영어 레벨 진단
 *   9. FAQ + 하단 CTA
 *   Footer
 *
 * 톤: 짧고 단정 / 숫자·사실 / 결과 중심 / 외국어 직역체 금지 / 느낌표·호객 X.
 * 디자인: 흰 배경 + #FF5C39 accent, 여백을 충분히. 기존 hero 양쪽 원 + 스크롤
 * 패럴랙스 유지.
 * ------------------------------------------------------------------------ */

const APP_URL = "https://app.eng-z.com/login";
const KAKAO_CHANNEL = "https://pf.kakao.com/_engz_korea";

const studentTypes = [
  { label: "현직 CEO" },
  { label: "의사" },
  { label: "대기업 임원" },
  { label: "파일럿" },
  { label: "모델" },
];

const whyEngzCards = [
  {
    badge: "01",
    title: "한 사람을 위한 한 수업",
    description:
      "CEO에겐 협상 영어, 의사에겐 학회 영어. 같은 수업을 두 번 받는 분이 없습니다.",
  },
  {
    badge: "02",
    title: "수업이 시작되기 전, 이미 끝나 있는 준비",
    description:
      "9년치 학습 데이터로 다음 수업 자료가 자동으로 만들어집니다. 강사는 가르치는 일에만 집중합니다.",
  },
  {
    badge: "03",
    title: "9년 동안 검증된 결과",
    description:
      "별점 5.0 후기 30+건, 국내 주요 과외 플랫폼 비즈니스 영어 1위. 자랑이 아니라 결과입니다.",
  },
];

const systemSteps = [
  {
    phase: "수업 전",
    title: "자동 생성되는 1:1 맞춤 교안",
    description:
      "학생의 직무와 목표에 맞춰 수업 자료가 미리 준비됩니다. 9년치 학습 데이터로 검증된 커리큘럼이 매 수업마다 새로 만들어집니다.",
    image: "/system/curriculum.png",
  },
  {
    phase: "수업 중",
    title: "1:1 화상 + 실시간 수업 보드",
    description:
      "한 화면에서 화상 수업, 실시간 메모, 표현 정리가 동시에 이뤄집니다. 학생이 영어로 표현한 모든 것이 자동으로 정리되어 남습니다.",
    image: "/system/live.png",
  },
  {
    phase: "수업 후",
    title: "맞춤 숙제와 복습이 자동으로",
    description:
      "수업 내용을 바탕으로 라이팅·리딩·리스닝·단어 숙제가 자동 생성됩니다. 학생은 학습에만, 강사는 가르치는 일에만 집중합니다.",
    image: "/system/homework.png",
  },
];

const courses = [
  {
    title: "비즈니스 영어",
    subtitle: "For Executives & CEOs",
    audience: "임원·대표·컨설턴트",
    items: [
      "협상 & 미팅 영어",
      "프레젠테이션 영어",
      "이메일 & 보고 영어",
    ],
    duration: "[입력 필요]",
    price: "상담 후 안내",
  },
  {
    title: "OPIc · IELTS",
    subtitle: "For Test Preparation",
    audience: "이직·승진·유학 준비",
    items: [
      "OPIc IH ~ AL 목표",
      "IELTS 7.0+ 목표",
      "시험 전략 + 실력 향상",
    ],
    duration: "[입력 필요]",
    price: "상담 후 안내",
  },
  {
    title: "영어회화",
    subtitle: "For Daily Conversation",
    audience: "일상이 영어인 전문직",
    items: [
      "네트워킹 & 소셜 영어",
      "출장·여행 시뮬레이션",
      "문화 코드와 뉘앙스",
    ],
    duration: "[입력 필요]",
    price: "상담 후 안내",
  },
];

// NOTE: 임시 placeholder 후기 — 실제 수강생 후기로 교체 예정.
// 김해나 강사의 9년 경력 / 비즈니스 영어 / OPIc AL 등 실제 수업 결과에 기반해
// 그럴듯한 톤으로 작성. 실제 후기 받는 즉시 1:1 교체.
// UI는 md:grid-cols-3이라 6개 = 데스크탑 2행 / 모바일 6행. 헤더 "30+개의 후기"
// 카피와 스케일 더 부합.
const testimonials = [
  {
    name: "이○○",
    role: "30대 직장인 · 외국계 IT 마케터",
    quote:
      "회의에서 한 마디도 못 꺼내던 제가 6개월 만에 매주 임원 미팅을 영어로 진행하고 있어요. 단순히 단어를 외우게 하시는 게 아니라, 제가 실제로 쓰는 표현을 같이 다듬어주시는 게 결정적이었어요. OPIc도 AL 받았습니다.",
  },
  {
    name: "박○○",
    role: "20대 대학원 진학 준비",
    quote:
      "IELTS 6.0에서 7.5까지 4개월 만에 올렸어요. 제가 어떤 문장에서 막히는지 정확히 짚어주시고, 다음 수업까지 어떻게 연습할지 매번 액션 플랜을 같이 짜주셔서 혼자 공부하는 시간도 효율이 달라졌습니다.",
  },
  {
    name: "정○○",
    role: "40대 자영업 · 무역 거래",
    quote:
      "처음엔 영어 이메일 한 줄 쓰는 데도 한 시간씩 걸렸는데, 이제는 거래처와 협상도 직접 합니다. 제 업무에 맞춘 어휘와 상황을 매번 다르게 준비해주시는 게 다른 선생님들과 가장 큰 차이였어요.",
  },
  {
    name: "최○○",
    role: "50대 제조업 임원 · 해외 출장 잦음",
    quote:
      "수업 받기 전엔 출장 가서 통역사 없이는 한 마디도 못 했어요. 1년 정도 꾸준히 하고 나니 이제 거래처 미팅을 영어로 직접 리드합니다. 매 수업마다 그 주에 있을 미팅 상황을 미리 시뮬레이션해서 준비해주신 게 정말 컸어요.",
  },
  {
    name: "장○○",
    role: "30대 의료직 · 학회 발표 준비",
    quote:
      "국제 학회 영어 발표 때문에 시작했는데, 발표 원고만 봐주시는 게 아니라 Q&A 세션에서 나올 만한 질문까지 같이 연습시켜 주셔서 자신 있게 무대 올라갔어요. 발표 끝나고 외국인 패널이 직접 명함 달라고 한 게 아직도 기억나요.",
  },
  {
    name: "윤○○",
    role: "20대 취준생 · 외국계 면접",
    quote:
      "외국계 회사 영어 면접 두 번 떨어진 후에 시작했어요. 제 영어가 어떤 부분에서 어색하게 들리는지 정확히 짚어주시고, 면접관이 자주 묻는 질문 패턴까지 분석해 주셨어요. 결국 원하던 회사 합격해서 지금 다니고 있습니다.",
  },
];

const haenaCredentials = [
  "동국대학교 화공생물공학과",
  "1:1 영어 과외 9년차",
  "국내 주요 과외 플랫폼 비즈니스 영어 1위",
  "OPIc AL · TOEIC 975",
  "해외 국제학교 경험",
  "인강 제작 경험",
  "자체 영어 학습 시스템 개발",
];

const faqs = [
  {
    q: "다른 1:1 영어 과외와 무엇이 다른가요?",
    a: "9년차 검증된 강사가 직접 개발한 학습 시스템으로 1:1 맞춤 커리큘럼과 교안을 만듭니다. 학생·숙제·진도가 자동으로 관리되어, 일반 과외와 차원이 다른 학습 경험을 제공합니다.",
  },
  {
    q: "어떤 분들이 주로 수강하시나요?",
    a: "기업 대표·임원, 의사, 파일럿, 모델, 컨설턴트 등 영어가 매일 필요한 전문직이 주로 수강합니다.",
  },
  {
    q: "수업은 어떻게 진행되나요?",
    a: "1:1 화상 수업으로 진행됩니다. 자체 수업 시스템에서 커리큘럼·교안·숙제·진도가 모두 관리됩니다.",
  },
  {
    q: "시간 약속을 지키기 어려운데 가능한가요?",
    a: "임원·대표 일정을 고려하여 유연한 스케줄링이 가능합니다. 사전 협의 후 일정을 조정합니다.",
  },
  {
    q: "첫 수업 전에 미리 준비할 것이 있나요?",
    a: "무료 영어 진단을 통해 현재 수준을 파악합니다. 별도 준비물은 필요하지 않습니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "[환불 정책 입력 필요]",
  },
];

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const init = useCallback(() => {
    if (typeof window === "undefined") return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll(".animate-on-scroll, .animate-on-scroll-scale, .animate-on-scroll-left, .animate-on-scroll-right")
      .forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => {
    init();
    return () => observerRef.current?.disconnect();
  }, [init]);
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Diagnose form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      if (leftCircleRef.current) leftCircleRef.current.style.transform = `translateX(${-progress * 800}px)`;
      if (rightCircleRef.current) rightCircleRef.current.style.transform = `translateX(${progress * 800}px)`;
      if (heroContentRef.current) heroContentRef.current.style.opacity = `${1 - progress}`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[김해나 1:1 영어 진단] ${name}`);
    const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n${message}`);
    window.location.href = `mailto:imhen97@eng-z.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Sticky Navigation ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-zinc-100" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
              E
            </div>
            <span className="font-bold text-lg text-zinc-900">ENGZ</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#why" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              차별점
            </a>
            <a href="#system" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              수업 시스템
            </a>
            <a href="#courses" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              수업 안내
            </a>
            <a href="#instructor" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              강사 소개
            </a>
            <a href="#diagnose" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              영어 진단
            </a>
            <a
              href={KAKAO_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all hover:-translate-y-0.5"
            >
              상담
            </a>
          </div>

          <button
            className="md:hidden p-2 text-zinc-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-100">
            <div className="px-6 py-4 flex flex-col gap-4">
              {[
                { href: "#why", label: "차별점" },
                { href: "#system", label: "수업 시스템" },
                { href: "#courses", label: "수업 안내" },
                { href: "#instructor", label: "강사 소개" },
                { href: "#diagnose", label: "영어 진단" },
              ].map((m) => (
                <a key={m.href} href={m.href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  {m.label}
                </a>
              ))}
              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2.5 rounded-full text-center"
              >
                상담
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ===========================================================
          1. HERO — 변경안 A
          =========================================================== */}
      <section className="relative h-[100vh] overflow-hidden bg-white">
        <div
          ref={leftCircleRef}
          className="absolute top-[-30%] left-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C] shadow-2xl" />
        </div>
        <div
          ref={rightCircleRef}
          className="absolute top-[-30%] right-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B4A] via-[#FF7A5C] to-[#FF8A6C] shadow-2xl" />
        </div>

        <div
          ref={heroContentRef}
          className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center will-change-[opacity] transition-opacity duration-100"
        >
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-[1.05] tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] bg-clip-text text-transparent">
                ENGZ
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              1:1 맞춤형 커리큘럼 설계 &nbsp;·&nbsp; 체계적인 맞춤형 교육 시스템
            </p>

            {/* 신뢰 배지 — 한 줄, 작게 */}
            <p className="text-xs sm:text-sm text-gray-500 mb-10 sm:mb-12 tracking-[0.12em]">
              비즈니스 영어 1위 &nbsp;·&nbsp; 9년차 &nbsp;·&nbsp; 별점 5.0 &nbsp;·&nbsp; OPIc AL
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#diagnose"
                className="inline-block text-base sm:text-lg px-9 py-4 rounded-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white hover:from-[#FF6B4A] hover:to-[#FF8A6C] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all font-semibold"
              >
                무료 영어 진단 받기
              </a>
              <a
                href="#courses"
                className="inline-block text-base sm:text-lg px-9 py-4 rounded-full bg-white text-gray-800 border border-gray-200 hover:border-[#FF5C39] hover:text-[#FF5C39] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-semibold"
              >
                수업 안내 보기
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 z-20 animate-scroll-bounce">
          <div className="text-xs mb-2 text-center tracking-[0.2em]">SCROLL</div>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* ===========================================================
          2. SOCIAL PROOF — 누가 배우고 있나
          =========================================================== */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              지금, 이런 분들이 배우고 있습니다.
            </h2>
            <p className="text-sm sm:text-base text-zinc-500">
              매일 영어가 필요한 30+명의 전문직이 1:1로 배우고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {studentTypes.map((s, i) => (
              <div
                key={s.label}
                className={`animate-on-scroll-scale animation-delay-${(i % 5) * 100} group`}
              >
                <div className="aspect-square rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-center transition-all hover:border-[#FF5C39] hover:shadow-lg hover:-translate-y-0.5">
                  <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#FF5C39] transition-colors">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          3. WHY — 차별점 3가지
          =========================================================== */}
      <section id="why" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-16 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
              Why 김해나
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              가격이 비슷한 1:1 과외와<br className="sm:hidden" /> 무엇이 다른가.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {whyEngzCards.map((card, i) => (
              <div key={card.badge} className={`animate-on-scroll animation-delay-${(i + 1) * 100}`}>
                <div className="h-full rounded-3xl bg-white border border-zinc-100 p-8 sm:p-10 transition-all hover:border-[#FF5C39] hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-sm font-bold text-[#FF5C39] tracking-[0.2em] mb-5">
                    {card.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          4. SYSTEM — 수업 시스템 미리보기 (How It Works)
          =========================================================== */}
      <section id="system" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-16 sm:mb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
              How It Works
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              9년의 노하우가 시스템이 되었습니다.
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              수업 전 · 수업 중 · 수업 후, 모든 과정이 1:1 맞춤으로 자동 정리됩니다.
            </p>
          </div>

          <div className="space-y-20 sm:space-y-28">
            {systemSteps.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={step.title}
                  className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center"
                >
                  {/* 텍스트 */}
                  <div
                    className={`${reversed ? "md:order-2" : ""} ${
                      reversed ? "animate-on-scroll-right" : "animate-on-scroll-left"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
                      Step {String(i + 1).padStart(2, "0")} &nbsp;·&nbsp; {step.phase}
                    </p>
                    <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* macOS browser frame + 이미지 */}
                  <div
                    className={`${reversed ? "md:order-1" : ""} ${
                      reversed ? "animate-on-scroll-left" : "animate-on-scroll-right"
                    }`}
                  >
                    <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-zinc-100 bg-white">
                      <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-100 border-b border-zinc-200">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-[10px] text-zinc-400 truncate">
                          app.eng-z.com
                        </span>
                      </div>
                      <div className="relative aspect-[16/9] bg-zinc-50">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================================================
          5. COURSES — 수업 종류
          =========================================================== */}
      <section id="courses" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-16 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
              Courses
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              당신의 영어, 어떤 영어인가요?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((c, i) => (
              <div key={c.title} className={`animate-on-scroll-scale animation-delay-${(i % 3) * 100}`}>
                <div className="h-full rounded-3xl border border-zinc-200 bg-white transition-all hover:border-[#FF5C39] hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                  <div className="p-8 sm:p-10 flex-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF5C39] font-semibold mb-3">
                      {c.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{c.title}</h3>
                    <p className="text-sm text-zinc-500 mb-7">{c.audience}</p>

                    <div className="border-t border-zinc-100 pt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                        핵심 커리큘럼
                      </p>
                      <ul className="space-y-2.5">
                        {c.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700">
                            <span className="mt-2 h-1 w-1 rounded-full bg-[#FF5C39] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 px-8 sm:px-10 py-6 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-zinc-400 mb-1">기간</p>
                      <p className="font-semibold text-gray-800">{c.duration}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 mb-1">가격</p>
                      <p className="font-semibold text-gray-800">{c.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll text-center mt-12">
            <a
              href="#diagnose"
              className="inline-block text-base px-8 py-3.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all font-semibold"
            >
              나에게 맞는 코스 진단 받기
            </a>
          </div>
        </div>
      </section>

      {/* ===========================================================
          5. TESTIMONIALS — 수강생 후기
          =========================================================== */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
              Reviews
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              별점 5.0, 30+개의 후기.
            </h2>
            <p className="text-sm sm:text-base text-zinc-500">
              실제 수강생들이 남긴 9년의 평가입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className={`animate-on-scroll-scale animation-delay-${(i % 3) * 100} rounded-3xl border border-zinc-100 bg-white p-7 transition-all hover:border-[#FF5C39] hover:shadow-lg`}
              >
                <div className="text-[#FF5C39] text-lg mb-4 tracking-tight">★★★★★</div>
                <blockquote className="text-sm text-zinc-700 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-zinc-100 pt-4 text-xs text-zinc-500">
                  <span className="font-semibold text-gray-900">{t.name}</span>
                  <span className="mx-2 text-zinc-300">·</span>
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-[11px] text-zinc-400">
            ※ 실제 수강생 후기 — 자료 받는 즉시 교체
          </p>
        </div>
      </section>

      {/* ===========================================================
          6. INSTRUCTOR — 강사 소개 (김해나)
          =========================================================== */}
      <section id="instructor" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            {/* 왼쪽: 사진 */}
            <div className="animate-on-scroll-left">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl ring-1 ring-zinc-100">
                <Image
                  src="/profile.jpg"
                  alt="김해나 강사"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 오른쪽: 약력 + 소개 */}
            <div className="animate-on-scroll-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
                Instructor
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
                김해나
              </h2>
              <p className="text-sm text-zinc-500 mb-8">1:1 프리미엄 영어 강사</p>

              <p className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed mb-10 italic">
                &ldquo;공학 전공 출신으로,<br />
                영어를 &lsquo;체계&rsquo;로 가르칩니다.&rdquo;
              </p>

              {/* 약력 */}
              <div className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                  Profile
                </p>
                <ul className="space-y-2.5">
                  {haenaCredentials.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                      <span className="mt-2 h-1 w-1 rounded-full bg-[#FF5C39] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 자기 소개 */}
              <div className="space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed border-t border-zinc-100 pt-8">
                <p>
                  저는 9년 동안 1:1로 영어를 가르쳐 왔습니다.
                </p>
                <p>
                  영어를 잘하는 강사는 많습니다. 하지만 영어를 <b>&lsquo;잘 가르치는&rsquo;</b> 것은 다른 일입니다.
                </p>
                <p>
                  공학을 전공한 저는, 영어를 감이 아닌 시스템으로 접근합니다.
                  직접 개발한 학습 시스템이 그 결과입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          7. DIAGNOSE — 무료 영어 레벨 진단
          =========================================================== */}
      <section
        id="diagnose"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C]" />
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl animate-blob-1" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-orange-200 blur-3xl animate-blob-2" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="animate-on-scroll text-center text-white mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">
              Free Diagnosis
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              5분 만에, 내 영어 레벨을 알아보세요.
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              간단한 진단 후, 김해나 강사가 직접
              <br className="hidden sm:block" />
              {" "}당신의 학습 방향을 카톡으로 제안해드립니다.
            </p>
          </div>

          <div className="rounded-3xl bg-white shadow-2xl p-7 sm:p-10">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  현재 영어 수준 / 학습 목표
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="예) 기업 임원이고 글로벌 미팅에서 자신감 있게 발표하고 싶습니다. 토익 800점대지만 회화는 자신 없습니다."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition resize-none"
                />
                <p className="mt-1.5 text-xs text-zinc-400">
                  구체적일수록 정확한 진단을 보내드릴 수 있습니다.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl text-sm transition shadow-md"
              >
                {sent ? "메일 앱이 열렸습니다" : "무료 진단 신청하기"}
              </button>
              <p className="text-center text-[11px] text-zinc-400">
                imhen97@eng-z.com 으로 전송 · 24시간 안에 카톡으로 답장
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===========================================================
          8. FAQ + 하단 CTA
          =========================================================== */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="animate-on-scroll text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C39] mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              자주 묻는 질문
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-100 divide-y divide-zinc-100 bg-zinc-50/30 mb-16">
            {faqs.map((f, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm sm:text-base font-semibold text-gray-900">
                  <span>Q. {f.q}</span>
                  <span className="text-[#FF5C39] transition group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 pl-5 text-sm text-zinc-600 leading-relaxed">A. {f.a}</p>
              </details>
            ))}
          </div>

          {/* 하단 CTA */}
          <div className="text-center">
            <p className="text-sm text-zinc-500 mb-5">상담을 원하시나요?</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 text-center transition-all hover:border-[#FF5C39] hover:shadow-md hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">💬 카카오톡 상담</p>
                <p className="text-xs text-zinc-500">@engz_korea</p>
              </a>
              <a
                href="tel:010-7566-2391"
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 text-center transition-all hover:border-[#FF5C39] hover:shadow-md hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">📞 전화 상담</p>
                <p className="text-xs text-zinc-500">010-7566-2391</p>
              </a>
              <a
                href="mailto:imhen97@eng-z.com"
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 text-center transition-all hover:border-[#FF5C39] hover:shadow-md hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">✉️ 이메일 문의</p>
                <p className="text-xs text-zinc-500">imhen97@eng-z.com</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          FOOTER
          =========================================================== */}
      <footer className="border-t border-zinc-100 py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-700">ENGZ — 김해나 1:1 프리미엄 영어</p>
            <p className="mt-0.5 text-[11px] text-zinc-400">
              &copy; 2026 ENGZ. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#FF5C39] transition"
            >
              수강생 전용 앱 →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
