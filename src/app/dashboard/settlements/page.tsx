const SETTLEMENTS = [
  { id: "ST-2026-014", period: "2026.03.28 ~ 04.01", amount: "₩ 5,840,000", txCount: 48, status: "예정", date: "2026-04-06" },
  { id: "ST-2026-013", period: "2026.03.21 ~ 03.27", amount: "₩ 4,230,000", txCount: 35, status: "완료", date: "2026-04-01" },
  { id: "ST-2026-012", period: "2026.03.14 ~ 03.20", amount: "₩ 6,120,000", txCount: 52, status: "완료", date: "2026-03-25" },
  { id: "ST-2026-011", period: "2026.03.07 ~ 03.13", amount: "₩ 3,890,000", txCount: 31, status: "완료", date: "2026-03-18" },
  { id: "ST-2026-010", period: "2026.02.28 ~ 03.06", amount: "₩ 5,450,000", txCount: 44, status: "완료", date: "2026-03-11" },
  { id: "ST-2026-009", period: "2026.02.21 ~ 02.27", amount: "₩ 4,780,000", txCount: 39, status: "완료", date: "2026-03-04" },
];

const SUMMARY = [
  { label: "이번 달 정산 총액", value: "₩ 16,190,000" },
  { label: "정산 예정액", value: "₩ 5,840,000" },
  { label: "평균 정산 주기", value: "D+3 영업일" },
  { label: "이번 달 수수료", value: "₩ 404,750" },
];

export default function SettlementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">정산 내역</h1>
        <p className="text-sm text-gray-500 mt-1">정산 현황과 내역을 확인하세요</p>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-sm text-gray-500 mb-1">{item.label}</div>
            <div className="text-xl font-extrabold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Bank account info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">정산 계좌</h2>
            <p className="text-sm text-gray-500 mt-1">신한은행 110-XXX-XXXXXX (ICB Corp.)</p>
          </div>
          <button className="px-4 py-2 text-sm text-primary font-medium border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
            계좌 변경
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3.5 font-medium">정산번호</th>
                <th className="text-left px-5 py-3.5 font-medium">정산기간</th>
                <th className="text-right px-5 py-3.5 font-medium">정산금액</th>
                <th className="text-right px-5 py-3.5 font-medium">거래건수</th>
                <th className="text-center px-5 py-3.5 font-medium">상태</th>
                <th className="text-right px-5 py-3.5 font-medium">정산일</th>
              </tr>
            </thead>
            <tbody>
              {SETTLEMENTS.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-5 py-4 text-sm font-mono text-gray-600">{s.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-900">{s.period}</td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-gray-900">{s.amount}</td>
                  <td className="px-5 py-4 text-right text-sm text-gray-600">{s.txCount}건</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      s.status === "완료"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-gray-500">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
