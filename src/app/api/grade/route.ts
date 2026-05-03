import { NextRequest, NextResponse } from "next/server";

// AI 채점 프록시.
// 브라우저에서 직접 Anthropic API를 호출하면 (1) CORS, (2) API key 노출,
// (3) 401 인증 실패. 따라서 서버에서 프록시하는 게 정도(正道).
//
// 환경변수: ANTHROPIC_API_KEY (Vercel project settings에서 설정)
// 누락 시: 키워드 매칭 fallback으로 동작 (정확도는 떨어지지만 진단 자체는 작동).

export const runtime = "nodejs";

interface GradeRequest {
  type: "sa" | "sp";
  question: string;
  expected?: string[]; // 주관식 정답 키워드
  rubric?: string; // 스피킹 채점 기준
  studentAnswer: string;
}

interface GradeResponse {
  result: "pass" | "partial" | "fail";
  score: 0 | 0.5 | 1;
  feedback_ko: string;
  source: "ai" | "fallback";
}

const SYSTEM_PROMPT_SA = `당신은 영어 강사예요. 학생의 주관식 답변을 평가하세요.
오타·대소문자·자연스러운 동의어·합리적 paraphrase는 정답으로 인정하세요.
부분적으로 맞으면 partial, 의도가 통하지 않으면 fail.

응답은 JSON 한 덩어리로만:
{
  "result": "pass" | "partial" | "fail",
  "score": 1 | 0.5 | 0,
  "feedback_ko": "한국어로 2문장 이내 — 잘한 점 + 개선점 짧게"
}`;

const SYSTEM_PROMPT_SP = `당신은 영어 스피킹 코치예요. 학생의 발화 transcript를 평가하세요.
평가 축: relevance(주제 관련성), vocabulary, grammar, fluency(transcript에 보이는 머뭇거림·반복 등으로 추정).

응답은 JSON 한 덩어리로만:
{
  "result": "pass" | "partial" | "fail",
  "score": 1 | 0.5 | 0,
  "feedback_ko": "한국어로 2-3문장 — 잘한 점 + 구체적 개선점"
}`;

async function gradeWithAI(req: GradeRequest): Promise<GradeResponse | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const system = req.type === "sa" ? SYSTEM_PROMPT_SA : SYSTEM_PROMPT_SP;
  const user =
    req.type === "sa"
      ? `Question: "${req.question}"
Expected answer keywords: ${req.expected?.join(", ") || "N/A"}
Student answer: "${req.studentAnswer}"`
      : `Speaking task prompt: "${req.question}"
Rubric: "${req.rubric || ""}"
Student transcript: "${req.studentAnswer}"`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    // JSON 추출 — 모델이 가끔 ```json 코드블록으로 감쌈
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    const result =
      parsed.result === "pass" || parsed.result === "fail"
        ? parsed.result
        : "partial";
    const score: 0 | 0.5 | 1 =
      parsed.score === 1 ? 1 : parsed.score === 0 ? 0 : 0.5;
    return {
      result,
      score,
      feedback_ko: String(parsed.feedback_ko || "").slice(0, 240),
      source: "ai",
    };
  } catch {
    return null;
  }
}

function gradeWithKeywords(req: GradeRequest): GradeResponse {
  if (req.type === "sa") {
    const expected = req.expected || [];
    const lower = req.studentAnswer.toLowerCase();
    const hit = expected.some((k) => lower.includes(k.toLowerCase()));
    if (hit) {
      return {
        result: "pass",
        score: 1,
        feedback_ko: "정답으로 인정돼요. 핵심 표현이 잘 들어갔어요.",
        source: "fallback",
      };
    }
    return {
      result: "fail",
      score: 0,
      feedback_ko:
        "기대했던 표현이 없네요. 해설을 참고해서 비슷한 문장을 다시 만들어보세요.",
      source: "fallback",
    };
  }
  // sp fallback — transcript 길이 기반 추정
  const len = req.studentAnswer.trim().split(/\s+/).filter(Boolean).length;
  if (len >= 12) {
    return {
      result: "pass",
      score: 1,
      feedback_ko: "충분히 발화했어요. 다음 단계로 갑시다.",
      source: "fallback",
    };
  }
  if (len >= 4) {
    return {
      result: "partial",
      score: 0.5,
      feedback_ko: "조금 더 길게 답해보면 좋아요. 문장 2~3개로 풀어보세요.",
      source: "fallback",
    };
  }
  return {
    result: "fail",
    score: 0,
    feedback_ko: "음성이 짧거나 인식이 약했어요. 다시 한번 시도해 보세요.",
    source: "fallback",
  };
}

export async function POST(req: NextRequest) {
  let body: GradeRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (
    !body ||
    (body.type !== "sa" && body.type !== "sp") ||
    typeof body.studentAnswer !== "string"
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  // AI 채점 시도 → 실패하면 키워드 fallback
  const ai = await gradeWithAI(body);
  const result = ai ?? gradeWithKeywords(body);
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
