import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENGZ - 영어 수업 관리 플랫폼",
  description:
    "선생님과 학생을 위한 올인원 영어 수업 관리 플랫폼. 실시간 교정, 스케줄 관리, 학습 리포트까지.",
  keywords: ["영어", "과외", "수업 관리", "영어 수업", "ENGZ", "잉즈"],
  openGraph: {
    title: "ENGZ - 영어 수업 관리 플랫폼",
    description:
      "선생님과 학생을 위한 올인원 영어 수업 관리 플랫폼",
    type: "website",
    url: "https://eng-z.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-white text-zinc-900">{children}</body>
    </html>
  );
}
