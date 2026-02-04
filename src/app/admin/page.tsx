"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  DollarSign,
  Eye,
  MessageSquare,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "오늘 예약",
    value: "12",
    change: "+3",
    changeType: "positive",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    label: "이번 달 매출",
    value: "2,450,000",
    suffix: "원",
    change: "+18%",
    changeType: "positive",
    icon: DollarSign,
    color: "bg-[var(--color-gold)]",
  },
  {
    label: "총 리뷰",
    value: "328",
    change: "+12",
    changeType: "positive",
    icon: Star,
    color: "bg-amber-500",
  },
  {
    label: "평균 평점",
    value: "4.9",
    change: "+0.1",
    changeType: "positive",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
];

const todayBookings = {
  confirmed: 8,
  pending: 3,
  completed: 1,
};

const recentBookings = [
  {
    id: "BK001",
    customerName: "김민지",
    product: "프로필 A코스",
    date: "2024.03.20",
    time: "14:00",
    status: "confirmed",
    price: 50000,
  },
  {
    id: "BK002",
    customerName: "이서연",
    product: "프로필 B코스",
    date: "2024.03.20",
    time: "16:00",
    status: "pending",
    price: 80000,
  },
  {
    id: "BK003",
    customerName: "박지훈",
    product: "프로필 A코스",
    date: "2024.03.21",
    time: "10:00",
    status: "confirmed",
    price: 50000,
  },
  {
    id: "BK004",
    customerName: "최예진",
    product: "프로필 C코스",
    date: "2024.03.21",
    time: "13:00",
    status: "pending",
    price: 150000,
  },
  {
    id: "BK005",
    customerName: "정하늘",
    product: "프로필 A코스",
    date: "2024.03.22",
    time: "15:00",
    status: "confirmed",
    price: 50000,
  },
];

const recentReviews = [
  {
    id: "RV001",
    customerName: "김**",
    rating: 5,
    content: "자연광이 너무 예쁘게 들어와서 사진이 정말 잘 나왔어요! 작가님도 친절하시고...",
    date: "2024.03.18",
    hasReply: true,
  },
  {
    id: "RV002",
    customerName: "이**",
    rating: 5,
    content: "분위기도 좋고 사진도 예쁘게 나왔습니다. 다음에도 이용할게요!",
    date: "2024.03.17",
    hasReply: false,
  },
  {
    id: "RV003",
    customerName: "박**",
    rating: 4,
    content: "전체적으로 만족스러웠습니다. 다만 대기 시간이 조금 길었어요.",
    date: "2024.03.16",
    hasReply: false,
  },
];

const quickActions = [
  { label: "새 예약 등록", href: "/admin/bookings?new=true", icon: Plus },
  { label: "상품 추가", href: "/admin/products?new=true", icon: Plus },
  { label: "포트폴리오 업로드", href: "/admin/portfolio", icon: Plus },
];

const statusConfig = {
  confirmed: { label: "확정", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
  pending: { label: "대기", color: "text-amber-600 bg-amber-50", icon: Clock },
  cancelled: { label: "취소", color: "text-red-600 bg-red-50", icon: XCircle },
  completed: { label: "완료", color: "text-gray-600 bg-gray-50", icon: CheckCircle2 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-display text-3xl text-[var(--color-charcoal)]">대시보드</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          스튜디오 운영 현황을 한눈에 확인하세요.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                  <p className="text-3xl font-semibold text-[var(--color-charcoal)] mt-2">
                    {stat.value}
                    {stat.suffix && <span className="text-lg font-normal ml-1">{stat.suffix}</span>}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">지난 달 대비</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Today's Booking Status + Quick Actions */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
        {/* Today's Status */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
          <h2 className="font-display text-xl text-[var(--color-charcoal)] mb-6">오늘의 예약 현황</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-emerald-600">{todayBookings.confirmed}</p>
              <p className="text-sm text-emerald-700 mt-1">확정</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-amber-600">{todayBookings.pending}</p>
              <p className="text-sm text-amber-700 mt-1">승인 대기</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-600">{todayBookings.completed}</p>
              <p className="text-sm text-gray-600 mt-1">완료</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[var(--color-charcoal)] rounded-xl p-6 text-white">
          <h2 className="font-display text-xl mb-6">빠른 작업</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-[var(--color-gold)] rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="flex-1">{action.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Recent Bookings + Recent Reviews */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-[var(--color-beige-dark)]"
        >
          <div className="p-6 border-b border-[var(--color-beige-dark)] flex items-center justify-between">
            <h2 className="font-display text-xl text-[var(--color-charcoal)]">최근 예약</h2>
            <Link
              href="/admin/bookings"
              className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1"
            >
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-beige)]">
            {recentBookings.map((booking) => {
              const status = statusConfig[booking.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <div key={booking.id} className="p-4 hover:bg-[var(--color-beige)]/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[var(--color-charcoal)]">{booking.customerName}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{booking.product}</p>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-gold)]">
                      {formatPrice(booking.price)}원
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)]">
                    <span>{booking.date}</span>
                    <span>{booking.time}</span>
                    <span className="text-[var(--color-beige-dark)]">|</span>
                    <span>{booking.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-[var(--color-beige-dark)]"
        >
          <div className="p-6 border-b border-[var(--color-beige-dark)] flex items-center justify-between">
            <h2 className="font-display text-xl text-[var(--color-charcoal)]">최근 리뷰</h2>
            <Link
              href="/admin/reviews"
              className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1"
            >
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-beige)]">
            {recentReviews.map((review) => (
              <div key={review.id} className="p-4 hover:bg-[var(--color-beige)]/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-charcoal)]">{review.customerName}</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "text-[var(--color-gold)] fill-[var(--color-gold)]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.hasReply ? (
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      답변 완료
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      답변 필요
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">
                  {review.content}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
