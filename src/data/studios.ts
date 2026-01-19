export interface Studio {
  id: string;
  name: string;
  category: string;
  categoryKr: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  discountPrice?: number;
  images: string[];
  tags: string[];
  facilities: string[];
  description: string;
  isInstantBooking: boolean;
  isFeatured?: boolean;
  isPick?: boolean;
}

export interface Product {
  id: string;
  studioId: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  discountPrice?: number;
  includes: string[];
  maxPeople: number;
  images: string[];
}

export const studios: Studio[] = [
  {
    id: "studio-1",
    name: "루미에르 스튜디오",
    category: "profile",
    categoryKr: "프로필",
    location: "강남역 5분",
    address: "서울특별시 강남구 역삼동 123-45",
    rating: 4.9,
    reviewCount: 328,
    priceFrom: 50000,
    discountPrice: 45000,
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    tags: ["자연광", "감성스튜디오", "프리미엄"],
    facilities: ["주차", "헤어메이크업", "의상대여", "탈의실"],
    description: "자연광이 아름답게 들어오는 프리미엄 프로필 전문 스튜디오입니다.",
    isInstantBooking: true,
    isFeatured: true,
    isPick: true,
  },
  {
    id: "studio-2",
    name: "모먼트 스튜디오",
    category: "wedding",
    categoryKr: "웨딩",
    location: "홍대입구역 3분",
    address: "서울특별시 마포구 서교동 456-78",
    rating: 4.8,
    reviewCount: 256,
    priceFrom: 200000,
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
    ],
    tags: ["웨딩스냅", "로맨틱", "야외촬영"],
    facilities: ["주차", "헤어메이크업", "드레스대여", "탈의실", "휴게실"],
    description: "특별한 순간을 담는 웨딩 전문 스튜디오입니다.",
    isInstantBooking: true,
    isFeatured: true,
  },
  {
    id: "studio-3",
    name: "패밀리 포토",
    category: "family",
    categoryKr: "가족",
    location: "성수역 5분",
    address: "서울특별시 성동구 성수동 789-12",
    rating: 4.9,
    reviewCount: 412,
    priceFrom: 80000,
    discountPrice: 72000,
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=800&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
    ],
    tags: ["가족사진", "아이촬영", "편안한분위기"],
    facilities: ["주차", "수유실", "탈의실", "키즈존"],
    description: "가족의 소중한 순간을 따뜻하게 담아드립니다.",
    isInstantBooking: true,
    isPick: true,
  },
  {
    id: "studio-4",
    name: "아이덴티티 스튜디오",
    category: "id-photo",
    categoryKr: "증명사진",
    location: "신논현역 2분",
    address: "서울특별시 강남구 논현동 234-56",
    rating: 4.7,
    reviewCount: 567,
    priceFrom: 30000,
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    ],
    tags: ["증명사진", "취업사진", "여권사진"],
    facilities: ["헤어메이크업", "정장대여"],
    description: "전문적인 증명사진 촬영 서비스를 제공합니다.",
    isInstantBooking: true,
    isFeatured: true,
  },
  {
    id: "studio-5",
    name: "바디라인 스튜디오",
    category: "body-profile",
    categoryKr: "바디프로필",
    location: "압구정역 7분",
    address: "서울특별시 강남구 신사동 567-89",
    rating: 4.8,
    reviewCount: 189,
    priceFrom: 150000,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&q=80",
    ],
    tags: ["바디프로필", "피트니스", "전문조명"],
    facilities: ["주차", "탈의실", "샤워시설", "헬스존"],
    description: "노력의 결과를 예술로 담아드립니다.",
    isInstantBooking: false,
    isPick: true,
  },
  {
    id: "studio-6",
    name: "컨셉추얼 스튜디오",
    category: "concept",
    categoryKr: "컨셉촬영",
    location: "을지로역 5분",
    address: "서울특별시 중구 을지로 345-67",
    rating: 4.9,
    reviewCount: 234,
    priceFrom: 120000,
    discountPrice: 99000,
    images: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
      "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80",
    ],
    tags: ["컨셉촬영", "레트로", "빈티지", "뉴트로"],
    facilities: ["주차", "의상대여", "소품제공", "탈의실"],
    description: "다양한 컨셉으로 특별한 사진을 만들어드립니다.",
    isInstantBooking: true,
    isFeatured: true,
  },
  {
    id: "studio-7",
    name: "셀프스튜디오 강남점",
    category: "profile",
    categoryKr: "프로필",
    location: "강남역 3분",
    address: "서울특별시 강남구 역삼동 111-22",
    rating: 4.6,
    reviewCount: 891,
    priceFrom: 25000,
    images: [
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=800&q=80",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
    ],
    tags: ["셀프촬영", "가성비", "다양한배경"],
    facilities: ["탈의실"],
    description: "합리적인 가격의 셀프 스튜디오입니다.",
    isInstantBooking: true,
  },
  {
    id: "studio-8",
    name: "아뜰리에 스튜디오",
    category: "profile",
    categoryKr: "프로필",
    location: "한남동",
    address: "서울특별시 용산구 한남동 890-12",
    rating: 5.0,
    reviewCount: 156,
    priceFrom: 180000,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    tags: ["프리미엄", "하이엔드", "전문작가"],
    facilities: ["주차", "헤어메이크업", "의상스타일링", "탈의실", "휴게실"],
    description: "최고의 퀄리티를 추구하는 프리미엄 스튜디오입니다.",
    isInstantBooking: false,
    isPick: true,
  },
];

export const products: Product[] = [
  {
    id: "product-1",
    studioId: "studio-1",
    name: "프로필 A코스",
    description: "자연스러운 분위기의 기본 프로필 촬영",
    duration: 60,
    price: 50000,
    discountPrice: 45000,
    includes: ["1시간 촬영", "보정본 10장", "원본 전체 제공"],
    maxPeople: 1,
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"],
  },
  {
    id: "product-2",
    studioId: "studio-1",
    name: "프로필 B코스 (프리미엄)",
    description: "헤어메이크업 포함 프리미엄 프로필 촬영",
    duration: 120,
    price: 80000,
    discountPrice: 72000,
    includes: ["2시간 촬영", "보정본 20장", "원본 전체 제공", "헤어메이크업 포함"],
    maxPeople: 1,
    images: ["https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"],
  },
  {
    id: "product-3",
    studioId: "studio-1",
    name: "프로필 C코스 (스페셜)",
    description: "의상 체인지 포함 풀패키지",
    duration: 180,
    price: 150000,
    includes: ["3시간 촬영", "보정본 30장", "원본 전체 제공", "헤어메이크업", "의상 2벌 체인지"],
    maxPeople: 1,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"],
  },
];

export const categories = [
  { id: "all", label: "전체", labelEn: "All" },
  { id: "profile", label: "프로필", labelEn: "Profile" },
  { id: "wedding", label: "웨딩", labelEn: "Wedding" },
  { id: "family", label: "가족", labelEn: "Family" },
  { id: "id-photo", label: "증명사진", labelEn: "ID Photo" },
  { id: "body-profile", label: "바디프로필", labelEn: "Body Profile" },
  { id: "concept", label: "컨셉촬영", labelEn: "Concept" },
];

export const regions = [
  { id: "seoul", label: "서울", subRegions: ["강남", "홍대", "성수", "한남", "을지로", "압구정"] },
  { id: "gyeonggi", label: "경기", subRegions: ["판교", "분당", "수원", "일산"] },
  { id: "incheon", label: "인천", subRegions: ["송도", "부평"] },
  { id: "busan", label: "부산", subRegions: ["서면", "해운대", "광안리"] },
  { id: "daegu", label: "대구", subRegions: ["동성로", "수성구"] },
];

export const facilities = [
  { id: "parking", label: "주차", icon: "🅿️" },
  { id: "makeup", label: "헤어메이크업", icon: "💄" },
  { id: "costume", label: "의상대여", icon: "👗" },
  { id: "props", label: "소품제공", icon: "📷" },
  { id: "dressing", label: "탈의실", icon: "🪞" },
  { id: "shower", label: "샤워시설", icon: "🚿" },
  { id: "pets", label: "반려동물", icon: "🐾" },
  { id: "kids", label: "키즈존", icon: "🧸" },
];

export function getFeaturedStudios(): Studio[] {
  return studios.filter((s) => s.isFeatured);
}

export function getPickStudios(): Studio[] {
  return studios.filter((s) => s.isPick);
}

export function getStudioById(id: string): Studio | undefined {
  return studios.find((s) => s.id === id);
}

export function getProductsByStudioId(studioId: string): Product[] {
  return products.filter((p) => p.studioId === studioId);
}
