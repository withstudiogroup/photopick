"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Heart,
  MessageSquare,
  Gift,
  Settings,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Download,
  Edit2,
  Trash2,
  Camera,
  LogOut,
  AlertTriangle,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const mockUser = {
  name: "김민지",
  email: "minji.kim@email.com",
  phone: "010-1234-5678",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  joinDate: "2023.08.15",
  bookingCount: 12,
  reviewCount: 8,
  couponCount: 3,
  wishlistCount: 15,
};

const mockBookings = [
  {
    id: "BK001",
    studioName: "루미에르 스튜디오",
    productName: "프로필 A코스",
    date: "2024.02.15",
    time: "14:00",
    status: "upcoming",
    price: 75000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
  },
  {
    id: "BK002",
    studioName: "아뜰리에 르누아르",
    productName: "웨딩 스냅",
    date: "2024.01.28",
    time: "10:00",
    status: "completed",
    price: 250000,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
  },
  {
    id: "BK003",
    studioName: "모멘트 스튜디오",
    productName: "가족사진",
    date: "2024.01.10",
    time: "15:00",
    status: "completed",
    price: 180000,
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80",
  },
];

const mockWishlists = [
  {
    id: "studio-1",
    name: "루미에르 스튜디오",
    category: "프로필",
    location: "강남역 3번 출구",
    rating: 4.9,
    reviewCount: 328,
    priceFrom: 50000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
  },
  {
    id: "studio-2",
    name: "아뜰리에 르누아르",
    category: "웨딩",
    location: "신사동",
    rating: 4.8,
    reviewCount: 256,
    priceFrom: 200000,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
  },
];

const mockCoupons = [
  {
    id: "CP001",
    name: "신규회원 10% 할인",
    discount: "10%",
    minPrice: 50000,
    expiry: "2024.01.25",
    isUsed: false,
  },
  {
    id: "CP002",
    name: "봄맞이 5,000원 할인",
    discount: "5,000원",
    minPrice: 30000,
    expiry: "2024.04.15",
    isUsed: false,
  },
  {
    id: "CP003",
    name: "첫 예약 15% 할인",
    discount: "15%",
    minPrice: 100000,
    expiry: "2024.02.28",
    isUsed: true,
  },
];

const tabs = [
  { id: "bookings", label: "예약 내역", icon: Calendar },
  { id: "wishlist", label: "찜 목록", icon: Heart },
  { id: "reviews", label: "리뷰 관리", icon: MessageSquare },
  { id: "coupons", label: "쿠폰함", icon: Gift },
  { id: "settings", label: "회원정보", icon: Settings },
];

function BookingsTab() {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return { label: "예약 확정", color: "text-[#4A7C59] bg-[#4A7C59]/10" };
      case "completed":
        return { label: "촬영 완료", color: "text-[var(--color-text-muted)] bg-[var(--color-beige)]" };
      case "cancelled":
        return { label: "취소됨", color: "text-[#C75D5D] bg-[#C75D5D]/10" };
      default:
        return { label: status, color: "text-[var(--color-text-muted)] bg-[var(--color-beige)]" };
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[var(--color-charcoal)]">예약 내역</h2>
        <label htmlFor="booking-filter" className="sr-only">예약 상태 필터</label>
        <select 
          id="booking-filter"
          className="px-4 py-2 border border-[var(--color-beige-dark)] text-sm focus:border-[var(--color-gold)] outline-none transition-colors"
          aria-label="예약 상태 필터"
        >
          <option>전체</option>
          <option>예약 확정</option>
          <option>촬영 완료</option>
          <option>취소됨</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockBookings.map((booking, index) => {
          const status = getStatusLabel(booking.status);
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6"
            >
              <div className="flex gap-5">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image
                    src={booking.image}
                    alt={booking.studioName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`inline-block px-2.5 py-1 text-[11px] font-medium ${status.color}`}>
                        {status.label}
                      </span>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">예약번호: {booking.id}</p>
                    </div>
                    <span className="text-lg font-medium text-[var(--color-gold)]">
                      {formatPrice(booking.price)}원
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--color-charcoal)] mb-1">
                    {booking.studioName}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">{booking.productName}</p>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-beige)]">
                {booking.status === "upcoming" && (
                  <>
                    <Link
                      href={`/studio/${booking.id}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                    >
                      스튜디오 정보
                    </Link>
                    <button className="flex-1 py-2.5 text-center text-sm font-medium text-[#C75D5D] border border-[#C75D5D]/30 hover:border-[#C75D5D] transition-colors">
                      예약 취소
                    </button>
                  </>
                )}
                {booking.status === "completed" && (
                  <>
                    <button className="flex-1 py-2.5 text-center text-sm font-medium border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      사진 다운로드
                    </button>
                    <Link
                      href={`/studio/${booking.id}#reviews`}
                      className="flex-1 py-2.5 text-center text-sm font-medium bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] transition-colors"
                    >
                      리뷰 작성
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function WishlistTab() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">찜 목록</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {mockWishlists.map((studio, index) => (
          <motion.article
            key={studio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] group"
          >
            <Link href={`/studio/${studio.id}`} className="relative aspect-[16/10] block overflow-hidden">
              <Image
                src={studio.image}
                alt={studio.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button 
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="찜 취소"
                aria-pressed="true"
              >
                <Heart className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" aria-hidden="true" />
              </button>
            </Link>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] font-medium mb-1">
                {studio.category}
              </p>
              <h3 className="font-display text-lg text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                {studio.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  <span className="font-medium">{studio.rating}</span>
                </div>
                <span>·</span>
                <span>{studio.location}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-beige)]">
                <span className="text-lg font-medium text-[var(--color-charcoal)]">
                  {formatPrice(studio.priceFrom)}원~
                </span>
                <Link
                  href={`/studio/${studio.id}`}
                  className="text-sm font-medium text-[var(--color-gold)] hover:underline"
                >
                  상세보기
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div>
      <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">리뷰 관리</h2>
      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 text-center">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[var(--color-beige-dark)]" />
        <p className="text-[var(--color-text-secondary)] mb-4">작성한 리뷰가 없습니다</p>
        <Link href="/search" className="text-sm text-[var(--color-gold)] hover:underline">
          예약하고 리뷰 작성하기
        </Link>
      </div>
    </div>
  );
}

function CouponsTab() {
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">쿠폰함</h2>
      <div className="space-y-3">
        {mockCoupons.map((coupon, index) => {
          const daysLeft = getDaysUntilExpiry(coupon.expiry);
          const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6 ${
                coupon.isUsed ? "opacity-50" : ""
              }`}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[var(--color-ivory)] rounded-r-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[var(--color-ivory)] rounded-l-full" />

              {isExpiringSoon && !coupon.isUsed && (
                <div className="absolute -top-2 left-6 bg-[#C75D5D] text-white text-[10px] px-2 py-0.5 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                  {daysLeft === 0 ? "오늘 만료" : `${daysLeft}일 남음`}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center pr-6 border-r border-dashed border-[var(--color-beige-dark)]">
                    <p className="text-2xl font-medium text-[var(--color-gold)]">{coupon.discount}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">할인</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-charcoal)] mb-1">{coupon.name}</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {new Intl.NumberFormat("ko-KR").format(coupon.minPrice)}원 이상 결제 시 사용 가능
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs mb-2 ${isExpiringSoon ? "text-[#C75D5D] font-medium" : "text-[var(--color-text-muted)]"}`}>
                    {coupon.expiry}까지
                  </p>
                  {coupon.isUsed ? (
                    <span className="text-sm text-[var(--color-text-muted)]">사용완료</span>
                  ) : (
                    <Link href="/search" className="btn-gold btn-sm">
                      사용하기
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toast = useToast();

  const handleDeleteAccount = () => {
    // 실제로는 API 호출
    setShowDeleteModal(false);
    toast.success("회원 탈퇴가 완료되었습니다");
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">회원정보</h2>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-6">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[var(--color-beige)]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={mockUser.profileImage}
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <button 
              className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-gold-dark)] transition-colors"
              aria-label="프로필 사진 변경"
            >
              <Camera className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div>
            <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-1">{mockUser.name}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">가입일: {mockUser.joinDate}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={mockUser.email}
              readOnly
              className="form-input bg-[var(--color-beige)]"
            />
          </div>
          <div>
            <label className="form-label">연락처</label>
            <input
              type="tel"
              defaultValue={mockUser.phone}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">비밀번호</label>
            <button className="w-full py-4 border border-[var(--color-beige-dark)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
              비밀번호 변경
            </button>
          </div>
        </div>

        <button className="mt-8 w-full btn-gold">정보 저장</button>
      </div>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8">
        <h3 className="font-medium text-[var(--color-charcoal)] mb-4">계정 관리</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors border-b border-[var(--color-beige)]">
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              로그아웃
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between py-3 text-sm text-[#C75D5D] hover:text-[#a04545] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              회원 탈퇴
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[var(--color-white)] p-8 max-w-md w-full mx-4"
              role="dialog"
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-desc"
            >
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-[var(--color-beige)] transition-colors"
                aria-label="모달 닫기"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C75D5D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#C75D5D]" aria-hidden="true" />
                </div>
                <h3 id="delete-modal-title" className="font-display text-2xl text-[var(--color-charcoal)] mb-2">
                  회원 탈퇴
                </h3>
                <p id="delete-modal-desc" className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  정말로 탈퇴하시겠습니까?
                  <br />
                  모든 예약 내역과 쿠폰이 삭제되며,
                  <br />
                  복구할 수 없습니다.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 border border-[var(--color-beige-dark)] text-sm font-medium hover:bg-[var(--color-beige)] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-3 bg-[#C75D5D] text-white text-sm font-medium hover:bg-[#a04545] transition-colors"
                >
                  탈퇴하기
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("bookings");

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return <BookingsTab />;
      case "wishlist":
        return <WishlistTab />;
      case "reviews":
        return <ReviewsTab />;
      case "coupons":
        return <CouponsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-20">
      <div className="container-wide py-10">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] sticky top-24">
              <div className="p-6 border-b border-[var(--color-beige-dark)]">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={mockUser.profileImage}
                      alt="프로필"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-lg text-[var(--color-charcoal)]">
                      {mockUser.name}
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)]">{mockUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-2 border-b border-[var(--color-beige-dark)]">
                <div className="text-center py-3 bg-[var(--color-beige)]/50">
                  <p className="text-lg font-medium text-[var(--color-gold)]">{mockUser.bookingCount}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">예약</p>
                </div>
                <div className="text-center py-3 bg-[var(--color-beige)]/50">
                  <p className="text-lg font-medium text-[var(--color-gold)]">{mockUser.couponCount}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">쿠폰</p>
                </div>
              </div>

              <nav className="p-2" role="tablist" aria-label="마이페이지 탭">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`${tab.id}-panel`}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors ${
                        activeTab === tab.id
                          ? "text-[var(--color-gold)] bg-[var(--color-beige)]/50 font-medium"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-beige)]/30"
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max pb-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "bg-[var(--color-charcoal)] text-white"
                          : "bg-[var(--color-white)] border border-[var(--color-beige-dark)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              role="tabpanel"
              id={`${activeTab}-panel`}
              aria-labelledby={`${activeTab}-tab`}
            >
              {renderTabContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
