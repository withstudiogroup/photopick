import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhotoPick | 프리미엄 사진 스튜디오 예약 플랫폼",
  description: "당신의 특별한 순간을 담을 완벽한 스튜디오를 찾아보세요. 프로필, 웨딩, 가족, 증명사진까지 다양한 촬영 스튜디오를 한눈에 비교하고 예약하세요.",
  keywords: ["사진 스튜디오", "프로필 촬영", "웨딩 촬영", "가족 사진", "증명사진", "스튜디오 예약", "포토픽"],
  openGraph: {
    title: "PhotoPick | 프리미엄 사진 스튜디오 예약",
    description: "당신의 특별한 순간을 담을 완벽한 스튜디오를 찾아보세요",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${notoSansKr.variable}`}>
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
