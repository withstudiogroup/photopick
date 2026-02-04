"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Upload,
  X,
  GripVertical,
  Trash2,
  Eye,
  Filter,
  Grid3X3,
  LayoutGrid,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";

interface PortfolioImage {
  id: string;
  url: string;
  category: string;
  order: number;
  uploadedAt: string;
}

const mockImages: PortfolioImage[] = [
  {
    id: "IMG001",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    category: "프로필",
    order: 1,
    uploadedAt: "2024.03.15",
  },
  {
    id: "IMG002",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    category: "프로필",
    order: 2,
    uploadedAt: "2024.03.14",
  },
  {
    id: "IMG003",
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    category: "프로필",
    order: 3,
    uploadedAt: "2024.03.13",
  },
  {
    id: "IMG004",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
    category: "커플",
    order: 4,
    uploadedAt: "2024.03.12",
  },
  {
    id: "IMG005",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
    category: "가족",
    order: 5,
    uploadedAt: "2024.03.11",
  },
  {
    id: "IMG006",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    category: "프로필",
    order: 6,
    uploadedAt: "2024.03.10",
  },
  {
    id: "IMG007",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    category: "프로필",
    order: 7,
    uploadedAt: "2024.03.09",
  },
  {
    id: "IMG008",
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    category: "프로필",
    order: 8,
    uploadedAt: "2024.03.08",
  },
  {
    id: "IMG009",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    category: "프로필",
    order: 9,
    uploadedAt: "2024.03.07",
  },
  {
    id: "IMG010",
    url: "https://images.unsplash.com/photo-1488161628813-04466f0016e4?w=600&q=80",
    category: "커플",
    order: 10,
    uploadedAt: "2024.03.06",
  },
];

const categories = ["전체", "프로필", "커플", "가족", "증명사진", "우정"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function AdminPortfolioPage() {
  const [images, setImages] = useState<PortfolioImage[]>(mockImages);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const filteredImages = images.filter(
    (img) => selectedCategory === "전체" || img.category === selectedCategory
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  }, []);

  const toggleSelectImage = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map((img) => img.id));
    }
  };

  const deleteSelected = () => {
    setImages((prev) => prev.filter((img) => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  };

  const handleReorder = (newOrder: PortfolioImage[]) => {
    setImages(newOrder);
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
          <h1 className="font-display text-3xl text-[var(--color-charcoal)]">포트폴리오 관리</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            스튜디오의 작품들을 관리하고 순서를 조정하세요.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-muted)]">
            총 {images.length}장
          </span>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        variants={itemVariants}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
            : "border-[var(--color-beige-dark)] hover:border-[var(--color-gold)]/50"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[var(--color-charcoal)] font-medium">업로드 중...</p>
          </div>
        ) : (
          <>
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-[var(--color-gold)]" : "text-[var(--color-text-muted)]"}`} />
            <p className="text-[var(--color-charcoal)] font-medium mb-1">
              이미지를 드래그하여 업로드
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              또는 클릭하여 파일 선택
            </p>
            <button className="px-6 py-2 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors">
              파일 선택
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              지원 형식: JPG, PNG, WebP (최대 10MB)
            </p>
          </>
        )}
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-xl border border-[var(--color-beige-dark)]">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] bg-white text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[var(--color-beige)] rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("compact")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "compact"
                ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1" />

        {/* Selection Actions */}
        {selectedImages.length > 0 ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {selectedImages.length}장 선택됨
            </span>
            <button
              onClick={deleteSelected}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
            <button
              onClick={() => setSelectedImages([])}
              className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] rounded-lg transition-colors"
            >
              선택 해제
            </button>
          </div>
        ) : (
          <button
            onClick={selectAll}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            전체 선택
          </button>
        )}
      </motion.div>

      {/* Info Banner */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl text-blue-700"
      >
        <GripVertical className="w-5 h-5" />
        <p className="text-sm">
          이미지를 드래그하여 순서를 변경할 수 있습니다. 변경된 순서는 자동으로 저장됩니다.
        </p>
      </motion.div>

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <Reorder.Group
          axis="x"
          values={filteredImages}
          onReorder={handleReorder}
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          }`}
        >
          {filteredImages.map((image) => (
            <Reorder.Item
              key={image.id}
              value={image}
              className={`group relative aspect-square bg-[var(--color-beige)] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing ${
                selectedImages.includes(image.id)
                  ? "ring-2 ring-[var(--color-gold)] ring-offset-2"
                  : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${image.url})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

              {/* Selection Checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelectImage(image.id);
                }}
                className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedImages.includes(image.id)
                    ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
                    : "bg-white/80 border-white/80 opacity-0 group-hover:opacity-100"
                }`}
              >
                {selectedImages.includes(image.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </button>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(image.url);
                  }}
                  className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Eye className="w-4 h-4 text-[var(--color-charcoal)]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImages((prev) => prev.filter((img) => img.id !== image.id));
                  }}
                  className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Drag Handle */}
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-white" />
              </div>

              {/* Category Badge */}
              {viewMode === "grid" && (
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2 py-1 text-xs font-medium bg-white/90 text-[var(--color-charcoal)] rounded-full">
                    {image.category}
                  </span>
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <ImageIcon className="w-16 h-16 text-[var(--color-beige-dark)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">
            {selectedCategory !== "전체"
              ? `${selectedCategory} 카테고리에 이미지가 없습니다.`
              : "등록된 포트폴리오 이미지가 없습니다."}
          </p>
          <button className="mt-4 text-[var(--color-gold)] hover:underline">
            이미지 업로드하기
          </button>
        </motion.div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={previewImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
