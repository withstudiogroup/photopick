"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
          alt="프리미엄 사진 스튜디오 인테리어 - 세련된 조명과 배경"
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
              Welcome Back
            </p>
            <h1 className="font-display-kr text-4xl mb-6 leading-tight">
              당신의 특별한 순간을
              <br />
              담아드립니다
            </h1>
            <p className="text-white/70 leading-relaxed">
              전국의 프리미엄 스튜디오를 한눈에 비교하고
              <br />
              가장 완벽한 촬영 경험을 예약하세요
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-ivory)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="block mb-10">
            <span className="font-display text-3xl text-[var(--color-charcoal)]">
              Photo<span className="text-[var(--color-gold)]">Pick</span>
            </span>
          </Link>

          <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">로그인</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            계정에 로그인하여 예약을 시작하세요
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">이메일</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="form-input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="checkbox-custom">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-[var(--color-text-secondary)]">로그인 상태 유지</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[var(--color-gold)] hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            <button type="submit" className="btn-gold w-full justify-center">
              로그인
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
            <button 
              className="w-full py-4 border border-[var(--color-beige-dark)] flex items-center justify-center gap-3 hover:border-[var(--color-charcoal)] transition-colors"
              aria-label="카카오 계정으로 로그인"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#FEE500"
                  d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"
                />
              </svg>
              <span className="text-sm font-medium">카카오로 시작하기</span>
            </button>
            <button 
              className="w-full py-4 border border-[var(--color-beige-dark)] flex items-center justify-center gap-3 hover:border-[var(--color-charcoal)] transition-colors"
              aria-label="네이버 계정으로 로그인"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#03C75A"
                  d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z"
                />
              </svg>
              <span className="text-sm font-medium">네이버로 시작하기</span>
            </button>
            <button 
              className="w-full py-4 border border-[var(--color-beige-dark)] flex items-center justify-center gap-3 hover:border-[var(--color-charcoal)] transition-colors"
              aria-label="Google 계정으로 로그인"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Google로 시작하기</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
            아직 회원이 아니신가요?{" "}
            <Link href="/auth/signup" className="text-[var(--color-gold)] font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
