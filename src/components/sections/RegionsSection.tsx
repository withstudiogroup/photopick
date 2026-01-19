"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const popularRegions = [
  { name: "강남", count: 128 },
  { name: "홍대", count: 96 },
  { name: "성수", count: 72 },
  { name: "한남", count: 45 },
  { name: "을지로", count: 38 },
  { name: "압구정", count: 52 },
  { name: "판교", count: 34 },
  { name: "부산", count: 89 },
];

const popularKeywords = [
  "강남 프로필",
  "홍대 스튜디오",
  "웨딩 스냅",
  "가족사진",
  "증명사진",
  "바디프로필",
  "컨셉촬영",
  "감성스튜디오",
];

export default function RegionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-ivory)]">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-28">
          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
              Regions
            </p>
            <h3 className="font-display text-2xl text-charcoal-force mb-10">
              지역별 스튜디오
            </h3>
            <div className="flex flex-wrap gap-4">
              {popularRegions.map((region) => (
                <Link
                  key={region.name}
                  href={`/search?region=${region.name}`}
                  className="px-5 py-3 bg-white border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors text-sm"
                >
                  {region.name}
                  <span className="text-[var(--color-text-muted)] ml-1">({region.count})</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Keywords */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
              Popular
            </p>
            <h3 className="font-display text-2xl text-charcoal-force mb-10">
              인기 검색 키워드
            </h3>
            <div className="flex flex-wrap gap-4">
              {popularKeywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/search?q=${keyword}`}
                  className="tag"
                >
                  #{keyword}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
