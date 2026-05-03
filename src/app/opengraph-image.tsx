import { ImageResponse } from "next/og";

// Next.js App Router auto-route: /opengraph-image
// Used by KakaoTalk, Facebook, LinkedIn, Slack, etc. as og:image.
// Twitter has its own (twitter-image.tsx) sharing the same render.

export const runtime = "edge";
export const alt = "ENGZ — 김해나 1:1 프리미엄 영어";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Google Fonts API returns TTF (Satori-compatible) when called with an old UA
// that doesn't advertise woff2 support. Subset Korean text via &text= so the
// downloaded font is small (a few KB instead of 1MB+ for full Noto KR).
const TTF_UA =
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";

async function loadFont(
  family: string,
  weight: number,
  text?: string
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
    display: "swap",
  });
  if (text) params.set("text", text);
  const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": TTF_UA },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error(`Font URL not found in CSS for ${family}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function OGImage() {
  // 한글 서브셋 — OG 이미지에 실제로 들어가는 글자만
  const koreanText = "1:프리미엄영어년차검증강사대표임원전문직1맞춤";

  const [outfitBlack, outfitMed, notoBold, notoMed] = await Promise.all([
    loadFont("Outfit", 900),
    loadFont("Outfit", 500),
    loadFont("Noto+Sans+KR", 700, koreanText),
    loadFont("Noto+Sans+KR", 500, koreanText),
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
        { name: "Outfit", data: outfitMed, weight: 500, style: "normal" },
        {
          name: "Noto Sans KR",
          data: notoBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Noto Sans KR",
          data: notoMed,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
