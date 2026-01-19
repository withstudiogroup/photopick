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
  Sparkles,
  Shield,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore } from "date-fns";
import { ko } from "date-fns/locale";

function StepProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: "일정 선택" },
    { id: 2, label: "옵션 선택" },
    { id: 3, label: "정보 입력" },
    { id: 4, label: "결제" },
    { id: 5, label: "완료" },
  ];

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all ${
                step.id < currentStep
                  ? "bg-[var(--color-gold)] text-white"
                  : step.id === currentStep
                  ? "bg-[var(--color-charcoal)] text-white"
                  : "bg-[var(--color-beige)] text-[var(--color-text-muted)]"
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                step.id
              )}
            </div>
            <span className={`mt-2 text-xs hidden md:block ${
              step.id <= currentStep ? "text-[var(--color-charcoal)]" : "text-[var(--color-text-muted)]"
            }`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 md:w-16 h-[2px] mx-1 md:mx-2 transition-colors ${
                step.id < currentStep ? "bg-[var(--color-gold)]" : "bg-[var(--color-beige-dark)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

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
    <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-beige)] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display text-xl text-[var(--color-charcoal)]">
          {format(currentMonth, "yyyy년 M월", { locale: ko })}
        </h3>
        <button
          onClick={nextMonth}
          className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-beige)] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0 ? "text-[#C75D5D]" : index === 6 ? "text-[#5D8AC7]" : "text-[var(--color-text-secondary)]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(startDay)].map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

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
                  ? "text-[var(--color-beige-dark)] cursor-not-allowed"
                  : selected
                  ? "bg-[var(--color-gold)] text-white font-medium"
                  : today
                  ? "bg-[var(--color-beige)] text-[var(--color-charcoal)] font-medium"
                  : dayOfWeek === 0
                  ? "text-[#C75D5D] hover:bg-[var(--color-beige)]"
                  : dayOfWeek === 6
                  ? "text-[#5D8AC7] hover:bg-[var(--color-beige)]"
                  : "text-[var(--color-charcoal)] hover:bg-[var(--color-beige)]"
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
    <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6 md:p-8">
      <h3 className="font-display text-lg text-[var(--color-charcoal)] mb-6">시간 선택</h3>
      <div className="grid grid-cols-5 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelectTime(slot.time)}
            disabled={!slot.available}
            className={`py-3 text-sm font-medium transition-all ${
              !slot.available
                ? "bg-[var(--color-beige)] text-[var(--color-text-muted)] cursor-not-allowed line-through"
                : selectedTime === slot.time
                ? "bg-[var(--color-gold)] text-white"
                : "border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--color-text-muted)]">
        * 취소선이 있는 시간은 예약이 마감된 시간입니다
      </p>
    </div>
  );
}

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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 order-2 lg:order-1">
        <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] sticky top-24">
          <div className="relative aspect-video">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
              alt="스튜디오"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium mb-1">
              프로필
            </p>
            <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-2">루미에르 스튜디오</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">프로필 A코스</p>
            <div className="border-t border-[var(--color-beige-dark)] pt-4">
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)] mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>60분</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>1인 기준</span>
                </div>
              </div>
              <p className="text-2xl font-medium text-[var(--color-gold)]">45,000원</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
        <BookingCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
        <TimeSlots selectedTime={selectedTime} onSelectTime={onSelectTime} />

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 text-sm font-medium uppercase tracking-wider transition-all ${
            canProceed
              ? "btn-gold"
              : "bg-[var(--color-beige)] text-[var(--color-text-muted)] cursor-not-allowed"
          }`}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}

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
    { id: "makeup", name: "헤어메이크업", price: 30000, description: "전문 아티스트의 헤어 & 메이크업 서비스", popular: true },
    { id: "costume", name: "의상 대여", price: 20000, description: "다양한 스타일의 의상 1벌 선택" },
    { id: "retouching", name: "추가 보정 10장", price: 15000, description: "추가 보정본 10장 제공" },
    { id: "print", name: "사진 인화 (5x7) 5장", price: 10000, description: "고급 용지 인화 5장" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-2">추가 옵션 선택</h2>
        <p className="text-[var(--color-text-secondary)]">원하시는 옵션을 선택해주세요</p>
      </div>

      <div className="space-y-4 mb-10">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <motion.button
              key={option.id}
              onClick={() => onToggleOption(option.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-6 text-left transition-all border ${
                isSelected
                  ? "border-[var(--color-gold)] bg-[var(--color-beige)]/30"
                  : "border-[var(--color-beige-dark)] hover:border-[var(--color-gold)]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-[var(--color-charcoal)]">{option.name}</h3>
                    {option.popular && (
                      <span className="badge badge-gold text-[10px]">
                        <Sparkles className="w-3 h-3 mr-1" />
                        인기
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{option.description}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="font-medium text-[var(--color-gold)]">
                    +{formatPrice(option.price)}원
                  </span>
                  <div
                    className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
                        : "border-[var(--color-beige-dark)]"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[var(--color-beige-dark)] text-sm font-medium uppercase tracking-wider hover:border-[var(--color-charcoal)] transition-colors"
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
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-2">예약자 정보</h2>
        <p className="text-[var(--color-text-secondary)]">정확한 정보를 입력해주세요</p>
      </div>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-6">
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

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-10">
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
              <span className="text-[#C75D5D] font-medium">[필수]</span> 이용약관에 동의합니다
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
              <span className="text-[#C75D5D] font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다
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
            <span className="text-sm text-[var(--color-text-secondary)]">
              [선택] 마케팅 정보 수신에 동의합니다
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[var(--color-beige-dark)] text-sm font-medium uppercase tracking-wider hover:border-[var(--color-charcoal)] transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-all ${
            canProceed
              ? "btn-gold"
              : "bg-[var(--color-beige)] text-[var(--color-text-muted)] cursor-not-allowed"
          }`}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}

function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const paymentMethods = [
    { id: "card", label: "신용/체크카드", icon: "💳" },
    { id: "kakao", label: "카카오페이", icon: "🟡" },
    { id: "toss", label: "토스페이", icon: "🔵" },
    { id: "naver", label: "네이버페이", icon: "🟢" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-2">결제</h2>
        <p className="text-[var(--color-text-secondary)]">예약 정보를 확인하고 결제해주세요</p>
      </div>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-6">
        <h3 className="font-medium text-[var(--color-charcoal)] mb-4 pb-4 border-b border-[var(--color-beige)]">예약 정보</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">예약 상품</span>
            <span className="font-medium">프로필 A코스</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">예약 일시</span>
            <span className="font-medium">2024.01.20 (토) 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">추가 옵션</span>
            <span className="font-medium">헤어메이크업</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-6">
        <h3 className="font-medium text-[var(--color-charcoal)] mb-4 pb-4 border-b border-[var(--color-beige)]">결제 금액</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">상품 금액</span>
            <span>{formatPrice(50000)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">쿠폰 할인</span>
            <span className="text-[#C75D5D]">-{formatPrice(5000)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">추가 옵션</span>
            <span>+{formatPrice(30000)}원</span>
          </div>
          <div className="border-t border-[var(--color-beige)] pt-4 mt-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium">총 결제 금액</span>
              <span className="font-medium text-[var(--color-gold)]">{formatPrice(75000)}원</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-10">
        <h3 className="font-medium text-[var(--color-charcoal)] mb-4 pb-4 border-b border-[var(--color-beige)]">결제 수단</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`py-4 text-sm font-medium transition-all border flex items-center justify-center gap-2 ${
                paymentMethod === method.id
                  ? "border-[var(--color-gold)] bg-[var(--color-beige)]/30 text-[var(--color-gold)]"
                  : "border-[var(--color-beige-dark)] hover:border-[var(--color-gold)]"
              }`}
            >
              <span>{method.icon}</span>
              {method.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-[var(--color-text-muted)]">
          <Shield className="w-4 h-4" />
          안전한 결제를 위해 SSL 암호화를 사용합니다
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-[var(--color-beige-dark)] text-sm font-medium uppercase tracking-wider hover:border-[var(--color-charcoal)] transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!paymentMethod}
          className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            paymentMethod
              ? "btn-gold"
              : "bg-[var(--color-beige)] text-[var(--color-text-muted)] cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          {formatPrice(75000)}원 결제하기
        </button>
      </div>
    </div>
  );
}

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
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#4A7C59] to-[#3d6549] flex items-center justify-center shadow-lg"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-4xl text-[var(--color-charcoal)] mb-3">
          예약이 완료되었습니다
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10">
          예약 확인 메일이 발송되었습니다
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-10 mb-10 text-left"
      >
        <div className="text-center mb-8 pb-8 border-b border-[var(--color-beige)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">예약번호</p>
          <p className="font-display text-3xl text-[var(--color-gold)]">PP-2024012012345</p>
        </div>

        <div className="space-y-0 text-sm">
          <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
            <span className="text-[var(--color-text-secondary)]">스튜디오</span>
            <span className="font-medium">루미에르 스튜디오</span>
          </div>
          <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
            <span className="text-[var(--color-text-secondary)]">상품</span>
            <span className="font-medium">프로필 A코스 + 헤어메이크업</span>
          </div>
          <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
            <span className="text-[var(--color-text-secondary)]">예약 일시</span>
            <span className="font-medium">2024.01.20 (토) 14:00</span>
          </div>
          <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
            <span className="text-[var(--color-text-secondary)]">예약자</span>
            <span className="font-medium">홍길동</span>
          </div>
          <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
            <span className="text-[var(--color-text-secondary)]">연락처</span>
            <span className="font-medium">010-1234-5678</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-[var(--color-text-secondary)]">결제 금액</span>
            <span className="font-medium text-[var(--color-gold)]">{formatPrice(75000)}원</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-[var(--color-text-muted)] mb-10"
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
        <Link href="/" className="btn-outline">
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
    <div className="min-h-screen bg-[var(--color-ivory)] pt-20">
      <div className="container-wide py-10">
        {currentStep < 5 && (
          <Link
            href="/studio/studio-1"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            스튜디오로 돌아가기
          </Link>
        )}

        <StepProgress currentStep={currentStep} />

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
