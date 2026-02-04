"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Heart, Users, Sparkles, Gem, Dumbbell } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const categoryData = [
  {
    id: "profile",
    title: "프로필",
    titleEn: "Profile",
    description: "당신의 첫인상을 완성하는 프로필 촬영. 자연스럽고 세련된 이미지로 특별한 순간을 담아드립니다.",
    studioCount: 128,
    priceFrom: 25000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    icon: Camera,
    gradient: "from-amber-900/80 via-amber-800/60 to-transparent",
  },
  {
    id: "wedding",
    title: "웨딩",
    titleEn: "Wedding",
    description: "평생 간직할 특별한 순간. 로맨틱하고 감동적인 웨딩 촬영으로 사랑의 추억을 남기세요.",
    studioCount: 86,
    priceFrom: 150000,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    icon: Heart,
    gradient: "from-rose-900/80 via-rose-800/60 to-transparent",
  },
  {
    id: "family",
    title: "가족",
    titleEn: "Family",
    description: "소중한 가족과 함께하는 따뜻한 순간. 세대를 넘어 전해지는 아름다운 가족사진을 만들어드립니다.",
    studioCount: 94,
    priceFrom: 60000,
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80",
    icon: Users,
    gradient: "from-emerald-900/80 via-emerald-800/60 to-transparent",
  },
  {
    id: "id-photo",
    title: "증명사진",
    titleEn: "ID Photo",
    description: "완벽한 첫인상을 위한 전문 증명사진. 취업, 여권, 비자 등 모든 용도에 맞는 고품질 촬영.",
    studioCount: 156,
    priceFrom: 20000,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80",
    icon: Gem,
    gradient: "from-blue-900/80 via-blue-800/60 to-transparent",
  },
  {
    id: "body-profile",
    title: "바디프로필",
    titleEn: "Body Profile",
    description: "당신의 노력을 예술로 기록합니다. 전문 조명과 포즈로 완성하는 바디프로필 촬영.",
    studioCount: 42,
    priceFrom: 120000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    icon: Dumbbell,
    gradient: "from-slate-900/80 via-slate-800/60 to-transparent",
  },
  {
    id: "concept",
    title: "컨셉촬영",
    titleEn: "Concept",
    description: "상상을 현실로 만드는 컨셉 촬영. 레트로, 빈티지, 뉴트로 등 다양한 테마로 특별함을 선사합니다.",
    studioCount: 67,
    priceFrom: 80000,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&q=80",
    icon: Sparkles,
    gradient: "from-purple-900/80 via-purple-800/60 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CategoriesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--color-charcoal)]">
            <div className="absolute inset-0 opacity-30">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)] via-[var(--color-charcoal)]/90 to-[var(--color-charcoal)]" />
          </div>

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-8" />
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-gold)] mb-6 font-medium">
                Shooting Categories
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
                촬영 유형
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                당신이 원하는 촬영 스타일을 선택하세요.
                <br />
                PhotoPick이 최적의 스튜디오를 찾아드립니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoryData.map((category) => {
                const Icon = category.icon;
                const isHovered = hoveredId === category.id;

                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredId(category.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Link
                      href={`/search?category=${category.id}`}
                      className="group block relative aspect-[4/5] overflow-hidden bg-[var(--color-charcoal)]"
                    >
                      {/* Background Image */}
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        {/* Top */}
                        <div className="flex items-start justify-between">
                          <motion.div
                            animate={{
                              scale: isHovered ? 1.1 : 1,
                              rotate: isHovered ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs tracking-wider uppercase">
                              {category.studioCount}개 스튜디오
                            </p>
                          </div>
                        </div>

                        {/* Bottom */}
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">
                            {category.titleEn}
                          </p>
                          <h2 className="font-display text-4xl text-white mb-3">
                            {category.title}
                          </h2>
                          <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                            {category.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-white">
                              <span className="text-sm text-white/60">최저</span>{" "}
                              <span className="text-lg font-medium text-[var(--color-gold)]">
                                {formatPrice(category.priceFrom)}
                              </span>
                              <span className="text-sm text-white/60">원~</span>
                            </p>

                            <motion.div
                              animate={{ x: isHovered ? 5 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-10 h-10 rounded-full bg-[var(--color-gold)] flex items-center justify-center"
                            >
                              <ArrowRight className="w-5 h-5 text-white" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 border-2 border-[var(--color-gold)] pointer-events-none"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--color-beige)]">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-charcoal)] mb-6">
                원하는 유형을 못 찾으셨나요?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                PhotoPick의 전문 상담사가 당신에게 딱 맞는 스튜디오를 추천해드립니다.
              </p>
              <Link href="/search" className="btn-gold inline-flex items-center gap-2">
                <span>전체 스튜디오 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
