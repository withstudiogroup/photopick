"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Instagram,
  Save,
  Check,
  X,
  ChevronDown,
  Navigation,
  Wifi,
  Car,
  Coffee,
  Shirt,
  Sparkles,
  AirVent,
  Armchair,
  Baby,
  Dog,
  Accessibility,
  CreditCard,
  Ban,
  AlertCircle,
} from "lucide-react";

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

const amenities = [
  { id: "wifi", label: "무료 와이파이", icon: Wifi },
  { id: "parking", label: "주차 가능", icon: Car },
  { id: "drinks", label: "음료 제공", icon: Coffee },
  { id: "dressing", label: "탈의실", icon: Shirt },
  { id: "makeup", label: "메이크업룸", icon: Sparkles },
  { id: "aircon", label: "냉난방", icon: AirVent },
  { id: "waiting", label: "대기실", icon: Armchair },
  { id: "baby", label: "유아시설", icon: Baby },
  { id: "pet", label: "반려동물 동반", icon: Dog },
  { id: "accessible", label: "장애인 편의시설", icon: Accessibility },
];

const paymentMethods = [
  { id: "card", label: "신용카드", icon: CreditCard },
  { id: "cash", label: "현금" },
  { id: "transfer", label: "계좌이체" },
  { id: "kakao", label: "카카오페이" },
  { id: "naver", label: "네이버페이" },
  { id: "toss", label: "토스페이" },
];

const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

export default function AdminStudioPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [studioInfo, setStudioInfo] = useState({
    name: "루미에르 스튜디오",
    description:
      "자연광이 아름답게 들어오는 프리미엄 프로필 스튜디오입니다. 10년 이상의 경력을 가진 전문 포토그래퍼가 당신만의 특별한 순간을 담아드립니다.",
    category: "프로필",
    phone: "02-1234-5678",
    email: "hello@lumiere.studio",
    website: "https://lumiere.studio",
    instagram: "@lumiere_studio",
  });

  const [location, setLocation] = useState({
    address: "서울특별시 강남구 압구정로 123",
    detailAddress: "루미에르빌딩 3층",
    directions:
      "압구정로데오역 5번 출구에서 도보 3분\n스타벅스 건물 3층\n주차장 2시간 무료",
    latitude: 37.5270616,
    longitude: 127.0381891,
  });

  const [operatingHours, setOperatingHours] = useState(
    daysOfWeek.map((day, idx) => ({
      day,
      isOpen: idx < 6,
      openTime: "10:00",
      closeTime: "20:00",
    }))
  );

  const [selectedAmenities, setSelectedAmenities] = useState([
    "wifi",
    "parking",
    "drinks",
    "dressing",
    "makeup",
    "aircon",
    "waiting",
  ]);

  const [selectedPayments, setSelectedPayments] = useState([
    "card",
    "transfer",
    "kakao",
  ]);

  const [cancellationPolicy, setCancellationPolicy] = useState({
    days7: 100,
    days3: 50,
    days1: 0,
    sameDay: 0,
  });

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const togglePayment = (id: string) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleDayOpen = (idx: number) => {
    setOperatingHours((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, isOpen: !h.isOpen } : h))
    );
  };

  const updateTime = (idx: number, field: "openTime" | "closeTime", value: string) => {
    setOperatingHours((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--color-charcoal)]">스튜디오 정보</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            스튜디오의 기본 정보와 운영 설정을 관리하세요.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)]"
          } ${isSaving ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              저장 완료
            </>
          ) : isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              저장 중...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              변경사항 저장
            </>
          )}
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Basic Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[var(--color-gold)]" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">기본 정보</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  스튜디오명 *
                </label>
                <input
                  type="text"
                  value={studioInfo.name}
                  onChange={(e) =>
                    setStudioInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  카테고리 *
                </label>
                <div className="relative">
                  <select
                    value={studioInfo.category}
                    onChange={(e) =>
                      setStudioInfo((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full appearance-none px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] bg-white"
                  >
                    <option value="프로필">프로필</option>
                    <option value="웨딩">웨딩</option>
                    <option value="가족">가족</option>
                    <option value="증명사진">증명사진</option>
                    <option value="베이비">베이비</option>
                    <option value="커플">커플</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  스튜디오 소개 *
                </label>
                <textarea
                  rows={4}
                  value={studioInfo.description}
                  onChange={(e) =>
                    setStudioInfo((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    전화번호
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="tel"
                      value={studioInfo.phone}
                      onChange={(e) =>
                        setStudioInfo((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="email"
                      value={studioInfo.email}
                      onChange={(e) =>
                        setStudioInfo((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    웹사이트
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="url"
                      value={studioInfo.website}
                      onChange={(e) =>
                        setStudioInfo((prev) => ({ ...prev, website: e.target.value }))
                      }
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    인스타그램
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="text"
                      value={studioInfo.instagram}
                      onChange={(e) =>
                        setStudioInfo((prev) => ({ ...prev, instagram: e.target.value }))
                      }
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">위치 정보</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  주소 *
                </label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  상세 주소
                </label>
                <input
                  type="text"
                  value={location.detailAddress}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, detailAddress: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  찾아오시는 길
                </label>
                <div className="relative">
                  <Navigation className="absolute left-4 top-3 w-4 h-4 text-[var(--color-text-muted)]" />
                  <textarea
                    rows={3}
                    value={location.directions}
                    onChange={(e) =>
                      setLocation((prev) => ({ ...prev, directions: e.target.value }))
                    }
                    placeholder="대중교통, 주차 등 상세 안내를 입력하세요."
                    className="w-full pl-11 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] resize-none"
                  />
                </div>
              </div>

              {/* Map Preview */}
              <div className="h-48 bg-[var(--color-beige)] rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--color-text-muted)]">지도 미리보기</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Operating Hours */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">운영 시간</h2>
            </div>

            <div className="space-y-3">
              {operatingHours.map((schedule, idx) => (
                <div
                  key={schedule.day}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    schedule.isOpen ? "bg-[var(--color-beige)]/50" : "bg-gray-50"
                  }`}
                >
                  <button
                    onClick={() => toggleDayOpen(idx)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      schedule.isOpen
                        ? "bg-[var(--color-gold)] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {schedule.day}
                  </button>

                  {schedule.isOpen ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={schedule.openTime}
                        onChange={(e) => updateTime(idx, "openTime", e.target.value)}
                        className="px-3 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] text-sm"
                      />
                      <span className="text-[var(--color-text-muted)]">~</span>
                      <input
                        type="time"
                        value={schedule.closeTime}
                        onChange={(e) => updateTime(idx, "closeTime", e.target.value)}
                        className="px-3 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-[var(--color-text-muted)] text-sm">휴무</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">시설/편의시설</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                        : "border-[var(--color-beige-dark)] hover:border-[var(--color-gold)]/50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected ? "text-[var(--color-gold)]" : "text-[var(--color-text-muted)]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isSelected ? "text-[var(--color-charcoal)]" : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {amenity.label}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[var(--color-gold)] ml-auto" />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Cancellation Policy */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">취소/환불 규정</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[var(--color-beige)]/50 rounded-lg">
                <span className="text-sm text-[var(--color-text-secondary)]">7일 전 취소</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={cancellationPolicy.days7}
                    onChange={(e) =>
                      setCancellationPolicy((prev) => ({
                        ...prev,
                        days7: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-20 px-3 py-2 border border-[var(--color-beige-dark)] rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                  <span className="text-sm text-[var(--color-text-muted)]">% 환불</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--color-beige)]/50 rounded-lg">
                <span className="text-sm text-[var(--color-text-secondary)]">3일 전 취소</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={cancellationPolicy.days3}
                    onChange={(e) =>
                      setCancellationPolicy((prev) => ({
                        ...prev,
                        days3: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-20 px-3 py-2 border border-[var(--color-beige-dark)] rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                  <span className="text-sm text-[var(--color-text-muted)]">% 환불</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--color-beige)]/50 rounded-lg">
                <span className="text-sm text-[var(--color-text-secondary)]">1일 전 취소</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={cancellationPolicy.days1}
                    onChange={(e) =>
                      setCancellationPolicy((prev) => ({
                        ...prev,
                        days1: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-20 px-3 py-2 border border-[var(--color-beige-dark)] rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                  <span className="text-sm text-[var(--color-text-muted)]">% 환불</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-600">당일 취소</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={cancellationPolicy.sameDay}
                    onChange={(e) =>
                      setCancellationPolicy((prev) => ({
                        ...prev,
                        sameDay: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-20 px-3 py-2 border border-red-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <span className="text-sm text-red-400">% 환불</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  환불 규정은 예약 확정 시 고객에게 안내됩니다. 합리적인 규정을 설정해주세요.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-[var(--color-beige-dark)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[var(--color-gold)]" />
              </div>
              <h2 className="font-display text-xl text-[var(--color-charcoal)]">결제 방법</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => {
                const isSelected = selectedPayments.includes(method.id);
                return (
                  <button
                    key={method.id}
                    onClick={() => togglePayment(method.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-[var(--color-gold)] text-white"
                        : "bg-[var(--color-beige)] text-[var(--color-text-secondary)] hover:bg-[var(--color-beige-dark)]"
                    }`}
                  >
                    {method.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
