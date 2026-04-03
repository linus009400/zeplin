const STEPS = [
  {
    step: "01",
    title: "회원가입",
    desc: "사업자 또는 개인으로 무료 가입하세요. 심사 없이 바로 시작할 수 있습니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "결제 링크 생성",
    desc: "상품명, 가격, 통화를 입력하면 결제 링크와 QR코드가 자동으로 생성됩니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "링크 공유",
    desc: "생성된 링크를 블로그, 인스타그램, 카카오톡 등 원하는 곳에 공유하세요.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "정산 받기",
    desc: "고객이 결제하면 자동으로 원화 환산 후 등록 계좌로 정산됩니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

export default function Guide() {
  return (
    <section id="guide" className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            4단계로 시작하는 글로벌 결제
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            복잡한 설정 없이 누구나 쉽게 시작할 수 있습니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative text-center group">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
              )}

              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border-2 border-gray-200 group-hover:border-primary group-hover:shadow-lg transition-all mb-6 text-primary">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* API code snippet */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-center text-lg font-bold text-gray-900 mb-6">
            개발자라면 API로 바로 연동
          </h3>
          <div className="bg-surface-dark rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed">
              <code>{`// ZEPLIN 결제 요청 예시
const response = await fetch('https://api.zeplin.pay/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 1280,
    currency: 'CNY',
    method: 'alipay',        // 'alipay' | 'wechat'
    description: '상품 결제',
    return_url: 'https://yoursite.com/success'
  })
});

const { payment_url, qr_code } = await response.json();
// payment_url → 고객에게 전달
// qr_code    → QR 이미지 표시`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
