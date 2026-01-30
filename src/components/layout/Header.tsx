"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, User, Menu, X, MapPin, Calendar, Users } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <span
                  className={`font-display text-2xl font-medium tracking-tight transition-colors ${
                    isScrolled ? "text-[var(--color-charcoal)]" : "text-white"
                  }`}
                >
                  Photo
                </span>
                <span className="font-display text-2xl font-medium tracking-tight text-[var(--color-gold)]">
                  Pick
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-gold)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
              {[
                { href: "/search", label: "스튜디오 찾기" },
                { href: "/categories", label: "촬영 유형" },
                { href: "/events", label: "이벤트" },
                { href: "/magazine", label: "매거진" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-colors underline-animation focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                    isScrolled
                      ? "text-[var(--color-charcoal)] hover:text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      : "text-white/90 hover:text-white focus:ring-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="검색 열기"
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? "hover:bg-[var(--color-beige)] text-[var(--color-charcoal)] focus:ring-[var(--color-gold)]"
                    : "hover:bg-white/10 text-white focus:ring-white"
                }`}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="찜 목록"
                className={`p-2 rounded-full transition-colors hidden sm:flex focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? "hover:bg-[var(--color-beige)] text-[var(--color-charcoal)] focus:ring-[var(--color-gold)]"
                    : "hover:bg-white/10 text-white focus:ring-white"
                }`}
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
              </Link>

              {/* User Menu */}
              <Link
                href="/login"
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded text-[13px] font-medium tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? "text-[var(--color-charcoal)] hover:text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                    : "text-white hover:text-[var(--color-gold)] focus:ring-white"
                }`}
              >
                <User className="w-4 h-4" aria-hidden="true" />
                <span>로그인</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                className={`lg:hidden p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? "hover:bg-[var(--color-beige)] text-[var(--color-charcoal)] focus:ring-[var(--color-gold)]"
                    : "hover:bg-white/10 text-white focus:ring-white"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--color-charcoal)] pt-20"
          >
            <nav className="container-wide py-8" aria-label="모바일 메뉴">
              <div className="space-y-6">
                {[
                  { href: "/search", label: "스튜디오 찾기" },
                  { href: "/categories", label: "촬영 유형" },
                  { href: "/events", label: "이벤트" },
                  { href: "/magazine", label: "매거진" },
                  { href: "/wishlist", label: "찜 목록" },
                  { href: "/login", label: "로그인" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-display text-3xl text-white hover:text-[var(--color-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] rounded px-2 py-1"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container-wide py-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-[var(--color-charcoal)]">
                    스튜디오 검색
                  </h2>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-[var(--color-beige)] rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Tabs */}
                <div className="flex gap-6 mb-6 border-b border-[var(--color-beige-dark)]" role="tablist" aria-label="촬영 유형 탭">
                  {["프로필", "웨딩", "가족", "증명사진", "컨셉촬영"].map(
                    (tab, index) => (
                      <button
                        key={tab}
                        role="tab"
                        aria-selected={index === 0}
                        aria-controls={`search-panel-${index}`}
                        className={`pb-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] rounded px-2 ${
                          index === 0
                            ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-charcoal)]"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>

                {/* Search Form */}
                <form className="grid md:grid-cols-4 gap-4" role="search" aria-label="상세 스튜디오 검색">
                  <div className="relative">
                    <label htmlFor="modal-search-location" className="sr-only">촬영 지역</label>
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" aria-hidden="true" />
                    <input
                      id="modal-search-location"
                      type="text"
                      placeholder="지역 선택"
                      aria-label="촬영 지역 선택"
                      className="w-full pl-12 pr-4 py-4 bg-[var(--color-beige)] border-0 text-[15px] focus:ring-2 focus:ring-[var(--color-gold)] outline-none rounded"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="modal-search-date" className="sr-only">촬영 날짜</label>
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" aria-hidden="true" />
                    <input
                      id="modal-search-date"
                      type="text"
                      placeholder="날짜 선택"
                      aria-label="촬영 날짜 선택"
                      className="w-full pl-12 pr-4 py-4 bg-[var(--color-beige)] border-0 text-[15px] focus:ring-2 focus:ring-[var(--color-gold)] outline-none rounded"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="modal-search-people" className="sr-only">인원 수</label>
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" aria-hidden="true" />
                    <select 
                      id="modal-search-people"
                      aria-label="인원 수 선택"
                      className="w-full pl-12 pr-4 py-4 bg-[var(--color-beige)] border-0 text-[15px] focus:ring-2 focus:ring-[var(--color-gold)] outline-none appearance-none rounded"
                    >
                      <option>인원 선택</option>
                      <option>1명</option>
                      <option>2명</option>
                      <option>3명</option>
                      <option>4명 이상</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-gold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                    <Search className="w-4 h-4" aria-hidden="true" />
                    <span>검색</span>
                  </button>
                </form>

                {/* Popular Keywords */}
                <div className="mt-6">
                  <p className="text-[12px] text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                    인기 검색어
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "강남 프로필",
                      "홍대 스튜디오",
                      "웨딩 스냅",
                      "가족사진",
                      "바디프로필",
                      "컨셉촬영",
                    ].map((keyword) => (
                      <button
                        key={keyword}
                        className="tag hover:bg-[var(--color-gold)] hover:text-white"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
