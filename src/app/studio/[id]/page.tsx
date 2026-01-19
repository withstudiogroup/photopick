"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Check,
  Zap,
  Calendar,
  Users,
  Camera,
  Gift,
  ChevronLeft,
  ChevronDown,
  ThumbsUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { getStudioById, getProductsByStudioId, studios, facilities } from "@/data/studios";
import { getReviewsByStudioId } from "@/data/reviews";
import StudioCard from "@/components/studio/StudioCard";

// Image Gallery Component
function ImageGallery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Add more sample images for gallery
  const galleryImages = [
    ...images,
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ];

  return (
    <div className="relative">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        navigation={{
          prevEl: ".gallery-main-prev",
          nextEl: ".gallery-main-next",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] mb-3"
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="gallery-main-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="gallery-main-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 z-10 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm">
        {activeIndex + 1} / {galleryImages.length}
      </div>

      {/* Thumbnails */}
      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={6}
        freeMode
        watchSlidesProgress
        className="hidden md:block"
        breakpoints={{
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 },
        }}
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div
              className={`aspect-[4/3] relative border-2 transition-colors ${
                activeIndex === index ? "border-[#C9A962]" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  studioName,
}: {
  product: {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    discountPrice?: number;
    includes: string[];
    maxPeople: number;
    images: string[];
  };
  studioName: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="bg-white border border-[#E8E0D4] p-6 hover:border-[#C9A962] transition-colors">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discountPrice && (
            <div className="absolute top-2 left-2 badge badge-gold text-[10px]">
              특가
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display text-lg text-[#2D2D2D]">
                {product.name}
              </h3>
              <p className="text-sm text-[#666]">{product.description}</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#C9A962] text-sm font-medium flex items-center gap-1"
            >
              상세정보
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="border-t border-[#F5F0E8] my-3 pt-3">
            <div className="flex items-center gap-4 text-sm text-[#666] mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{product.duration}분</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{product.maxPeople}인 기준</span>
              </div>
            </div>

            {/* Includes (collapsed) */}
            {!isExpanded && (
              <p className="text-sm text-[#999] line-clamp-1">
                포함: {product.includes.join(", ")}
              </p>
            )}

            {/* Expanded Details */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#2D2D2D] mb-2">
                    포함 내역
                  </p>
                  <ul className="space-y-1">
                    {product.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-[#666]"
                      >
                        <Check className="w-4 h-4 text-[#4A7C59]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-4">
            <div>
              {product.discountPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-[#999] text-sm line-through">
                    {formatPrice(product.price)}원
                  </span>
                  <span className="text-xl font-medium text-[#C9A962]">
                    {formatPrice(product.discountPrice)}원
                  </span>
                </div>
              ) : (
                <span className="text-xl font-medium text-[#2D2D2D]">
                  {formatPrice(product.price)}원
                </span>
              )}
            </div>
            <Link
              href={`/booking?studio=${studioName}&product=${product.id}`}
              className="btn-gold btn-sm"
            >
              예약하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Review Card Component
function ReviewCard({
  review,
}: {
  review: {
    id: string;
    userName: string;
    productName: string;
    rating: number;
    content: string;
    images?: string[];
    createdAt: string;
    reply?: { content: string; createdAt: string };
    helpfulCount: number;
    isBest?: boolean;
  };
}) {
  return (
    <div className="bg-white border border-[#E8E0D4] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
            <span className="text-[#C9A962] font-medium">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#2D2D2D]">
                {review.userName}
              </span>
              {review.isBest && (
                <span className="badge badge-gold text-[10px]">베스트</span>
              )}
            </div>
            <p className="text-xs text-[#999]">{review.productName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-[#C9A962] text-[#C9A962]"
                    : "text-[#E8E0D4]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#999]">{review.createdAt}</span>
        </div>
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((img, index) => (
            <div key={index} className="relative w-20 h-20">
              <Image
                src={img}
                alt={`Review image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-[#666] leading-relaxed mb-4">{review.content}</p>

      {/* Reply */}
      {review.reply && (
        <div className="bg-[#F5F0E8] p-4 mb-4">
          <p className="text-sm font-medium text-[#2D2D2D] mb-1">
            스튜디오 답변
            <span className="font-normal text-[#999] ml-2">
              {review.reply.createdAt}
            </span>
          </p>
          <p className="text-sm text-[#666]">{review.reply.content}</p>
        </div>
      )}

      {/* Actions */}
      <button className="flex items-center gap-2 text-sm text-[#999] hover:text-[#C9A962] transition-colors">
        <ThumbsUp className="w-4 h-4" />
        도움이 됐어요 ({review.helpfulCount})
      </button>
    </div>
  );
}

// Coupon Sidebar
function CouponSidebar() {
  return (
    <div className="bg-white border border-[#E8E0D4] p-6 sticky top-24">
      <h3 className="font-display text-lg text-[#2D2D2D] mb-4">혜택 안내</h3>

      {/* Coupons */}
      <div className="border border-dashed border-[#C9A962] p-4 mb-4 bg-[#FAF8F5]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#C9A962]">쿠폰</span>
          <Gift className="w-4 h-4 text-[#C9A962]" />
        </div>
        <p className="text-lg font-medium text-[#2D2D2D] mb-1">
          촬영 5,000원 할인
        </p>
        <p className="text-xs text-[#999]">5만원 이상 예약 시 적용</p>
        <button className="mt-3 w-full py-2 bg-[#C9A962] text-white text-sm font-medium hover:bg-[#B8954A] transition-colors">
          쿠폰 받기
        </button>
      </div>

      {/* Payment Benefits */}
      <div className="border-t border-[#E8E0D4] pt-4">
        <h4 className="text-sm font-medium text-[#2D2D2D] mb-3">결제 혜택</h4>
        <div className="space-y-2 text-sm text-[#666]">
          <p>• 토스페이: 3만원 이상 결제 시 10% 할인</p>
          <p>• 카카오페이: 첫 결제 시 3,000원 할인</p>
        </div>
      </div>

      {/* Quick Booking */}
      <div className="mt-6 pt-6 border-t border-[#E8E0D4]">
        <Link href="/booking" className="btn-gold w-full justify-center">
          <Calendar className="w-4 h-4" />
          빠른 예약
        </Link>
        <p className="text-center text-xs text-[#999] mt-2">
          <Zap className="w-3 h-3 inline mr-1" />
          즉시 예약 가능
        </p>
      </div>
    </div>
  );
}

export default function StudioDetailPage() {
  const params = useParams();
  const studioId = params.id as string;

  // Get studio data
  const studio = getStudioById(studioId) || studios[0];
  const products = getProductsByStudioId(studioId).length > 0
    ? getProductsByStudioId(studioId)
    : getProductsByStudioId("studio-1");
  const studioReviews = getReviewsByStudioId(studioId).length > 0
    ? getReviewsByStudioId(studioId)
    : getReviewsByStudioId("studio-1");

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const reviewRef = useRef(null);
  const isReviewInView = useInView(reviewRef, { once: true, margin: "-100px" });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const tabs = [
    { id: "overview", label: "개요" },
    { id: "products", label: "촬영상품" },
    { id: "facilities", label: "시설/서비스" },
    { id: "location", label: "위치" },
    { id: "reviews", label: "리뷰" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="container-wide py-3">
          <div className="flex items-center gap-2 text-sm text-[#999]">
            <Link href="/" className="hover:text-[#C9A962]">
              홈
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/search" className="hover:text-[#C9A962]">
              서울
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/search?region=강남" className="hover:text-[#C9A962]">
              강남구
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2D2D2D]">{studio.name}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={studio.images} />

      {/* Main Content */}
      <div className="container-wide py-8">
        <div className="flex gap-8">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {/* Studio Header */}
            <div className="bg-white border border-[#E8E0D4] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#C9A962] font-medium">
                      {studio.categoryKr}
                    </span>
                    {studio.isPick && (
                      <span className="badge-outline text-[10px]">PICK</span>
                    )}
                    {studio.isInstantBooking && (
                      <span className="badge badge-gold text-[10px]">
                        즉시예약
                      </span>
                    )}
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl text-[#2D2D2D]">
                    {studio.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A962] transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? "fill-[#C9A962] text-[#C9A962]"
                          : "text-[#666]"
                      }`}
                    />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A962] transition-colors">
                    <Share2 className="w-5 h-5 text-[#666]" />
                  </button>
                </div>
              </div>

              {/* Rating & Info */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#F5F0E8] mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 fill-[#C9A962] text-[#C9A962]" />
                    <span className="text-xl font-medium">{studio.rating}</span>
                  </div>
                  <p className="text-xs text-[#666]">
                    {studio.reviewCount}명 평가
                  </p>
                </div>
                <div className="text-center border-x border-[#E8E0D4]">
                  <p className="text-sm text-[#666] mb-1">시설</p>
                  <p className="text-sm font-medium">
                    {studio.facilities.slice(0, 2).join(", ")}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MapPin className="w-4 h-4 text-[#C9A962]" />
                  </div>
                  <p className="text-sm font-medium">{studio.location}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {studio.tags.map((tag) => (
                  <span key={tag} className="tag text-[12px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border border-[#E8E0D4] mb-6 sticky top-20 z-10">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[100px] py-4 text-sm font-medium text-center transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? "text-[#C9A962] border-[#C9A962]"
                        : "text-[#666] border-transparent hover:text-[#2D2D2D]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <section id="products" className="mb-8">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                촬영 상품 선택
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    studioName={studio.name}
                  />
                ))}
              </div>
            </section>

            {/* Facilities Section */}
            <section id="facilities" className="mb-8">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                시설 및 서비스
              </h2>
              <div className="bg-white border border-[#E8E0D4] p-6">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                  {studio.facilities.map((facilityId) => {
                    const facility = facilities.find((f) => f.label === facilityId);
                    return (
                      <div
                        key={facilityId}
                        className="text-center"
                      >
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#F5F0E8] flex items-center justify-center text-xl">
                          {facility?.icon || "✓"}
                        </div>
                        <p className="text-sm text-[#666]">{facilityId}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Usage Info */}
            <section className="mb-8">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                이용 정보
              </h2>
              <div className="bg-white border border-[#E8E0D4] p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-[#2D2D2D] mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9A962]" />
                    영업 시간
                  </h3>
                  <div className="space-y-1 text-sm text-[#666]">
                    <p>월~금: 10:00 - 20:00</p>
                    <p>토: 10:00 - 18:00</p>
                    <p className="text-[#C75D5D]">일요일/공휴일 휴무</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#2D2D2D] mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A962]" />
                    예약 안내
                  </h3>
                  <div className="space-y-1 text-sm text-[#666]">
                    <p>• 예약은 최소 2일 전까지 가능합니다</p>
                    <p>• 당일 예약은 전화 문의 바랍니다</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#2D2D2D] mb-3">
                    주의사항
                  </h3>
                  <div className="space-y-1 text-sm text-[#666]">
                    <p>• 예약 시간 10분 전까지 도착해주세요</p>
                    <p>• 노쇼 시 예약금 환불이 불가합니다</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-8">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                취소 및 환불 규정
              </h2>
              <div className="bg-white border border-[#E8E0D4] p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#F5F0E8]">
                    <span className="text-[#666]">촬영 7일 전</span>
                    <span className="font-medium text-[#4A7C59]">100% 환불</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F5F0E8]">
                    <span className="text-[#666]">촬영 3일 전</span>
                    <span className="font-medium text-[#D4A84B]">50% 환불</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F5F0E8]">
                    <span className="text-[#666]">촬영 1일 전</span>
                    <span className="font-medium text-[#C75D5D]">30% 환불</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#666]">촬영 당일</span>
                    <span className="font-medium text-[#C75D5D]">환불 불가</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#999]">
                  ※ 자세한 사항은 상품별 상세정보를 확인해주세요
                </p>
              </div>
            </section>

            {/* Location */}
            <section id="location" className="mb-8">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                위치
              </h2>
              <div className="bg-white border border-[#E8E0D4] p-6">
                {/* Map Placeholder */}
                <div className="aspect-video bg-[#F5F0E8] mb-4 flex items-center justify-center">
                  <div className="text-center text-[#999]">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p>지도 영역</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-[#2D2D2D] mb-2">
                      {studio.address}
                    </p>
                    <div className="space-y-1 text-sm text-[#666]">
                      <p className="flex items-center gap-2">
                        <span className="text-[#C9A962]">🚇</span>
                        {studio.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[#C9A962]">🅿️</span>
                        건물 내 주차 가능 (1시간 무료)
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-[#E8E0D4] text-sm hover:border-[#C9A962] transition-colors">
                    주소 복사
                  </button>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" ref={reviewRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl text-[#2D2D2D] mb-2">
                    리얼 리뷰
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#C9A962] text-[#C9A962]"
                        />
                      ))}
                    </div>
                    <span className="font-medium">{studio.rating}</span>
                    <span className="text-[#999]">
                      ({studio.reviewCount}개 리뷰)
                    </span>
                  </div>
                </div>
                <select className="px-4 py-2 border border-[#E8E0D4] text-sm">
                  <option>추천순</option>
                  <option>최신순</option>
                  <option>평점높은순</option>
                  <option>평점낮은순</option>
                </select>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isReviewInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {studioReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </motion.div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
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
              </div>
            </section>

            {/* Similar Studios */}
            <section className="mt-12 pt-12 border-t border-[#E8E0D4]">
              <h2 className="font-display text-2xl text-[#2D2D2D] mb-6">
                다른 고객이 본 비슷한 스튜디오
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {studios
                  .filter((s) => s.id !== studio.id)
                  .slice(0, 4)
                  .map((s, index) => (
                    <StudioCard key={s.id} studio={s} index={index} />
                  ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CouponSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D4] p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            {studio.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-[#999] text-sm line-through">
                  {formatPrice(studio.priceFrom)}원
                </span>
                <span className="text-xl font-medium text-[#C9A962]">
                  {formatPrice(studio.discountPrice)}원~
                </span>
              </div>
            ) : (
              <span className="text-xl font-medium text-[#2D2D2D]">
                {formatPrice(studio.priceFrom)}원~
              </span>
            )}
          </div>
          <Link href="/booking" className="btn-gold">
            예약하기
          </Link>
        </div>
      </div>
    </div>
  );
}
