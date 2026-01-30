"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories, getFeaturedStudios } from "@/data/studios";
import StudioCard from "@/components/studio/StudioCard";

export default function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featuredStudios = getFeaturedStudios();

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-ivory)]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 lg:mb-16"
        >
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
              Featured
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-force">
              인기 추천 스튜디오
            </h2>
          </div>
          <Link
            href="/search"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--color-charcoal)] text-sm font-medium hover:text-[var(--color-gold)] transition-colors"
          >
            <span className="underline-animation">전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-14"
        >
          {/* Scroll fade hint */}
          <div className="absolute top-0 right-0 bottom-2 w-20 bg-gradient-to-l from-[var(--color-ivory)] to-transparent pointer-events-none z-10" aria-hidden="true" />
          
          <div
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            role="group"
            aria-label="카테고리 필터"
          >
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              aria-pressed={index === 0}
              aria-label={`${cat.label} 스튜디오 필터`}
              className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 ${
                index === 0
                  ? "bg-[var(--color-charcoal)] text-white"
                  : "bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-charcoal)] hover:text-white border border-[var(--color-beige-dark)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
          </div>
        </motion.div>

        {/* Studios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featuredStudios.map((studio, index) => (
            <StudioCard key={studio.id} studio={studio} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
