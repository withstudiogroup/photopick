"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreements: {
      all: false,
      terms: false,
      privacy: false,
      marketing: false,
    },
  });

  const handleAllAgreements = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreements: {
        all: checked,
        terms: checked,
        privacy: checked,
        marketing: checked,
      },
    }));
  };

  const handleAgreement = (key: "terms" | "privacy" | "marketing", checked: boolean) => {
    const newAgreements = {
      ...formData.agreements,
      [key]: checked,
    };
    newAgreements.all = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
    setFormData((prev) => ({
      ...prev,
      agreements: newAgreements,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const passwordRequirements = [
    { label: "8자 이상", met: formData.password.length >= 8 },
    { label: "영문 포함", met: /[a-zA-Z]/.test(formData.password) },
    { label: "숫자 포함", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80"
          alt="Studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center p-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white max-w-md"
          >
            <div className="w-16 h-[1px] bg-[var(--color-gold)] mb-8" />
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-gold)] mb-6 font-medium">
              Join Us
            </p>
            <h1 className="font-display-kr text-4xl mb-6 leading-tight">
              프리미엄 스튜디오와
              <br />
              함께 하세요
            </h1>
            <p className="text-white/70 leading-relaxed">
              회원가입하고 특별한 혜택을 누리세요
              <br />
              첫 예약 시 15% 할인 쿠폰을 드립니다
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-display text-[var(--color-gold)]">500+</p>
                <p className="text-sm text-white/60 mt-1">제휴 스튜디오</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display text-[var(--color-gold)]">50K+</p>
                <p className="text-sm text-white/60 mt-1">만족한 고객</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display text-[var(--color-gold)]">4.9</p>
                <p className="text-sm text-white/60 mt-1">평균 평점</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-ivory)] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-10"
        >
          <Link href="/" className="block mb-10">
            <span className="font-display text-3xl text-[var(--color-charcoal)]">
              Photo<span className="text-[var(--color-gold)]">Pick</span>
            </span>
          </Link>

          <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">회원가입</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            간단한 정보 입력으로 가입하세요
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">이름</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="홍길동"
                  className="form-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">이메일</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="form-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">연락처</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="010-1234-5678"
                  className="form-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="비밀번호를 입력하세요"
                  className="form-input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex gap-3 mt-2">
                {passwordRequirements.map((req) => (
                  <span
                    key={req.label}
                    className={`text-xs flex items-center gap-1 ${
                      req.met ? "text-[#4A7C59]" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {req.met && <Check className="w-3 h-3" />}
                    {req.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">비밀번호 확인</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="form-input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-[#C75D5D] mt-1">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-5 space-y-4">
              <label className="checkbox-custom">
                <input
                  type="checkbox"
                  checked={formData.agreements.all}
                  onChange={(e) => handleAllAgreements(e.target.checked)}
                />
                <span className="font-medium text-[var(--color-charcoal)]">전체 동의</span>
              </label>

              <div className="border-t border-[var(--color-beige)] pt-4 space-y-3">
                <label className="checkbox-custom">
                  <input
                    type="checkbox"
                    checked={formData.agreements.terms}
                    onChange={(e) => handleAgreement("terms", e.target.checked)}
                  />
                  <span className="text-sm">
                    <span className="text-[#C75D5D]">[필수]</span> 서비스 이용약관
                  </span>
                </label>
                <label className="checkbox-custom">
                  <input
                    type="checkbox"
                    checked={formData.agreements.privacy}
                    onChange={(e) => handleAgreement("privacy", e.target.checked)}
                  />
                  <span className="text-sm">
                    <span className="text-[#C75D5D]">[필수]</span> 개인정보 처리방침
                  </span>
                </label>
                <label className="checkbox-custom">
                  <input
                    type="checkbox"
                    checked={formData.agreements.marketing}
                    onChange={(e) => handleAgreement("marketing", e.target.checked)}
                  />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    [선택] 마케팅 정보 수신 동의
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.agreements.terms || !formData.agreements.privacy}
              className={`w-full py-4 text-sm font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                formData.agreements.terms && formData.agreements.privacy
                  ? "btn-gold"
                  : "bg-[var(--color-beige)] text-[var(--color-text-muted)] cursor-not-allowed"
              }`}
            >
              가입하기
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-beige-dark)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[var(--color-ivory)] px-4 text-sm text-[var(--color-text-muted)]">
                또는
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-4 border border-[var(--color-beige-dark)] flex items-center justify-center gap-3 hover:border-[var(--color-charcoal)] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#FEE500"
                  d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"
                />
              </svg>
              <span className="text-sm font-medium">카카오로 시작하기</span>
            </button>
            <button className="w-full py-4 border border-[var(--color-beige-dark)] flex items-center justify-center gap-3 hover:border-[var(--color-charcoal)] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#03C75A"
                  d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z"
                />
              </svg>
              <span className="text-sm font-medium">네이버로 시작하기</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
            이미 회원이신가요?{" "}
            <Link href="/auth/login" className="text-[var(--color-gold)] font-medium hover:underline">
              로그인
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
