"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const faqs = [
  {
    id: 1,
    question: "예약은 얼마 전에 해야 하나요?",
    answer: "스튜디오마다 다르지만, 일반적으로 최소 1주일 전에는 예약하시는 것을 권장합니다. 특히 주말이나 성수기(3월, 5월, 10-11월)에는 2-3주 전에 예약하시는 것이 좋습니다. 급한 경우 당일 예약도 가능한 스튜디오가 있으니 검색 필터를 활용해 보세요.",
  },
  {
    id: 2,
    question: "취소 및 환불 정책은 어떻게 되나요?",
    answer: "각 스튜디오마다 취소/환불 정책이 다릅니다. 일반적으로 촬영일 7일 전까지는 100% 환불, 3-6일 전은 50% 환불, 2일 전부터는 환불이 어려운 경우가 많습니다. 예약 전 해당 스튜디오의 상세 정책을 꼭 확인해 주세요.",
  },
  {
    id: 3,
    question: "의상과 헤어메이크업은 포함되나요?",
    answer: "스튜디오마다 다릅니다. 상세 페이지의 '포함 사항'을 확인하시거나, 예약 시 옵션으로 추가하실 수 있습니다. 대부분의 프리미엄 스튜디오는 기본 헤어메이크업을 포함하고 있으며, 의상은 추가 옵션인 경우가 많습니다.",
  },
  {
    id: 4,
    question: "사진은 언제 받을 수 있나요?",
    answer: "일반적으로 촬영 후 2-3주 이내에 보정된 사진을 받으실 수 있습니다. 증명사진의 경우 당일 또는 1-2일 내 제공되며, 웨딩이나 대규모 촬영의 경우 4-6주 정도 소요될 수 있습니다. 정확한 일정은 각 스튜디오의 상세 정보를 확인해 주세요.",
  },
  {
    id: 5,
    question: "주차는 가능한가요?",
    answer: "스튜디오 상세 페이지의 '시설 정보'에서 주차 가능 여부를 확인하실 수 있습니다. 주차가 어려운 경우 인근 공영주차장 정보도 함께 제공하고 있으니 참고해 주세요.",
  },
  {
    id: 6,
    question: "동반 인원이 함께 갈 수 있나요?",
    answer: "대부분의 스튜디오에서 보호자나 동반자 1-2명은 함께 입장 가능합니다. 다만 코로나19 상황이나 스튜디오 규모에 따라 제한이 있을 수 있으니, 사전에 스튜디오에 문의하시는 것을 권장합니다.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
                FAQ
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-[var(--color-charcoal)] mb-4">
                자주 묻는 질문
              </h1>
              <p className="text-xl text-[var(--color-text-secondary)]">
                궁금하신 점을 빠르게 확인하세요
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border border-[var(--color-beige-dark)] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--color-beige)]/30 transition-colors"
                  >
                    <h3 className="font-semibold text-lg text-[var(--color-charcoal)] pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openId === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[var(--color-text-secondary)] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-[var(--color-charcoal)] text-white p-10 rounded-lg text-center">
              <h2 className="font-display text-3xl mb-4">
                찾으시는 답변이 없으신가요?
              </h2>
              <p className="text-white/70 mb-6">
                고객센터를 통해 언제든지 문의해 주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:help@photopick.kr"
                  className="btn-gold inline-flex items-center justify-center"
                >
                  이메일 문의
                </a>
                <a
                  href="tel:1544-0000"
                  className="bg-white text-[var(--color-charcoal)] px-8 py-3.5 rounded font-medium hover:bg-white/90 transition-colors inline-flex items-center justify-center"
                >
                  전화 문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
