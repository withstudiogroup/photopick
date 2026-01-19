"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const categoryData = [
  {
    id: "profile",
    label: "프로필 촬영",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    count: 256,
  },
  {
    id: "wedding",
    label: "웨딩 촬영",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
    count: 128,
  },
  {
    id: "family",
    label: "가족 촬영",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80",
    count: 189,
  },
  {
    id: "id-photo",
    label: "증명사진",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    count: 312,
  },
  {
    id: "body-profile",
    label: "바디프로필",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    count: 87,
  },
  {
    id: "concept",
    label: "컨셉촬영",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80",
    count: 156,
  },
];

export default function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 lg:py-40 bg-[var(--color-charcoal)]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-5">
            Categories
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white-force">
            촬영 유형별 스튜디오
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {categoryData.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/search?category=${cat.id}`} className="block group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-[var(--color-gold)]/0 group-hover:bg-[var(--color-gold)]/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <h3 className="text-xl font-bold drop-shadow-lg text-gold-force">
                      {cat.label}
                    </h3>
                    <p className="text-white-force text-sm mt-1">{cat.count}개</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
