"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  MapPin,
  X,
  Zap,
  User,
  ArrowRight,
  Trash2,
  Share2,
  ChevronDown,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useToast } from "@/components/ui/Toast";

// 로그인 상태를 시뮬레이션 (실제로는 auth context 사용)
const isLoggedIn = true;

const mockWishlist = [
  {
    id: "studio-1",
    name: "루미에르 스튜디오",
    category: "프로필",
    location: "강남역 5분",
    address: "서울특별시 강남구 역삼동 123-45",
    rating: 4.9,
    reviewCount: 328,
    priceFrom: 50000,
    discountPrice: 45000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    tags: ["자연광", "감성스튜디오", "프리미엄"],
    isInstantBooking: true,
    addedAt: "2024.03.10",
  },
  {
    id: "studio-2",
    name: "모먼트 스튜디오",
    category: "웨딩",
    location: "홍대입구역 3분",
    address: "서울특별시 마포구 서교동 456-78",
    rating: 4.8,
    reviewCount: 256,
    priceFrom: 200000,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    tags: ["웨딩스냅", "로맨틱", "야외촬영"],
    isInstantBooking: true,
    addedAt: "2024.03.08",
  },
  {
    id: "studio-3",
    name: "패밀리 포토",
    category: "가족",
    location: "성수역 5분",
    address: "서울특별시 성동구 성수동 789-12",
    rating: 4.9,
    reviewCount: 412,
    priceFrom: 80000,
    discountPrice: 72000,
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    tags: ["가족사진", "아이촬영", "편안한분위기"],
    isInstantBooking: true,
    addedAt: "2024.03.05",
  },
  {
    id: "studio-5",
    name: "바디라인 스튜디오",
    category: "바디프로필",
    location: "압구정역 7분",
    address: "서울특별시 강남구 신사동 567-89",
    rating: 4.8,
    reviewCount: 189,
    priceFrom: 150000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    tags: ["바디프로필", "피트니스", "전문조명"],
    isInstantBooking: false,
    addedAt: "2024.03.01",
  },
];

const sortOptions = [
  { id: "recent", label: "최근 추가순" },
  { id: "rating", label: "평점 높은순" },
  { id: "price-low", label: "가격 낮은순" },
  { id: "price-high", label: "가격 높은순" },
];

function LoginRequired() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-beige)] flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-[var(--color-gold)]" />
          </div>

          <h1 className="font-display text-3xl text-[var(--color-charcoal)] mb-4">
            로그인이 필요합니다
          </h1>

          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            찜 목록을 확인하려면 로그인해주세요.
            <br />
            로그인 후 관심 스튜디오를 저장하고 관리할 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login" className="btn-gold">
              로그인하기
            </Link>
            <Link href="/auth/signup" className="btn-outline">
              회원가입
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-beige-dark)]">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              아직 계정이 없으신가요?
            </p>
            <Link
              href="/search"
              className="text-[var(--color-gold)] font-medium hover:underline inline-flex items-center gap-2"
            >
              먼저 스튜디오 둘러보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [sortBy, setSortBy] = useState("recent");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const toast = useToast();

  if (!isLoggedIn) {
    return <LoginRequired />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handleRemove = (studioId: string, studioName: string) => {
    setWishlist((prev) => prev.filter((s) => s.id !== studioId));
    toast.success(`${studioName}이(가) 찜 목록에서 삭제되었습니다.`);
  };

  const handleClearAll = () => {
    setWishlist([]);
    toast.success("찜 목록이 모두 삭제되었습니다.");
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return (a.discountPrice || a.priceFrom) - (b.discountPrice || b.priceFrom);
      case "price-high":
        return (b.discountPrice || b.priceFrom) - (a.discountPrice || a.priceFrom);
      default:
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)]">
        {/* Header */}
        <section className="pt-32 pb-12 bg-[var(--color-beige)]">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                  <h1 className="font-display text-4xl text-[var(--color-charcoal)]">
                    찜 목록
                  </h1>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  저장한 스튜디오 {wishlist.length}개
                </p>
              </div>

              {wishlist.length > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    전체 삭제
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-beige-dark)] text-sm"
                    >
                      {sortOptions.find((o) => o.id === sortBy)?.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 bg-white border border-[var(--color-beige-dark)] shadow-lg z-10 min-w-[160px]"
                        >
                          {sortOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSortBy(option.id);
                                setIsSortOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-sm hover:bg-[var(--color-beige)] transition-colors ${
                                sortBy === option.id
                                  ? "text-[var(--color-gold)] font-medium"
                                  : "text-[var(--color-text-secondary)]"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Wishlist Content */}
        <section className="py-12">
          <div className="container-wide">
            {wishlist.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-[var(--color-beige)] flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-[var(--color-text-muted)]" />
                </div>
                <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-4">
                  찜한 스튜디오가 없습니다
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-8">
                  마음에 드는 스튜디오를 찜해보세요!
                </p>
                <Link href="/search" className="btn-gold inline-flex items-center gap-2">
                  스튜디오 둘러보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {sortedWishlist.map((studio, index) => (
                    <motion.article
                      key={studio.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <Link
                          href={`/studio/${studio.id}`}
                          className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square overflow-hidden flex-shrink-0"
                        >
                          <Image
                            src={studio.image}
                            alt={studio.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {studio.discountPrice && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 bg-[var(--color-error)] text-white text-xs font-medium">
                                SALE
                              </span>
                            </div>
                          )}
                        </Link>

                        {/* Content */}
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-1">
                                {studio.category}
                              </p>
                              <Link
                                href={`/studio/${studio.id}`}
                                className="font-display text-xl text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors"
                              >
                                {studio.name}
                              </Link>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  // Share logic
                                  navigator.clipboard.writeText(`${window.location.origin}/studio/${studio.id}`);
                                  toast.success("링크가 복사되었습니다.");
                                }}
                                className="w-8 h-8 rounded-full hover:bg-[var(--color-beige)] flex items-center justify-center transition-colors"
                                aria-label="공유"
                              >
                                <Share2 className="w-4 h-4 text-[var(--color-text-muted)]" />
                              </button>
                              <button
                                onClick={() => handleRemove(studio.id, studio.name)}
                                className="w-8 h-8 rounded-full hover:bg-[var(--color-beige)] flex items-center justify-center transition-colors group/btn"
                                aria-label="찜 해제"
                              >
                                <X className="w-4 h-4 text-[var(--color-text-muted)] group-hover/btn:text-[var(--color-error)]" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] mb-3">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                              <span className="font-medium text-[var(--color-charcoal)]">
                                {studio.rating}
                              </span>
                              <span>({studio.reviewCount})</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {studio.location}
                            </span>
                          </div>

                          {studio.isInstantBooking && (
                            <div className="flex items-center gap-1 text-xs text-[var(--color-gold)] mb-3">
                              <Zap className="w-3.5 h-3.5" />
                              즉시예약
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-beige)]">
                            <div>
                              {studio.discountPrice ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[var(--color-text-muted)] line-through">
                                    {formatPrice(studio.priceFrom)}원
                                  </span>
                                  <span className="text-lg font-medium text-[var(--color-gold)]">
                                    {formatPrice(studio.discountPrice)}원~
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-medium text-[var(--color-charcoal)]">
                                  {formatPrice(studio.priceFrom)}원~
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/studio/${studio.id}`}
                              className="btn-gold btn-sm"
                            >
                              예약하기
                            </Link>
                          </div>

                          <p className="text-xs text-[var(--color-text-muted)] mt-3">
                            {studio.addedAt} 추가됨
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* Recommendation Section */}
        {wishlist.length > 0 && (
          <section className="py-12 bg-[var(--color-beige)]">
            <div className="container-wide">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl text-[var(--color-charcoal)]">
                  이런 스튜디오는 어떠세요?
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  찜 목록 기반 추천 스튜디오
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/search"
                  className="text-[var(--color-gold)] font-medium hover:underline inline-flex items-center gap-2"
                >
                  더 많은 스튜디오 보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
