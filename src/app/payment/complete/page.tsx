"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PaymentResult() {
  const searchParams = useSearchParams();

  const rescode = searchParams.get("rescode") || "";
  const resmsg = searchParams.get("resmsg") || "";
  const transid = searchParams.get("transid") || "";
  const refno = searchParams.get("refno") || "";
  const reqamt = searchParams.get("reqamt") || "";
  const reqcur = searchParams.get("reqcur") || "";
  const servicetype = searchParams.get("servicetype") || "";

  const isSuccess = rescode === "0000";
  const methodName =
    servicetype === "S000"
      ? "Alipay"
      : servicetype === "S001"
        ? "WeChat Pay"
        : "결제";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isSuccess ? (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className={`text-2xl font-extrabold mb-2 ${isSuccess ? "text-gray-900" : "text-red-600"}`}>
          {isSuccess ? "결제가 완료되었습니다" : "결제에 실패했습니다"}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {isSuccess
            ? `${methodName}로 결제가 정상 처리되었습니다.`
            : decodeURIComponent(resmsg) || "결제 처리 중 오류가 발생했습니다."}
        </p>

        {/* Details */}
        {isSuccess && (
          <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">주문번호</span>
              <span className="font-medium text-gray-900">{refno}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">거래번호</span>
              <span className="font-mono text-gray-900">{transid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">결제수단</span>
              <span className={`font-medium ${
                servicetype === "S000" ? "text-alipay" : "text-wechat"
              }`}>
                {methodName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">결제금액</span>
              <span className="font-bold text-gray-900">
                {reqcur === "CNY" ? "¥" : reqcur === "USD" ? "$" : "₩"} {reqamt}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {isSuccess ? (
            <Link
              href="/"
              className="block w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              확인
            </Link>
          ) : (
            <>
              <button
                onClick={() => window.history.back()}
                className="block w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
              >
                다시 시도
              </button>
              <Link
                href="/"
                className="block w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-400">
          문의사항이 있으시면 고객센터 1588-0000으로 연락해주세요.
        </p>
      </div>
    </div>
  );
}

export default function PaymentCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <div className="text-gray-500">결제 결과를 확인하고 있습니다...</div>
        </div>
      }
    >
      <PaymentResult />
    </Suspense>
  );
}
