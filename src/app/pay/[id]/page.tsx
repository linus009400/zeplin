"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

type PayMethod = "alipay" | "wechat";

export default function PayPage() {
  const params = useParams();
  const linkId = params.id as string;

  const [step, setStep] = useState<"form" | "processing" | "error">("form");
  const [selectedMethod, setSelectedMethod] = useState<PayMethod | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // TODO: 실제로는 linkId로 서버에서 결제 링크 정보를 조회
  const product = {
    name: "프리미엄 한방 샴푸 세트",
    price: "680",
    currency: "CNY",
    seller: "ICB Store",
  };

  const currencySymbol =
    product.currency === "CNY" ? "¥" : product.currency === "USD" ? "$" : "₩";

  const handlePay = async () => {
    if (!selectedMethod || !buyerName) return;

    setStep("processing");

    try {
      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: selectedMethod,
          amount: product.price,
          currency: product.currency,
          buyerName,
          productName: product.name,
          email: email || undefined,
          reqtype: isMobile ? "M" : "P",
        }),
      });

      const data = await res.json();

      if (res.ok && data.paymentUrl) {
        // 결제사 페이지로 이동 또는 QR 표시
        window.location.href = data.paymentUrl;
      } else {
        setStep("error");
        setErrorMsg(data.error || "결제 요청에 실패했습니다.");
      }
    } catch {
      setStep("error");
      setErrorMsg("네트워크 오류가 발생했습니다.");
    }
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">결제를 처리하고 있습니다...</p>
          <p className="text-gray-400 text-sm mt-1">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">결제 오류</h2>
          <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
          <button
            onClick={() => { setStep("form"); setErrorMsg(""); }}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold">Z</span>
          </div>
          <p className="text-xs text-gray-400">Powered by ZEPLIN</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Product Info */}
          <div className="p-6 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">{product.seller}</p>
            <h1 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h1>
            <div className="text-3xl font-extrabold text-gray-900">
              {currencySymbol} {product.price}
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">결제수단 선택</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("alipay")}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    selectedMethod === "alipay"
                      ? "border-alipay bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <rect width="40" height="40" rx="10" fill="#1677FF" />
                    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">A</text>
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Alipay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod("wechat")}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    selectedMethod === "wechat"
                      ? "border-wechat bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <rect width="40" height="40" rx="10" fill="#07C160" />
                    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">W</text>
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">WeChat Pay</span>
                </button>
              </div>
            </div>

            {/* Buyer Info */}
            <div>
              <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 mb-1.5">
                결제자 이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="buyerName"
                type="text"
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                이메일 <span className="text-gray-400">(선택)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={!selectedMethod || !buyerName}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-sm transition-colors ${
                selectedMethod === "alipay"
                  ? "bg-alipay hover:bg-blue-600"
                  : selectedMethod === "wechat"
                    ? "bg-wechat hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {selectedMethod
                ? `${selectedMethod === "alipay" ? "Alipay" : "WeChat Pay"}로 ${currencySymbol} ${product.price} 결제`
                : "결제수단을 선택하세요"}
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-400">SSL 암호화로 안전하게 보호됩니다</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          결제 문의: support@zeplin.pay | 1588-0000
        </p>
      </div>
    </div>
  );
}
