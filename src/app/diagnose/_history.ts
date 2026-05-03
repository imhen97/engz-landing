// 진단 히스토리 — localStorage 기반 (DB 없이 클라이언트만으로 충분).
// 5개까지 보관, 가장 오래된 게 밀려남 (LRU).
// 재진단 회수 마찰 줄이는 용도 + 본인 진척 추적.

const KEY = "engz:diagnose:history:v1";
const MAX = 5;

export interface HistoryEntry {
  score: number;
  topPercent: number;
  level: string; // CEFR
  encoded: string; // 결과 페이지 URL을 재구성할 수 있는 base64url payload
  ts: number;
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is HistoryEntry =>
        typeof e?.score === "number" &&
        typeof e?.encoded === "string" &&
        typeof e?.ts === "number"
    );
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: HistoryEntry): void {
  if (typeof window === "undefined") return;
  try {
    const cur = loadHistory();
    // 같은 ts 중복 방지 (1초 내)
    const filtered = cur.filter((e) => Math.abs(e.ts - entry.ts) > 1000);
    const next = [entry, ...filtered].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // localStorage quota / private mode — 무시
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
