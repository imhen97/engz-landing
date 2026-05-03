import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SchemaMarkup } from "./components/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eng-z.com"),
  title: "김해나 1:1 프리미엄 영어 | 9년차 비즈니스 영어 1위 강사",
  description:
    "자체 개발 AI 수업 시스템으로 1:1 맞춤 커리큘럼·교안 자동 생성. 대표·임원·전문직이 선택한 프리미엄 영어. 9년차 검증 강사 김해나.",
  keywords: [
    "1:1 영어 과외",
    "프리미엄 영어 과외",
    "비즈니스 영어 1:1",
    "임원 영어 과외",
    "대표 영어 과외",
    "1:1 맞춤 영어",
    "OPIc 1:1",
    "IELTS 1:1",
    "김해나 영어",
    "AI 영어 과외",
    "스마트 영어 수업",
    "프라이빗 영어 강사",
    "잉즈",
    "ENGZ",
  ],
  authors: [{ name: "김해나" }],
  creator: "김해나",
  publisher: "ENGZ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.eng-z.com",
  },
  openGraph: {
    title: "김해나 1:1 프리미엄 영어 | 9년차 비즈니스 영어 1위 강사",
    description:
      "자체 개발 AI 수업 시스템으로 1:1 맞춤 커리큘럼·교안 자동 생성. 대표·임원·전문직이 선택한 프리미엄 영어.",
    url: "https://www.eng-z.com",
    siteName: "ENGZ - 김해나 1:1 프리미엄 영어",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "김해나 1:1 프리미엄 영어",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김해나 1:1 프리미엄 영어 | 9년차 비즈니스 영어 1위 강사",
    description:
      "자체 개발 AI 수업 시스템 + 9년차 검증 강사. 대표·임원·전문직 전용 1:1 프리미엄 영어.",
    images: ["/og-image.png"],
  },
  // 검색엔진 인증.
  // Naver: HTML 파일 방식(naver2150562d9ace8df800e3d6896e1ba82a.html)으로 이미
  // 인증 완료 — 메타태그로도 이중 검증해서 어느 한쪽만으로 verification이
  // fail해도 다른 쪽이 받쳐주게. Google 인증 코드는 search.google.com/
  // search-console에서 받아서 채우면 됨.
  verification: {
    // google: "여기에_구글_인증코드",
    other: {
      "naver-site-verification": "2150562d9ace8df800e3d6896e1ba82a",
    },
  },
  other: {
    naverbot: "index, follow",
    yeti: "index, follow",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF5C39",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-white text-zinc-900">
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}
