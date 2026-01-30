import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "이용약관 | PhotoPick",
  description: "PhotoPick 서비스 이용약관을 확인하세요.",
};

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl text-[var(--color-charcoal)] mb-4">
              이용약관
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-12">
              최종 업데이트: 2024년 1월 1일
            </p>

            <div className="bg-white p-10 rounded-lg border border-[var(--color-beige-dark)] space-y-8">
              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  제1조 (목적)
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  본 약관은 PhotoPick(이하 "회사")이 제공하는 사진 스튜디오 예약 및 관련 서비스(이하 "서비스")의 이용과 관련하여
                  회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  제2조 (정의)
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  1. "회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                  <br />
                  2. "스튜디오 파트너"라 함은 회사와 제휴 계약을 맺고 서비스를 통해 촬영 서비스를 제공하는 사업자를 말합니다.
                  <br />
                  3. "예약"이라 함은 회원이 서비스를 통해 스튜디오 파트너의 촬영 서비스를 이용하기 위해 신청하는 것을 말합니다.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  제3조 (약관의 효력 및 변경)
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
                  <br />
                  2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.
                  <br />
                  3. 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 공지합니다.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  제4조 (서비스의 제공 및 변경)
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  1. 회사는 다음과 같은 서비스를 제공합니다:
                  <br />
                  - 사진 스튜디오 검색 및 예약 중개 서비스
                  <br />
                  - 스튜디오 정보 제공 서비스
                  <br />
                  - 리뷰 및 평점 서비스
                  <br />
                  - 기타 회사가 정하는 서비스
                  <br />
                  2. 회사는 상당한 이유가 있는 경우 서비스의 내용을 변경할 수 있으며, 변경 시 사전에 공지합니다.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
