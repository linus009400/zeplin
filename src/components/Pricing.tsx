const PLANS = [
  {
    name: "스타터",
    desc: "개인 판매자, 소규모 쇼핑몰",
    price: "0",
    unit: "월 기본료",
    highlight: false,
    fee: "3.5%",
    features: [
      "결제 링크 무제한 생성",
      "QR코드 결제",
      "기본 대시보드",
      "이메일 알림",
      "D+5 정산",
    ],
  },
  {
    name: "비즈니스",
    desc: "성장하는 비즈니스를 위한 플랜",
    price: "49,000",
    unit: "월",
    highlight: true,
    fee: "2.5%",
    features: [
      "스타터 플랜 전체 포함",
      "API 연동",
      "웹훅 알림",
      "상세 매출 리포트",
      "D+3 빠른 정산",
      "전담 매니저 배정",
    ],
  },
  {
    name: "엔터프라이즈",
    desc: "대규모 트래픽, 맞춤 솔루션",
    price: "별도 협의",
    unit: "",
    highlight: false,
    fee: "협의",
    features: [
      "비즈니스 플랜 전체 포함",
      "전용 서버 환경",
      "맞춤 API 개발",
      "SLA 보장",
      "D+1 익일 정산",
      "24/7 기술 지원",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            합리적인 수수료, 투명한 정산
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            숨겨진 비용 없이 거래 수수료만 부과됩니다. 매출이 없으면 비용도 없습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105 relative"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  인기
                </span>
              )}
              <div className="mb-6">
                <h3
                  className={`text-lg font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}
                >
                  {plan.desc}
                </p>
              </div>

              <div className="mb-2">
                <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.price === "0" ? "무료" : plan.price.startsWith("별도") ? "" : "₩"}
                  {plan.price !== "0" && plan.price}
                </span>
                {plan.unit && (
                  <span className={`text-sm ml-1 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>
                    / {plan.unit}
                  </span>
                )}
              </div>

              <div className={`text-sm mb-6 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>
                거래 수수료: <span className="font-semibold">{plan.fee}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-accent-light" : "text-accent"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlight ? "text-white/90" : "text-gray-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.price === "별도 협의" ? "문의하기" : "시작하기"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
