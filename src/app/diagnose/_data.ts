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

// ─── BEGINNER BANK ───
// 적응형: 첫 5문제(MC) 정답 0~1개 → beginner로 분기.
export const QB_BEGINNER = {
  mc: [], // 적응형 calibration은 항상 intermediate MC로 — 정확한 분기 신호.
  sa: [
    {
      type: "sa",
      q: "다음을 영작하세요: 나는 학생이다.",
      ans: ["I am a student", "i am a student"],
      exp: "I am a student. — 대문자 I, am 잊지 마세요.",
    },
    {
      type: "sa",
      q: "'Happy'의 반대말(반의어)을 영어로 쓰세요.",
      ans: ["sad", "unhappy"],
      exp: "happy ↔ sad / unhappy.",
    },
    {
      type: "sa",
      q: "다음을 영작하세요: 너는 어디에 사니?",
      ans: ["where do you live", "where do you live?"],
      exp: "Where do you live? — 의문사 + do + 주어 + 동사원형.",
    },
    {
      type: "sa",
      q: "빈칸을 채우세요: 'I ___ coffee every morning.' (마신다)",
      ans: ["drink"],
      exp: "I drink coffee. — 1인칭 단수 현재형은 동사원형.",
    },
    {
      type: "sa",
      q: "'Summer'는 무슨 계절인가요? 영어로 쓰세요.",
      ans: ["summer", "a summer", "the summer"],
      exp: "Summer = 여름.",
    },
  ] as SAQuestion[],
  li: [
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Hello! My name is Tom. I am from Korea. I like pizza and coffee.",
      prompt: "Tom은 어디 출신인가요?",
      ch: ["미국", "영국", "한국", "일본"],
      a: 2,
      exp: "I am from Korea = 한국 출신.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "What time is it? It is three thirty in the afternoon.",
      prompt: "지금 몇 시인가요?",
      ch: ["오후 2시 30분", "오후 3시 30분", "오전 3시 30분", "오후 3시"],
      a: 1,
      exp: "three thirty in the afternoon = 오후 3시 30분.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "I am hungry. Can we get some food? I want a sandwich and orange juice.",
      prompt: "화자가 원하는 것은?",
      ch: [
        "피자와 콜라",
        "샌드위치와 오렌지주스",
        "햄버거와 커피",
        "샐러드와 물",
      ],
      a: 1,
      exp: "I want a sandwich and orange juice.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "The weather today is sunny and warm. It is a perfect day for a walk in the park.",
      prompt: "오늘 날씨는?",
      ch: ["비가 와서 춥다", "맑고 따뜻하다", "흐리고 시원하다", "눈이 온다"],
      a: 1,
      exp: "sunny and warm = 맑고 따뜻하다.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Do you have any brothers or sisters? I have one brother and two sisters.",
      prompt: "화자의 형제자매는?",
      ch: [
        "남동생 1명",
        "여동생 2명",
        "남동생 1명 + 여동생 2명",
        "형제자매 없음",
      ],
      a: 2,
      exp: "one brother and two sisters.",
    },
  ] as LIQuestion[],
  sp: [
    {
      type: "sp",
      q: "다음 문장을 소리 내어 읽고 녹음하세요.",
      prompt: "'Nice to meet you! My name is ___.' 자신의 이름을 넣어 말해보세요.",
      rubric: "발음, 억양, 자연스러움.",
    },
    {
      type: "sp",
      q: "다음 질문에 영어로 답해보세요.",
      prompt: "'What is your favorite food?' (좋아하는 음식이 뭔가요?)",
      rubric: "좋아하는 음식과 간단한 이유.",
    },
    {
      type: "sp",
      q: "다음 문장을 영어로 말해보세요.",
      prompt: "'오늘 날씨가 정말 좋아요.'를 영어로 말해보세요.",
      rubric: "The weather is really nice today. 또는 비슷한 표현이면 OK.",
    },
    {
      type: "sp",
      q: "다음 대화에 자연스럽게 답해보세요.",
      prompt: "'How are you today?'에 자연스럽게 대답.",
      rubric: "I'm fine/great + How about you? 같은 되묻기면 훌륭.",
    },
    {
      type: "sp",
      q: "다음을 영어로 말해보세요.",
      prompt: "자신의 직업이나 하는 일을 한 문장으로 소개해보세요.",
      rubric: "I am a / I work as a / I study 구조.",
    },
  ] as SPQuestion[],
};

// ─── ADVANCED BANK ───
// 적응형: 첫 5문제(MC) 정답 4~5개 → advanced로 분기.
export const QB_ADVANCED = {
  mc: [],
  sa: [
    {
      type: "sa",
      q: "다음 문장을 더 격식체로 바꾸세요: 'We need to talk about the budget problem.'",
      ans: [
        "we would like to address the budgetary concern",
        "i would like to discuss the budget issue",
        "we need to address the budget issue",
        "we wish to discuss the budgetary matter",
      ],
      exp: "need to → would like to / wish to. problem → issue/concern.",
    },
    {
      type: "sa",
      q: "'The new regulation will take effect next quarter.' — 'take effect'와 같은 의미의 표현을 쓰세요.",
      ans: [
        "come into force",
        "become effective",
        "become operative",
        "go into effect",
        "come into effect",
      ],
      exp: "take effect = come into force/effect = become effective.",
    },
    {
      type: "sa",
      q: "다음을 영작하세요: '그녀가 그 사실을 알고 있었더라면, 더 일찍 조치를 취했을 것이다.'",
      ans: [
        "if she had known the fact she would have taken action earlier",
        "had she known the fact she would have taken action earlier",
        "if she had known that she would have acted sooner",
      ],
      exp: "가정법 과거완료: If + had p.p., would have p.p.",
    },
    {
      type: "sa",
      q: "빈칸에 알맞은 접속어를 쓰세요: 'The project was completed on time; ___, the quality was compromised.'",
      ans: ["however", "nevertheless", "nonetheless", "that said"],
      exp: "역접 부사 → however / nevertheless / nonetheless.",
    },
    {
      type: "sa",
      q: "'She gave an off-the-cuff response.' — 'off-the-cuff'의 의미를 한국어로 쓰세요.",
      ans: ["즉흥적인", "즉석에서", "준비 없이", "막힘없이"],
      exp: "off-the-cuff = 즉흥적인. on the spot과 동의어.",
    },
  ] as SAQuestion[],
  li: [
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "The paradigm shift we are witnessing in renewable energy sector is unprecedented. Notwithstanding the initial capital expenditure, long-term ROI projections indicate substantial returns within a decade.",
      prompt: "이 발언의 핵심 주장은?",
      ch: [
        "재생에너지 초기 비용이 너무 높다",
        "재생에너지는 장기적으로 높은 수익을 기대할 수 있다",
        "재생에너지 산업은 성장이 더디다",
        "재생에너지 투자는 리스크가 너무 크다",
      ],
      a: 1,
      exp: "notwithstanding 초기 비용 + long-term ROI substantial returns.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "We need to reconcile the discrepancy between the projected figures and actual expenditure. I'd recommend convening an emergency audit committee.",
      prompt: "화자가 제안하는 것은?",
      ch: ["예산 삭감", "비상 감사 위원회 소집", "프로젝트 취소", "재정 보고서 재작성"],
      a: 1,
      exp: "convening an emergency audit committee.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "The contract stipulates that any amendments must be ratified by both parties within thirty days. Failure to comply will render the modifications null and void.",
      prompt: "'null and void'가 의미하는 것은?",
      ch: ["법적 효력이 없음", "즉시 발효됨", "수정 가능함", "양측이 동의함"],
      a: 0,
      exp: "null and void = 무효의.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "Pursuant to the memorandum of understanding signed last quarter, all intellectual property developed in this collaboration shall be jointly owned by both entities.",
      prompt: "지적재산권은 누구에게 귀속되나요?",
      ch: ["한쪽 회사", "양측 공동 소유", "제3자 기관", "정부 소유"],
      a: 1,
      exp: "jointly owned by both entities = 양측 공동 소유.",
    },
    {
      type: "li",
      q: "대화를 듣고 알맞은 답을 고르세요.",
      tts: "The crux of the matter lies in our inability to extrapolate reliable data from the existing sample size. We must expand our dataset before drawing any definitive conclusions.",
      prompt: "화자가 강조하는 문제는?",
      ch: [
        "데이터 보안 문제",
        "샘플 크기가 너무 작아 신뢰성 있는 결론 도출 불가",
        "연구 예산 부족",
        "팀원 간 의견 충돌",
      ],
      a: 1,
      exp: "inability to extrapolate reliable data from existing sample size.",
    },
  ] as LIQuestion[],
  sp: [
    {
      type: "sp",
      q: "다음 주제에 대해 영어로 말해보세요.",
      prompt: "'What are the pros and cons of remote work?' (재택근무의 장단점)",
      rubric: "On one hand / On the other hand 구조로 균형 잡힌 의견.",
    },
    {
      type: "sp",
      q: "다음 비즈니스 상황에서 말해보세요.",
      prompt: "투자자에게 새 프로젝트를 30초 내외로 영어 pitch.",
      rubric: "We are developing / Our product solves / The market opportunity 구조.",
    },
    {
      type: "sp",
      q: "다음 문장을 자연스럽게 읽어보세요.",
      prompt:
        "'Notwithstanding the initial challenges, the strategic realignment has yielded considerable improvements in operational efficiency.'",
      rubric: "고급 어휘의 정확한 발음과 자연스러운 억양.",
    },
    {
      type: "sp",
      q: "다음 질문에 영어로 답해보세요.",
      prompt: "'How do you handle conflicting priorities at work?'",
      rubric: "When faced with conflicting priorities, I typically + 구체 전략.",
    },
    {
      type: "sp",
      q: "다음을 영어로 설명해보세요.",
      prompt: "'opportunity cost' 개념을 영어로 설명 + 실생활 예시.",
      rubric: "Opportunity cost refers to + 명확한 예시.",
    },
  ] as SPQuestion[],
};

// ─── INTERMEDIATE BANK (default + calibration용 MC) ───
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
