"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "가입 시 사업자등록증이 필요한가요?",
    a: "개인 판매자는 사업자등록증 없이도 가입 가능합니다. 다만 월 매출이 일정 금액을 초과하면 사업자 전환이 필요할 수 있습니다.",
  },
  {
    q: "정산은 어떻게 이루어지나요?",
    a: "결제 완료 후 영업일 기준 D+3~D+5일에 등록하신 계좌로 원화 정산됩니다. 비즈니스 플랜 이상은 D+3 빠른 정산이 가능합니다.",
  },
  {
    q: "환율은 어떻게 적용되나요?",
    a: "결제 시점의 실시간 환율이 적용됩니다. 환율 변동에 따른 리스크 없이 원화 기준으로 정산받으실 수 있습니다.",
  },
  {
    q: "어떤 플랫폼에서 사용할 수 있나요?",
    a: "블로그(네이버, 티스토리), SNS(인스타그램, 페이스북), 메신저(카카오톡, 라인), 자체 웹사이트 등 링크를 공유할 수 있는 모든 곳에서 사용 가능합니다.",
  },
  {
    q: "테스트 환경을 제공하나요?",
    a: "네, 샌드박스 환경을 무료로 제공합니다. 실제 결제 없이 API 연동을 테스트하고 검증할 수 있습니다.",
  },
  {
    q: "국내 간편결제도 지원하나요?",
    a: "현재 알리페이, 위챗페이를 지원하며, 카카오페이, 네이버페이, 토스페이 등 국내 간편결제는 순차적으로 추가될 예정입니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
