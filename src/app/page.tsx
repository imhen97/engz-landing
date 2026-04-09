"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const APP_URL = "https://app.eng-z.com/login";

const whyEngzCards = [
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "학생 관리 자동화",
    description: "수강 신청부터 승인, 진도 추적, 숙제 관리까지 — 선생님이 일일이 챙기지 않아도 ENGZ가 체계적으로 정리해드립니다.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "1:1 맞춤 수업 지원",
    description: "수업 보드, 실시간 피드백, 수업 노트, 핵심 표현 저장까지 — 온라인 과외에 필요한 모든 도구를 한 화면에서 제공합니다.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "스마트 학습 시스템",
    description: "학습 리포트, 교정 추이 분석, 자동 수업 생성까지 — 선생님은 피드백만, 나머지는 시스템이 처리합니다.",
    gradient: "from-amber-500 to-yellow-500",
  },
];

const featuresGrid = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "수강생 대시보드",
    description: "수업, 숙제, 진도를 한눈에 확인하세요",
    features: ["오늘의 수업 개요", "학습 연속 일수 추적", "빠른 실행 버튼"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "숙제 시스템",
    description: "과제를 제출하고 선생님의 피드백을 받으세요",
    features: ["작문 & 스피킹 과제", "인터랙티브 퀴즈", "선생님 첨삭"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "수업 노트",
    description: "매 수업에서 배운 핵심 표현을 저장하고 복습하세요",
    features: ["핵심 표현 라이브러리", "발음 오디오", "예문"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "진도 추적",
    description: "상세한 분석으로 실력 향상을 시각화하세요",
    features: ["주간 진도 차트", "레벨별 추적", "성취 배지"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "교재 관리",
    description: "개인 맞춤형 교재와 자료를 관리하세요",
    features: ["PDF 업로드", "링크 자료 연결", "수업별 자료 분류"],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "선생님 관리자",
    description: "모든 학생을 관리하고 진도를 추적하세요",
    features: ["학생 관리", "수업 기록", "성과 인사이트"],
  },
];

const teacherManagement = [
  "학생별 상세 프로필 및 진도 추적",
  "숙제 부여 및 자동 첨삭 기능",
  "수업 기록 및 피드백 관리",
  "출석 및 수업료 관리",
];

const smartTeaching = [
  "레벨별 자동 테스트 생성",
  "AI 영작 교정 및 피드백",
  "학습 자료 자동 추천",
  "성적 분석 및 리포트",
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-scale, .animate-on-scroll-left, .animate-on-scroll-right"
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

  // Contact form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);

      // Hero scroll parallax — circles open on scroll
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1); // 0 to 1
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
    const subject = encodeURIComponent(`[ENGZ 문의] ${name}`);
    const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n${message}`);
    window.location.href = `mailto:imhen97@eng-z.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#why-engz" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              소개
            </a>
            <a href="#features" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              기능
            </a>
            <a href="#for-teachers" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              선생님
            </a>
            <a href="#contact" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              문의
            </a>
            <a
              href={APP_URL} target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all hover:-translate-y-0.5"
            >
              시작하기
            </a>
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-100 animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#why-engz" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                소개
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                기능
              </a>
              <a href="#for-teachers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                선생님
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                문의
              </a>
              <a
                href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-white bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] px-5 py-2.5 rounded-full text-center"
              >
                시작하기
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[100vh] overflow-hidden bg-white">
        {/* Left Circle */}
        <div ref={leftCircleRef} className="absolute top-[-30%] left-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C] shadow-2xl" />
        </div>

        {/* Right Circle */}
        <div ref={rightCircleRef} className="absolute top-[-30%] right-[-30%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none transition-transform duration-100 will-change-transform">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B4A] via-[#FF7A5C] to-[#FF8A6C] shadow-2xl" />
        </div>

        {/* Hero Content */}
        <div ref={heroContentRef} className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center will-change-[opacity] transition-opacity duration-100">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-gray-800 mb-4 sm:mb-6 leading-tight">
              Welcome to ENGZ
            </h1>

            <p className="text-lg sm:text-2xl text-gray-700 mb-3 sm:mb-4 animate-fade-in-up animation-delay-100">
              1:1 수업 관리 플랫폼
            </p>

            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              수업을 더 스마트하게 관리할 준비가 되셨나요?
            </p>

            <div className="animate-fade-in-up animation-delay-300">
              <a
                href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-block text-lg sm:text-xl px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white hover:from-[#FF6B4A] hover:to-[#FF8A6C] shadow-2xl hover:scale-105 transition-all font-bold"
              >
                수업 시작하기 &rarr;
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

      {/* ===== WHY ENGZ SECTION ===== */}
      <section id="why-engz" className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-[#FF5C39]">ENGZ</span>를 선택하는 이유
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              선생님이 수업에만 집중할 수 있도록, 나머지는 ENGZ가 합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyEngzCards.map((card, index) => (
              <div
                key={card.title}
                className={`animate-on-scroll animation-delay-${(index + 1) * 100} group`}
              >
                <div className="h-full border-0 shadow-2xl rounded-[40px] overflow-hidden bg-white hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2.5">
                  <div className="p-10">
                    <div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    >
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

      {/* ===== FEATURES GRID SECTION ===== */}
      <section id="features" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              수업에 필요한 <span className="text-[#FF5C39]">모든 것</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              현대적인 수업 관리를 위한 완벽한 플랫폼
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresGrid.map((feature, index) => (
              <div
                key={feature.title}
                className={`animate-on-scroll-scale animation-delay-${(index % 3) * 100}`}
              >
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

      {/* ===== FOR TEACHERS SECTION ===== */}
      <section id="for-teachers" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-[#FF5C39]">선생님</span>을 위한 강력한 도구
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500">
              영어 과외 선생님의 학생 관리를 쉽고 효율적으로
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Card */}
            <div className="animate-on-scroll-left">
              <div className="border-0 shadow-2xl rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-50 to-white">
                <div className="p-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF5C39] to-[#FF6B4A] flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">학생 관리 시스템</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed mb-6">
                    모든 학생의 진도, 숙제, 출석을 한눈에 파악하고 관리하세요.
                  </p>
                  <ul className="space-y-3">
                    {teacherManagement.map((item) => (
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

            {/* Right Card */}
            <div className="animate-on-scroll-right">
              <div className="border-0 shadow-2xl rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-50 to-white">
                <div className="p-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A5C] to-[#FF8A6C] flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">스마트 수업 보조</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed mb-6">
                    AI가 자동으로 테스트를 생성하고 학생의 영작을 교정해드립니다.
                  </p>
                  <ul className="space-y-3">
                    {smartTeaching.map((item) => (
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
              href={APP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block text-lg sm:text-xl px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white hover:from-[#FF6B4A] hover:to-[#FF8A6C] shadow-2xl hover:scale-105 transition-all font-bold"
            >
              선생님으로 시작하기 &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C39] via-[#FF6B4A] to-[#FF7A5C]" />

        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl animate-blob-1" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-orange-200 blur-3xl animate-blob-2" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
              수업을 바꿀 준비가<br />되셨나요?
            </h2>
            <p className="text-lg sm:text-2xl mb-8 sm:mb-12 text-white/90">
              지금 ENGZ와 함께 더 나은 수업을 만들어 보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block text-base sm:text-xl px-8 py-4 sm:py-5 rounded-full bg-white text-gray-900 shadow-2xl hover:scale-105 transition-all font-bold text-center"
              >
                무료 체험 시작하기
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto inline-block text-base sm:text-xl px-8 py-4 sm:py-5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#FF5C39] shadow-2xl hover:scale-105 transition-all font-bold text-center"
              >
                더 알아보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD SECTION ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">앱으로 더 편하게</h2>
            <p className="text-zinc-500 mb-10">설치하면 앱처럼 바로 수업을 시작할 수 있어요</p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {/* Desktop */}
              <a href="https://app.eng-z.com" target="_blank" rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🖥️</div>
                <h3 className="font-bold text-zinc-800 mb-1">데스크톱</h3>
                <p className="text-xs text-zinc-400 mb-3">Chrome에서 설치</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>

              {/* iOS */}
              <a href="https://app.eng-z.com" target="_blank" rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-zinc-800 mb-1">iPhone / iPad</h3>
                <p className="text-xs text-zinc-400 mb-3">Safari → 공유 → 홈 화면에 추가</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>

              {/* Android */}
              <a href="https://app.eng-z.com" target="_blank" rel="noopener noreferrer"
                className="group p-6 rounded-2xl border-2 border-zinc-100 hover:border-[#FF5C39] hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-bold text-zinc-800 mb-1">Android</h3>
                <p className="text-xs text-zinc-400 mb-3">Chrome → 설치 배너 자동</p>
                <span className="text-xs font-semibold text-[#FF5C39] group-hover:underline">열기 →</span>
              </a>
            </div>

            <p className="text-xs text-zinc-300 mt-8">앱 스토어 없이 브라우저에서 바로 설치 · 자동 업데이트 · 무료</p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">문의하기</h2>
            <p className="text-zinc-500 text-center mb-10">궁금한 점이 있으신가요? 편하게 연락주세요.</p>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {/* Phone */}
              <div className="rounded-3xl border-2 border-zinc-100 hover:border-[#FF5C39] transition-all bg-white">
                <div className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#FF5C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">전화 문의</h3>
                  <a href="tel:010-7566-2391" className="text-sm text-zinc-500 hover:text-[#FF5C39] transition-colors">
                    010-7566-2391
                  </a>
                </div>
              </div>

              {/* Email */}
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

              {/* KakaoTalk */}
              <div className="rounded-3xl border-2 border-zinc-100 hover:border-[#FF5C39] transition-all bg-white">
                <div className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#FF5C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">카카오톡</h3>
                  <p className="text-sm text-zinc-500">@engz_korea</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl border-2 border-orange-100 bg-white shadow-lg">
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">바로 메일 보내기</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="궁금한 점을 자유롭게 적어주세요."
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
                    {sent ? "메일 앱이 열렸습니다" : "메일 보내기"}
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
    </div>
  );
}
