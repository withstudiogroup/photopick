"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const events = [
  {
    id: 1,
    title: "신규 회원 첫 예약 10% 할인",
    subtitle: "지금 가입하고 혜택 받으세요",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
  },
  {
    id: 2,
    title: "봄맞이 가족사진 특가전",
    subtitle: "3월 한정 20% 할인",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
  },
  {
    id: 3,
    title: "프로필 촬영 얼리버드",
    subtitle: "오전 예약 시 15% 추가 할인",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  },
];

export default function EventSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-ivory)]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16 lg:mb-20"
        >
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
              Events
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-force">
              진행중인 이벤트
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden md:flex items-center gap-2 text-[var(--color-charcoal)] text-sm font-medium hover:text-[var(--color-gold)] transition-colors"
          >
            <span className="underline-animation">전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.event-swiper-next',
              prevEl: '.event-swiper-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <Link href={`/events/${event.id}`} className="block group">
                   <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={`${event.title} - ${event.subtitle}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-sm mb-2 text-gold-force drop-shadow-lg">
                        {event.subtitle}
                      </p>
                      <h3 className="font-display text-xl text-white-force drop-shadow-lg">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex">
            <button 
              className="event-swiper-prev"
              aria-label="이전 이벤트"
            />
            <button 
              className="event-swiper-next"
              aria-label="다음 이벤트"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
