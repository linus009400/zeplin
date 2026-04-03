export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary-dark to-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          지금 바로 글로벌 결제를 시작하세요
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          가입비 무료, 월 기본료 무료. 실제 거래가 발생할 때만 수수료가 부과됩니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-light hover:text-primary-dark transition-all shadow-lg shadow-accent/30 text-lg"
          >
            무료로 시작하기
          </a>
          <a
            href="#"
            className="px-10 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 text-lg"
          >
            상담 신청
          </a>
        </div>
      </div>
    </section>
  );
}
