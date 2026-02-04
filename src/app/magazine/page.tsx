"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Bookmark, TrendingUp, Lightbulb, MessageSquare } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const categories = [
  { id: "all", label: "전체", icon: null },
  { id: "tips", label: "촬영 팁", icon: Lightbulb },
  { id: "interview", label: "인터뷰", icon: MessageSquare },
  { id: "trend", label: "트렌드", icon: TrendingUp },
];

const featuredArticle = {
  id: "featured-1",
  title: "2024 프로필 사진 트렌드: 자연스러움이 답이다",
  excerpt: "인위적인 포즈는 그만! 올해 프로필 사진 트렌드의 핵심은 '자연스러움'입니다. 전문 포토그래퍼들이 말하는 자연스러운 프로필 사진 촬영 비법을 공개합니다.",
  category: "trend",
  categoryKr: "트렌드",
  author: "김예진 에디터",
  date: "2024.03.15",
  readTime: "8분",
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
  isFeatured: true,
};

const articles = [
  {
    id: "article-1",
    title: "웨딩 촬영 전 꼭 알아야 할 10가지 체크리스트",
    excerpt: "완벽한 웨딩 촬영을 위한 준비물과 주의사항을 정리했습니다.",
    category: "tips",
    categoryKr: "촬영 팁",
    author: "박서연 에디터",
    date: "2024.03.12",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  },
  {
    id: "article-2",
    title: "[인터뷰] 루미에르 스튜디오 대표 포토그래퍼",
    excerpt: "20년 경력의 베테랑 포토그래퍼가 말하는 좋은 사진의 비밀.",
    category: "interview",
    categoryKr: "인터뷰",
    author: "이지호 에디터",
    date: "2024.03.10",
    readTime: "12분",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
  },
  {
    id: "article-3",
    title: "바디프로필, 촬영 2주 전부터 이렇게 준비하세요",
    excerpt: "전문 트레이너와 포토그래퍼가 알려주는 바디프로필 촬영 준비 가이드.",
    category: "tips",
    categoryKr: "촬영 팁",
    author: "최민수 에디터",
    date: "2024.03.08",
    readTime: "7분",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
  {
    id: "article-4",
    title: "2024 가족사진 컨셉 아이디어 20선",
    excerpt: "올해 유행하는 가족사진 컨셉과 스타일을 모아봤습니다.",
    category: "trend",
    categoryKr: "트렌드",
    author: "김예진 에디터",
    date: "2024.03.05",
    readTime: "6분",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
  },
  {
    id: "article-5",
    title: "[인터뷰] 성수동 힙한 컨셉 스튜디오 탐방기",
    excerpt: "MZ세대에게 인기 있는 성수동 컨셉 스튜디오를 방문했습니다.",
    category: "interview",
    categoryKr: "인터뷰",
    author: "박서연 에디터",
    date: "2024.03.01",
    readTime: "10분",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
  },
  {
    id: "article-6",
    title: "증명사진 잘 나오는 메이크업 & 헤어 팁",
    excerpt: "증명사진 전문 메이크업 아티스트가 알려주는 꿀팁 대방출!",
    category: "tips",
    categoryKr: "촬영 팁",
    author: "이지호 에디터",
    date: "2024.02.28",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function MagazinePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = activeCategory === "all"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-8" />
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-gold)] mb-6">
                PhotoPick Magazine
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-[var(--color-charcoal)] mb-6">
                매거진
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
                촬영 팁부터 트렌드까지, 더 나은 사진을 위한 모든 것
              </p>
            </motion.div>

            {/* Featured Article */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-20"
            >
              <Link
                href={`/magazine/${featuredArticle.id}`}
                className="group grid lg:grid-cols-2 gap-0 bg-white border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-colors overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[var(--color-gold)] text-white text-xs font-medium tracking-wider uppercase">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium">
                      {featuredArticle.categoryKr}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-beige-dark)]" />
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {featuredArticle.date}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-4 group-hover:text-[var(--color-gold)] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featuredArticle.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime} 읽기
                      </span>
                    </div>

                    <span className="flex items-center gap-2 text-[var(--color-gold)] font-medium text-sm group-hover:gap-3 transition-all">
                      자세히 보기
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>

        {/* Articles Section */}
        <section className="pb-20">
          <div className="container-wide">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-[var(--color-charcoal)] text-white"
                        : "bg-white border border-[var(--color-beige-dark)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {cat.label}
                  </button>
                );
              })}
            </motion.div>

            {/* Articles Grid */}
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article) => (
                <motion.article key={article.id} variants={itemVariants}>
                  <Link
                    href={`/magazine/${article.id}`}
                    className="group block bg-white border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-gold)] hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          // Bookmark logic
                        }}
                        aria-label="북마크"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium">
                          {article.categoryKr}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-beige-dark)]" />
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {article.date}
                        </span>
                      </div>

                      <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-beige)]">
                        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-[var(--color-gold)] transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button className="btn-outline">
                더 많은 아티클 보기
              </button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[var(--color-beige)]">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-4">
                매거진 구독하기
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                새로운 촬영 팁과 트렌드 소식을 이메일로 받아보세요.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-6 py-4 bg-white border border-[var(--color-beige-dark)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
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
