"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  Users,
  Calendar,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore } from "date-fns";
import { ko } from "date-fns/locale";

// Step Progress Component
function StepProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: "일정 선택" },
    { id: 2, label: "옵션 선택" },
    { id: 3, label: "정보 입력" },
    { id: 4, label: "결제" },
    { id: 5, label: "완료" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step.id < currentStep
                ? "bg-[#C9A962] text-white"
                : step.id === currentStep
                ? "bg-[#2D2D2D] text-white"
                : "bg-[#E8E0D4] text-[#999]"
            }`}
          >
            {step.id < currentStep ? (
              <Check className="w-4 h-4" />
            ) : (
              step.id
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-[2px] mx-2 transition-colors ${
                step.id < currentStep ? "bg-[#C9A962]" : "bg-[#E8E0D4]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Calendar Component
function BookingCalendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day of week for first day (0 = Sunday)
  const startDay = monthStart.getDay();

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const isDisabled = (date: Date) => {
    return isBefore(date, new Date()) || !isSameMonth(date, currentMonth);
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="bg-white border border-[#E8E0D4] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display text-xl">
          {format(currentMonth, "yyyy년 M월", { locale: ko })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0 ? "text-[#C75D5D]" : index === 6 ? "text-[#5D8AC7]" : "text-[#666]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for start day offset */}
        {[...Array(startDay)].map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const today = isToday(day);
          const dayOfWeek = day.getDay();

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onSelectDate(day)}
              disabled={disabled}
              className={`aspect-square flex items-center justify-center text-sm transition-all ${
                disabled
                  ? "text-[#E8E0D4] cursor-not-allowed"
                  : selected
                  ? "bg-[#C9A962] text-white"
                  : today
                  ? "bg-[#F5F0E8] text-[#2D2D2D] font-medium"
                  : dayOfWeek === 0
                  ? "text-[#C75D5D] hover:bg-[#F5F0E8]"
                  : dayOfWeek === 6
                  ? "text-[#5D8AC7] hover:bg-[#F5F0E8]"
                  : "text-[#2D2D2D] hover:bg-[#F5F0E8]"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Time Slots Component
function TimeSlots({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) {
  const timeSlots = [
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
    { time: "18:00", available: true },
    { time: "19:00", available: true },
  ];

  return (
    <div className="bg-white border border-[#E8E0D4] p-6">
      <h3 className="font-display text-lg mb-4">시간 선택</h3>
      <div className="grid grid-cols-5 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelectTime(slot.time)}
            disabled={!slot.available}
            className={`py-3 text-sm font-medium transition-all ${
              !slot.available
                ? "bg-[#F5F0E8] text-[#999] cursor-not-allowed line-through"
                : selectedTime === slot.time
                ? "bg-[#C9A962] text-white"
                : "border border-[#E8E0D4] hover:border-[#C9A962] hover:text-[#C9A962]"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 1: Schedule Selection
function ScheduleStep({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
}) {
  const canProceed = selectedDate && selectedTime;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Product Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-[#E8E0D4] p-6 sticky top-24">
          <div className="relative aspect-video mb-4">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
              alt="스튜디오"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[11px] uppercase tracking-wider text-[#C9A962] mb-1">
            프로필
          </p>
          <h3 className="font-display text-xl mb-2">루미에르 스튜디오</h3>
          <p className="text-[#666] text-sm mb-4">프로필 A코스</p>
          <div className="border-t border-[#E8E0D4] pt-4">
            <div className="flex items-center gap-4 text-sm text-[#666] mb-2">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>60분</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>1인 기준</span>
              </div>
            </div>
            <p className="text-xl font-medium text-[#C9A962]">45,000원</p>
          </div>
        </div>
      </div>

      {/* Calendar & Time */}
      <div className="lg:col-span-2 space-y-6">
        <BookingCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
        <TimeSlots selectedTime={selectedTime} onSelectTime={onSelectTime} />

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 text-sm font-medium uppercase tracking-wider transition-all ${
            canProceed
              ? "btn-gold"
              : "bg-[#E8E0D4] text-[#999] cursor-not-allowed"
          }`}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}

// Step 2: Options Selection
function OptionsStep({
  selectedOptions,
  onToggleOption,
  onNext,
  onBack,
}: {
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const options = [
    { id: "makeup", name: "헤어메이크업", price: 30000, description: "전문 아티스트의 헤어 & 메이크업 서비스" },
    { id: "costume", name: "의상 대여", price: 20000, description: "다양한 스타일의 의상 1벌 선택" },
    { id: "retouching", name: "추가 보정 10장", price: 15000, description: "추가 보정본 10장 제공" },
    { id: "print", name: "사진 인화 (5x7) 5장", price: 10000, description: "고급 용지 인화 5장" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-center mb-8">추가 옵션 선택</h2>

      <div className="space-y-4 mb-8">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggleOption(option.id)}
              className={`w-full p-6 text-left transition-all border ${
                isSelected
                  ? "border-[#C9A962] bg-[#FAF8F5]"
                  : "border-[#E8E0D4] hover:border-[#C9A962]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-[#2D2D2D] mb-1">{option.name}</h3>
                  <p className="text-sm text-[#666]">{option.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#C9A962]">
                    +{formatPrice(option.price)}원
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#C9A962] border-[#C9A962]"
                        : "border-[#E8E0D4]"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[#E8E0D4] text-sm font-medium uppercase tracking-wider hover:border-[#2D2D2D] transition-colors"
        >
          이전
        </button>
        <button onClick={onNext} className="flex-1 btn-gold">
          다음 단계
        </button>
      </div>
    </div>
  );
}

// Step 3: Information Input
function InfoStep({
  formData,
  onUpdateForm,
  onNext,
  onBack,
}: {
  formData: {
    name: string;
    phone: string;
    email: string;
    requests: string;
    agreements: boolean[];
  };
  onUpdateForm: (field: string, value: string | boolean[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canProceed =
    formData.name &&
    formData.phone &&
    formData.agreements[0] &&
    formData.agreements[1];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-center mb-8">예약자 정보</h2>

      <div className="bg-white border border-[#E8E0D4] p-6 mb-6">
        <div className="space-y-6">
          <div>
            <label className="form-label">
              이름 <span className="text-[#C75D5D]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onUpdateForm("name", e.target.value)}
              placeholder="홍길동"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">
              연락처 <span className="text-[#C75D5D]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onUpdateForm("phone", e.target.value)}
              placeholder="010-1234-5678"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onUpdateForm("email", e.target.value)}
              placeholder="example@email.com"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">요청사항</label>
            <textarea
              value={formData.requests}
              onChange={(e) => onUpdateForm("requests", e.target.value)}
              placeholder="스튜디오에 전달할 요청사항을 입력해주세요"
              rows={4}
              className="form-input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className="bg-white border border-[#E8E0D4] p-6 mb-8">
        <div className="space-y-4">
          <label className="checkbox-custom">
            <input
              type="checkbox"
              checked={formData.agreements[0]}
              onChange={(e) => {
                const newAgreements = [...formData.agreements];
                newAgreements[0] = e.target.checked;
                onUpdateForm("agreements", newAgreements);
              }}
            />
            <span className="text-sm">
              <span className="text-[#C75D5D]">[필수]</span> 이용약관에 동의합니다
            </span>
          </label>
          <label className="checkbox-custom">
            <input
              type="checkbox"
              checked={formData.agreements[1]}
              onChange={(e) => {
                const newAgreements = [...formData.agreements];
                newAgreements[1] = e.target.checked;
                onUpdateForm("agreements", newAgreements);
              }}
            />
            <span className="text-sm">
              <span className="text-[#C75D5D]">[필수]</span> 개인정보 수집 및 이용에 동의합니다
            </span>
          </label>
          <label className="checkbox-custom">
            <input
              type="checkbox"
              checked={formData.agreements[2]}
              onChange={(e) => {
                const newAgreements = [...formData.agreements];
                newAgreements[2] = e.target.checked;
                onUpdateForm("agreements", newAgreements);
              }}
            />
            <span className="text-sm text-[#666]">
              [선택] 마케팅 정보 수신에 동의합니다
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[#E8E0D4] text-sm font-medium uppercase tracking-wider hover:border-[#2D2D2D] transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-all ${
            canProceed
              ? "btn-gold"
              : "bg-[#E8E0D4] text-[#999] cursor-not-allowed"
          }`}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}

// Step 4: Payment
function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const paymentMethods = [
    { id: "card", label: "신용/체크카드" },
    { id: "kakao", label: "카카오페이" },
    { id: "toss", label: "토스페이" },
    { id: "naver", label: "네이버페이" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-center mb-8">결제</h2>

      {/* Order Summary */}
      <div className="bg-white border border-[#E8E0D4] p-6 mb-6">
        <h3 className="font-medium text-[#2D2D2D] mb-4">예약 정보</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#666]">예약 상품</span>
            <span>프로필 A코스</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">예약 일시</span>
            <span>2024.01.20 (토) 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">추가 옵션</span>
            <span>헤어메이크업</span>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white border border-[#E8E0D4] p-6 mb-6">
        <h3 className="font-medium text-[#2D2D2D] mb-4">결제 금액</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#666]">상품 금액</span>
            <span>{formatPrice(50000)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">쿠폰 할인</span>
            <span className="text-[#C75D5D]">-{formatPrice(5000)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">추가 옵션</span>
            <span>+{formatPrice(30000)}원</span>
          </div>
          <div className="border-t border-[#E8E0D4] pt-3 mt-3">
            <div className="flex justify-between text-lg font-medium">
              <span>총 결제 금액</span>
              <span className="text-[#C9A962]">{formatPrice(75000)}원</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-[#E8E0D4] p-6 mb-8">
        <h3 className="font-medium text-[#2D2D2D] mb-4">결제 수단</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`py-4 text-sm font-medium transition-all border ${
                paymentMethod === method.id
                  ? "border-[#C9A962] bg-[#FAF8F5] text-[#C9A962]"
                  : "border-[#E8E0D4] hover:border-[#C9A962]"
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[#E8E0D4] text-sm font-medium uppercase tracking-wider hover:border-[#2D2D2D] transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!paymentMethod}
          className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-all ${
            paymentMethod
              ? "btn-gold"
              : "bg-[#E8E0D4] text-[#999] cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-4 h-4 inline mr-2" />
          {formatPrice(75000)}원 결제하기
        </button>
      </div>
    </div>
  );
}

// Step 5: Complete
function CompleteStep() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4A7C59] flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-3xl text-[#2D2D2D] mb-2">
          예약이 완료되었습니다
        </h2>
        <p className="text-[#666] mb-8">
          예약 확인 메일이 발송되었습니다
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-[#E8E0D4] p-8 mb-8 text-left"
      >
        <div className="text-center mb-6">
          <p className="text-sm text-[#666] mb-1">예약번호</p>
          <p className="font-display text-2xl text-[#C9A962]">PP-2024012012345</p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b border-[#F5F0E8]">
            <span className="text-[#666]">스튜디오</span>
            <span className="font-medium">루미에르 스튜디오</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#F5F0E8]">
            <span className="text-[#666]">상품</span>
            <span className="font-medium">프로필 A코스 + 헤어메이크업</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#F5F0E8]">
            <span className="text-[#666]">예약 일시</span>
            <span className="font-medium">2024.01.20 (토) 14:00</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#F5F0E8]">
            <span className="text-[#666]">예약자</span>
            <span className="font-medium">홍길동</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#F5F0E8]">
            <span className="text-[#666]">연락처</span>
            <span className="font-medium">010-1234-5678</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#666]">결제 금액</span>
            <span className="font-medium text-[#C9A962]">{formatPrice(75000)}원</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-[#999] mb-8"
      >
        문의사항은 스튜디오에 직접 연락해주세요
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 justify-center"
      >
        <Link href="/mypage/bookings" className="btn-gold">
          예약 내역 보기
        </Link>
        <Link
          href="/"
          className="btn-outline"
        >
          홈으로
        </Link>
      </motion.div>
    </div>
  );
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requests: "",
    agreements: [false, false, false],
  });

  const handleToggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleUpdateForm = (field: string, value: string | boolean[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <div className="container-wide py-8">
        {/* Back Button */}
        {currentStep < 5 && (
          <Link
            href="/studio/studio-1"
            className="inline-flex items-center gap-2 text-[#666] hover:text-[#2D2D2D] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            스튜디오로 돌아가기
          </Link>
        )}

        {/* Step Progress */}
        <StepProgress currentStep={currentStep} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <ScheduleStep
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectDate={setSelectedDate}
                onSelectTime={setSelectedTime}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <OptionsStep
                selectedOptions={selectedOptions}
                onToggleOption={handleToggleOption}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 3 && (
              <InfoStep
                formData={formData}
                onUpdateForm={handleUpdateForm}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 4 && (
              <PaymentStep onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 5 && <CompleteStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
