"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const APP_URL = "https://app.eng-z.com/login";

const features = [
  {
    emoji: "📋",
    title: "수업 보드",
    desc: "실시간 교정, 표현 기록, 피드백을 한 화면에서",
  },
  {
    emoji: "📅",
    title: "스케줄 관리",
    desc: "정기 수업 자동 생성, 드래그로 일정 변경",
  },
  {
    emoji: "📊",
    title: "학습 리포트",
    desc: "출석률, 교정 추이, 실력 변화를 한눈에",
  },
  {
    emoji: "📚",
    title: "교재 관리",
    desc: "PDF, 링크, 텍스트 교재를 수업에 바로 연결",
  },
  {
    emoji: "💰",
    title: "수강료 관리",
    desc: "학생별 결제 현황과 청구를 간편하게",
  },
  {
    emoji: "🔗",
    title: "초대 링크",
    desc: "링크 하나로 학생 초대, 가입부터 연결까지 자동",
  },
];

const steps = [
  {
    num: "01",
    title: "선생님이 초대 링크를 공유해요",
    desc: "간단한 링크 하나로 학생을 수업에 초대할 수 있어요.",
  },
  {
    num: "02",
    title: "학생이 가입하고 수업에 참여해요",
    desc: "복잡한 절차 없이, 링크를 클릭하면 바로 연결돼요.",
  },
  {
    num: "03",
    title: "수업 보드에서 함께 영어를 배워요",
    desc: "실시간 교정과 피드백으로 효과적인 수업이 시작돼요.",
  },
];

const teacherFeatures = [
  "학생 관리 대시보드",
  "수업 중 실시간 교정 노트",
  "교재 업로드 및 관리",
  "수강료 자동 청구",
];

const studentFeatures = [
  "나의 학습 리포트",
  "수업 교정 기록 복습",
  "숙제 관리",
  "단어장",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-200 group-hover:shadow-orange-300 transition-shadow">
              E
            </div>
            <span className="font-bold text-lg text-zinc-900">ENGZ</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              기능
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              사용법
            </a>
            <a
              href={APP_URL}
              className="text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all hover:-translate-y-0.5"
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
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                기능
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                사용법
              </a>
              <a
                href={APP_URL}
                className="text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 rounded-full text-center"
              >
                시작하기
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-50 to-amber-50 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-24 pb-20">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="text-base">📚</span>
            해나쌤과 함께하는 영어 수업
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up animation-delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            영어 수업,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              더 스마트하게
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-200 text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            선생님과 학생을 위한 올인원 영어 수업 관리 플랫폼.
            <br className="hidden sm:block" />
            수업 준비부터 복습까지, ENGZ 하나로 충분해요.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={APP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 transition-all"
            >
              수업 시작하기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href={APP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-zinc-200 text-zinc-700 font-semibold px-8 py-4 rounded-full text-lg hover:border-orange-300 hover:text-orange-600 hover:-translate-y-0.5 transition-all"
            >
              선생님으로 시작
            </a>
          </div>

          {/* Floating illustration */}
          <div className="animate-fade-in-up animation-delay-500 mt-16 flex justify-center">
            <div className="animate-float relative bg-white rounded-2xl shadow-2xl shadow-zinc-200/60 border border-zinc-100 p-6 sm:p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-zinc-400 font-mono">ENGZ Board</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-400 line-through">&quot;I have went there yesterday.&quot;</p>
                    <p className="text-sm text-zinc-800 font-medium">&quot;I went there yesterday.&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-400 line-through">&quot;She don&apos;t like coffee.&quot;</p>
                    <p className="text-sm text-zinc-800 font-medium">&quot;She doesn&apos;t like coffee.&quot;</p>
                  </div>
                </div>
                <div className="h-px bg-zinc-100 my-2" />
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">교정 2건</span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">표현 습득 중</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-zinc-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-orange-500 tracking-wide uppercase mb-3">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              수업에 필요한 모든 것
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              복잡한 수업 관리, ENGZ가 심플하게 해결해 드릴게요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-6 border border-zinc-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-orange-500 tracking-wide uppercase mb-3">
              How it Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              3단계로 시작하세요
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              가입부터 수업까지, 놀라울 만큼 간단해요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-orange-200 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-xl mb-6 shadow-lg shadow-orange-200">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Teachers / For Students */}
      <section className="py-24 sm:py-32 bg-zinc-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-orange-500 tracking-wide uppercase mb-3">
              For Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              선생님도, 학생도
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              각자에게 딱 맞는 기능으로 수업에 집중할 수 있어요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Teacher Card */}
            <div className="bg-white rounded-2xl p-8 border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <span>👩‍🏫</span> 선생님에게
              </div>
              <ul className="space-y-4">
                {teacherFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-zinc-700">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Card */}
            <div className="bg-white rounded-2xl p-8 border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <span>🎓</span> 학생에게
              </div>
              <ul className="space-y-4">
                {studentFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-zinc-700">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl px-8 py-16 sm:px-16 sm:py-20 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-orange-100 text-lg mb-8 max-w-md mx-auto">
                ENGZ와 함께 더 나은 영어 수업을 만들어 보세요.
              </p>
              <a
                href={APP_URL}
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                무료로 시작하기
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="font-bold text-zinc-900">ENGZ</span>
              <span className="text-zinc-400 text-sm ml-1">&copy; 2025</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-900 transition-colors">
                서비스 이용약관
              </a>
              <a href="#" className="hover:text-zinc-900 transition-colors">
                개인정보 처리방침
              </a>
              <a
                href="mailto:imhen97@gmail.com"
                className="hover:text-zinc-900 transition-colors"
              >
                imhen97@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
