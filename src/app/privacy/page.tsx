import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "개인정보처리방침 | PhotoPick",
  description: "PhotoPick의 개인정보 처리방침을 확인하세요.",
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl text-[var(--color-charcoal)] mb-4">
              개인정보처리방침
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-12">
              최종 업데이트: 2024년 1월 1일
            </p>

            <div className="bg-white p-10 rounded-lg border border-[var(--color-beige-dark)] space-y-8">
              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  1. 개인정보의 수집 및 이용 목적
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  PhotoPick(이하 "회사")은 다음의 목적을 위하여 개인정보를 수집 및 이용합니다:
                </p>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] leading-relaxed space-y-2">
                  <li>회원 가입 및 관리</li>
                  <li>서비스 제공 및 예약 관리</li>
                  <li>고객 문의 응대 및 민원 처리</li>
                  <li>서비스 개선 및 맞춤형 서비스 제공</li>
                  <li>마케팅 및 광고 활용 (선택 동의 시)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  2. 수집하는 개인정보 항목
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  회사는 다음의 개인정보를 수집합니다:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">
                      필수 항목
                    </h3>
                    <ul className="list-disc list-inside text-[var(--color-text-secondary)] leading-relaxed">
                      <li>이름, 이메일 주소, 휴대전화번호</li>
                      <li>예약 정보 (날짜, 시간, 인원 등)</li>
                      <li>결제 정보 (신용카드 정보 등)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">
                      선택 항목
                    </h3>
                    <ul className="list-disc list-inside text-[var(--color-text-secondary)] leading-relaxed">
                      <li>프로필 사진, 생년월일</li>
                      <li>관심 카테고리, 선호 지역</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  3. 개인정보의 보유 및 이용 기간
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                  단, 관계 법령에 의해 보존할 필요가 있는 경우 아래와 같이 일정 기간 동안 보관합니다:
                </p>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] leading-relaxed mt-4 space-y-2">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  4. 개인정보의 파기
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
                  지체없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 복구 및 재생이 되지 않도록
                  안전하게 삭제하며, 종이 문서는 분쇄하거나 소각합니다.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  5. 이용자의 권리
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
                  회사의 개인정보 처리에 대한 동의 철회 및 삭제를 요청할 수 있습니다.
                  개인정보 관련 문의는 고객센터(help@photopick.kr)로 연락주시기 바랍니다.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  6. 개인정보 보호책임자
                </h2>
                <div className="bg-[var(--color-beige)] p-6 rounded">
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    성명: 홍길동
                    <br />
                    직책: 개인정보보호책임자
                    <br />
                    이메일: privacy@photopick.kr
                    <br />
                    전화: 1544-0000
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
