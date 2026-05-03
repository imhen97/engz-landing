import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Next.js App Router auto-route: /opengraph-image
// Used by KakaoTalk, Facebook, LinkedIn, Slack, etc. as og:image.
// Twitter has its own (twitter-image.tsx) sharing the same render.
//
// Runtime: nodejs (not edge) — Turbopack can't load .ttf imports, and edge
// fetch of Google Fonts CSS API is unreliable (UA override prevents getting
// non-WOFF2). Reading bundled subset fonts via fs.readFile is the simplest
// reliable path. ~14KB of font data, single-digit ms read.

export const runtime = "nodejs";
export const alt = "ENGZ — 김해나 1:1 프리미엄 영어";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* 미세한 라디얼 글로우 — 따뜻한 오렌지 한 점만 */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,92,57,0.18) 0%, rgba(255,92,57,0) 70%)",
            display: "flex",
          }}
        />

        {/* 좌상단: 작은 wordmark + 신뢰 라인 */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#FF5C39",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 22,
              color: "#FAFAFA",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            ENGZ
          </div>
        </div>

        {/* 우상단: 메타 라인 */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 56,
            fontFamily: "Outfit",
            fontWeight: 500,
            fontSize: 16,
            color: "#A1A1AA",
            letterSpacing: 2,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Premium 1:1 English
        </div>

        {/* 중앙: 거대한 wordmark */}
        <div
          style={{
            fontFamily: "Outfit",
            fontWeight: 900,
            fontSize: 260,
            color: "#FAFAFA",
            letterSpacing: -10,
            lineHeight: 1,
            display: "flex",
          }}
        >
          ENGZ
        </div>

        {/* 얇은 오렌지 구분선 */}
        <div
          style={{
            width: 64,
            height: 3,
            background: "#FF5C39",
            marginTop: 32,
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* 한글 메인 태그라인 */}
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 44,
            color: "#FAFAFA",
            letterSpacing: -1,
            display: "flex",
          }}
        >
          1:1 프리미엄 영어
        </div>

        {/* 한글 서브 태그라인 */}
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 500,
            fontSize: 22,
            color: "#A1A1AA",
            letterSpacing: -0.5,
            marginTop: 14,
            display: "flex",
          }}
        >
          9년차 검증 강사 · 대표 · 임원 · 전문직 1:1
        </div>

        {/* 하단 우측: 도메인 */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 56,
            fontFamily: "Outfit",
            fontWeight: 900,
            fontSize: 14,
            color: "#525252",
            letterSpacing: 4,
            display: "flex",
          }}
        >
          ENG-Z.COM
        </div>

        {/* 하단 좌측: 김해나 */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 56,
            fontFamily: "Noto Sans KR",
            fontWeight: 500,
            fontSize: 14,
            color: "#525252",
            letterSpacing: 1,
            display: "flex",
          }}
        >
          김해나
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: outfitBlack, weight: 900, style: "normal" },
        { name: "Noto Sans KR", data: notoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
