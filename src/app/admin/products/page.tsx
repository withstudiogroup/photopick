"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  DollarSign,
  Camera,
  Check,
  X,
  ChevronDown,
  Package,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  includes: string[];
  image: string;
  isActive: boolean;
  bookingCount: number;
}

const mockProducts: Product[] = [
  {
    id: "PRD001",
    name: "프로필 A코스",
    category: "프로필",
    price: 50000,
    duration: 30,
    description: "자연스러운 프로필 촬영. 보정본 5장 제공.",
    includes: ["보정본 5장", "원본 전체", "의상 1벌"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    isActive: true,
    bookingCount: 45,
  },
  {
    id: "PRD002",
    name: "프로필 B코스",
    category: "프로필",
    price: 80000,
    duration: 60,
    description: "프리미엄 프로필 촬영. 보정본 10장 제공.",
    includes: ["보정본 10장", "원본 전체", "의상 2벌", "메이크업 포함"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    isActive: true,
    bookingCount: 32,
  },
  {
    id: "PRD003",
    name: "프로필 C코스",
    category: "프로필",
    price: 150000,
    duration: 90,
    description: "시그니처 프로필 촬영. 전문 헤어&메이크업 포함.",
    includes: ["보정본 20장", "원본 전체", "의상 3벌", "헤어&메이크업", "액자 1개"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    isActive: true,
    bookingCount: 18,
  },
  {
    id: "PRD004",
    name: "커플 스냅",
    category: "커플",
    price: 120000,
    duration: 60,
    description: "커플 스냅 촬영. 다양한 컨셉 연출.",
    includes: ["보정본 15장", "원본 전체", "컨셉 소품"],
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80",
    isActive: true,
    bookingCount: 28,
  },
  {
    id: "PRD005",
    name: "가족 패키지",
    category: "가족",
    price: 200000,
    duration: 120,
    description: "온 가족이 함께하는 특별한 촬영.",
    includes: ["보정본 30장", "원본 전체", "대형 액자 1개", "포토북 1권"],
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80",
    isActive: false,
    bookingCount: 12,
  },
];

const categories = ["전체", "프로필", "커플", "가족", "증명사진", "우정"];

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
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
          <h1 className="font-display text-3xl text-[var(--color-charcoal)]">상품 관리</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            촬영 상품을 추가하고 관리하세요.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 상품 추가
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="상품명 또는 상품코드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] bg-white min-w-[140px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">전체 상품</p>
          <p className="text-2xl font-semibold text-[var(--color-charcoal)] mt-1">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">판매 중</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-1">
            {products.filter((p) => p.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">판매 중지</p>
          <p className="text-2xl font-semibold text-gray-500 mt-1">
            {products.filter((p) => !p.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[var(--color-beige-dark)]">
          <p className="text-sm text-[var(--color-text-muted)]">총 예약</p>
          <p className="text-2xl font-semibold text-[var(--color-gold)] mt-1">
            {products.reduce((sum, p) => sum + p.bookingCount, 0)}
          </p>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            className={`bg-white rounded-xl border overflow-hidden transition-all ${
              product.isActive
                ? "border-[var(--color-beige-dark)] hover:shadow-lg"
                : "border-gray-200 opacity-70"
            }`}
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.isActive
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {product.isActive ? "판매 중" : "판매 중지"}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-white/90 text-[var(--color-charcoal)] rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Price */}
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-lg">
                  {formatPrice(product.price)}원
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-[var(--color-charcoal)]">{product.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{product.id}</p>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {product.duration}분
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  {product.bookingCount}건
                </div>
              </div>

              {/* Includes */}
              <div className="flex flex-wrap gap-1 mb-4">
                {product.includes.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs bg-[var(--color-beige)] text-[var(--color-text-secondary)] rounded"
                  >
                    {item}
                  </span>
                ))}
                {product.includes.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                    +{product.includes.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-beige)]">
                <button
                  onClick={() => toggleProductStatus(product.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    product.isActive
                      ? "text-gray-600 hover:bg-gray-100"
                      : "text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {product.isActive ? (
                    <>
                      <ToggleRight className="w-4 h-4" />
                      중지
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4" />
                      활성화
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  수정
                </button>
                <button
                  onClick={() => setDeleteConfirm(product.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Package className="w-16 h-16 text-[var(--color-beige-dark)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">
            {searchQuery || selectedCategory !== "전체"
              ? "검색 결과가 없습니다."
              : "등록된 상품이 없습니다."}
          </p>
          <button
            onClick={handleAddNew}
            className="mt-4 text-[var(--color-gold)] hover:underline"
          >
            새 상품 추가하기
          </button>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                상품 삭제
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2 border border-[var(--color-beige-dark)] text-[var(--color-charcoal)] rounded-lg hover:bg-[var(--color-beige)] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[var(--color-beige-dark)] flex items-center justify-between">
                <h2 className="font-display text-xl text-[var(--color-charcoal)]">
                  {editingProduct ? "상품 수정" : "새 상품 추가"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <form className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                      상품 이미지
                    </label>
                    <div className="border-2 border-dashed border-[var(--color-beige-dark)] rounded-xl p-8 text-center hover:border-[var(--color-gold)] transition-colors cursor-pointer">
                      <ImageIcon className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-2" />
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        클릭하여 이미지 업로드
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        권장: 800x600px, 최대 5MB
                      </p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                        상품명 *
                      </label>
                      <input
                        type="text"
                        defaultValue={editingProduct?.name}
                        placeholder="예: 프로필 A코스"
                        className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                        카테고리 *
                      </label>
                      <select
                        defaultValue={editingProduct?.category || ""}
                        className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                      >
                        <option value="">선택하세요</option>
                        {categories.filter((c) => c !== "전체").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price and Duration */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                        가격 (원) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                        <input
                          type="number"
                          defaultValue={editingProduct?.price}
                          placeholder="50000"
                          className="w-full pl-12 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                        소요 시간 (분) *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                        <input
                          type="number"
                          defaultValue={editingProduct?.duration}
                          placeholder="60"
                          className="w-full pl-12 pr-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                      상품 설명
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={editingProduct?.description}
                      placeholder="상품에 대한 간략한 설명을 입력하세요."
                      className="w-full px-4 py-3 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] resize-none"
                    />
                  </div>

                  {/* Includes */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                      포함 내역
                    </label>
                    <div className="space-y-2">
                      {(editingProduct?.includes || ["", "", ""]).map((item, idx) => (
                        <input
                          key={idx}
                          type="text"
                          defaultValue={item}
                          placeholder={`포함 내역 ${idx + 1}`}
                          className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                        />
                      ))}
                      <button
                        type="button"
                        className="text-sm text-[var(--color-gold)] hover:underline"
                      >
                        + 항목 추가
                      </button>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between p-4 bg-[var(--color-beige)] rounded-lg">
                    <div>
                      <p className="font-medium text-[var(--color-charcoal)]">판매 상태</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        상품의 판매 여부를 설정합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="relative w-14 h-8 bg-emerald-500 rounded-full transition-colors"
                    >
                      <span className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[var(--color-beige-dark)] flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-[var(--color-beige-dark)] text-[var(--color-charcoal)] rounded-lg hover:bg-[var(--color-beige)] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors"
                >
                  {editingProduct ? "저장" : "등록"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
