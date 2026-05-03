import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5분 영어 진단 — ENGZ 김해나 1:1 프리미엄 영어",
  description:
    "객관식·주관식·듣기·스피킹 4영역 20문제로 영어 레벨을 정밀 진단해드려요. 5축 분석 리포트 + 김해나 강사의 1:1 맞춤 학습 방향 제안.",
  alternates: {
    canonical: "https://www.eng-z.com/diagnose",
  },
  openGraph: {
    title: "5분 영어 진단 — ENGZ",
    description:
      "객관식·주관식·듣기·스피킹 20문제 · 5축 정밀 분석 · 회원가입 불필요",
    url: "https://www.eng-z.com/diagnose",
    type: "website",
  },
};

export default function DiagnoseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
