/**
 * Schema.org structured data — emitted as JSON-LD <script> tags so search
 * engines can render rich results (knowledge panel for 김해나, star ratings,
 * FAQ accordion in SERPs).
 *
 * Update the placeholder values (profile.jpg, og-image.png, review counts,
 * phone) once the assets are finalised.
 */
export function SchemaMarkup() {
  const schemas: Array<Record<string, unknown>> = [
    // 1) Person — instructor knowledge panel
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "김해나",
      jobTitle: "1:1 프리미엄 영어 강사",
      description:
        "9년차 비즈니스 영어 1위 강사. 대표·임원·전문직 1:1 영어 과외 전문.",
      image: "https://www.eng-z.com/profile.jpg",
      url: "https://www.eng-z.com",
      sameAs: [],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "동국대학교",
        department: "화공생물공학과",
      },
      knowsLanguage: ["Korean", "English"],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Language Certification",
          name: "OPIc AL",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Language Certification",
          name: "TOEIC 975",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "ENGZ",
        url: "https://www.eng-z.com",
      },
    },

    // 2) Service — what's actually being sold
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "1:1 프리미엄 영어 과외",
      name: "김해나 1:1 프리미엄 영어",
      description:
        "9년차 검증 강사가 자체 개발 AI 수업 시스템으로 진행하는 1:1 맞춤 영어 과외. 개인별 커리큘럼·교안 자동 생성, 체계적 학생·숙제·진도 관리.",
      provider: {
        "@type": "Person",
        name: "김해나",
        url: "https://www.eng-z.com",
      },
      areaServed: { "@type": "Country", name: "South Korea" },
      audience: {
        "@type": "Audience",
        audienceType: "대표, 임원, 의사, 파일럿, 모델, 전문직",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "수업 시스템",
          value: "자체 개발 스마트 수업 시스템 (Powered by AI)",
        },
        {
          "@type": "PropertyValue",
          name: "커리큘럼",
          value: "1:1 개인 맞춤 (AI 자동 생성)",
        },
        {
          "@type": "PropertyValue",
          name: "수업 관리",
          value: "체계적 학생·숙제·진도 관리 시스템",
        },
      ],
    },

    // 3) LocalBusiness — gives the SERP the star-rating snippet
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "ENGZ - 김해나 1:1 프리미엄 영어",
      image: "https://www.eng-z.com/og-image.png",
      url: "https://www.eng-z.com",
      telephone: "+82-10-7566-2391",
      email: "imhen97@eng-z.com",
      priceRange: "₩₩₩",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "30",
        bestRating: "5",
        worstRating: "1",
      },
    },

    // 4) FAQPage — surfaces the accordion in Google results
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "다른 1:1 영어 과외와 무엇이 다른가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "9년차 검증된 강사가 직접 개발한 AI 기반 스마트 수업 시스템으로 1:1 맞춤 커리큘럼과 교안을 생성합니다. 체계적인 학생·숙제·진도 관리로 일반 과외와 차원이 다른 학습 경험을 제공합니다.",
          },
        },
        {
          "@type": "Question",
          name: "1:1 프리미엄 영어 수업료는 얼마인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "수업 종류와 기간에 따라 다르며, 무료 영어 레벨 진단 후 맞춤 견적을 안내해드립니다.",
          },
        },
        {
          "@type": "Question",
          name: "수업은 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1:1 화상 수업으로 진행되며, 자체 개발한 스마트 수업 시스템에서 매 수업 맞춤 커리큘럼·교안·숙제·복습 자료가 생성·관리됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 분들이 주로 수강하시나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "기업 대표·임원, 의사, 파일럿, 모델, 컨설턴트 등 전문직 1:1 수강생이 중심입니다.",
          },
        },
        {
          "@type": "Question",
          name: "강사 이력이 어떻게 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "9년차 1:1 영어 과외 강사로, 비즈니스 영어 분야 1위(국내 주요 과외 플랫폼)이며 OPIc AL, TOEIC 975, 동국대학교 화공생물공학과 출신입니다. 별점 5.0 후기 30+건을 보유하고 있습니다.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
