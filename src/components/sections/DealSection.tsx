"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { studios } from "@/data/studios";
import StudioCard from "@/components/studio/StudioCard";

export default function DealSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const dealStudios = studios.filter((s) => s.discountPrice);

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
            <div className="inline-flex items-center gap-2 text-[var(--color-error)] text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              한정 특가
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-force">
              오늘의 특가 스튜디오
            </h2>
          </div>
          <Link
            href="/search?deal=true"
            className="hidden md:flex items-center gap-2 text-[var(--color-charcoal)] text-sm font-medium hover:text-[var(--color-gold)] transition-colors"
          >
            <span className="underline-animation">전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="space-y-10 lg:space-y-12">
          {dealStudios.slice(0, 4).map((studio, index) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              index={index}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
