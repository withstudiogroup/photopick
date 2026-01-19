"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-charcoal-dark)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--color-gold)_0%,transparent_25%)] opacity-5" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,var(--color-gold)_0%,transparent_25%)] opacity-5" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold-force mb-6 font-medium">
            Customer Reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white-force mb-10">
            고객님들의 <span className="italic text-gold-force">생생한 후기</span>
          </h2>
          <div className="flex items-center justify-center gap-5">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              ))}
            </div>
            <div className="h-6 w-px bg-white/20" />
            <span className="text-white font-semibold text-2xl">4.9</span>
            <span className="text-white/50 text-lg">({reviews.length}개의 리뷰)</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".review-prev",
              nextEl: ".review-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1440: { slidesPerView: 4, spaceBetween: 36 },
              1920: { slidesPerView: 4, spaceBetween: 40 },
              2560: { slidesPerView: 5, spaceBetween: 44 },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="h-full"
                >
                  <div className="relative h-full bg-[#252525] rounded-2xl p-10 lg:p-12 border border-[#333] hover:border-[var(--color-gold)]/40 transition-all duration-500 group">
                    {/* Decorative quote mark */}
                    <div className="absolute top-8 right-10 text-[var(--color-gold)]/10 text-8xl font-serif leading-none select-none">
                      &ldquo;
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1.5 mb-10">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                              : "text-[#444]"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-[#B8B8B8] leading-[2] mb-12 line-clamp-4 text-base relative z-10">
                      &ldquo;{review.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-6 pt-10 border-t border-[#333] mt-auto">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[#8B7355] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--color-gold)]/10">
                        <span className="text-white font-semibold text-lg">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-base mb-2">
                          {review.userName}
                        </p>
                        <p className="text-sm text-[#888] truncate">
                          {review.productName}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-5 mt-14">
            <button className="review-prev w-14 h-14 rounded-full bg-[#252525] border border-[#333] flex items-center justify-center text-white/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all duration-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="review-next w-14 h-14 rounded-full bg-[#252525] border border-[#333] flex items-center justify-center text-white/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all duration-300">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
