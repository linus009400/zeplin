"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  product: string;
  method: "alipay" | "wechat";
  amount: string;
  currency: string;
  krwAmount: string;
  buyerName: string;
  status: "대기" | "완료" | "취소";
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "alipay" | "wechat">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "완료" | "대기" | "취소">("all");

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions.filter((tx) => {
    if (filter !== "all" && tx.method !== filter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    return true;
  });

  const currencySymbol = (cur: string) =>
    cur === "CNY" ? "¥" : cur === "USD" ? "$" : "₩";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">거래 내역</h1>
        <p className="text-sm text-gray-500 mt-1">전체 거래 내역을 조회하고 관리하세요</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex bg-white rounded-xl border border-gray-200 p-1">
          {(["all", "alipay", "wechat"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {f === "all" ? "전체" : f === "alipay" ? "Alipay" : "WeChat"}
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
        {loading ? (
          <div className="p-12 text-center text-gray-400">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            {transactions.length === 0 ? "아직 거래 내역이 없습니다" : "조건에 맞는 거래가 없습니다"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 font-medium">거래번호</th>
                  <th className="text-left px-5 py-3.5 font-medium">상품</th>
                  <th className="text-left px-5 py-3.5 font-medium">결제자</th>
                  <th className="text-left px-5 py-3.5 font-medium">결제수단</th>
                  <th className="text-right px-5 py-3.5 font-medium">결제금액</th>
                  <th className="text-center px-5 py-3.5 font-medium">상태</th>
                  <th className="text-right px-5 py-3.5 font-medium">일시</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-4 text-sm font-mono text-gray-600">{tx.id}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{tx.product}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{tx.buyerName}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        tx.method === "alipay" ? "bg-blue-50 text-alipay" : "bg-green-50 text-wechat"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.method === "alipay" ? "bg-alipay" : "bg-wechat"}`} />
                        {tx.method === "alipay" ? "Alipay" : "WeChat"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-semibold text-gray-900">
                      {currencySymbol(tx.currency)} {tx.amount}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        tx.status === "완료" ? "bg-green-50 text-green-600"
                        : tx.status === "대기" ? "bg-yellow-50 text-yellow-600"
                        : "bg-red-50 text-red-500"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
