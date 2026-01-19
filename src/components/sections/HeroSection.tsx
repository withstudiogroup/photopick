"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroImages = [
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1920&q=80",
];

const categoryTabs = ["프로필", "웨딩", "가족", "증명사진", "컨셉촬영"];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="absolute inset-0 w-full h-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.div style={{ y }} className="relative w-full h-full">
              <Image
                src={img}
                alt="Hero background"
                fill
                className="object-cover"
                style={{ objectPosition: "center center" }}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-16 h-[1px] bg-[var(--color-gold)] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] tracking-[0.4em] uppercase text-gold-force mb-8 font-medium"
        >
          Premium Photo Studio Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light mb-8 leading-[1.05] drop-shadow-2xl text-warm-gray-force"
        >
          당신의 특별한 순간을
          <br />
          <span className="italic text-gold-force drop-shadow-lg">담아드립니다</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 mb-14 font-light tracking-wide max-w-xl"
        >
          전국의 프리미엄 스튜디오를 한눈에 비교하고 예약하세요
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Category Tabs */}
          <div className="flex justify-center gap-8 mb-8">
            {categoryTabs.map((tab, index) => (
              <button
                key={tab}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative ${
                  index === 0
                    ? "text-gold-force"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab}
                {index === 0 && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--color-gold)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="bg-white/98 backdrop-blur-xl p-2.5 flex flex-col md:flex-row gap-2 shadow-2xl border border-white/20">
            <div className="flex-1 relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)] transition-colors" />
              <input
                type="text"
                placeholder="어디서 촬영하실 건가요?"
                className="w-full pl-12 pr-4 py-4 bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none placeholder:text-[var(--color-text-muted)] focus:placeholder:text-[var(--color-text-light)] transition-colors"
              />
            </div>
            <div className="hidden md:block w-px bg-[var(--color-beige-dark)]" />
            <div className="flex-1 relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
              <input
                type="text"
                placeholder="언제 촬영하실 건가요?"
                className="w-full pl-12 pr-4 py-4 bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none placeholder:text-[var(--color-text-muted)] focus:placeholder:text-[var(--color-text-light)] transition-colors"
              />
            </div>
            <div className="hidden md:block w-px bg-[var(--color-beige-dark)]" />
            <div className="flex-1 relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
              <select className="w-full pl-12 pr-4 py-4 bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none appearance-none cursor-pointer">
                <option value="">인원 선택</option>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명 이상</option>
              </select>
            </div>
            <button className="btn-gold flex items-center gap-2 md:px-10 shadow-lg hover:shadow-xl transition-shadow">
              <Search className="w-5 h-5" />
              <span className="hidden md:inline font-medium">검색</span>
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold)]/80 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
