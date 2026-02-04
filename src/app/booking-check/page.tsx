"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Phone,
  Hash,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Copy,
  Download,
  MessageSquare,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useToast } from "@/components/ui/Toast";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface BookingResult {
  id: string;
  status: BookingStatus;
  studioName: string;
  studioImage: string;
  productName: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  guestName: string;
  guestPhone: string;
  createdAt: string;
  canCancel: boolean;
}

const mockBookingResult: BookingResult = {
  id: "BK20240315001",
  status: "confirmed",
  studioName: "루미에르 스튜디오",
  studioImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  productName: "프로필 A코스",
  date: "2024.03.25",
  time: "14:00",
  location: "강남역 5분",
  address: "서울특별시 강남구 역삼동 123-45 프리미엄빌딩 3층",
  price: 50000,
  guestName: "홍**",
  guestPhone: "010-****-5678",
  createdAt: "2024.03.15 14:32",
  canCancel: true,
};

const statusConfig = {
  confirmed: {
    label: "예약 확정",
    color: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    icon: CheckCircle2,
    description: "예약이 확정되었습니다. 촬영 당일 10분 전까지 도착해주세요.",
  },
  pending: {
    label: "승인 대기",
    color: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    icon: Clock,
    description: "스튜디오의 예약 승인을 기다리고 있습니다.",
  },
  cancelled: {
    label: "취소됨",
    color: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
    icon: XCircle,
    description: "예약이 취소되었습니다.",
  },
  completed: {
    label: "촬영 완료",
    color: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)]",
    icon: CheckCircle2,
    description: "촬영이 완료되었습니다. 리뷰를 남겨주세요!",
  },
};

export default function BookingCheckPage() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const toast = useToast();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearchResult(null);

    if (!bookingNumber.trim()) {
      setError("예약번호를 입력해주세요.");
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, "").length < 10) {
      setError("올바른 연락처를 입력해주세요.");
      return;
    }

    setIsSearching(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 데모용: 특정 예약번호가 아니면 에러
    if (bookingNumber.toUpperCase() === "BK20240315001") {
      setSearchResult(mockBookingResult);
    } else {
      setError("예약 내역을 찾을 수 없습니다. 예약번호와 연락처를 확인해주세요.");
    }

    setIsSearching(false);
  };

  const handleCancel = () => {
    setShowCancelConfirm(false);
    toast.success("예약이 취소되었습니다.");
    if (searchResult) {
      setSearchResult({ ...searchResult, status: "cancelled", canCancel: false });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const copyBookingNumber = () => {
    if (searchResult) {
      navigator.clipboard.writeText(searchResult.id);
      toast.success("예약번호가 복사되었습니다.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-[var(--color-charcoal)]">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
                <Search className="w-7 h-7 text-[var(--color-gold)]" />
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                비회원 예약조회
              </h1>
              <p className="text-white/70">
                예약번호와 연락처로 예약 내역을 확인하세요.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Form */}
        <section className="py-16">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <form onSubmit={handleSearch} className="bg-white border border-[var(--color-beige-dark)] p-8">
                <div className="space-y-6">
                  {/* Booking Number */}
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[var(--color-gold)]" />
                      예약번호
                    </label>
                    <input
                      type="text"
                      value={bookingNumber}
                      onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
                      placeholder="예: BK20240315001"
                      className="form-input uppercase"
                    />
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                      예약 확인 이메일 또는 SMS에서 확인할 수 있습니다.
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[var(--color-gold)]" />
                      연락처
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="010-0000-0000"
                      maxLength={13}
                      className="form-input"
                    />
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-start gap-3 p-4 bg-[var(--color-error)]/10 text-[var(--color-error)]"
                      >
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        조회 중...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" />
                        예약 조회하기
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-[var(--color-beige)] text-sm text-[var(--color-text-secondary)]">
                <p className="font-medium mb-1">데모 안내</p>
                <p>
                  테스트용 예약번호: <code className="bg-white px-2 py-0.5">BK20240315001</code>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search Result */}
        <AnimatePresence>
          {searchResult && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="pb-20"
            >
              <div className="container-wide">
                <div className="max-w-3xl mx-auto">
                  {/* Status Banner */}
                  {(() => {
                    const config = statusConfig[searchResult.status];
                    const StatusIcon = config.icon;
                    return (
                      <div className={`p-6 mb-6 ${config.color.split(" ")[0]}`}>
                        <div className="flex items-start gap-4">
                          <StatusIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                          <div>
                            <h2 className="font-medium text-lg mb-1">{config.label}</h2>
                            <p className="text-sm opacity-80">{config.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Booking Details Card */}
                  <div className="bg-white border border-[var(--color-beige-dark)]">
                    {/* Header */}
                    <div className="p-6 border-b border-[var(--color-beige-dark)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[var(--color-text-muted)] mb-1">예약번호</p>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-lg font-medium text-[var(--color-charcoal)]">
                              {searchResult.id}
                            </span>
                            <button
                              onClick={copyBookingNumber}
                              className="p-1.5 hover:bg-[var(--color-beige)] rounded transition-colors"
                              aria-label="예약번호 복사"
                            >
                              <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />
                            </button>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 text-xs font-medium ${statusConfig[searchResult.status].color}`}>
                          {statusConfig[searchResult.status].label}
                        </span>
                      </div>
                    </div>

                    {/* Studio Info */}
                    <div className="p-6 border-b border-[var(--color-beige-dark)]">
                      <div className="flex gap-5">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={searchResult.studioImage}
                            alt={searchResult.studioName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-1">
                            Studio
                          </p>
                          <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">
                            {searchResult.studioName}
                          </h3>
                          <p className="text-[var(--color-text-secondary)] mb-3">
                            {searchResult.productName}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                            <MapPin className="w-4 h-4" />
                            {searchResult.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                          촬영 일시
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-[var(--color-charcoal)]">
                            <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
                            <span className="font-medium">{searchResult.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[var(--color-charcoal)]">
                            <Clock className="w-5 h-5 text-[var(--color-gold)]" />
                            <span className="font-medium">{searchResult.time}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                          예약자 정보
                        </p>
                        <div className="flex items-center gap-2 text-[var(--color-charcoal)]">
                          <User className="w-5 h-5 text-[var(--color-gold)]" />
                          <span>{searchResult.guestName}</span>
                          <span className="text-[var(--color-text-muted)]">|</span>
                          <span>{searchResult.guestPhone}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                          스튜디오 주소
                        </p>
                        <p className="text-[var(--color-charcoal)]">{searchResult.address}</p>
                      </div>

                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                          결제 금액
                        </p>
                        <p className="text-2xl font-medium text-[var(--color-gold)]">
                          {formatPrice(searchResult.price)}원
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-[var(--color-beige)]/50 flex flex-wrap gap-3">
                      <Link
                        href={`/studio/${searchResult.id.slice(0, 8)}`}
                        className="btn-outline flex-1 sm:flex-none"
                      >
                        스튜디오 정보
                      </Link>

                      {searchResult.status === "completed" && (
                        <>
                          <button className="btn-outline flex-1 sm:flex-none flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            사진 다운로드
                          </button>
                          <button className="btn-gold flex-1 sm:flex-none flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            리뷰 작성
                          </button>
                        </>
                      )}

                      {searchResult.canCancel && searchResult.status === "confirmed" && (
                        <button
                          onClick={() => setShowCancelConfirm(true)}
                          className="text-[var(--color-error)] border border-[var(--color-error)]/30 hover:border-[var(--color-error)] px-6 py-3 text-sm font-medium transition-colors flex-1 sm:flex-none"
                        >
                          예약 취소
                        </button>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="p-4 border-t border-[var(--color-beige-dark)] text-xs text-[var(--color-text-muted)]">
                      예약일시: {searchResult.createdAt}
                    </div>
                  </div>

                  {/* Help Section */}
                  <div className="mt-8 p-6 bg-[var(--color-beige)] text-center">
                    <h3 className="font-medium text-[var(--color-charcoal)] mb-2">
                      도움이 필요하신가요?
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      예약 관련 문의는 고객센터로 연락해주세요.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="tel:1544-0000"
                        className="text-[var(--color-gold)] font-medium hover:underline"
                      >
                        📞 1544-0000
                      </a>
                      <span className="hidden sm:inline text-[var(--color-beige-dark)]">|</span>
                      <a
                        href="mailto:help@photopick.kr"
                        className="text-[var(--color-gold)] font-medium hover:underline"
                      >
                        ✉️ help@photopick.kr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Cancel Confirmation Modal */}
        <AnimatePresence>
          {showCancelConfirm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowCancelConfirm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 max-w-md w-full mx-4"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[var(--color-error)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-[var(--color-error)]" />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">
                    예약을 취소하시겠습니까?
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    취소 후에는 되돌릴 수 없으며,
                    <br />
                    취소 정책에 따라 환불이 진행됩니다.
                  </p>
                </div>

                <div className="p-4 bg-[var(--color-beige)] mb-6 text-sm">
                  <p className="font-medium text-[var(--color-charcoal)] mb-2">
                    취소/환불 규정
                  </p>
                  <ul className="text-[var(--color-text-secondary)] space-y-1">
                    <li>• 촬영 7일 전: 100% 환불</li>
                    <li>• 촬영 3일 전: 50% 환불</li>
                    <li>• 촬영 1일 전: 30% 환불</li>
                    <li>• 촬영 당일: 환불 불가</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 py-3 border border-[var(--color-beige-dark)] text-sm font-medium hover:bg-[var(--color-beige)] transition-colors"
                  >
                    돌아가기
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-3 bg-[var(--color-error)] text-white text-sm font-medium hover:bg-[#a04545] transition-colors"
                  >
                    예약 취소
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* No Result State */}
        {!searchResult && (
          <section className="pb-20">
            <div className="container-wide">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-[var(--color-beige)] p-8">
                  <h2 className="font-display text-xl text-[var(--color-charcoal)] mb-4">
                    회원이신가요?
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    로그인하시면 모든 예약 내역을 한 번에 관리할 수 있습니다.
                  </p>
                  <Link href="/auth/login" className="btn-outline inline-flex items-center gap-2">
                    로그인하고 예약 관리하기
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
