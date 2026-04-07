"use client";

import { useState, useEffect } from "react";

interface PaymentLink {
  id: string;
  name: string;
  price: string;
  currency: string;
  method: string;
  status: "active" | "inactive";
  clicks: number;
  transactions: number;
  createdAt: string;
}

export default function PaymentsPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "CNY",
    method: "all",
    description: "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.price) return;

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", price: "", currency: "CNY", method: "all", description: "" });
      setShowCreate(false);
      fetchLinks();
    }
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">결제 링크</h1>
          <p className="text-sm text-gray-500 mt-1">결제 링크를 생성하고 관리하세요</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
        >
          {showCreate ? "닫기" : "+ 새 결제 링크"}
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">새 결제 링크 만들기</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">상품명</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="상품명을 입력하세요"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">가격</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">통화</label>
                <select
                  value={form.currency}
                  onChange={(e) => update("currency", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="CNY">CNY (¥)</option>
                  <option value="KRW">KRW (₩)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">결제수단</label>
              <select
                value={form.method}
                onChange={(e) => update("method", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">전체 (Alipay + WeChat Pay)</option>
                <option value="alipay">Alipay만</option>
                <option value="wechat">WeChat Pay만</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">설명 (선택)</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="상품 설명을 입력하세요"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowCreate(false)}
              className="px-5 py-2.5 border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              생성하기
            </button>
          </div>
        </div>
      )}

      {/* Links Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">불러오는 중...</div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 mb-4">아직 결제 링크가 없습니다</p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              첫 결제 링크 만들기
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 font-medium">상품명</th>
                  <th className="text-left px-5 py-3.5 font-medium">가격</th>
                  <th className="text-left px-5 py-3.5 font-medium">결제수단</th>
                  <th className="text-center px-5 py-3.5 font-medium">상태</th>
                  <th className="text-right px-5 py-3.5 font-medium">클릭</th>
                  <th className="text-right px-5 py-3.5 font-medium">거래</th>
                  <th className="text-right px-5 py-3.5 font-medium">생성일</th>
                  <th className="text-center px-5 py-3.5 font-medium">링크복사</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-gray-900">{link.name}</div>
                      <div className="text-xs text-gray-400">{link.id}</div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      {link.currency === "CNY" ? "¥" : link.currency === "USD" ? "$" : "₩"} {link.price}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-600">
                        {link.method === "all" ? "Alipay + WeChat" : link.method === "alipay" ? "Alipay" : "WeChat Pay"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        link.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {link.status === "active" ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-gray-600">{link.clicks}</td>
                    <td className="px-5 py-4 text-right text-sm text-gray-600">{link.transactions}</td>
                    <td className="px-5 py-4 text-right text-sm text-gray-500">{link.createdAt}</td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => copyLink(link.id)}
                          className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                          title="결제 링크 복사"
                        >
                          {copied === link.id ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => window.open(`/pay/${link.id}`, "_blank", "width=480,height=700,scrollbars=yes")}
                          className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                          title="결제 페이지 열기"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                      </div>
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
