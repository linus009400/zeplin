export default function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ZEPLIN
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              ICB가 제공하는 글로벌 통합결제 솔루션.
              <br />
              블로그, SNS 어디서든 간편하게 해외 결제를 받으세요.
            </p>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#payment" className="hover:text-white transition-colors">결제방식</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">서비스 특징</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">수수료 안내</a></li>
              <li><a href="#guide" className="hover:text-white transition-colors">이용 가이드</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API 문서</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개발자 센터</a></li>
              <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">연락처</h4>
            <ul className="space-y-2 text-sm">
              <li>고객센터: 1588-0000</li>
              <li>이메일: support@zeplin.pay</li>
              <li>평일 09:00 ~ 18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; 2026 ICB Corp. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">전자금융거래약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
