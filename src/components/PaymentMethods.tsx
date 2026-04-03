const METHODS = [
  {
    name: "Alipay",
    nameKo: "알리페이",
    color: "bg-alipay",
    desc: "중국 최대 결제 플랫폼. 10억+ 사용자 대상 결제를 지원합니다.",
    features: ["QR 결제", "앱 내 결제", "웹 결제", "정기결제"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="#1677FF" />
        <text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">A</text>
      </svg>
    ),
  },
  {
    name: "WeChat Pay",
    nameKo: "위챗페이",
    color: "bg-wechat",
    desc: "위챗 기반 간편결제. 9억+ 사용자에게 도달하세요.",
    features: ["QR 결제", "미니프로그램", "공식계정 결제", "H5 결제"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="#07C160" />
        <text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">W</text>
      </svg>
    ),
  },
];

const COMING_SOON = [
  { name: "카카오페이", color: "bg-yellow-400" },
  { name: "네이버페이", color: "bg-green-500" },
  { name: "토스페이", color: "bg-blue-500" },
  { name: "삼성페이", color: "bg-indigo-900" },
];

export default function PaymentMethods() {
  return (
    <section id="payment" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            Payment Methods
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            다양한 결제수단, 하나의 플랫폼
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            글로벌 결제수단을 ZEPLIN 하나로 통합 관리하세요.
            추후 국내 간편결제도 지원 예정입니다.
          </p>
        </div>

        {/* Main payment methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {METHODS.map((method) => (
            <div
              key={method.name}
              className="group relative rounded-2xl border border-gray-200 p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-5 mb-6">
                {method.icon}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.nameKo}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{method.desc}</p>
              <div className="flex flex-wrap gap-2">
                {method.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
            Coming Soon
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {COMING_SOON.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-gray-50 opacity-60"
              >
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-500 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
