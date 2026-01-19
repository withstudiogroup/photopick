"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronDown,
  Map,
  Grid3X3,
  LayoutList,
  Star,
  Heart,
  Zap,
  ArrowRight,
} from "lucide-react";

import { studios, categories, facilities } from "@/data/studios";

function PriceRangeSlider() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const formatPrice = (price: number) => {
    if (price >= 500000) return "50만원+";
    return `${(price / 10000).toFixed(0)}만원`;
  };

  return (
    <div className="filter-section">
      <h4 className="filter-title">가격</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">{formatPrice(minPrice)}</span>
          <span className="text-[var(--color-text-muted)]">{formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="range-slider"
        />
      </div>
    </div>
  );
}

function FilterSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tags = [
    "감성스튜디오",
    "미니멀",
    "프리미엄",
    "가성비",
    "뷰맛집",
    "역세권",
    "자연광",
    "빈티지",
  ];

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-72
        bg-[var(--color-white)] z-50 lg:z-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto lg:sticky lg:top-24
      `}
      >
        <div className="p-6 lg:p-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="font-display text-xl">필터</h3>
            <button onClick={onClose} className="p-2 hover:bg-[var(--color-beige)] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:block mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all text-sm font-medium">
              <Map className="w-4 h-4" />
              지도로 보기
            </button>
          </div>

          <div className="lg:bg-[var(--color-white)] lg:border lg:border-[var(--color-beige-dark)] lg:p-6">
            <div className="filter-section border-t-0 pt-0">
              <label className="checkbox-custom">
                <input type="checkbox" />
                <span className="text-sm">예약 불가 스튜디오 제외</span>
              </label>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">촬영 유형</h4>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="radio-custom">
                    <input type="radio" name="category" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <PriceRangeSlider />

            <div className="filter-section">
              <h4 className="filter-title">#태그</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="tag text-[11px]"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">편의시설</h4>
              <div className="space-y-3">
                {facilities.slice(0, 6).map((facility) => (
                  <label key={facility.id} className="checkbox-custom">
                    <input type="checkbox" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {facility.icon} {facility.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">평점</h4>
              <div className="space-y-3">
                {["4.5점 이상", "4.0점 이상", "3.5점 이상"].map((rating) => (
                  <label key={rating} className="radio-custom">
                    <input type="radio" name="rating" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{rating}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section border-b-0 pb-0">
              <h4 className="filter-title">예약 유형</h4>
              <div className="space-y-3">
                <label className="checkbox-custom">
                  <input type="checkbox" />
                  <span className="text-sm text-[var(--color-text-secondary)]">즉시예약 가능</span>
                </label>
                <label className="checkbox-custom">
                  <input type="checkbox" />
                  <span className="text-sm text-[var(--color-text-secondary)]">당일예약 가능</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-6">
            <button onClick={onClose} className="btn-gold w-full">
              필터 적용
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("추천순");

  const options = ["추천순", "평점순", "리뷰많은순", "가격낮은순", "가격높은순", "거리순"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-colors text-sm font-medium"
      >
        {selected}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 bg-[var(--color-white)] border border-[var(--color-beige-dark)] shadow-lg z-20 min-w-[160px]"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-[var(--color-beige)] transition-colors ${
                  selected === option ? "text-[var(--color-gold)] font-medium" : "text-[var(--color-text-secondary)]"
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

function ViewToggle({
  view,
  setView,
}: {
  view: "list" | "grid";
  setView: (view: "list" | "grid") => void;
}) {
  return (
    <div className="hidden md:flex items-center border border-[var(--color-beige-dark)]">
      <button
        onClick={() => setView("list")}
        className={`p-2.5 transition-colors ${
          view === "list" ? "bg-[var(--color-charcoal)] text-white" : "hover:bg-[var(--color-beige)]"
        }`}
      >
        <LayoutList className="w-4 h-4" />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-2.5 transition-colors ${
          view === "grid" ? "bg-[var(--color-charcoal)] text-white" : "hover:bg-[var(--color-beige)]"
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
      </button>
    </div>
  );
}

function StudioCardHorizontal({ studio, index }: { studio: typeof studios[0]; index: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="studio-card-horizontal group"
    >
      <Link href={`/studio/${studio.id}`} className="relative w-full md:w-80 aspect-[4/3] md:aspect-auto md:h-auto flex-shrink-0">
        <Image
          src={studio.images[0]}
          alt={studio.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {studio.isPick && (
            <span className="badge-outline text-[10px] bg-white/90 backdrop-blur-sm">PICK</span>
          )}
          {studio.isInstantBooking && (
            <span className="badge badge-gold text-[10px]">
              <Zap className="w-3 h-3 mr-1" />
              즉시예약
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-[var(--color-text-secondary)]"
            }`}
          />
        </button>
      </Link>

      <div className="flex-1 p-5 md:p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] font-medium mb-1">
              {studio.categoryKr}
            </p>
            <Link href={`/studio/${studio.id}`}>
              <h3 className="font-display text-xl text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors">
                {studio.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-1 bg-[var(--color-beige)] px-2 py-1">
            <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            <span className="text-sm font-medium">{studio.rating}</span>
            <span className="text-xs text-[var(--color-text-muted)]">({studio.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] mb-3">
          <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
          <span>{studio.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {studio.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[11px] text-[var(--color-text-muted)] bg-[var(--color-beige)] px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-[var(--color-beige-dark)]">
          <div>
            {studio.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[var(--color-text-muted)] line-through">
                  {formatPrice(studio.priceFrom)}원
                </span>
                <span className="text-xl font-medium text-[var(--color-gold)]">
                  {formatPrice(studio.discountPrice)}원~
                </span>
              </div>
            ) : (
              <span className="text-xl font-medium text-[var(--color-charcoal)]">
                {formatPrice(studio.priceFrom)}원~
              </span>
            )}
          </div>
          <Link
            href={`/studio/${studio.id}`}
            className="flex items-center gap-1 text-sm font-medium text-[var(--color-gold)] hover:gap-2 transition-all"
          >
            상세보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function StudioCardGrid({ studio, index }: { studio: typeof studios[0]; index: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-premium group"
    >
      <Link href={`/studio/${studio.id}`} className="relative aspect-[4/3] block overflow-hidden">
        <Image
          src={studio.images[0]}
          alt={studio.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {studio.isPick && (
            <span className="badge-outline text-[10px] bg-white/90 backdrop-blur-sm">PICK</span>
          )}
          {studio.isInstantBooking && (
            <span className="badge badge-gold text-[10px]">즉시예약</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-[var(--color-text-secondary)]"
            }`}
          />
        </button>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] font-medium mb-1">
              {studio.categoryKr}
            </p>
            <Link href={`/studio/${studio.id}`}>
              <h3 className="font-display text-lg text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors">
                {studio.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            <span className="font-medium">{studio.rating}</span>
          </div>
          <span className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-secondary)]">{studio.location}</span>
        </div>

        <div className="flex items-baseline gap-2">
          {studio.discountPrice ? (
            <>
              <span className="text-sm text-[var(--color-text-muted)] line-through">
                {formatPrice(studio.priceFrom)}원
              </span>
              <span className="text-lg font-medium text-[var(--color-gold)]">
                {formatPrice(studio.discountPrice)}원~
              </span>
            </>
          ) : (
            <span className="text-lg font-medium text-[var(--color-charcoal)]">
              {formatPrice(studio.priceFrom)}원~
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function SearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-20">
      <div className="bg-[var(--color-white)] border-b border-[var(--color-beige-dark)]">
        <div className="container-wide py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display text-3xl text-center text-[var(--color-charcoal)] mb-6">
              스튜디오 검색
            </h1>

            <div className="search-box p-1.5 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gold)]" />
                <input
                  type="text"
                  placeholder="지역, 스튜디오명으로 검색"
                  defaultValue="강남"
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[var(--color-charcoal)] text-[15px] outline-none placeholder:text-[var(--color-text-muted)]"
                />
              </div>
              <button className="btn-gold md:px-8">검색</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            <span className="text-sm text-[var(--color-text-muted)]">적용된 필터:</span>
            {["강남", "프로필", "즉시예약"].map((filter) => (
              <button
                key={filter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-beige)] text-sm hover:bg-[var(--color-gold)] hover:text-white transition-colors"
              >
                {filter}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button className="text-sm text-[var(--color-gold)] hover:underline ml-2">
              초기화
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="flex gap-10">
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] transition-colors text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  필터
                </button>
                <p className="text-[var(--color-text-secondary)]">
                  <span className="font-medium text-[var(--color-charcoal)]">&apos;강남&apos;</span> 검색 결과{" "}
                  <span className="text-[var(--color-gold)] font-semibold">{studios.length}</span>개
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ViewToggle view={view} setView={setView} />
                <SortDropdown />
              </div>
            </div>

            {view === "list" ? (
              <div className="space-y-5">
                {studios.map((studio, index) => (
                  <StudioCardHorizontal key={studio.id} studio={studio} index={index} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {studios.map((studio, index) => (
                  <StudioCardGrid key={studio.id} studio={studio} index={index} />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-1 mt-12">
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
                &lt;
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    page === 1
                      ? "bg-[var(--color-charcoal)] text-white"
                      : "border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
