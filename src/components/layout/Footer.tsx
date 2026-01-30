"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "회사소개", href: "/about" },
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "채용정보", href: "/careers" },
    ],
    service: [
      { label: "공지사항", href: "/notice" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "1:1 문의", href: "/inquiry" },
      { label: "비회원 예약조회", href: "/booking-check" },
    ],
    partner: [
      { label: "스튜디오 입점 신청", href: "/partner/apply" },
      { label: "파트너 센터", href: "/partner" },
      { label: "광고 문의", href: "/contact/ad" },
      { label: "제휴 문의", href: "/contact/partnership" },
    ],
  };

  return (
    <footer className="bg-[var(--color-charcoal)] text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-3xl">
                Photo<span className="text-[var(--color-gold)]">Pick</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              당신의 특별한 순간을 담을 완벽한 스튜디오를 찾아보세요.
              PhotoPick이 최고의 촬영 경험을 선사해 드립니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[var(--color-gold)]" />
                <span>1544-0000 (평일 09:00 - 18:00)</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[var(--color-gold)]" />
                <span>help@photopick.kr</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MessageCircle className="w-4 h-4 text-[var(--color-gold)]" />
                <span>카카오톡 @photopick</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "인스타그램" },
                { icon: Youtube, href: "https://youtube.com", label: "유튜브" },
                { icon: MessageCircle, href: "https://pf.kakao.com", label: "카카오톡" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} 팔로우`}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 focus:ring-offset-[var(--color-charcoal)]"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-wider uppercase text-[var(--color-gold)] mb-6">
              회사
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-wider uppercase text-[var(--color-gold)] mb-6">
              고객센터
            </h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Links */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-wider uppercase text-[var(--color-gold)] mb-6">
              파트너
            </h4>
            <ul className="space-y-3">
              {footerLinks.partner.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-white/40 text-xs leading-relaxed">
              <p>
                (주)포토픽 | 대표: 홍길동 | 사업자등록번호: 123-45-67890
              </p>
              <p>
                주소: 서울특별시 강남구 테헤란로 123, 포토픽빌딩 10층 |
                통신판매업신고: 2024-서울강남-0000
              </p>
            </div>
            <p className="text-white/40 text-xs">
              Copyright © 2024 PhotoPick. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
