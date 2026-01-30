import type { Metadata } from "next";
import { Cormorant_Garamond, Gowun_Batang } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display-kr",
  display: "swap",
});

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
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
    <html lang="ko" className={`${cormorant.variable} ${gowunBatang.variable} ${pretendard.variable}`}>
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
