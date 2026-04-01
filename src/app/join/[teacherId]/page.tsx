import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SUPABASE_URL = "https://avijvkkshyfhvnqdqipv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aWp2a2tzaHlmaHZucWRxaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDkwMTIsImV4cCI6MjA2NDU4NTAxMn0.yMNBhFgi-BN2x1gSCXJgVNSqDqoFocVDaHnFBmE1IZo";

async function getTeacherName(teacherId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${teacherId}&role=eq.teacher&select=name`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    return data?.[0]?.name ?? null;
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ teacherId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { teacherId } = await params;
  const name = await getTeacherName(teacherId);

  if (!name) {
    return {
      title: "ENGZ - 수업 초대",
      description: "ENGZ에서 수업에 참여해보세요!",
    };
  }

  return {
    title: `${name}쌤의 수업에 초대받았어요! - ENGZ`,
    description: `${name} 선생님이 ENGZ 수업에 초대했어요. 링크를 눌러 참여해보세요!`,
    openGraph: {
      title: `📚 ${name}쌤의 수업으로 초대합니다!`,
      description: `${name} 선생님과 함께하는 1:1 수업, ENGZ에서 시작하세요.`,
      type: "website",
      url: `https://eng-z.com/join/${teacherId}`,
      siteName: "ENGZ",
    },
  };
}

export default async function JoinPage({ params }: Props) {
  const { teacherId } = await params;
  const name = await getTeacherName(teacherId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] bg-clip-text text-transparent">ENGZ</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
          {name ? (
            <>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5C39] to-[#FF7A5C] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">{name[0]}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{name} 쌤의 수업</h2>
              <p className="text-gray-500 mb-8">초대를 받았어요! 아래 버튼을 눌러 참여해주세요.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">수업 초대</h2>
              <p className="text-gray-500 mb-8">아래 버튼을 눌러 참여해주세요.</p>
            </>
          )}

          <a
            href={`https://app.eng-z.com/join/${teacherId}`}
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#FF5C39] to-[#FF7A5C] text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            수업 참여하기 →
          </a>

          <p className="mt-4 text-xs text-gray-400">
            ENGZ · 1:1 수업 관리 플랫폼
          </p>
        </div>
      </div>
    </div>
  );
}
