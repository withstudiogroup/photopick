"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  Flag,
  Check,
  X,
  Send,
  MoreVertical,
  Calendar,
  User,
  AlertTriangle,
  ThumbsUp,
  Eye,
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  content: string;
  date: string;
  product: string;
  images?: string[];
  hasReply: boolean;
  reply?: string;
  replyDate?: string;
  isReported: boolean;
  reportReason?: string;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: "RV001",
    customerName: "김민지",
    rating: 5,
    content:
      "자연광이 너무 예쁘게 들어와서 사진이 정말 잘 나왔어요! 작가님도 친절하시고 긴장하지 않게 잘 이끌어주셔서 편하게 촬영할 수 있었습니다. 보정도 자연스럽게 해주셔서 너무 만족해요. 다음에 또 이용하고 싶습니다!",
    date: "2024.03.18",
    product: "프로필 A코스",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    ],
    hasReply: true,
    reply:
      "민지님, 따뜻한 후기 감사합니다! 촬영 내내 밝게 웃어주셔서 저희도 즐거웠어요. 다음에 또 뵙길 기대할게요 :)",
    replyDate: "2024.03.19",
    isReported: false,
    helpful: 12,
  },
  {
    id: "RV002",
    customerName: "이서연",
    rating: 5,
    content:
      "분위기도 좋고 사진도 예쁘게 나왔습니다. 다음에도 이용할게요! 메이크업도 포함된 패키지라서 편했어요.",
    date: "2024.03.17",
    product: "프로필 B코스",
    hasReply: false,
    isReported: false,
    helpful: 8,
  },
  {
    id: "RV003",
    customerName: "박지훈",
    rating: 4,
    content:
      "전체적으로 만족스러웠습니다. 다만 대기 시간이 조금 길었어요. 사진 퀄리티는 정말 좋습니다.",
    date: "2024.03.16",
    product: "프로필 A코스",
    hasReply: false,
    isReported: false,
    helpful: 5,
  },
  {
    id: "RV004",
    customerName: "최예진",
    rating: 5,
    content:
      "친구랑 같이 커플 스냅 찍었는데 정말 예쁘게 나왔어요! 다양한 포즈도 제안해주시고 자연스러운 분위기에서 촬영할 수 있었습니다.",
    date: "2024.03.15",
    product: "커플 스냅",
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&q=80",
    ],
    hasReply: true,
    reply: "예진님 감사합니다! 두 분의 케미가 정말 좋으셔서 저희도 재미있게 촬영했어요 :)",
    replyDate: "2024.03.16",
    isReported: false,
    helpful: 15,
  },
  {
    id: "RV005",
    customerName: "정하늘",
    rating: 2,
    content: "솔직히 기대에 비해 별로였어요. 보정이 너무 과하고 자연스럽지 않았습니다.",
    date: "2024.03.14",
    product: "프로필 A코스",
    hasReply: false,
    isReported: true,
    reportReason: "부적절한 내용",
    helpful: 2,
  },
  {
    id: "RV006",
    customerName: "강서현",
    rating: 5,
    content:
      "가족사진 찍으러 왔는데 아이도 잘 다뤄주시고 너무 좋은 추억이 됐어요. 인화해서 거실에 걸어뒀습니다!",
    date: "2024.03.13",
    product: "가족 패키지",
    images: [
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
    ],
    hasReply: true,
    reply: "서현님 가족분들 모두 너무 포토제닉하셨어요! 좋은 추억 되셔서 기쁩니다 :)",
    replyDate: "2024.03.14",
    isReported: false,
    helpful: 20,
  },
];

const ratingFilters = [
  { value: "all", label: "전체 평점" },
  { value: "5", label: "5점" },
  { value: "4", label: "4점" },
  { value: "3", label: "3점" },
  { value: "2", label: "2점" },
  { value: "1", label: "1점" },
];

const statusFilters = [
  { value: "all", label: "전체" },
  { value: "replied", label: "답변 완료" },
  { value: "pending", label: "답변 대기" },
  { value: "reported", label: "신고됨" },
];

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

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyModal, setReplyModal] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [reportModal, setReportModal] = useState<string | null>(null);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      ratingFilter === "all" || review.rating.toString() === ratingFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "replied" && review.hasReply) ||
      (statusFilter === "pending" && !review.hasReply && !review.isReported) ||
      (statusFilter === "reported" && review.isReported);
    return matchesSearch && matchesRating && matchesStatus;
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  const handleReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              hasReply: true,
              reply: replyText,
              replyDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
            }
          : r
      )
    );
    setReplyModal(null);
    setReplyText("");
  };

  const handleDismissReport = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, isReported: false, reportReason: undefined } : r
      )
    );
    setReportModal(null);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setReportModal(null);
  };

  const currentReview = reviews.find(
    (r) => r.id === (replyModal || reportModal)
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-display text-3xl text-[var(--color-charcoal)]">리뷰 관리</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          고객 리뷰를 확인하고 답변을 달아보세요.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">평균 평점</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-6 h-6 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <span className="text-3xl font-semibold text-[var(--color-charcoal)]">
                  {averageRating}
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-[var(--color-gold)]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">총 리뷰</p>
          <p className="text-3xl font-semibold text-[var(--color-charcoal)] mt-2">
            {reviews.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">답변 대기</p>
          <p className="text-3xl font-semibold text-amber-600 mt-2">
            {reviews.filter((r) => !r.hasReply && !r.isReported).length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">신고된 리뷰</p>
          <p className="text-3xl font-semibold text-red-500 mt-2">
            {reviews.filter((r) => r.isReported).length}
          </p>
        </div>
      </motion.div>

      {/* Rating Distribution */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-[var(--color-beige-dark)]">
        <h2 className="font-medium text-[var(--color-charcoal)] mb-4">평점 분포</h2>
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm text-[var(--color-text-secondary)]">{item.rating}</span>
                <Star className="w-3.5 h-3.5 text-[var(--color-gold)] fill-[var(--color-gold)]" />
              </div>
              <div className="flex-1 h-2 bg-[var(--color-beige)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-gold)] rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-[var(--color-text-muted)] w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="고객명 또는 리뷰 내용 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
          />
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] bg-white min-w-[130px]"
          >
            {ratingFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] bg-white min-w-[130px]"
          >
            {statusFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={`bg-white rounded-xl border p-6 ${
              review.isReported
                ? "border-red-200 bg-red-50/30"
                : "border-[var(--color-beige-dark)]"
            }`}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-beige)] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {review.customerName}
                    </p>
                    {review.isReported && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                        신고됨
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <span>{review.product}</span>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-[var(--color-gold)] fill-[var(--color-gold)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Status Badge */}
                {review.hasReply ? (
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
                    답변 완료
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
                    답변 대기
                  </span>
                )}
              </div>
            </div>

            {/* Review Content */}
            <p className="text-[var(--color-text-secondary)] mb-4">{review.content}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>
            )}

            {/* Helpful Count */}
            <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-4">
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful}명에게 도움됨</span>
            </div>

            {/* Reply Section */}
            {review.hasReply && review.reply && (
              <div className="bg-[var(--color-beige)]/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-sm font-medium text-[var(--color-charcoal)]">
                    스튜디오 답변
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {review.replyDate}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{review.reply}</p>
              </div>
            )}

            {/* Report Info */}
            {review.isReported && review.reportReason && (
              <div className="bg-red-50 rounded-lg p-4 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">신고 사유</p>
                  <p className="text-sm text-red-600">{review.reportReason}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-beige)]">
              {!review.hasReply && !review.isReported && (
                <button
                  onClick={() => {
                    setReplyModal(review.id);
                    setReplyText(review.reply || "");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  답변 작성
                </button>
              )}
              {review.hasReply && (
                <button
                  onClick={() => {
                    setReplyModal(review.id);
                    setReplyText(review.reply || "");
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-[var(--color-gold)] border border-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)]/5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  답변 수정
                </button>
              )}
              {review.isReported && (
                <button
                  onClick={() => setReportModal(review.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Flag className="w-4 h-4" />
                  신고 처리
                </button>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <MessageSquare className="w-16 h-16 text-[var(--color-beige-dark)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">
            {searchQuery || ratingFilter !== "all" || statusFilter !== "all"
              ? "검색 결과가 없습니다."
              : "등록된 리뷰가 없습니다."}
          </p>
        </motion.div>
      )}

      {/* Reply Modal */}
      <AnimatePresence>
        {replyModal && currentReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setReplyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-lg w-full"
            >
              <div className="p-6 border-b border-[var(--color-beige-dark)]">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl text-[var(--color-charcoal)]">
                    {currentReview.hasReply ? "답변 수정" : "답변 작성"}
                  </h2>
                  <button
                    onClick={() => setReplyModal(null)}
                    className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Original Review */}
                <div className="bg-[var(--color-beige)]/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {currentReview.customerName}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < currentReview.rating
                              ? "text-[var(--color-gold)] fill-[var(--color-gold)]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {currentReview.content}
                  </p>
                </div>

                {/* Reply Input */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    답변 내용
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="고객님께 전달할 답변을 작성해주세요."
                    className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] resize-none"
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">
                    친절하고 전문적인 답변은 다른 고객에게도 좋은 인상을 줍니다.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-[var(--color-beige-dark)] flex gap-3">
                <button
                  onClick={() => setReplyModal(null)}
                  className="flex-1 py-3 border border-[var(--color-beige-dark)] text-[var(--color-charcoal)] rounded-lg hover:bg-[var(--color-beige)] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => handleReply(replyModal)}
                  className="flex-1 py-3 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {currentReview.hasReply ? "수정하기" : "답변 등록"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {reportModal && currentReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setReportModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-md w-full"
            >
              <div className="p-6 border-b border-[var(--color-beige-dark)]">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl text-[var(--color-charcoal)]">신고 처리</h2>
                  <button
                    onClick={() => setReportModal(null)}
                    className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-red-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 mb-1">신고 사유</p>
                      <p className="text-sm text-red-600">{currentReview.reportReason}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-beige)]/50 rounded-lg p-4">
                  <p className="font-medium text-[var(--color-charcoal)] mb-2">
                    {currentReview.customerName}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {currentReview.content}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-[var(--color-beige-dark)] flex gap-3">
                <button
                  onClick={() => handleDismissReport(reportModal)}
                  className="flex-1 py-3 border border-[var(--color-beige-dark)] text-[var(--color-charcoal)] rounded-lg hover:bg-[var(--color-beige)] transition-colors"
                >
                  신고 해제
                </button>
                <button
                  onClick={() => handleDeleteReview(reportModal)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  리뷰 삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
