"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronDown,
  Map,
  Grid3X3,
  List,
} from "lucide-react";

import { studios, categories, facilities } from "@/data/studios";
import StudioCard from "@/components/studio/StudioCard";

// Price Range Component
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
          <span className="text-[#666]">{formatPrice(minPrice)}</span>
          <span className="text-[#666]">{formatPrice(maxPrice)}</span>
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

// Filter Sidebar
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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-64
        bg-white lg:bg-transparent z-50 lg:z-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="font-display text-xl">필터</h3>
            <button onClick={onClose} className="p-2 hover:bg-[#F5F0E8] rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map View Toggle */}
          <div className="hidden lg:block mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#E8E0D4] hover:border-[#C9A962] transition-colors text-sm font-medium">
              <Map className="w-4 h-4" />
              지도로 보기
            </button>
          </div>

          {/* Exclude Unavailable */}
          <div className="filter-section">
            <label className="checkbox-custom">
              <input type="checkbox" />
              <span className="text-sm">예약 불가 스튜디오 제외</span>
            </label>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-title">촬영 유형</h4>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat.id} className="radio-custom">
                  <input type="radio" name="category" />
                  <span className="text-sm text-[#666]">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <PriceRangeSlider />

          {/* Tags */}
          <div className="filter-section">
            <h4 className="filter-title">#태그</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="tag text-[12px] hover:bg-[#C9A962] hover:text-white"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="filter-section">
            <h4 className="filter-title">편의시설</h4>
            <div className="space-y-3">
              {facilities.map((facility) => (
                <label key={facility.id} className="checkbox-custom">
                  <input type="checkbox" />
                  <span className="text-sm text-[#666]">
                    {facility.icon} {facility.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <h4 className="filter-title">평점</h4>
            <div className="space-y-3">
              {["4.5점 이상", "4.0점 이상", "3.5점 이상"].map((rating) => (
                <label key={rating} className="radio-custom">
                  <input type="radio" name="rating" />
                  <span className="text-sm text-[#666]">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Booking Type */}
          <div className="filter-section">
            <h4 className="filter-title">예약 유형</h4>
            <div className="space-y-3">
              <label className="checkbox-custom">
                <input type="checkbox" />
                <span className="text-sm text-[#666]">즉시예약 가능</span>
              </label>
              <label className="checkbox-custom">
                <input type="checkbox" />
                <span className="text-sm text-[#666]">당일예약 가능</span>
              </label>
            </div>
          </div>

          {/* Mobile Apply Button */}
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

// Sort Dropdown
function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("추천순");

  const options = ["추천순", "평점순", "리뷰많은순", "가격낮은순", "가격높은순", "거리순"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-[#E8E0D4] hover:border-[#C9A962] transition-colors text-sm"
      >
        {selected}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white border border-[#E8E0D4] shadow-lg z-20 min-w-[150px]">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F5F0E8] transition-colors ${
                  selected === option ? "text-[#C9A962] font-medium" : "text-[#666]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// View Toggle
function ViewToggle({
  view,
  setView,
}: {
  view: "list" | "grid";
  setView: (view: "list" | "grid") => void;
}) {
  return (
    <div className="hidden md:flex items-center border border-[#E8E0D4]">
      <button
        onClick={() => setView("list")}
        className={`p-2 transition-colors ${
          view === "list" ? "bg-[#2D2D2D] text-white" : "hover:bg-[#F5F0E8]"
        }`}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-2 transition-colors ${
          view === "grid" ? "bg-[#2D2D2D] text-white" : "hover:bg-[#F5F0E8]"
        }`}
      >
        <Grid3X3 className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function SearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      {/* Search Header */}
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="container-wide py-6">
          {/* Search Input */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
              <input
                type="text"
                placeholder="지역, 스튜디오명으로 검색"
                defaultValue="강남"
                className="w-full pl-12 pr-4 py-3 bg-[#F5F0E8] border-0 text-[15px] focus:ring-2 focus:ring-[#C9A962] outline-none"
              />
            </div>
            <button className="btn-gold">검색</button>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#666]">적용된 필터:</span>
            {["강남", "프로필", "즉시예약"].map((filter) => (
              <button
                key={filter}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#F5F0E8] text-sm hover:bg-[#E8E0D4] transition-colors"
              >
                {filter}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button className="text-sm text-[#C9A962] hover:underline">
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E8E0D4] hover:border-[#C9A962] transition-colors text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  필터
                </button>
                <p className="text-[#666]">
                  <span className="font-medium text-[#2D2D2D]">&apos;강남&apos;</span> 검색 결과{" "}
                  <span className="text-[#C9A962] font-medium">{studios.length}</span>개
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ViewToggle view={view} setView={setView} />
                <SortDropdown />
              </div>
            </div>

            {/* Results List */}
            {view === "list" ? (
              <div className="space-y-4">
                {studios.map((studio, index) => (
                  <StudioCard
                    key={studio.id}
                    studio={studio}
                    index={index}
                    variant="horizontal"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studios.map((studio, index) => (
                  <StudioCard key={studio.id} studio={studio} index={index} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-10 h-10 flex items-center justify-center border border-[#E8E0D4] hover:border-[#C9A962] transition-colors">
                &lt;
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    page === 1
                      ? "bg-[#2D2D2D] text-white"
                      : "border border-[#E8E0D4] hover:border-[#C9A962]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 flex items-center justify-center border border-[#E8E0D4] hover:border-[#C9A962] transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
