import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "회사소개 | PhotoPick",
  description: "PhotoPick의 비전과 미션을 알아보세요.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl text-[var(--color-charcoal)] mb-8">
              회사소개
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
                PhotoPick은 고객과 스튜디오를 연결하는 프리미엄 사진 스튜디오 예약 플랫폼입니다.
              </p>
              
              <h2 className="font-display text-3xl text-[var(--color-charcoal)] mt-12 mb-6">
                우리의 미션
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                누구나 쉽고 편리하게 자신에게 맞는 최고의 스튜디오를 찾고,
                특별한 순간을 아름답게 기록할 수 있도록 돕습니다.
              </p>

              <h2 className="font-display text-3xl text-[var(--color-charcoal)] mt-12 mb-6">
                우리의 비전
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                대한민국 No.1 사진 스튜디오 플랫폼으로 성장하여,
                사진 문화의 대중화에 기여하고자 합니다.
              </p>

              <div className="bg-white p-10 rounded-lg mt-12 border border-[var(--color-beige-dark)]">
                <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  문의하기
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  PhotoPick에 대해 더 알고 싶으신가요?
                  <br />
                  언제든지 문의해 주세요.
                </p>
                <div className="mt-6">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    📧 이메일: help@photopick.kr
                    <br />
                    📞 전화: 1544-0000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
