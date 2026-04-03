export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                동남아 결제의 새로운 기준
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              블로그, SNS에서
              <br />
              <span className="text-accent-light">글로벌 결제</span>를
              <br />
              시작하세요
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              알리페이, 위챗페이 결제를 단 몇 줄의 코드로 연동하세요.
              개인 판매자부터 기업까지, 결제 링크 하나로 전 세계 고객을 만날 수 있습니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="px-8 py-3.5 bg-accent text-white font-bold rounded-full hover:bg-accent-light hover:text-primary-dark transition-all shadow-lg shadow-accent/30"
              >
                무료로 시작하기
              </a>
              <a
                href="#guide"
                className="px-8 py-3.5 bg-white/10 backdrop-blur text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                연동 가이드 보기
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10,000+</div>
                <div className="text-xs text-white/50">가맹점</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-white/50">안정성</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">D+3</div>
                <div className="text-xs text-white/50">정산</div>
              </div>
            </div>
          </div>

          {/* Visual - Payment Card Mockup */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-semibold text-gray-800">결제 요청</span>
                  <span className="text-xs text-gray-400">ZEPLIN</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">¥ 1,280</div>
                <div className="text-sm text-gray-400 mb-6">≈ ₩ 243,200</div>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-alipay text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2"/>
                      <path d="M7 13c2 1 4.5 1.5 7-0.5 1.5-1 2.5-0.5 3 0.5" stroke="white" strokeWidth="1.5" fill="none"/>
                    </svg>
                    Alipay로 결제
                  </button>
                  <button className="w-full py-3 bg-wechat text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2"/>
                      <circle cx="9" cy="10" r="1" fill="white"/>
                      <circle cx="15" cy="10" r="1" fill="white"/>
                    </svg>
                    WeChat Pay로 결제
                  </button>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -left-8 bg-white rounded-xl shadow-lg px-4 py-3 transform -rotate-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs font-semibold text-gray-700">결제 완료!</span>
                </div>
              </div>

              {/* QR badge */}
              <div className="absolute -bottom-4 -right-6 bg-white rounded-xl shadow-lg p-3 transform rotate-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg grid grid-cols-4 gap-0.5 p-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${Math.random() > 0.4 ? "bg-gray-800" : "bg-transparent"}`}
                    />
                  ))}
                </div>
                <div className="text-[8px] text-gray-400 text-center mt-1">QR 결제</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
