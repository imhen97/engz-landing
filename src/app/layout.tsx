import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENGZ - 1:1 수업 관리 플랫폼",
  description:
    "선생님과 학생을 위한 올인원 수업 관리 플랫폼. 스케줄, 교재, 피드백, 수강료까지 ENGZ 하나로.",
  keywords: ["과외", "수업 관리", "1:1 수업", "과외 관리", "ENGZ", "잉즈", "튜터링"],
  openGraph: {
    title: "ENGZ - 1:1 수업 관리 플랫폼",
    description:
      "선생님과 학생을 위한 올인원 수업 관리 플랫폼",
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
