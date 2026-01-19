"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getPickStudios } from "@/data/studios";
import StudioCard from "@/components/studio/StudioCard";

export default function PickSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pickStudios = getPickStudios();

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-beige)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-charcoal)] text-gold-force text-[11px] tracking-[0.2em] uppercase mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Editor&apos;s Choice
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal-force mb-4">
            PhotoPick&apos;s <span className="italic text-gold-force">PICK</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-lg">
            전문 에디터가 엄선한 프리미엄 스튜디오를 만나보세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".pick-prev",
              nextEl: ".pick-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {pickStudios.map((studio, index) => (
              <SwiperSlide key={studio.id}>
                <StudioCard studio={studio} index={index} variant="featured" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-5 mt-14">
            <button className="pick-prev w-14 h-14 rounded-full border border-[var(--color-beige-dark)] bg-white flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="pick-next w-14 h-14 rounded-full border border-[var(--color-beige-dark)] bg-white flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
