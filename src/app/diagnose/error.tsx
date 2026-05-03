"use client";

// /diagnose 라우트 전용 error boundary.
// Next.js App Router 컨벤션 — 페이지 컴포넌트에서 throw하면 자동으로 표시.
// silent fail (백색 화면) 방지 + 사용자에게 "재시작" 옵션 제공.
//
// 과거 정적 diagnostic.html에서 syntax error 한 줄로 onclick 전부 죽었던
// 사례 재발 방지 — Next.js + React error boundary로 잡힘.

export default function DiagnoseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[100dvh] bg-white grid place-items-center px-6 text-center">
      <div className="max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">진단 중 문제가 생겼어요</h1>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          잠깐의 네트워크 / 마이크 권한 이슈일 수 있어요. 다시 시작해보세요.
          <br />
          반복되면 카카오톡 채널로 알려주시면 바로 잡을게요.
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={reset}
            className="rounded-xl bg-[#FF5C39] px-6 py-3.5 text-sm font-bold text-white"
          >
            다시 시도하기
          </button>
          <a
            href="/diagnose"
            className="rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700"
          >
            진단 처음부터
          </a>
          <a
            href="https://pf.kakao.com/_engz_korea"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 mt-2 hover:text-zinc-600 transition-colors"
          >
            문제 신고하기 →
          </a>
        </div>
        {error.digest && (
          <div className="mt-6 text-[10px] text-zinc-300 font-mono">
            error: {error.digest}
          </div>
        )}
      </div>
    </main>
  );
}
