"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Gift, Percent, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PageTransition from "@/components/PageTransition";

const heroEvents = [
  {
    id: "hero-1",
    title: "봄맞이 프로필 촬영 대전",
    subtitle: "Spring Special",
    description: "새로운 시작을 위한 특별한 프로필 촬영. 전 스튜디오 20% 할인 혜택을 만나보세요.",
    discount: "20%",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    period: "2024.03.01 - 2024.04.30",
    link: "/search?category=profile",
  },
  {
    id: "hero-2",
    title: "웨딩 시즌 특별 프로모션",
    subtitle: "Wedding Season",
    description: "인생에서 가장 아름다운 순간을 담을 웨딩 촬영 할인 이벤트.",
    discount: "30%",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
    period: "2024.03.15 - 2024.06.30",
    link: "/search?category=wedding",
  },
  {
    id: "hero-3",
    title: "신규 회원 웰컴 쿠폰",
    subtitle: "Welcome Gift",
    description: "PhotoPick에 처음 오신 분들께 드리는 특별한 할인 쿠폰.",
    discount: "15%",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
    period: "상시 진행",
    link: "/auth/signup",
  },
];

const ongoingEvents = [
  {
    id: "event-1",
    title: "가족사진 봄 할인전",
    category: "가족",
    discount: "15%",
    originalPrice: 120000,
    discountPrice: 102000,
    period: "2024.03.01 - 2024.04.15",
    daysLeft: 23,
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    description: "따뜻한 봄, 가족과 함께하는 특별한 시간을 담아보세요.",
    isNew: true,
  },
  {
    id: "event-2",
    title: "바디프로필 패키지 특가",
    category: "바디프로필",
    discount: "25%",
    originalPrice: 200000,
    discountPrice: 150000,
    period: "2024.03.10 - 2024.03.31",
    daysLeft: 8,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    description: "노력의 결과를 전문 스튜디오에서 기록하세요.",
    isHot: true,
  },
  {
    id: "event-3",
    title: "증명사진 2+1 이벤트",
    category: "증명사진",
    discount: "33%",
    originalPrice: 45000,
    discountPrice: 30000,
    period: "2024.03.01 - 2024.03.31",
    daysLeft: 8,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    description: "취업 시즌 맞이 증명사진 특별 할인.",
    isHot: true,
  },
  {
    id: "event-4",
    title: "컨셉촬영 얼리버드",
    category: "컨셉촬영",
    discount: "20%",
    originalPrice: 150000,
    discountPrice: 120000,
    period: "2024.04.01 - 2024.05.31",
    daysLeft: 69,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
    description: "새로운 컨셉, 새로운 나를 만나는 시간.",
    isNew: true,
  },
];

const endedEvents = [
  {
    id: "ended-1",
    title: "설날 가족사진 이벤트",
    category: "가족",
    discount: "20%",
    period: "2024.01.15 - 2024.02.15",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
  },
  {
    id: "ended-2",
    title: "신년 프로필 촬영전",
    category: "프로필",
    discount: "15%",
    period: "2024.01.01 - 2024.01.31",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
  },
];

export default function EventsPage() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showEnded, setShowEnded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)]">
        {/* Hero Banner Slider */}
        <section className="relative h-[80vh] min-h-[600px]">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="h-full"
          >
            {heroEvents.map((event, index) => (
              <SwiperSlide key={event.id}>
                <div className="relative h-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="container-wide">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xl"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-4 py-1.5 bg-[var(--color-gold)] text-white text-sm font-medium">
                            {event.discount} OFF
                          </span>
                          <span className="text-[11px] tracking-[0.3em] uppercase text-white/80">
                            {event.subtitle}
                          </span>
                        </div>

                        <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
                          {event.title}
                        </h1>

                        <p className="text-lg text-white/80 mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-4 text-white/60 text-sm mb-8">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.period}
                          </span>
                        </div>

                        <Link
                          href={event.link}
                          className="btn-gold inline-flex items-center gap-2"
                        >
                          <span>이벤트 참여하기</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {heroEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef?.slideTo(index)}
                  className={`h-1.5 transition-all duration-300 ${
                    index === activeSlide
                      ? "w-8 bg-[var(--color-gold)]"
                      : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Ongoing Events */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-gold)] mb-4">
                Special Offers
              </p>
              <h2 className="font-display text-4xl text-[var(--color-charcoal)]">
                진행 중인 이벤트
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {ongoingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/search?category=${event.category}`}
                    className="group flex flex-col md:flex-row bg-white border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {event.isNew && (
                          <span className="px-3 py-1 bg-[var(--color-gold)] text-white text-xs font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            NEW
                          </span>
                        )}
                        {event.isHot && (
                          <span className="px-3 py-1 bg-[var(--color-error)] text-white text-xs font-medium flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-[var(--color-charcoal)] text-white text-lg font-medium flex items-center gap-1">
                          <Percent className="w-4 h-4" />
                          {event.discount}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-2">
                          {event.category}
                        </p>
                        <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm text-[var(--color-text-muted)] line-through">
                            {formatPrice(event.originalPrice)}원
                          </span>
                          <span className="text-xl font-medium text-[var(--color-gold)]">
                            {formatPrice(event.discountPrice)}원~
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {event.period}
                            </span>
                            <span className="flex items-center gap-1 text-[var(--color-error)]">
                              <Clock className="w-3.5 h-3.5" />
                              {event.daysLeft}일 남음
                            </span>
                          </div>

                          <ArrowRight className="w-5 h-5 text-[var(--color-gold)] transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ended Events */}
        <section className="py-20 bg-[var(--color-beige)]">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)]">
                종료된 이벤트
              </h2>
              <button
                onClick={() => setShowEnded(!showEnded)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
              >
                {showEnded ? "접기" : "펼치기"}
              </button>
            </div>

            <AnimatePresence>
              {showEnded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {endedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="relative bg-white border border-[var(--color-beige-dark)] overflow-hidden opacity-60"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="px-4 py-2 bg-white/90 text-[var(--color-charcoal)] text-sm font-medium">
                            종료됨
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          {event.category} · {event.discount} 할인
                        </p>
                        <h3 className="font-medium text-[var(--color-charcoal)] text-sm">
                          {event.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-2">
                          {event.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!showEnded && (
              <p className="text-sm text-[var(--color-text-muted)]">
                총 {endedEvents.length}개의 종료된 이벤트가 있습니다.
              </p>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-[var(--color-charcoal)]">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <Gift className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                이벤트 알림 받기
              </h2>
              <p className="text-white/70 mb-8">
                새로운 이벤트와 특별 할인 소식을 가장 먼저 받아보세요.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--color-gold)]"
                />
                <button type="submit" className="btn-gold whitespace-nowrap">
                  구독하기
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
