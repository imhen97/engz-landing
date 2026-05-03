import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  AXIS_KO,
  levelFromScore,
  type Axis,
  type Level,
} from "../../diagnose/_data";

// 진단 결과 인증서 이미지 — EF SET 패턴.
// /api/result-image?r=<base64url payload> → 1080×1350 (kakao 게시물 비율) PNG.
//
// 사용처:
//   - 결과 페이지에서 다운로드 / 카톡 공유
//   - 본인 인증보다는 conversion 도구 ("나 이만큼 받았다") 가치가 큼

export const runtime = "nodejs";

const BRAND = "#FF5C39";

interface PayloadV1 {
  v: 1;
  t: number;
  a: Record<Axis, number>;
  ts: number;
}
interface PayloadV2 {
  v: 2;
  t: number;
  a: Record<Axis, number>;
  l: Level;
  ts: number;
}
type Payload = PayloadV1 | PayloadV2;

function decodeFromQuery(s: string | null): Payload | null {
  if (!s) return null;
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "===".slice((b64.length + 3) % 4);
    const json = Buffer.from(padded, "base64").toString("utf-8");
    const obj = JSON.parse(json);
    if (obj.v === 1 || obj.v === 2) return obj as Payload;
    return null;
  } catch {
    return null;
  }
}

function erf(x: number): number {
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741;
  const a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}
function topPercent(score: number): number {
  const z = (score - 58) / 16;
  const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
  return Math.max(0.5, Math.min(99.5, (1 - cdf) * 100));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const data = decodeFromQuery(url.searchParams.get("r"));
  if (!data) {
    return new Response("invalid r param", { status: 400 });
  }

  const fontDir = path.join(process.cwd(), "src/app/_fonts");
  const [outfitBlack, notoBold] = await Promise.all([
    readFile(path.join(fontDir, "outfit-900-sub.ttf")),
    readFile(path.join(fontDir, "noto-kr-700-sub.ttf")),
  ]);

  const level = levelFromScore(data.t);
  const top = topPercent(data.t);
  const topLabel =
    top < 5 ? `상위 ${top.toFixed(1)}%` : `상위 ${Math.round(top)}%`;

  // 5축 데이터 — 차트
  const axes = (Object.keys(AXIS_KO) as Axis[]).map((k) => ({
    key: k,
    label: AXIS_KO[k],
    val: data.a[k] ?? 0,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          position: "relative",
          padding: "60px 56px",
        }}
      >
        {/* 상단 brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: BRAND,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 20,
              color: "#FFFFFF",
            }}
          >
            E
          </div>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 22,
              color: "#0A0A0A",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            ENGZ
          </div>
          <div style={{ flex: 1, display: "flex" }} />
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 500,
              fontSize: 14,
              color: "#A1A1AA",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            DIAGNOSIS
          </div>
        </div>

        {/* 점수 */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 220,
              color: BRAND,
              lineHeight: 1,
              letterSpacing: -8,
              display: "flex",
            }}
          >
            {data.t}
          </div>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 36,
              color: "#A1A1AA",
              display: "flex",
            }}
          >
            / 100
          </div>
        </div>

        {/* CEFR + 한글 레벨 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 16,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              background: "#0A0A0A",
              color: "#FFFFFF",
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 1.5,
              borderRadius: 999,
              display: "flex",
            }}
          >
            CEFR {level.cefr}
          </div>
          <div
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              fontSize: 28,
              color: "#0A0A0A",
              display: "flex",
            }}
          >
            {level.korean}
          </div>
        </div>

        {/* 백분위 */}
        <div
          style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "#FFF5F0",
            border: `2px solid ${BRAND}`,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 36,
              color: BRAND,
              display: "flex",
            }}
          >
            {topLabel}
          </div>
          <div
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              fontSize: 18,
              color: "#0A0A0A",
              display: "flex",
            }}
          >
            한국 직장인 영어 학습자 중
          </div>
        </div>

        {/* 5축 차트 */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {axes.map((ax) => (
            <div
              key={ax.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 100,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#0A0A0A",
                  display: "flex",
                }}
              >
                {ax.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 12,
                  background: "#F4F4F5",
                  borderRadius: 999,
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `${ax.val}%`,
                    height: "100%",
                    background:
                      ax.val >= 80
                        ? "#10B981"
                        : ax.val >= 60
                        ? BRAND
                        : ax.val >= 40
                        ? "#F59E0B"
                        : "#EF4444",
                    borderRadius: 999,
                    display: "flex",
                  }}
                />
              </div>
              <div
                style={{
                  width: 50,
                  textAlign: "right",
                  fontFamily: "Outfit",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#0A0A0A",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {ax.val}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 56,
            right: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              fontSize: 22,
              color: "#0A0A0A",
              display: "flex",
            }}
          >
            김해나 1:1 프리미엄 영어
          </div>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 18,
              color: BRAND,
              letterSpacing: 4,
              display: "flex",
            }}
          >
            ENG-Z.COM
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        { name: "Outfit", data: outfitBlack, weight: 900, style: "normal" },
        {
          name: "Noto Sans KR",
          data: notoBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
