"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Users, Pause, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplayPaused) {
        swiperRef.current.autoplay.start();
        setIsAutoplayPaused(false);
      } else {
        swiperRef.current.autoplay.stop();
        setIsAutoplayPaused(true);
      }
    }
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="absolute inset-0 w-full h-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.div style={{ y }} className="relative w-full h-full">
              <Image
                src={img}
                alt={`프리미엄 사진 스튜디오 촬영 예시 ${index + 1}`}
                fill
                className="object-cover"
                style={{ objectPosition: "center center" }}
                priority={index === 0}
                sizes="100vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Autoplay Control Button - WCAG 2.2.2 */}
      <button
        onClick={toggleAutoplay}
        aria-label={isAutoplayPaused ? "배경 슬라이더 재생" : "배경 슬라이더 일시정지"}
        className="absolute top-24 right-6 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
      >
        {isAutoplayPaused ? (
          <Play className="w-5 h-5 ml-0.5" />
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>

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
          className="text-[11px] tracking-[0.4em] uppercase mb-8 font-medium"
          style={{ color: '#D4B978', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          Premium Photo Studio Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display-kr text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.2] text-white-force"
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.7)' }}
        >
          당신의 특별한 순간을
          <br />
          <span style={{ color: '#D4B978', textShadow: '0 4px 12px rgba(0,0,0,0.7)' }}>담아드립니다</span>
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
          <div 
            role="tablist" 
            aria-label="촬영 유형 선택"
            className="flex justify-center gap-8 mb-8"
          >
            {categoryTabs.map((tab, index) => (
              <button
                key={tab}
                role="tab"
                aria-selected={index === 0}
                aria-controls={`category-panel-${index}`}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
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
          <form 
            role="search"
            aria-label="스튜디오 검색"
            className="bg-white/98 backdrop-blur-xl p-2.5 flex flex-col md:flex-row gap-2 shadow-2xl border border-white/20"
          >
            <div className="flex-1 relative group">
              <label htmlFor="search-location" className="sr-only">촬영 지역</label>
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)] transition-colors pointer-events-none" aria-hidden="true" />
              <input
                id="search-location"
                type="text"
                placeholder="어디서 촬영하실 건가요?"
                aria-label="촬영 지역 입력"
                className="w-full pl-12 pr-4 py-4 md:py-4 min-h-[48px] bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none placeholder:text-[var(--color-text-muted)] focus:placeholder:text-[var(--color-text-light)] transition-colors focus:ring-2 focus:ring-[var(--color-gold)] rounded"
              />
            </div>
            <div className="hidden md:block w-px bg-[var(--color-beige-dark)]" aria-hidden="true" />
            <div className="flex-1 relative">
              <label htmlFor="search-date" className="sr-only">촬영 날짜</label>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)] pointer-events-none" aria-hidden="true" />
              <input
                id="search-date"
                type="text"
                placeholder="언제 촬영하실 건가요?"
                aria-label="촬영 날짜 입력"
                className="w-full pl-12 pr-4 py-4 md:py-4 min-h-[48px] bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none placeholder:text-[var(--color-text-muted)] focus:placeholder:text-[var(--color-text-light)] transition-colors focus:ring-2 focus:ring-[var(--color-gold)] rounded"
              />
            </div>
            <div className="hidden md:block w-px bg-[var(--color-beige-dark)]" aria-hidden="true" />
            <div className="flex-1 relative">
              <label htmlFor="search-people" className="sr-only">인원 수</label>
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)] pointer-events-none" aria-hidden="true" />
              <select 
                id="search-people"
                aria-label="인원 수 선택"
                className="w-full pl-12 pr-4 py-4 md:py-4 min-h-[48px] bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[var(--color-gold)] rounded"
              >
                <option value="">인원 선택</option>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명 이상</option>
              </select>
            </div>
            <button 
              type="submit"
              aria-label="스튜디오 검색하기"
              className="btn-gold flex items-center justify-center gap-2 md:px-10 shadow-lg hover:shadow-xl transition-shadow min-h-[48px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
              <span className="hidden md:inline font-medium">검색</span>
              <span className="md:hidden font-medium">검색</span>
            </button>
          </form>
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
              transition={{ duration: 2, repeat: 5, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold)]/80 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
