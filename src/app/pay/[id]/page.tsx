"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type PayMethod = "alipay" | "wechat";

interface LinkData {
  id: string;
  name: string;
  price: string;
  currency: string;
  method: "all" | "alipay" | "wechat";
  description: string;
  status: "active" | "inactive";
}

export default function PayPage() {
  const params = useParams();
  const linkId = params.id as string;

  const [link, setLink] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [step, setStep] = useState<"form" | "processing" | "error">("form");
  const [selectedMethod, setSelectedMethod] = useState<PayMethod | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/links/${linkId}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setLink(data);
        // 결제수단이 하나만 지원이면 자동 선택
        if (data.method === "alipay") setSelectedMethod("alipay");
        if (data.method === "wechat") setSelectedMethod("wechat");
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [linkId]);

  const currencySymbol =
    link?.currency === "CNY" ? "¥" : link?.currency === "USD" ? "$" : "₩";

  const handlePay = async () => {
    if (!selectedMethod || !buyerName || !link) return;

    setStep("processing");

    try {
      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: selectedMethod,
          amount: link.price,
          currency: link.currency,
          buyerName,
          productName: link.name,
          email: email || undefined,
          reqtype: isMobile ? "M" : "P",
          linkId: link.id,
        }),
      });

      const data = await res.json();

      if (res.ok && data.funpayUrl && data.params) {
        // FunPay로 직접 폼 POST (팝업)
        const popup = window.open("", "ICBpay", "width=950,height=650,scrollbars=yes");
        if (!popup) {
          setStep("error");
          setErrorMsg("팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.");
          return;
        }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.funpayUrl;
        form.target = "ICBpay";

        for (const [key, value] of Object.entries(data.params)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // 팝업 닫힘 감지
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            setStep("form");
          }
        }, 500);
      } else {
        setStep("error");
        setErrorMsg(data.error || "결제 요청에 실패했습니다.");
      }
    } catch {
      setStep("error");
      setErrorMsg("네트워크 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !link) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">결제 링크를 찾을 수 없습니다</h2>
          <p className="text-gray-500 text-sm">유효하지 않거나 만료된 결제 링크입니다.</p>
        </div>
      </div>
    );
  }

  if (link.status === "inactive") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">비활성 결제 링크</h2>
          <p className="text-gray-500 text-sm">현재 비활성화된 결제 링크입니다. 판매자에게 문의하세요.</p>
        </div>
      </div>
    );
  }

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

  const showAlipay = link.method === "all" || link.method === "alipay";
  const showWechat = link.method === "all" || link.method === "wechat";

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
            <p className="text-xs text-gray-400 mb-1">ICB Store</p>
            <h1 className="text-lg font-bold text-gray-900 mb-1">{link.name}</h1>
            {link.description && (
              <p className="text-sm text-gray-500 mb-3">{link.description}</p>
            )}
            <div className="text-3xl font-extrabold text-gray-900">
              {currencySymbol} {link.price}
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">결제수단 선택</label>
              <div className={`grid gap-3 ${showAlipay && showWechat ? "grid-cols-2" : "grid-cols-1"}`}>
                {showAlipay && (
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
                )}
                {showWechat && (
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
                )}
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
                ? `${selectedMethod === "alipay" ? "Alipay" : "WeChat Pay"}로 ${currencySymbol} ${link.price} 결제`
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
