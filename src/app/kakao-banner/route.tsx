import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// 카카오톡 게시물용 세로 배너 (1080×1350, 4:5).
// 페이지 hero와 동일한 오렌지 톤 + Welcome to ENGZ 카피로 일관성.
// /opengraph-image (1200×630)와는 별도 — OG는 SNS 링크 프리뷰 비율 고정.

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const fontDir = path.join(process.cwd(), "src/app/_fonts");
  const [outfitBlack, notoBold] = await Promise.all([
    readFile(path.join(fontDir, "outfit-900-sub.ttf")),
    readFile(path.join(fontDir, "noto-kr-700-sub.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg, #FF5C39 0%, #FF6B4A 50%, #FF7A5C 100%)",
          position: "relative",
        }}
      >
        {/* 우상단 흰 글로우 */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -260,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)",
            display: "flex",
          }}
        />
        {/* 좌하단 따뜻한 글로우 */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -220,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,180,140,0.34) 0%, rgba(255,180,140,0) 70%)",
            display: "flex",
          }}
        />

        {/* 상단: 로고 */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 24,
              color: "#FF5C39",
            }}
          >
            E
          </div>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 28,
              color: "#FFFFFF",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            ENGZ
          </div>
        </div>

        {/* 우상단 신뢰 배지 */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 60,
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 16,
            color: "#FFFFFF",
            letterSpacing: 0.5,
            display: "flex",
            padding: "10px 22px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: 999,
          }}
        >
          비즈니스 영어 1위
        </div>

        {/* 메인: Welcome to */}
        <div
          style={{
            fontFamily: "Outfit",
            fontWeight: 900,
            fontSize: 80,
            color: "#1A1A1A",
            letterSpacing: -2,
            lineHeight: 1,
            display: "flex",
            marginBottom: 16,
          }}
        >
          Welcome to
        </div>

        {/* 메인: ENGZ 거대 워드마크 */}
        <div
          style={{
            fontFamily: "Outfit",
            fontWeight: 900,
            fontSize: 240,
            color: "#FFFFFF",
            letterSpacing: -8,
            lineHeight: 1,
            display: "flex",
            textShadow: "0 8px 36px rgba(0,0,0,0.20)",
          }}
        >
          ENGZ
        </div>

        {/* 한글 메인 태그라인 */}
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 36,
            color: "#FFFFFF",
            letterSpacing: -0.8,
            display: "flex",
            marginTop: 56,
            textAlign: "center",
          }}
        >
          1:1 맞춤형 커리큘럼
        </div>
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 36,
            color: "#FFFFFF",
            letterSpacing: -0.8,
            display: "flex",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          체계적인 맞춤 교육 시스템
        </div>

        {/* 한글 서브 — 신뢰 라인 */}
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 20,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: -0.3,
            display: "flex",
            marginTop: 28,
          }}
        >
          9년차 검증 강사 김해나
        </div>

        {/* 하단 CTA pill */}
        <div
          style={{
            position: "absolute",
            bottom: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 44px",
            background: "#FFFFFF",
            borderRadius: 999,
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 24,
            color: "#FF5C39",
            letterSpacing: -0.3,
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          }}
        >
          무료 영어 진단 받기 →
        </div>

        {/* 하단 도메인 */}
        <div
          style={{
            position: "absolute",
            bottom: 70,
            fontFamily: "Outfit",
            fontWeight: 900,
            fontSize: 18,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 5,
            display: "flex",
          }}
        >
          ENG-Z.COM
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        { name: "Outfit", data: outfitBlack, weight: 900, style: "normal" },
        { name: "Noto Sans KR", data: notoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
