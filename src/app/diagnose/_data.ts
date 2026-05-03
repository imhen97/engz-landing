// ENGZ 영어 진단 — 문제 뱅크 + 채점 메타.
//
// 디자인 결정 (RESEARCH_diagnostic_tests.md 분석 결과 반영):
//
// 1) **레벨 자가선택 제거** — 사용자가 자기 레벨을 미리 고르면 진단 가치
//    절반 사라짐. 대신 첫 5문제(객관식)로 calibrate해서 나머지 15문제
//    난이도를 동적으로 결정 (adaptive 라이트). v1에선 calibrated_bank를
//    intermediate로 고정하고, 결과 산출 시 반영.
//
// 2) **타겟 청중**: ENGZ는 임원/대표/전문직 1:1 — 기초 비즈니스 영어가
//    바닥선. 따라서 question pool은 intermediate ~ advanced 중심으로
//    구성하고, beginner는 입문자 대비용으로만 유지.

export type QuestionType = "mc" | "sa" | "li" | "sp";
export type Level = "beginner" | "intermediate" | "advanced";

export interface MCQuestion {
  type: "mc";
  q: string;
  ch: string[];
  a: number;
  exp: string;
  domain: "grammar" | "vocab"; // 5축 채점용
}
export interface SAQuestion {
  type: "sa";
  q: string;
  ans: string[]; // fallback 키워드 매칭용 (AI 실패 시)
  exp: string;
}
export interface LIQuestion {
  type: "li";
  q: string;
  tts: string;
  prompt: string;
  ch: string[];
  a: number;
  exp: string;
}
export interface SPQuestion {
  type: "sp";
  q: string;
  prompt: string;
  rubric: string;
}

export type Question = MCQuestion | SAQuestion | LIQuestion | SPQuestion;

// ─── INTERMEDIATE BANK (default for v1) ───
// 비즈니스 / 일상 영어 혼합 — 임원·전문직 niveau에 맞춤.
export const QB_INTERMEDIATE = {
  mc: [
    {
      type: "mc",
      domain: "grammar",
      q: "The meeting has been ___ to next Monday.",
      ch: ["postponed", "postponing", "postpone", "postpones"],
      a: 0,
      exp: "has been + p.p. = 현재완료 수동태. postponed가 정답.",
    },
    {
      type: "mc",
      domain: "grammar",
      q: "___ she studied hard, she failed the exam.",
      ch: ["Although", "Because", "So", "When"],
      a: 0,
      exp: "열심히 했는데 실패 → 역접 접속사 Although(비록 ~이지만).",
    },
    {
      type: "mc",
      domain: "vocab",
      q: "'Deadline' means?",
      ch: ["시작일", "마감일", "휴일", "연장"],
      a: 1,
      exp: "deadline = 마감일. 직장·학교에서 필수 단어.",
    },
    {
      type: "mc",
      domain: "vocab",
      q: "Please ___ free to contact us anytime.",
      ch: ["feel", "make", "do", "take"],
      a: 0,
      exp: "feel free to = 편하게 ~하세요. 이메일·공지 단골 표현.",
    },
    {
      type: "mc",
      domain: "grammar",
      q: "She asked me ___ I could join the meeting.",
      ch: ["if", "what", "that", "who"],
      a: 0,
      exp: "간접의문문 yes/no 형태 → if 또는 whether.",
    },
  ] as MCQuestion[],
  sa: [
    {
      type: "sa",
      q: "다음 문장의 수동태를 완성하세요: 'The manager approved the report.' → 'The report ___ by the manager.'",
      ans: ["was approved"],
      exp: "능동 과거 → 수동 was + p.p. was approved.",
    },
    {
      type: "sa",
      q: "'I used to go hiking on weekends.'를 한국어로 해석하세요.",
      ans: [
        "나는 주말마다 하이킹을 하곤 했다",
        "나는 주말에 하이킹을 하곤 했다",
        "예전에 주말마다 하이킹을 했다",
      ],
      exp: "used to = 과거에 ~하곤 했다 (지금은 X).",
    },
    {
      type: "sa",
      q: "다음을 영작하세요: '그 프로젝트는 다음 주까지 완료되어야 한다.'",
      ans: [
        "the project must be completed by next week",
        "the project should be completed by next week",
        "the project has to be completed by next week",
      ],
      exp: "조동사 + 수동태 = must/should be + p.p. by = ~까지.",
    },
    {
      type: "sa",
      q: "'Despite'와 'Although' 중 알맞은 것을 넣으세요: '___ the rain, we continued the game.'",
      ans: ["despite"],
      exp: "despite + 명사. although + 절. rain은 명사 → despite.",
    },
    {
      type: "sa",
      q: "'She gave an elaborate explanation.' — 'elaborate'를 한국어로 쓰세요.",
      ans: ["상세한", "자세한", "정교한", "세밀한"],
      exp: "elaborate = 상세한, 정교한.",
    },
  ] as SAQuestion[],
  li: [
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Good morning everyone. Today's meeting has been postponed to three PM due to a schedule conflict. Please update your calendars accordingly.",
      prompt: "미팅은 언제로 변경되었나요?",
      ch: ["오전 10시", "오후 1시", "오후 3시", "내일 오전"],
      a: 2,
      exp: "postponed to three PM = 오후 3시.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Hi Sarah, this is Mark. I'm calling to follow up on the proposal we sent last week. Have you had a chance to review it? Please give me a call back at your earliest convenience.",
      prompt: "Mark가 전화한 목적은?",
      ch: ["면접 일정 확인", "제안서 후속 확인", "회의 취소 통보", "계약서 서명 요청"],
      a: 1,
      exp: "follow up on the proposal = 제안서 후속 확인.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "The quarterly sales figures show a fifteen percent increase compared to last year. However, our operating costs have also risen significantly.",
      prompt: "매출 변화는?",
      ch: ["15% 감소", "15% 증가", "변동 없음", "5% 증가"],
      a: 1,
      exp: "fifteen percent increase = 15% 증가.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Could you elaborate on your experience with project management? Specifically, I'm interested in how you handle tight deadlines.",
      prompt: "면접관이 묻는 것은?",
      ch: [
        "급여 협상",
        "팀 관리 경험",
        "프로젝트 관리와 마감 처리 경험",
        "해외 출장 경험",
      ],
      a: 2,
      exp: "elaborate on project management + handle tight deadlines.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "We regret to inform you that your application has not been successful at this time. We appreciate your interest and encourage you to apply again in the future.",
      prompt: "이 메시지의 내용은?",
      ch: ["합격 통보", "불합격 통보", "서류 추가 요청", "면접 일정 변경"],
      a: 1,
      exp: "regret to inform / not been successful = 불합격.",
    },
  ] as LIQuestion[],
  sp: [
    {
      type: "sp",
      q: "다음 질문에 영어로 답해보세요.",
      prompt: "'Tell me about your daily routine.' (하루 일과를 설명해보세요.)",
      rubric: "구체적 시간과 행동을 포함해 3문장 이상.",
    },
    {
      type: "sp",
      q: "다음 상황에서 영어로 말해보세요.",
      prompt:
        "회의에서 상대방 의견에 부드럽게 반대하는 상황. 'I see your point, but...'으로 시작.",
      rubric: "I see your point, but + 자연스러운 반론을 평가.",
    },
    {
      type: "sp",
      q: "다음을 영어로 설명해보세요.",
      prompt: "'procrastination'의 의미를 영어로 설명. (미루는 습관)",
      rubric: "Procrastination means delaying tasks... 등 설명을 평가.",
    },
    {
      type: "sp",
      q: "다음 문장을 자연스럽게 읽어보세요.",
      prompt:
        "'The project deadline is approaching, and we need to finalize the report by Friday.'",
      rubric: "발음, 강세, 자연스러운 억양을 평가.",
    },
    {
      type: "sp",
      q: "다음 질문에 영어로 답해보세요.",
      prompt: "'What would you do if you won the lottery?' (가정법 과거)",
      rubric: "If I won the lottery, I would... 가정법 과거 구조.",
    },
  ] as SPQuestion[],
};

// ─── 5축 채점 메타 ───
export type Axis = "communication" | "pronunciation" | "grammar" | "fluency" | "comprehension";

export const AXIS_KO: Record<Axis, string> = {
  communication: "의사소통",
  pronunciation: "발음",
  grammar: "문법",
  fluency: "유창성",
  comprehension: "이해력",
};

export const AXIS_DESC: Record<Axis, string> = {
  communication: "주관식 영작 + 말로 의도 전달 능력",
  pronunciation: "스피킹 발음·억양·자연스러움",
  grammar: "객관식 문법 정확도",
  fluency: "자유 발화 + 영작에서 표현력",
  comprehension: "듣기 이해도",
};

// ─── CEFR 매핑 ───
// 점수(/100) → 레벨 매핑. EF SET, Cambridge 분포 참고해서 보수적으로.
export interface LevelInfo {
  cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  korean: string;
  description: string;
  recommendation: string[];
}

export function levelFromScore(score: number): LevelInfo {
  if (score < 25)
    return {
      cefr: "A1",
      korean: "Pre-A1 / 입문",
      description:
        "기초 어휘는 알지만 문장 단위 의사소통이 아직 어려운 단계예요.",
      recommendation: [
        "기초 문법 (be동사·시제·관사) 한 바퀴 정리",
        "일상 표현 100문장 통문장 암기",
        "1:1 코칭으로 실수 패턴 잡기 — 혼자선 빠르게 한계 옴",
      ],
    };
  if (score < 45)
    return {
      cefr: "A2",
      korean: "Elementary / 기초",
      description:
        "단순 문장은 읽고 쓸 수 있지만, 즉흥 회화와 복잡한 문법은 시간이 필요해요.",
      recommendation: [
        "현재완료·관계대명사 등 중급 문법 골격 학습",
        "비즈니스 빈출 표현 (이메일·미팅) 200개 익히기",
        "Speaking 5분 monologue 매일 — 즉흥성 끌어올리기",
      ],
    };
  if (score < 65)
    return {
      cefr: "B1",
      korean: "Intermediate / 중급",
      description:
        "일상 대화는 무리 없지만, 격식체 비즈니스 영어와 빠른 청취에서 흔들려요.",
      recommendation: [
        "비즈니스 격식 표현 (negotiation, presentation) 정복",
        "TED 5분 클립 받아쓰기 + shadowing",
        "토론 / 의견 제시 영어 — opinion structure 훈련",
      ],
    };
  if (score < 80)
    return {
      cefr: "B2",
      korean: "Upper-Int / 중상급",
      description:
        "전반적 의사소통은 자유로워요. 정확성과 고급 표현, 뉘앙스에서 한 단계 더 올리면 됩니다.",
      recommendation: [
        "C1 어휘 1500개 (Academic / Business) 확장",
        "관용 표현·콜로케이션 (idiom, collocation) 정교화",
        "스피킹 fluency 유지하며 accuracy 끌어올리는 1:1 교정",
      ],
    };
  if (score < 92)
    return {
      cefr: "C1",
      korean: "Advanced / 고급",
      description:
        "거의 원어민 수준. 미세한 뉘앙스·전문용어·격식체 완성도가 다음 목표예요.",
      recommendation: [
        "도메인 전문 영어 (법률·재무·IT 등) 심화",
        "프레젠테이션·negotiation 스타일 정밀화",
        "원어민 강사와 1:1 — 작은 실수 잡고 톤 맞추기",
      ],
    };
  return {
    cefr: "C2",
    korean: "Mastery / 마스터",
    description:
      "최상위 수준이에요. 유지·정교화 + 도메인 전문성에 집중하시면 됩니다.",
    recommendation: [
      "원서 / 논문 영어로 input quality 유지",
      "writing 정밀 첨삭 — academic / professional 톤",
      "1:1 코칭은 주제별 깊이 있는 토론으로",
    ],
  };
}
