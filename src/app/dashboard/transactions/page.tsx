"use client";

import { useState } from "react";

const TRANSACTIONS = [
  { id: "ZP-240403-001", product: "프리미엄 한방 샴푸 세트", method: "Alipay", amount: "¥ 680", krw: "₩ 129,200", status: "완료", date: "2026-04-03 14:23" },
  { id: "ZP-240403-002", product: "K-뷰티 스킨케어 패키지", method: "WeChat", amount: "¥ 1,280", krw: "₩ 243,200", status: "완료", date: "2026-04-03 13:45" },
  { id: "ZP-240403-003", product: "전통 공예품 세트", method: "Alipay", amount: "¥ 2,400", krw: "₩ 456,000", status: "완료", date: "2026-04-03 12:10" },
  { id: "ZP-240403-004", product: "한국 식품 모음 박스", method: "WeChat", amount: "¥ 520", krw: "₩ 98,800", status: "대기", date: "2026-04-03 11:30" },
  { id: "ZP-240403-005", product: "K-POP 앨범 번들", method: "Alipay", amount: "¥ 380", krw: "₩ 72,200", status: "완료", date: "2026-04-03 10:15" },
  { id: "ZP-240402-006", product: "프리미엄 한방 샴푸 세트", method: "WeChat", amount: "¥ 680", krw: "₩ 129,200", status: "완료", date: "2026-04-02 18:42" },
  { id: "ZP-240402-007", product: "K-뷰티 스킨케어 패키지", method: "Alipay", amount: "¥ 1,280", krw: "₩ 243,200", status: "취소", date: "2026-04-02 16:30" },
  { id: "ZP-240402-008", product: "전통 공예품 세트", method: "Alipay", amount: "¥ 2,400", krw: "₩ 456,000", status: "완료", date: "2026-04-02 14:20" },
  { id: "ZP-240402-009", product: "한국 식품 모음 박스", method: "WeChat", amount: "¥ 520", krw: "₩ 98,800", status: "완료", date: "2026-04-02 11:05" },
  { id: "ZP-240401-010", product: "K-POP 앨범 번들", method: "Alipay", amount: "¥ 380", krw: "₩ 72,200", status: "완료", date: "2026-04-01 09:30" },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "Alipay" | "WeChat">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "완료" | "대기" | "취소">("all");

  const filtered = TRANSACTIONS.filter((tx) => {
    if (filter !== "all" && tx.method !== filter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">거래 내역</h1>
        <p className="text-sm text-gray-500 mt-1">전체 거래 내역을 조회하고 관리하세요</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex bg-white rounded-xl border border-gray-200 p-1">
          {(["all", "Alipay", "WeChat"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {f === "all" ? "전체" : f}
            </button>
          ))}
        </div>
        <div className="flex bg-white rounded-xl border border-gray-200 p-1">
          {(["all", "완료", "대기", "취소"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {s === "all" ? "전체" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3.5 font-medium">거래번호</th>
                <th className="text-left px-5 py-3.5 font-medium">상품</th>
                <th className="text-left px-5 py-3.5 font-medium">결제수단</th>
                <th className="text-right px-5 py-3.5 font-medium">결제금액</th>
                <th className="text-right px-5 py-3.5 font-medium">원화환산</th>
                <th className="text-center px-5 py-3.5 font-medium">상태</th>
                <th className="text-right px-5 py-3.5 font-medium">일시</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-5 py-4 text-sm font-mono text-gray-600">{tx.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{tx.product}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                      tx.method === "Alipay" ? "bg-blue-50 text-alipay" : "bg-green-50 text-wechat"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tx.method === "Alipay" ? "bg-alipay" : "bg-wechat"}`} />
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-gray-900">{tx.amount}</td>
                  <td className="px-5 py-4 text-right text-sm text-gray-500">{tx.krw}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tx.status === "완료" ? "bg-green-50 text-green-600"
                      : tx.status === "대기" ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-500"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-gray-500">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">{filtered.length}건 표시 / 전체 {TRANSACTIONS.length}건</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">2</button>
            <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
