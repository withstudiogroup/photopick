"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  List,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  X,
  Check,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  product: string;
  date: Date;
  time: string;
  status: BookingStatus;
  price: number;
  note?: string;
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    customerName: "김민지",
    customerPhone: "010-1234-5678",
    customerEmail: "minji@email.com",
    product: "프로필 A코스",
    date: new Date(2024, 2, 20),
    time: "14:00",
    status: "confirmed",
    price: 50000,
    note: "자연스러운 느낌으로 촬영 요청",
  },
  {
    id: "BK002",
    customerName: "이서연",
    customerPhone: "010-2345-6789",
    customerEmail: "seoyeon@email.com",
    product: "프로필 B코스",
    date: new Date(2024, 2, 20),
    time: "16:00",
    status: "pending",
    price: 80000,
  },
  {
    id: "BK003",
    customerName: "박지훈",
    customerPhone: "010-3456-7890",
    customerEmail: "jihun@email.com",
    product: "프로필 A코스",
    date: new Date(2024, 2, 21),
    time: "10:00",
    status: "confirmed",
    price: 50000,
  },
  {
    id: "BK004",
    customerName: "최예진",
    customerPhone: "010-4567-8901",
    customerEmail: "yejin@email.com",
    product: "프로필 C코스",
    date: new Date(2024, 2, 21),
    time: "13:00",
    status: "pending",
    price: 150000,
    note: "헤어메이크업 포함 문의",
  },
  {
    id: "BK005",
    customerName: "정하늘",
    customerPhone: "010-5678-9012",
    customerEmail: "haneul@email.com",
    product: "프로필 A코스",
    date: new Date(2024, 2, 22),
    time: "15:00",
    status: "completed",
    price: 50000,
  },
  {
    id: "BK006",
    customerName: "강민수",
    customerPhone: "010-6789-0123",
    customerEmail: "minsu@email.com",
    product: "프로필 B코스",
    date: new Date(2024, 2, 15),
    time: "11:00",
    status: "cancelled",
    price: 80000,
  },
];

const statusConfig = {
  confirmed: {
    label: "확정",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
  },
  pending: {
    label: "승인 대기",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    icon: Clock,
  },
  completed: {
    label: "완료",
    color: "text-gray-600 bg-gray-50 border-gray-200",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "취소",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: XCircle,
  },
};

const statusFilters = [
  { id: "all", label: "전체" },
  { id: "pending", label: "승인 대기" },
  { id: "confirmed", label: "확정" },
  { id: "completed", label: "완료" },
  { id: "cancelled", label: "취소" },
];

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate ? isSameDay(booking.date, selectedDate) : true;
    return matchesStatus && matchesSearch && matchesDate;
  });

  const getBookingsForDate = (date: Date) => {
    return mockBookings.filter((b) => isSameDay(b.date, date));
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("ko-KR").format(price);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--color-charcoal)]">예약 관리</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            총 {filteredBookings.length}개의 예약
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-[var(--color-charcoal)] text-white"
                : "bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] border border-[var(--color-beige-dark)]"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`p-2.5 rounded-lg transition-colors ${
              viewMode === "calendar"
                ? "bg-[var(--color-charcoal)] text-white"
                : "bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] border border-[var(--color-beige-dark)]"
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="예약번호 또는 고객명 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-beige-dark)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === filter.id
                  ? "bg-[var(--color-charcoal)] text-white"
                  : "bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] border border-[var(--color-beige-dark)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-[var(--color-charcoal)]">
              {format(currentMonth, "yyyy년 M월", { locale: ko })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-3 py-1.5 text-sm hover:bg-[var(--color-beige)] rounded-lg transition-colors"
              >
                오늘
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
              <div
                key={day}
                className={`text-center text-sm font-medium py-2 ${
                  i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-[var(--color-text-secondary)]"
                }`}
              >
                {day}
              </div>
            ))}

            {/* Empty cells for start of month */}
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days */}
            {days.map((day) => {
              const dayBookings = getBookingsForDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={`aspect-square p-1 rounded-lg transition-all ${
                    isSelected
                      ? "bg-[var(--color-gold)] text-white"
                      : isToday(day)
                      ? "bg-[var(--color-beige)] text-[var(--color-charcoal)]"
                      : "hover:bg-[var(--color-beige)]/50"
                  }`}
                >
                  <div className="h-full flex flex-col">
                    <span
                      className={`text-sm ${
                        day.getDay() === 0 && !isSelected ? "text-red-500" : ""
                      } ${day.getDay() === 6 && !isSelected ? "text-blue-500" : ""}`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayBookings.length > 0 && (
                      <div className="mt-auto flex justify-center gap-0.5">
                        {dayBookings.slice(0, 3).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-white" : "bg-[var(--color-gold)]"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date Bookings */}
          {selectedDate && (
            <div className="mt-6 pt-6 border-t border-[var(--color-beige-dark)]">
              <h3 className="font-medium text-[var(--color-charcoal)] mb-4">
                {format(selectedDate, "M월 d일 (EEEE)", { locale: ko })} 예약
              </h3>
              <div className="space-y-3">
                {getBookingsForDate(selectedDate).length === 0 ? (
                  <p className="text-[var(--color-text-muted)] text-sm">예약이 없습니다.</p>
                ) : (
                  getBookingsForDate(selectedDate).map((booking) => {
                    const status = statusConfig[booking.status];
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-[var(--color-beige)]/30 rounded-lg cursor-pointer hover:bg-[var(--color-beige)]/50 transition-colors"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <div>
                          <p className="font-medium text-[var(--color-charcoal)]">
                            {booking.time} - {booking.customerName}
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)]">{booking.product}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-[var(--color-beige-dark)] overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--color-beige)]/50 text-sm font-medium text-[var(--color-text-secondary)]">
            <div className="col-span-2">예약번호</div>
            <div className="col-span-2">고객명</div>
            <div className="col-span-2">상품</div>
            <div className="col-span-2">일시</div>
            <div className="col-span-2">상태</div>
            <div className="col-span-2 text-right">금액</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[var(--color-beige)]">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-[var(--color-text-muted)]">
                검색 결과가 없습니다.
              </div>
            ) : (
              filteredBookings.map((booking) => {
                const status = statusConfig[booking.status];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={booking.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-6 py-4 hover:bg-[var(--color-beige)]/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="lg:col-span-2 flex items-center gap-2">
                      <span className="text-sm font-mono text-[var(--color-text-muted)]">
                        {booking.id}
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="font-medium text-[var(--color-charcoal)]">{booking.customerName}</p>
                      <p className="text-xs text-[var(--color-text-muted)] lg:hidden">{booking.product}</p>
                    </div>
                    <div className="hidden lg:block lg:col-span-2 text-sm text-[var(--color-text-secondary)]">
                      {booking.product}
                    </div>
                    <div className="lg:col-span-2 text-sm text-[var(--color-text-secondary)]">
                      {format(booking.date, "M/d (EEE)", { locale: ko })} {booking.time}
                    </div>
                    <div className="lg:col-span-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${status.color}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <div className="lg:col-span-2 text-right font-medium text-[var(--color-gold)]">
                      {formatPrice(booking.price)}원
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-6 border-b border-[var(--color-beige-dark)] flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{selectedBooking.id}</p>
                  <h2 className="font-display text-xl text-[var(--color-charcoal)]">예약 상세</h2>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">상태</span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full border ${
                      statusConfig[selectedBooking.status].color
                    }`}
                  >
                    {statusConfig[selectedBooking.status].label}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="p-4 bg-[var(--color-beige)]/50 rounded-xl space-y-3">
                  <h3 className="font-medium text-[var(--color-charcoal)]">고객 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <User className="w-4 h-4" />
                      {selectedBooking.customerName}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <Phone className="w-4 h-4" />
                      {selectedBooking.customerPhone}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <Mail className="w-4 h-4" />
                      {selectedBooking.customerEmail}
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">상품</span>
                    <span className="font-medium text-[var(--color-charcoal)]">
                      {selectedBooking.product}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">일시</span>
                    <span className="font-medium text-[var(--color-charcoal)]">
                      {format(selectedBooking.date, "yyyy.MM.dd (EEE)", { locale: ko })}{" "}
                      {selectedBooking.time}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">금액</span>
                    <span className="font-medium text-[var(--color-gold)]">
                      {formatPrice(selectedBooking.price)}원
                    </span>
                  </div>
                </div>

                {/* Note */}
                {selectedBooking.note && (
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <p className="text-sm font-medium text-amber-800 mb-1">고객 요청사항</p>
                    <p className="text-sm text-amber-700">{selectedBooking.note}</p>
                  </div>
                )}

                {/* Actions */}
                {selectedBooking.status === "pending" && (
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      거절
                    </button>
                    <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      승인
                    </button>
                  </div>
                )}

                {selectedBooking.status === "confirmed" && (
                  <button className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors">
                    예약 취소
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
