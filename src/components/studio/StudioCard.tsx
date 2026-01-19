"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, MapPin, Zap } from "lucide-react";
import { Studio } from "@/data/studios";
import { useState } from "react";

interface StudioCardProps {
  studio: Studio;
  index?: number;
  variant?: "default" | "horizontal" | "featured";
}

export default function StudioCard({
  studio,
  index = 0,
  variant = "default",
}: StudioCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/studio/${studio.id}`} className="block group">
          <div className="studio-card-horizontal gap-0 md:gap-6 lg:gap-8">
            {/* Image */}
            <div className="relative w-full md:w-80 lg:w-96 xl:w-[420px] 2xl:w-[480px] flex-shrink-0">
              <div className="aspect-[4/3] relative overflow-hidden rounded-sm">
                <Image
                  src={studio.images[0]}
                  alt={studio.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {studio.discountPrice && (
                  <div className="absolute top-3 left-3 badge badge-gold">
                    특가
                  </div>
                )}
              </div>
              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted
                      ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 md:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">
                      {studio.categoryKr}
                    </span>
                    {studio.isPick && (
                      <span className="badge-outline text-[10px]">PICK</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors">
                    {studio.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 ml-4">
                  <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  <span className="font-medium text-[var(--color-charcoal)]">
                    {studio.rating}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-sm">
                    ({studio.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-sm mb-5">
                <MapPin className="w-4 h-4" />
                <span>{studio.location}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {studio.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag text-[11px]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-end justify-between mb-5">
                <div>
                  {studio.discountPrice ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-[var(--color-text-muted)] text-sm line-through">
                        {formatPrice(studio.priceFrom)}원
                      </span>
                      <span className="text-xl lg:text-2xl font-medium text-[var(--color-gold)]">
                        {formatPrice(studio.discountPrice)}원~
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl lg:text-2xl font-medium text-[var(--color-charcoal)]">
                      {formatPrice(studio.priceFrom)}원~
                    </span>
                  )}
                </div>
                {studio.isInstantBooking && (
                  <div className="flex items-center gap-1.5 text-[var(--color-success)] text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    <span>즉시예약</span>
                  </div>
                )}
              </div>

              {/* Preview Review */}
              <p className="pt-5 border-t border-[var(--color-beige)] text-sm text-[var(--color-text-secondary)] line-clamp-1 italic">
                &ldquo;{studio.description}&rdquo;
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Link href={`/studio/${studio.id}`} className="block group">
          <div className="overflow-hidden rounded-sm">
            {/* Image */}
            <div className="aspect-[3/4] relative">
              <Image
                src={studio.images[0]}
                alt={studio.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Strong gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

              {/* Text content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent pt-16">
                <p className="text-xs uppercase tracking-widest text-gold-force mb-2 font-semibold">
                  {studio.categoryKr}
                </p>
                <h3 className="font-display text-xl text-white-force mb-2 leading-snug font-medium">
                  {studio.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  <span className="text-white font-semibold">{studio.rating}</span>
                  <span className="text-[var(--color-warm-gray)]">•</span>
                  <span className="text-[var(--color-warm-gray)]">{studio.location}</span>
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted
                      ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/studio/${studio.id}`} className="block group">
        <div className="card bg-white border border-transparent hover:border-[var(--color-gold)]/30 transition-all duration-500">
          {/* Image */}
          <div className="card-image aspect-[4/3] relative overflow-hidden">
            <Image
              src={studio.images[0]}
              alt={studio.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {studio.discountPrice && (
                <span className="badge badge-gold shadow-lg">특가</span>
              )}
              {studio.isPick && (
                <span className="badge bg-white/95 backdrop-blur-md text-[var(--color-charcoal)] shadow-lg font-semibold">
                  PICK
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted
                    ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              />
            </button>

            {/* Instant Booking */}
            {studio.isInstantBooking && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[var(--color-success)] shadow-lg rounded-sm">
                <Zap className="w-3.5 h-3.5" />
                즉시예약
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-gold)] font-semibold mb-1.5">
                  {studio.categoryKr}
                </p>
                <h3 className="font-display text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {studio.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-[var(--color-beige)] px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                <span className="font-semibold text-sm text-[var(--color-charcoal)]">{studio.rating}</span>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] text-sm mb-4">{studio.location}</p>

            {/* Price with better styling */}
            <div className="flex items-baseline gap-2 pt-3 border-t border-[var(--color-beige)]">
              {studio.discountPrice ? (
                <>
                  <span className="text-[var(--color-text-muted)] text-sm line-through">
                    {formatPrice(studio.priceFrom)}원
                  </span>
                  <span className="font-semibold text-lg text-[var(--color-gold)]">
                    {formatPrice(studio.discountPrice)}원~
                  </span>
                </>
              ) : (
                <span className="font-semibold text-lg text-[var(--color-charcoal)]">
                  {formatPrice(studio.priceFrom)}원~
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
