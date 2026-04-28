"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ---------------------------------------------------------------------------
 * eng-z.com — 김해나 1:1 프리미엄 영어
 *
 * 원래 디자인 (Hero 양쪽 주황 원 + 스크롤 패럴랙스, 3-card Why, 6-card
 * features grid, 2-card profile section, big CTA, download, contact form,
 * install modal) 을 그대로 유지하면서 콘텐츠만 김해나 브랜드로 교체.
 *
 * 가격 / 후기 본문 / 환불·시간 정책은 [TBD] 로 두어 자료 받으면 즉시 반영.
 * ------------------------------------------------------------------------ */

const APP_URL = "https://app.eng-z.com/login";
const KAKAO_CHANNEL = "https://pf.kakao.com/_engz_korea";

const whyEngzCards = [
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "자체 개발 AI 수업 시스템",
    description:
      "수업 전 자동으로 학습자에 맞는 커리큘럼·교안·숙제·복습 자료가 생성됩니다. 체계적 학생·숙제·진도 관리는 기본.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "당신만의 1:1 커리큘럼",
    description:
      "직군·영어 수준·목표가 다르면 매 수업이 다릅니다. CEO에겐 협상 영어, 의사에겐 학회 영어 — 한 사람도 같은 수업을 받지 않습니다.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "9년 누적 데이터의 노하우",
    description:
      "9년 동안 30+개 별점 5.0 후기, 비즈니스 영어 1위. 데이터로 검증된 학습 설계입니다.",
    gradient: "from-amber-500 to-yellow-500",
  },
];

const featuresGrid = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "비즈니스 영어",
    description: "대표·임원·컨설턴트를 위한 협상·미팅 영어",
    features: ["협상·프레젠테이션", "비즈니스 이메일", "임원 인터뷰 시뮬"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "OPIc · IELTS",
    description: "시험 준비·유학 준비를 위한 1:1 집중 코스",
    features: ["시험 전략 + 실력 향상", "1:1 모의테스트", "AL · 7.0+ 목표"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "영어회화",
    description: "전문직 일상 영어, 네트워킹·여행·문화",
    features: ["네이티브 톤 발음", "상황별 표현", "문화·뉘앙스 가이드"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI 맞춤 커리큘럼",
    description: "직군·수준·목표에 맞춰 매 수업 자동 생성",
    features: ["개인별 단어장", "맞춤 교안", "복습 자료 자동 생성"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "체계적 진도 관리",
    description: "수업·숙제·복습이 자동 추적되는 학습 시스템",
    features: ["주간 학습 리포트", "표현 누적 그래프", "교정 추이 분석"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "1:1 화상 수업",
    description: "위치·시차 무관, 어디서든 프리미엄 수업",
    features: ["고화질 화상 통화", "수업 보드 동시 편집", "녹화·복습 가능"],
  },
];

const haenaCredentials = [
  "강의 경력 9년차 (대학 재학 시절부터)",
  "비즈니스 영어 1위 (국내 주요 과외 플랫폼)",
  "별점 5.0 · 후기 30+건",
  "OPIc AL · TOEIC 975 · 동국대 화공생물공학과",
];

const aiSystemFeatures = [
  "수업 전 자동 커리큘럼·교안 생성",
  "학생별 단어장·복습 자료 자동 관리",
  "표현·교정 누적 데이터 시각화",
  "숙제 부여·자동 채점·피드백",
];

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const init = useCallback(() => {
    if (typeof window === "undefined") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-scale, .animate-on-scroll-left, .animate-on-scroll-right",
    );
    elements.forEach((el) => observerRef.current?.observe(el));
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

  // Contact / consultation form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);
      if (leftCircleRef.current) {
        leftCircleRef.current.style.transform = `translateX(${-progress * 800}px)`;
      }
      if (rightCircleRef.current) {
        rightCircleRef.current.style.transform = `translateX(${progress * 800}px)`;
      }
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = `${1 - progress}`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[김해나 1:1 영어 상담] ${name}`);
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
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-100"
            : "bg-transparent"
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
              왜 김해나
            </a>
            <a href="#courses" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              수업 종류
            </a>
            <a href="#instructor" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              강사 소개
            </a>
            <a href="#contact" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              상담
            </a>
            <a
              href={KAKAO_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all hover:-translate-y-0.5"
            >
              무료 상담
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
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-100 animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#why" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                왜 김해나
              </a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                수업 종류
              </a>
              <a href="#instructor" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                강사 소개
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                상담
              </a>
              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2.5 rounded-full text-center"
              >
                무료 상담
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative h-[100vh] overflow-hidden bg-white">
        {/* Left Circle */}
        <div
          ref={leftCircleRef}
          className="absolute top-[-30%] left-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C] shadow-2xl" />
        </div>

        {/* Right Circle */}
        <div
          ref={rightCircleRef}
          className="absolute top-[-30%] right-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B4A] via-[#FF7A5C] to-[#FF8A6C] shadow-2xl" />
        </div>

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center will-change-[opacity] transition-opacity duration-100"
        >
          <div className="animate-fade-in-up">
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 font-semibold">
              ✨ 9년차 비즈니스 영어 1위 강사
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-4 sm:mb-6 leading-tight">
              대표님 영어,
              <br />
              <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] bg-clip-text text-transparent">
                9년차 1위 강사
              </span>
              가
              <br className="sm:hidden" /> 직접 가르칩니다
            </h1>

            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              자체 개발 AI 수업 시스템으로, 당신만을 위한 영어 커리큘럼.
            </p>

            <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                className="inline-block text-lg sm:text-xl px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white hover:from-[#FF6B4A] hover:to-[#FF8A6C] shadow-2xl hover:scale-105 transition-all font-bold cursor-pointer"
              >
                무료 영어 레벨 진단 받기 →
              </a>
              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lg sm:text-xl px-10 py-4 sm:py-5 rounded-full bg-white text-gray-800 border-2 border-gray-200 hover:border-[#FF5C39] hover:text-[#FF5C39] shadow-xl hover:scale-105 transition-all font-bold cursor-pointer"
              >
                💬 카톡 상담
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 z-20 animate-scroll-bounce">
          <div className="text-sm mb-2 text-center">스크롤하세요</div>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-gray-600 rounded-full mt-2 animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* ===== WHY 김해나 ===== */}
      <section id="why" className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-[#FF5C39]">김해나</span> 수업이 다른 이유
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              일반 1:1 영어 과외와 차원이 다른 학습 경험
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyEngzCards.map((card, index) => (
              <div key={card.title} className={`animate-on-scroll animation-delay-${(index + 1) * 100} group`}>
                <div className="h-full border-0 shadow-2xl rounded-[40px] overflow-hidden bg-white hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2.5">
                  <div className="p-10">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      {card.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES / FEATURES GRID ===== */}
      <section id="courses" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              목표에 맞는 <span className="text-[#FF5C39]">1:1 코스</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              직군·수준·목표에 맞춰 매 수업이 다릅니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresGrid.map((feature, index) => (
              <div key={feature.title} className={`animate-on-scroll-scale animation-delay-${(index % 3) * 100}`}>
                <div className="border-2 border-orange-100 hover:border-[#FF5C39] transition-all duration-300 hover:shadow-xl rounded-[30px] overflow-hidden group h-full hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                    <p className="text-zinc-500 text-base">{feature.description}</p>
                  </div>
                  <div className="px-6 pb-6 pt-4">
                    <ul className="space-y-3">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#FF5C39] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-zinc-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTOR (김해나 about) ===== */}
      <section id="instructor" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-[#FF5C39]">9년</span>의 신뢰
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              한 사람, 한 사람의 영어를 책임져 온 9년
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Card — 강사 프로필 (사진) */}
            <div className="animate-on-scroll-left">
              <div className="border-0 shadow-2xl rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-50 to-white">
                <div className="grid sm:grid-cols-[180px_1fr] gap-6 p-8 sm:p-10 items-center">
                  <div className="relative aspect-[3/4] sm:aspect-square rounded-3xl overflow-hidden shadow-lg ring-4 ring-white">
                    <Image
                      src="/profile.jpg"
                      alt="김해나 강사"
                      fill
                      sizes="(min-width: 640px) 180px, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">김해나</h3>
                    <p className="text-sm text-[#FF5C39] font-semibold mb-4">
                      9년차 1:1 영어 과외 · ENGZ 대표
                    </p>
                    <ul className="space-y-2.5">
                      {haenaCredentials.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckIcon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-zinc-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card — 자체 시스템 */}
            <div className="animate-on-scroll-right">
              <div className="border-0 shadow-2xl rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-50 to-white">
                <div className="p-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A5C] to-[#FF8A6C] flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">자체 AI 수업 시스템</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed mb-6">
                    9년의 노하우를 시스템에 담았습니다. 한 사람, 한 수업이 자동으로 정리됩니다.
                  </p>
                  <ul className="space-y-3">
                    {aiSystemFeatures.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-base text-zinc-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll text-center">
            <a
              href="#contact"
              className="inline-block text-lg sm:text-xl px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white hover:from-[#FF6B4A] hover:to-[#FF8A6C] shadow-2xl hover:scale-105 transition-all font-bold"
            >
              무료 영어 레벨 진단 받기 →
            </a>
          </div>
        </div>
      </section>

      {/* ===== BIG CTA ===== */}
      <section className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C]" />

        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl animate-blob-1" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-orange-200 blur-3xl animate-blob-2" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
              내 영어 수준은
              <br />
              어디쯤일까?
            </h2>
            <p className="text-lg sm:text-2xl mb-8 sm:mb-12 text-white/90">
              5분 진단 → 결과 + 1:1 맞춤 커리큘럼 제안을 카톡으로 보내드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-block text-base sm:text-xl px-8 py-4 sm:py-5 rounded-full bg-white text-gray-900 shadow-2xl hover:scale-105 transition-all font-bold text-center"
              >
                무료 영어 레벨 진단
              </a>
              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block text-base sm:text-xl px-8 py-4 sm:py-5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#FF5C39] shadow-2xl hover:scale-105 transition-all font-bold text-center"
              >
                💬 카카오톡 상담
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APP DOWNLOAD (수강생 전용) ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll">
            <p className="text-sm text-[#FF5C39] font-semibold mb-2">FOR ENROLLED STUDENTS</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">수강생 전용 과외노트 앱</h2>
            <p className="text-zinc-500 mb-10">
              수업 보드·숙제·복습 자료를 어디서든 확인하세요
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <a
                href="https://app.eng-z.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">🖥️</div>
                <h3 className="font-bold text-zinc-800 mb-1">데스크톱</h3>
                <p className="text-xs text-zinc-400 mb-3">Chrome에서 설치</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>

              <a
                href="https://app.eng-z.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-zinc-800 mb-1">iPhone / iPad</h3>
                <p className="text-xs text-zinc-400 mb-3">Safari → 공유 → 홈 화면에 추가</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>

              <a
                href="https://app.eng-z.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-bold text-zinc-800 mb-1">Android</h3>
                <p className="text-xs text-zinc-400 mb-3">Chrome → 설치 배너 자동</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>
            </div>

            <p className="text-xs text-zinc-300 mt-8">
              앱 스토어 없이 브라우저에서 바로 설치 · 자동 업데이트 · 무료
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / 무료 상담 ===== */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">무료 상담 · 영어 레벨 진단</h2>
            <p className="text-zinc-500 text-center mb-10">
              5분 진단 + 1:1 맞춤 커리큘럼 제안을 카톡으로 보내드립니다
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="rounded-3xl border-2 border-zinc-100 hover:border-[#FF5C39] transition-all bg-white">
                <div className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#FF5C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">전화 상담</h3>
                  <a href="tel:010-7566-2391" className="text-sm text-zinc-500 hover:text-[#FF5C39] transition-colors">
                    010-7566-2391
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-zinc-100 hover:border-[#FF5C39] transition-all bg-white">
                <div className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#FF5C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">이메일</h3>
                  <a href="mailto:imhen97@eng-z.com" className="text-sm text-zinc-500 hover:text-[#FF5C39] transition-colors">
                    imhen97@eng-z.com
                  </a>
                </div>
              </div>

              <a
                href={KAKAO_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border-2 border-zinc-100 hover:border-[#FF5C39] transition-all bg-white block"
              >
                <div className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#FF5C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">카카오톡</h3>
                  <p className="text-sm text-zinc-500">@engz_korea</p>
                </div>
              </a>
            </div>

            <div className="rounded-3xl border-2 border-orange-100 bg-white shadow-lg">
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">무료 진단 신청</h3>
                    <p className="text-sm text-zinc-500">imhen97@eng-z.com 으로 전송됩니다</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일 (답장 받을 주소)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      현재 영어 수준 / 학습 목표
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="예) 기업 임원이고 글로벌 미팅에서 자신감 있게 발표하고 싶어요. 토익 800점대지만 회화는 자신 없습니다."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C39] focus:border-transparent transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl text-sm transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {sent ? "메일 앱이 열렸습니다" : "무료 진단 신청하기"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-zinc-100 py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center text-zinc-500 space-y-1 text-sm">
          <p className="font-medium text-gray-700">ENGZ | 대표자: 김해나</p>
          <p>&copy; 2026 ENGZ. All rights reserved.</p>
        </div>
      </footer>

      {/* ===== INSTALL MODAL (수강생 전용) ===== */}
      {showInstallModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowInstallModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                E
              </div>
              <h3 className="text-2xl font-bold text-gray-900">과외노트 앱 설치</h3>
              <p className="text-gray-500 mt-2 text-sm">홈 화면에 추가하면 앱처럼 사용할 수 있어요</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🖥️</span>
                  <span className="font-semibold text-gray-800 text-sm">Chrome / Edge (PC)</span>
                </div>
                <ol className="text-sm text-gray-600 space-y-1 ml-7 list-decimal">
                  <li>
                    <a href="https://app.eng-z.com" target="_blank" rel="noopener" className="text-[#FF5C39] underline font-medium">
                      app.eng-z.com
                    </a>{" "}
                    접속
                  </li>
                  <li>
                    주소창 오른쪽 <span className="font-medium">설치 아이콘 (⊕)</span> 클릭
                  </li>
                  <li>&quot;설치&quot; 버튼 클릭하면 완료!</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📱</span>
                  <span className="font-semibold text-gray-800 text-sm">iPhone / iPad (Safari)</span>
                </div>
                <ol className="text-sm text-gray-600 space-y-1 ml-7 list-decimal">
                  <li>
                    Safari로{" "}
                    <a href="https://app.eng-z.com" target="_blank" rel="noopener" className="text-[#FF5C39] underline font-medium">
                      app.eng-z.com
                    </a>{" "}
                    접속
                  </li>
                  <li>
                    하단 <span className="font-medium">공유 버튼 (↑)</span> 탭
                  </li>
                  <li>&quot;홈 화면에 추가&quot; 선택</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🤖</span>
                  <span className="font-semibold text-gray-800 text-sm">Android (Chrome)</span>
                </div>
                <ol className="text-sm text-gray-600 space-y-1 ml-7 list-decimal">
                  <li>
                    Chrome으로{" "}
                    <a href="https://app.eng-z.com" target="_blank" rel="noopener" className="text-[#FF5C39] underline font-medium">
                      app.eng-z.com
                    </a>{" "}
                    접속
                  </li>
                  <li>
                    상단 <span className="font-medium">⋮ 메뉴</span> &rarr; &quot;앱 설치&quot;
                  </li>
                  <li>&quot;설치&quot; 탭하면 완료!</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://app.eng-z.com"
                target="_blank"
                rel="noopener"
                className="inline-block text-sm text-gray-400 hover:text-[#FF5C39] transition underline"
              >
                웹 브라우저로 바로 열기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
