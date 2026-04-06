import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

/**
 * 간단한 JSON 파일 기반 데이터 저장소
 * - 프로토타입/개발용. 운영 시 DB로 교체
 */
function readJSON<T>(filename: string): T[] {
  const filepath = join(DATA_DIR, filename);
  if (!existsSync(filepath)) return [];
  return JSON.parse(readFileSync(filepath, "utf-8"));
}

function writeJSON<T>(filename: string, data: T[]) {
  const filepath = join(DATA_DIR, filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}

// ========== 결제 링크 ==========

export interface PaymentLink {
  id: string;
  name: string;
  price: string;
  currency: string;
  method: "all" | "alipay" | "wechat";
  description: string;
  status: "active" | "inactive";
  clicks: number;
  transactions: number;
  createdAt: string;
}

export function getPaymentLinks(): PaymentLink[] {
  return readJSON<PaymentLink>("links.json");
}

export function getPaymentLink(id: string): PaymentLink | undefined {
  return getPaymentLinks().find((l) => l.id === id);
}

export function createPaymentLink(
  data: Omit<PaymentLink, "id" | "clicks" | "transactions" | "createdAt" | "status">
): PaymentLink {
  const links = getPaymentLinks();
  const link: PaymentLink = {
    ...data,
    id: `PL-${Date.now().toString(36)}`,
    status: "active",
    clicks: 0,
    transactions: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  links.push(link);
  writeJSON("links.json", links);
  return link;
}

export function incrementLinkClicks(id: string) {
  const links = getPaymentLinks();
  const link = links.find((l) => l.id === id);
  if (link) {
    link.clicks++;
    writeJSON("links.json", links);
  }
}

// ========== 거래 내역 ==========

export interface Transaction {
  id: string;
  linkId: string;
  transid: string;
  product: string;
  method: "alipay" | "wechat";
  amount: string;
  currency: string;
  krwAmount: string;
  buyerName: string;
  status: "대기" | "완료" | "취소";
  createdAt: string;
}

export function getTransactions(): Transaction[] {
  return readJSON<Transaction>("transactions.json");
}

export function createTransaction(
  data: Omit<Transaction, "id" | "createdAt">
): Transaction {
  const transactions = getTransactions();
  const tx: Transaction = {
    ...data,
    id: `ZP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(transactions.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString(),
  };
  transactions.unshift(tx);
  writeJSON("transactions.json", transactions);

  // 링크 거래 수 증가
  const links = getPaymentLinks();
  const link = links.find((l) => l.id === data.linkId);
  if (link) {
    link.transactions++;
    writeJSON("links.json", links);
  }

  return tx;
}

export function updateTransactionStatus(transid: string, status: Transaction["status"]) {
  const transactions = getTransactions();
  const tx = transactions.find((t) => t.transid === transid);
  if (tx) {
    tx.status = status;
    writeJSON("transactions.json", transactions);
  }
}
