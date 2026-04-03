"use client";

import { useState } from "react";
import Link from "next/link";

type AccountType = "personal" | "business";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>("personal");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    businessName: "",
    businessNumber: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // TODO: 실제 가입 로직
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">ZEPLIN</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            3분이면 완료,
            <br />
            지금 시작하세요
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            가입 즉시 결제 링크를 만들 수 있습니다.
            심사 없이 바로 시작하세요.
          </p>

          {/* Steps indicator */}
          <div className="mt-12 space-y-4">
            {[
              { num: 1, label: "계정 유형 선택 & 기본 정보" },
              { num: 2, label: "상세 정보 입력 & 약관 동의" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s.num
                      ? "bg-accent text-white"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {step > s.num ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span className={step >= s.num ? "text-white font-medium" : "text-white/40"}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-primary-dark tracking-tight">ZEPLIN</span>
          </Link>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">회원가입</h2>
          <p className="text-gray-500 text-sm mb-8">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              로그인
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-5">
                {/* Account type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">계정 유형</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { type: "personal" as AccountType, label: "개인", desc: "개인 판매자" },
                      { type: "business" as AccountType, label: "사업자", desc: "사업자등록증 보유" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.type}
                        onClick={() => setAccountType(opt.type)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          accountType === opt.type
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-sm font-semibold text-gray-900">{opt.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="8자 이상, 영문 + 숫자 조합"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1.5">
                    비밀번호 확인
                  </label>
                  <input
                    id="passwordConfirm"
                    type="password"
                    required
                    value={form.passwordConfirm}
                    onChange={(e) => update("passwordConfirm", e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
                >
                  다음 단계
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    {accountType === "business" ? "담당자명" : "이름"}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    연락처
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                {accountType === "business" && (
                  <>
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1.5">
                        상호명
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        required
                        value={form.businessName}
                        onChange={(e) => update("businessName", e.target.value)}
                        placeholder="상호명을 입력하세요"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                        사업자등록번호
                      </label>
                      <input
                        id="businessNumber"
                        type="text"
                        required
                        value={form.businessNumber}
                        onChange={(e) => update("businessNumber", e.target.value)}
                        placeholder="000-00-00000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Agreements */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreeTerms}
                      onChange={(e) => update("agreeTerms", e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm text-gray-600">
                      <span className="text-primary font-medium">[필수]</span> 이용약관에 동의합니다
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreePrivacy}
                      onChange={(e) => update("agreePrivacy", e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm text-gray-600">
                      <span className="text-primary font-medium">[필수]</span> 개인정보처리방침에 동의합니다
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    이전
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
                  >
                    가입 완료
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            가입 시 ZEPLIN의{" "}
            <a href="#" className="underline">이용약관</a>,{" "}
            <a href="#" className="underline">개인정보처리방침</a>,{" "}
            <a href="#" className="underline">전자금융거래약관</a>에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
