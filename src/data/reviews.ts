export interface Review {
  id: string;
  studioId: string;
  userId: string;
  userName: string;
  userImage?: string;
  productName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  reply?: {
    content: string;
    createdAt: string;
  };
  helpfulCount: number;
  isBest?: boolean;
}

export const reviews: Review[] = [
  {
    id: "review-1",
    studioId: "studio-1",
    userId: "user-1",
    userName: "김**",
    productName: "프로필 A코스",
    rating: 5,
    content: "자연광이 너무 예쁘게 들어와서 사진이 정말 잘 나왔어요! 작가님도 친절하시고 포즈도 잘 잡아주셔서 어색하지 않게 촬영할 수 있었습니다. 스튜디오 분위기도 깔끔하고 세련되어서 촬영 내내 기분이 좋았어요. 다음에도 꼭 다시 방문하고 싶습니다!",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
    ],
    createdAt: "2024-01-15",
    reply: {
      content: "김** 고객님, 좋은 리뷰 감사합니다! 저희 스튜디오를 이용해주셔서 감사드리며, 다음에 또 좋은 모습으로 뵐 수 있기를 바랍니다. 항상 최선을 다하겠습니다 :)",
      createdAt: "2024-01-16",
    },
    helpfulCount: 24,
    isBest: true,
  },
  {
    id: "review-2",
    studioId: "studio-1",
    userId: "user-2",
    userName: "이**",
    productName: "프로필 B코스 (프리미엄)",
    rating: 5,
    content: "취업 사진 찍으러 갔는데 결과물이 너무 마음에 들어요. 헤어메이크업도 자연스럽게 잘 해주시고, 사진도 전문적으로 잘 나왔습니다. 면접 때 좋은 인상 줄 수 있을 것 같아요!",
    images: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    ],
    createdAt: "2024-01-10",
    helpfulCount: 18,
  },
  {
    id: "review-3",
    studioId: "studio-1",
    userId: "user-3",
    userName: "박**",
    productName: "프로필 A코스",
    rating: 4,
    content: "전체적으로 만족스러웠어요. 다만 예약 시간보다 조금 기다렸는데, 그 외에는 모든 게 좋았습니다. 사진 퀄리티는 확실히 좋네요.",
    createdAt: "2024-01-08",
    helpfulCount: 7,
  },
  {
    id: "review-4",
    studioId: "studio-2",
    userId: "user-4",
    userName: "최**",
    productName: "웨딩 스냅 A코스",
    rating: 5,
    content: "웨딩 촬영 너무 만족스러웠습니다! 작가님이 분위기를 정말 잘 잡아주시고, 자연스러운 사진이 많이 나왔어요. 평생 간직할 소중한 추억을 만들어주셔서 감사합니다.",
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    ],
    createdAt: "2024-01-05",
    reply: {
      content: "최** 고객님, 행복한 순간을 함께해서 저희도 영광이었습니다. 두 분의 앞날에 축복이 가득하시길 바랍니다!",
      createdAt: "2024-01-06",
    },
    helpfulCount: 42,
    isBest: true,
  },
  {
    id: "review-5",
    studioId: "studio-3",
    userId: "user-5",
    userName: "정**",
    productName: "가족 촬영 패키지",
    rating: 5,
    content: "아이들이 낯을 많이 가리는데, 스튜디오 분이 아이들을 정말 잘 다뤄주셔서 자연스러운 표정 사진이 많이 나왔어요. 가족사진 찍으러 여기저기 다녀봤는데 여기가 최고였습니다.",
    images: [
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=400&q=80",
    ],
    createdAt: "2024-01-03",
    helpfulCount: 31,
    isBest: true,
  },
  {
    id: "review-6",
    studioId: "studio-4",
    userId: "user-6",
    userName: "한**",
    productName: "증명사진 기본",
    rating: 5,
    content: "증명사진인데 이렇게 잘 나올 수 있다니! 보정도 자연스럽고, 조명도 최고였어요. 여권사진, 이력서 사진 모두 여기서 찍을 예정입니다.",
    createdAt: "2024-01-01",
    helpfulCount: 15,
  },
];

export function getReviewsByStudioId(studioId: string): Review[] {
  return reviews.filter((r) => r.studioId === studioId);
}

export function getBestReviews(): Review[] {
  return reviews.filter((r) => r.isBest);
}

export function getRecentReviews(limit: number = 5): Review[] {
  return [...reviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
