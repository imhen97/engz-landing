"use client";

import { useEffect, useState } from "react";
import { AXIS_KO, AXIS_DESC, levelFromScore, type Axis } from "../_data";

/* ENGZ 진단 결과 페이지.
 * URL: /diagnose/result?r=<base64url-encoded payload>
 * Payload (decoded JSON): { v:1, t:number, a:Record<Axis,number>, ts:number }
 *
 * 디자인 결정:
 *  - 클라이언트 디코드만으로 충분 (DB 무관) — Preply / EF SET 패턴.
 *  - 인코딩은 base64url, 평균 130자 안쪽 — 카톡 공유 OK.
 *  - 5축 한글 라벨 (의사소통·발음·문법·유창성·이해력) — CEFR 약어보다
 *    한국 임원/대표층에 잘 읽힘 (RESEARCH 결론).
 */

const BRAND = "#FF5C39";

interface ResultPayload {
  v: number;
  t: number;
  a: Record<Axis, number>;
  ts: number;
}

function decodeResult(s: string | null): ResultPayload | null {
  if (!s) return null;
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "===".slice((b64.length + 3) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    const obj = JSON.parse(json) as ResultPayload;
    if (obj.v !== 1) return null;
    return obj;
  } catch {
    return null;
  }
}

export default function ResultPage() {
  const [data, setData] = useState<ResultPayload | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decoded = decodeResult(params.get("r"));
    setData(decoded);
    setShareUrl(window.location.href);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="min-h-[100dvh] bg-white grid place-items-center">
        <div className="text-sm text-zinc-400">결과 준비 중...</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-[100dvh] bg-white grid place-items-center px-6 text-center">
        <div>
          <div className="text-2xl font-bold mb-2">결과를 찾을 수 없어요</div>
          <p className="text-zinc-500 mb-6 text-sm">
            URL이 손상됐거나 만료된 결과예요.
          </p>
          <a
            href="/diagnose"
            className="inline-block rounded-xl px-6 py-3 text-sm font-bold text-white"
            style={{ background: BRAND }}
          >
            진단 다시 받기 →
          </a>
        </div>
      </main>
    );
  }

  const level = levelFromScore(data.t);
  const axes = data.a;
  // 강점·약점: 점수 기준 top 2 / bottom 2
  const sorted = (Object.entries(axes) as [Axis, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const strengths = sorted.slice(0, 2);
  const weaknesses = sorted.slice(-2).reverse();

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ENGZ 영어 진단 결과",
          text: `내 영어 레벨은 ${level.korean} (${level.cefr}, ${data?.t}점)`,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // 사용자가 share 취소 — 무시
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("URL 복사에 실패했어요. 주소창에서 직접 복사해주세요.");
    }
  }

  return (
    <main className="min-h-[100dvh] bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        {/* 브랜드 */}
        <a
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
        >
          <span>←</span> ENGZ
        </a>

        {/* 결과 카드 */}
        <section className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-10 mb-6 shadow-sm">
          <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-3">
            Your Level
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <div
              className="text-5xl sm:text-6xl font-extrabold tracking-tight"
              style={{ color: BRAND }}
            >
              {data.t}
            </div>
            <div className="text-zinc-400 text-base">/ 100</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-block rounded-full bg-zinc-900 text-white text-xs font-bold tracking-wider uppercase px-3 py-1">
              CEFR {level.cefr}
            </span>
            <span className="text-base sm:text-lg font-bold text-zinc-900">
              {level.korean}
            </span>
          </div>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            {level.description}
          </p>
        </section>

        {/* 5축 분석 */}
        <section className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold mb-4">📊 5축 영역별 분석</h2>
          <div className="space-y-4">
            {(Object.keys(AXIS_KO) as Axis[]).map((k) => {
              const v = axes[k] ?? 0;
              return (
                <div key={k}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-semibold text-zinc-900">
                        {AXIS_KO[k]}
                      </span>
                      <span className="ml-2 text-xs text-zinc-400">
                        {AXIS_DESC[k]}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-zinc-900 tabular-nums">
                      {v}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{
                        width: `${v}%`,
                        background:
                          v >= 80
                            ? "#10B981"
                            : v >= 60
                            ? BRAND
                            : v >= 40
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 강점 + 약점 */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <section className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-3">
              ✅ 강점 영역
            </h3>
            <ul className="space-y-1.5 text-sm text-emerald-900">
              {strengths.map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between gap-2">
                  <span>{AXIS_KO[k]}</span>
                  <span className="font-bold tabular-nums">{v}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl bg-rose-50 border border-rose-200 p-5">
            <h3 className="text-sm font-bold text-rose-900 mb-3">
              ⚠️ 보강 필요
            </h3>
            <ul className="space-y-1.5 text-sm text-rose-900">
              {weaknesses.map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between gap-2">
                  <span>{AXIS_KO[k]}</span>
                  <span className="font-bold tabular-nums">{v}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 추천 다음 단계 */}
        <section className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold mb-4">🗺️ 추천 다음 단계</h2>
          <ol className="space-y-3 text-sm text-zinc-700 leading-relaxed">
            {level.recommendation.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                  style={{ background: BRAND }}
                >
                  {i + 1}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 김해나 강사 CTA */}
        <section
          className="rounded-3xl p-6 sm:p-8 mb-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, #FF7A5C 100%)`,
          }}
        >
          <div className="text-xs font-bold tracking-wider uppercase opacity-80 mb-2">
            Next Step
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
            김해나 강사가 직접 학습 방향을 제안해드려요
          </h2>
          <p className="text-sm opacity-90 leading-relaxed mb-5">
            진단 결과를 바탕으로 1:1 맞춤 커리큘럼을 설계합니다.
            <br />
            카카오톡으로 24시간 안에 답장드립니다.
          </p>
          <a
            href="https://pf.kakao.com/_engz_korea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold shadow-lg active:scale-[0.98] transition-transform"
            style={{ color: BRAND }}
          >
            카카오로 학습 상담 받기 →
          </a>
        </section>

        {/* 결과 공유 */}
        <section className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 mb-6">
          <h2 className="text-base font-bold mb-1">🔗 결과 공유</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            이 결과 페이지는 고유 URL로 저장돼요. 친구·동료에게 공유해도
            동일한 결과가 보입니다.
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs text-zinc-700 outline-none truncate"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              onClick={share}
              className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white"
            >
              {copied ? "✓ 복사됨" : "공유 / 복사"}
            </button>
          </div>
        </section>

        {/* 다시 진단 + footer */}
        <div className="text-center mt-10 mb-2">
          <a
            href="/diagnose"
            className="inline-block text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ↺ 다시 진단 받기
          </a>
        </div>
        <div className="text-center text-xs text-zinc-400 mt-4">
          ENGZ · 김해나 1:1 프리미엄 영어
          <br />
          <span className="text-zinc-300">
            결과 산출: {new Date(data.ts).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </main>
  );
}
