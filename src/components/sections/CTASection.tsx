"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Camera } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 md:py-36 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80"
          alt="CTA Background"
          fill
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[var(--color-gold)]/5" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 container-wide text-center text-white"
      >
        {/* Decorative icon with glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative inline-block mb-8"
        >
          <div className="absolute inset-0 bg-[var(--color-gold)]/30 blur-2xl scale-150" />
          <Camera className="w-14 h-14 text-[var(--color-gold)] relative" />
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight drop-shadow-2xl text-white-force">
          나만의 완벽한 스튜디오를
          <br />
          <span className="italic text-gold-force">지금 찾아보세요</span>
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-12 text-lg leading-relaxed">
          1,000개 이상의 검증된 스튜디오 중에서
          <br />
          당신에게 딱 맞는 곳을 찾아드립니다
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/search" className="btn-gold btn-lg shadow-xl hover:shadow-2xl transition-shadow">
            스튜디오 둘러보기
          </Link>
          <Link
            href="/partner/apply"
            className="btn-outline border-white/40 text-white hover:bg-white hover:text-[var(--color-charcoal)] btn-lg backdrop-blur-sm"
          >
            스튜디오 입점 신청
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
