import Link from "next/link";

const STATS = [
  { label: "오늘 매출", value: "¥ 8,520", sub: "≈ ₩ 1,619,800", change: "+12.5%", up: true },
  { label: "이번 달 매출", value: "¥ 128,400", sub: "≈ ₩ 24,396,000", change: "+8.3%", up: true },
  { label: "총 거래 건수", value: "342건", sub: "이번 달", change: "+23건", up: true },
  { label: "정산 예정", value: "₩ 5,840,000", sub: "D+3 예정", change: "4/6", up: true },
];

const RECENT_TRANSACTIONS = [
  { id: "ZP-240403-001", product: "프리미엄 한방 샴푸 세트", method: "Alipay", amount: "¥ 680", krw: "₩ 129,200", status: "완료", time: "14:23" },
  { id: "ZP-240403-002", product: "K-뷰티 스킨케어 패키지", method: "WeChat", amount: "¥ 1,280", krw: "₩ 243,200", status: "완료", time: "13:45" },
  { id: "ZP-240403-003", product: "전통 공예품 세트", method: "Alipay", amount: "¥ 2,400", krw: "₩ 456,000", status: "완료", time: "12:10" },
  { id: "ZP-240403-004", product: "한국 식품 모음 박스", method: "WeChat", amount: "¥ 520", krw: "₩ 98,800", status: "대기", time: "11:30" },
  { id: "ZP-240403-005", product: "K-POP 앨범 번들", method: "Alipay", amount: "¥ 380", krw: "₩ 72,200", status: "완료", time: "10:15" },
];

const PAYMENT_LINKS = [
  { name: "프리미엄 한방 샴푸 세트", clicks: 128, conversions: 34, rate: "26.6%" },
  { name: "K-뷰티 스킨케어 패키지", clicks: 95, conversions: 22, rate: "23.2%" },
  { name: "전통 공예품 세트", clicks: 67, conversions: 15, rate: "22.4%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">ICB Store 매출 현황</p>
        </div>
        <Link
          href="/dashboard/payments"
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
        >
          + 결제 링크 만들기
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">{stat.sub}</span>
              <span className={`text-xs font-semibold ${stat.up ? "text-green-600" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">최근 거래</h2>
            <Link href="/dashboard/transactions" className="text-sm text-primary font-medium hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-50">
                  <th className="text-left px-5 py-3 font-medium">상품</th>
                  <th className="text-left px-5 py-3 font-medium">결제수단</th>
                  <th className="text-right px-5 py-3 font-medium">금액</th>
                  <th className="text-center px-5 py-3 font-medium">상태</th>
                  <th className="text-right px-5 py-3 font-medium">시간</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-medium text-gray-900">{tx.product}</div>
                      <div className="text-xs text-gray-400">{tx.id}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        tx.method === "Alipay"
                          ? "bg-blue-50 text-alipay"
                          : "bg-green-50 text-wechat"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          tx.method === "Alipay" ? "bg-alipay" : "bg-wechat"
                        }`} />
                        {tx.method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="text-sm font-semibold text-gray-900">{tx.amount}</div>
                      <div className="text-xs text-gray-400">{tx.krw}</div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        tx.status === "완료"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm text-gray-500">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Payment Links */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">인기 결제 링크</h2>
          </div>
          <div className="p-5 space-y-4">
            {PAYMENT_LINKS.map((link, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 truncate pr-2">{link.name}</span>
                  <span className="text-xs font-semibold text-primary">{link.rate}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${(link.conversions / link.clicks) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>클릭 {link.clicks}</span>
                  <span>전환 {link.conversions}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <Link
              href="/dashboard/payments"
              className="block text-center py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              모든 결제 링크 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
