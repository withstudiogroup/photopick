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
  ChevronRight,
  Check,
  Zap,
  Calendar,
  Users,
  Gift,
  ChevronLeft,
  ChevronDown,
  ThumbsUp,
  Phone,
  Sparkles,
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

function ImageGallery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = [
    ...images,
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ];

  return (
    <div className="relative bg-[var(--color-charcoal)]">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        navigation={{
          prevEl: ".gallery-main-prev",
          nextEl: ".gallery-main-next",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="aspect-[16/9] md:aspect-[21/9]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="gallery-main-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
        <ChevronLeft className="w-6 h-6 text-[var(--color-charcoal)]" />
      </button>
      <button className="gallery-main-next absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
        <ChevronRight className="w-6 h-6 text-[var(--color-charcoal)]" />
      </button>

      <div className="absolute bottom-6 right-6 z-10 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
        {activeIndex + 1} / {galleryImages.length}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-6">
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={6}
          freeMode
          watchSlidesProgress
          className="max-w-4xl mx-auto"
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div
                className={`aspect-[4/3] relative border-2 transition-all ${
                  activeIndex === index ? "border-[var(--color-gold)] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
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
    </div>
  );
}

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

  const discountPercent = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6 hover:border-[var(--color-gold)] transition-all group"
    >
      <div className="flex gap-6">
        <div className="relative w-36 h-36 flex-shrink-0 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-[var(--color-gold)] text-white text-[10px] font-bold px-2 py-1">
              {discountPercent}% OFF
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{product.description}</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[var(--color-gold)] text-sm font-medium flex items-center gap-1 hover:underline"
            >
              상세정보
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="border-t border-[var(--color-beige)] my-4 pt-4">
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)] mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                <span>{product.duration}분</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--color-gold)]" />
                <span>{product.maxPeople}인 기준</span>
              </div>
            </div>

            {!isExpanded && (
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-1">
                포함: {product.includes.join(", ")}
              </p>
            )}

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    포함 내역
                  </p>
                  <ul className="space-y-1.5">
                    {product.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
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

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-beige)]">
            <div>
              {product.discountPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-[var(--color-text-muted)] text-sm line-through">
                    {formatPrice(product.price)}원
                  </span>
                  <span className="text-2xl font-medium text-[var(--color-gold)]">
                    {formatPrice(product.discountPrice)}원
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-medium text-[var(--color-charcoal)]">
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
    </motion.div>
  );
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold)] flex items-center justify-center">
            <span className="text-white font-medium">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--color-charcoal)]">
                {review.userName}
              </span>
              {review.isBest && (
                <span className="badge badge-gold text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1" />
                  베스트
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">{review.productName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                    : "text-[var(--color-beige-dark)]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">{review.createdAt}</span>
        </div>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((img, index) => (
            <div key={index} className="relative w-20 h-20 rounded overflow-hidden">
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

      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{review.content}</p>

      {review.reply && (
        <div className="bg-[var(--color-beige)] p-4 mb-4">
          <p className="text-sm font-medium text-[var(--color-charcoal)] mb-1">
            스튜디오 답변
            <span className="font-normal text-[var(--color-text-muted)] ml-2">
              {review.reply.createdAt}
            </span>
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{review.reply.content}</p>
        </div>
      )}

      <button className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
        <ThumbsUp className="w-4 h-4" />
        도움이 됐어요 ({review.helpfulCount})
      </button>
    </motion.div>
  );
}

function CouponSidebar({ studio }: { studio: typeof studios[0] }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] sticky top-24">
      <div className="p-6 border-b border-[var(--color-beige-dark)]">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">
            {studio.categoryKr}
          </p>
          {studio.isInstantBooking && (
            <span className="badge badge-gold text-[10px]">
              <Zap className="w-3 h-3 mr-1" />
              즉시예약
            </span>
          )}
        </div>
        <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-2">{studio.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
          <span className="font-medium">{studio.rating}</span>
          <span className="text-[var(--color-text-muted)]">({studio.reviewCount}개 리뷰)</span>
        </div>
      </div>

      <div className="p-6 border-b border-[var(--color-beige-dark)]">
        <div className="border border-dashed border-[var(--color-gold)] p-4 bg-[var(--color-beige)]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-gold)]">쿠폰 혜택</span>
            <Gift className="w-4 h-4 text-[var(--color-gold)]" />
          </div>
          <p className="text-lg font-medium text-[var(--color-charcoal)] mb-1">
            촬영 5,000원 할인
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">5만원 이상 예약 시 적용</p>
          <button className="mt-3 w-full py-2.5 bg-[var(--color-gold)] text-white text-sm font-medium hover:bg-[var(--color-gold-dark)] transition-colors">
            쿠폰 받기
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-[var(--color-beige-dark)]">
        <h4 className="text-sm font-medium text-[var(--color-charcoal)] mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
          결제 혜택
        </h4>
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>• 토스페이: 3만원 이상 결제 시 10% 할인</p>
          <p>• 카카오페이: 첫 결제 시 3,000원 할인</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          {studio.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-[var(--color-text-muted)] line-through">
                {formatPrice(studio.priceFrom)}원~
              </span>
              <span className="text-2xl font-medium text-[var(--color-gold)]">
                {formatPrice(studio.discountPrice)}원~
              </span>
            </div>
          ) : (
            <span className="text-2xl font-medium text-[var(--color-charcoal)]">
              {formatPrice(studio.priceFrom)}원~
            </span>
          )}
        </div>
        <Link href="/booking" className="btn-gold w-full justify-center mb-3">
          <Calendar className="w-4 h-4" />
          빠른 예약
        </Link>
        <button className="w-full py-3 border border-[var(--color-beige-dark)] text-sm font-medium hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          전화 문의
        </button>
      </div>
    </div>
  );
}

function StudioCard({ studio, index }: { studio: typeof studios[0]; index: number }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium group"
    >
      <Link href={`/studio/${studio.id}`} className="relative aspect-[4/3] block overflow-hidden">
        <Image
          src={studio.images[0]}
          alt={studio.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </Link>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] font-medium mb-1">
          {studio.categoryKr}
        </p>
        <h3 className="font-display text-lg text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
          {studio.name}
        </h3>
        <div className="flex items-center gap-2 text-sm mb-2">
          <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
          <span className="font-medium">{studio.rating}</span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-secondary)]">{studio.location}</span>
        </div>
        <span className="text-lg font-medium text-[var(--color-charcoal)]">
          {formatPrice(studio.priceFrom)}원~
        </span>
      </div>
    </motion.article>
  );
}

export default function StudioDetailPage() {
  const params = useParams();
  const studioId = params.id as string;

  const studio = getStudioById(studioId) || studios[0];
  const products = getProductsByStudioId(studioId).length > 0
    ? getProductsByStudioId(studioId)
    : getProductsByStudioId("studio-1");
  const studioReviews = getReviewsByStudioId(studioId).length > 0
    ? getReviewsByStudioId(studioId)
    : getReviewsByStudioId("studio-1");

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  const reviewRef = useRef(null);
  const isReviewInView = useInView(reviewRef, { once: true, margin: "-100px" });

  const tabs = [
    { id: "products", label: "촬영상품" },
    { id: "facilities", label: "시설/서비스" },
    { id: "location", label: "위치" },
    { id: "reviews", label: "리뷰" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-20">
      <div className="bg-[var(--color-white)] border-b border-[var(--color-beige-dark)]">
        <div className="container-wide py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
              홈
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/search" className="hover:text-[var(--color-gold)] transition-colors">
              검색
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--color-charcoal)]">{studio.name}</span>
          </div>
        </div>
      </div>

      <ImageGallery images={studio.images} />

      <div className="container-wide py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">
                      {studio.categoryKr}
                    </span>
                    {studio.isPick && (
                      <span className="badge-outline text-[10px]">PICK</span>
                    )}
                    {studio.isInstantBooking && (
                      <span className="badge badge-gold text-[10px]">
                        <Zap className="w-3 h-3 mr-1" />
                        즉시예약
                      </span>
                    )}
                  </div>
                  <h1 className="font-display text-4xl text-[var(--color-charcoal)]">
                    {studio.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-11 h-11 border border-[var(--color-beige-dark)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    />
                  </button>
                  <button className="w-11 h-11 border border-[var(--color-beige-dark)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors">
                    <Share2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-5 bg-[var(--color-beige)]/50 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Star className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                    <span className="text-2xl font-medium">{studio.rating}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {studio.reviewCount}명 평가
                  </p>
                </div>
                <div className="text-center border-x border-[var(--color-beige-dark)]">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">시설</p>
                  <p className="text-sm font-medium">
                    {studio.facilities.slice(0, 2).join(", ")}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
                  </div>
                  <p className="text-sm font-medium">{studio.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {studio.tags.map((tag) => (
                  <span key={tag} className="tag text-[12px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] mb-8 sticky top-20 z-10">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-sm font-medium text-center transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? "text-[var(--color-gold)] border-[var(--color-gold)]"
                        : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-charcoal)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <section id="products" className="mb-10">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
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

            <section id="facilities" className="mb-10">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
                시설 및 서비스
              </h2>
              <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
                  {studio.facilities.map((facilityId) => {
                    const facility = facilities.find((f) => f.label === facilityId);
                    return (
                      <div key={facilityId} className="text-center">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--color-beige)] flex items-center justify-center text-2xl">
                          {facility?.icon || "✓"}
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)]">{facilityId}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
                이용 정보
              </h2>
              <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8 space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-charcoal)] mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                    영업 시간
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                    <p>월~금: 10:00 - 20:00</p>
                    <p>토: 10:00 - 18:00</p>
                    <p className="text-[#C75D5D]">일요일/공휴일 휴무</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-charcoal)] mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
                    예약 안내
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                    <p>• 예약은 최소 2일 전까지 가능합니다</p>
                    <p>• 당일 예약은 전화 문의 바랍니다</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-charcoal)] mb-3">
                    주의사항
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                    <p>• 예약 시간 10분 전까지 도착해주세요</p>
                    <p>• 노쇼 시 예약금 환불이 불가합니다</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
                취소 및 환불 규정
              </h2>
              <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8">
                <div className="space-y-0 text-sm">
                  <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">촬영 7일 전</span>
                    <span className="font-medium text-[#4A7C59]">100% 환불</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">촬영 3일 전</span>
                    <span className="font-medium text-[#D4A84B]">50% 환불</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-[var(--color-beige)]">
                    <span className="text-[var(--color-text-secondary)]">촬영 1일 전</span>
                    <span className="font-medium text-[#C75D5D]">30% 환불</span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-[var(--color-text-secondary)]">촬영 당일</span>
                    <span className="font-medium text-[#C75D5D]">환불 불가</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                  ※ 자세한 사항은 상품별 상세정보를 확인해주세요
                </p>
              </div>
            </section>

            <section id="location" className="mb-10">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
                위치
              </h2>
              <div className="bg-[var(--color-white)] border border-[var(--color-beige-dark)] p-8">
                <div className="aspect-video bg-[var(--color-beige)] mb-6 flex items-center justify-center">
                  <div className="text-center text-[var(--color-text-muted)]">
                    <MapPin className="w-10 h-10 mx-auto mb-2" />
                    <p>지도 영역</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)] mb-3">
                      {studio.address}
                    </p>
                    <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                      <p className="flex items-center gap-2">
                        <span className="text-[var(--color-gold)]">🚇</span>
                        {studio.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[var(--color-gold)]">🅿️</span>
                        건물 내 주차 가능 (1시간 무료)
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-[var(--color-beige-dark)] text-sm hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
                    주소 복사
                  </button>
                </div>
              </div>
            </section>

            <section id="reviews" ref={reviewRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">
                    리얼 리뷰
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]"
                        />
                      ))}
                    </div>
                    <span className="font-medium">{studio.rating}</span>
                    <span className="text-[var(--color-text-muted)]">
                      ({studio.reviewCount}개 리뷰)
                    </span>
                  </div>
                </div>
                <select className="px-4 py-2.5 border border-[var(--color-beige-dark)] text-sm focus:border-[var(--color-gold)] outline-none transition-colors">
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

              <div className="flex items-center justify-center gap-1 mt-10">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center transition-colors ${
                      page === 1
                        ? "bg-[var(--color-charcoal)] text-white"
                        : "border border-[var(--color-beige-dark)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-16 pt-16 border-t border-[var(--color-beige-dark)]">
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-6">
                비슷한 스튜디오
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {studios
                  .filter((s) => s.id !== studio.id)
                  .slice(0, 4)
                  .map((s, index) => (
                    <StudioCard key={s.id} studio={s} index={index} />
                  ))}
              </div>
            </section>
          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <CouponSidebar studio={studio} />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-white)] border-t border-[var(--color-beige-dark)] p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            {studio.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-[var(--color-text-muted)] text-sm line-through">
                  {new Intl.NumberFormat("ko-KR").format(studio.priceFrom)}원
                </span>
                <span className="text-xl font-medium text-[var(--color-gold)]">
                  {new Intl.NumberFormat("ko-KR").format(studio.discountPrice)}원~
                </span>
              </div>
            ) : (
              <span className="text-xl font-medium text-[var(--color-charcoal)]">
                {new Intl.NumberFormat("ko-KR").format(studio.priceFrom)}원~
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
