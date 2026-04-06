import { getDb, initializeDb } from "./db";

// DB 초기화 (서버 시작 시 1회)
let dbReady: Promise<void> | null = null;
function ensureDb() {
  if (!dbReady) {
    dbReady = initializeDb();
  }
  return dbReady;
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

function rowToLink(row: Record<string, unknown>): PaymentLink {
  return {
    id: row.id as string,
    name: row.name as string,
    price: row.price as string,
    currency: row.currency as string,
    method: row.method as PaymentLink["method"],
    description: row.description as string,
    status: row.status as PaymentLink["status"],
    clicks: row.clicks as number,
    transactions: row.transactions as number,
    createdAt: row.created_at as string,
  };
}

export async function getPaymentLinks(): Promise<PaymentLink[]> {
  await ensureDb();
  const sql = getDb();
  const rows = await sql`SELECT * FROM payment_links ORDER BY created_at DESC`;
  return rows.map(rowToLink);
}

export async function getPaymentLink(id: string): Promise<PaymentLink | undefined> {
  await ensureDb();
  const sql = getDb();
  const rows = await sql`SELECT * FROM payment_links WHERE id = ${id}`;
  return rows.length > 0 ? rowToLink(rows[0]) : undefined;
}

export async function createPaymentLink(
  data: Omit<PaymentLink, "id" | "clicks" | "transactions" | "createdAt" | "status">
): Promise<PaymentLink> {
  await ensureDb();
  const sql = getDb();
  const id = `PL-${Date.now().toString(36)}`;
  const createdAt = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO payment_links (id, name, price, currency, method, description, status, clicks, transactions, created_at)
    VALUES (${id}, ${data.name}, ${data.price}, ${data.currency}, ${data.method}, ${data.description}, 'active', 0, 0, ${createdAt})
  `;

  return {
    ...data,
    id,
    status: "active",
    clicks: 0,
    transactions: 0,
    createdAt,
  };
}

export async function incrementLinkClicks(id: string) {
  await ensureDb();
  const sql = getDb();
  await sql`UPDATE payment_links SET clicks = clicks + 1 WHERE id = ${id}`;
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

function rowToTransaction(row: Record<string, unknown>): Transaction {
  return {
    id: row.id as string,
    linkId: row.link_id as string,
    transid: row.transid as string,
    product: row.product as string,
    method: row.method as Transaction["method"],
    amount: row.amount as string,
    currency: row.currency as string,
    krwAmount: row.krw_amount as string,
    buyerName: row.buyer_name as string,
    status: row.status as Transaction["status"],
    createdAt: row.created_at as string,
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  await ensureDb();
  const sql = getDb();
  const rows = await sql`SELECT * FROM transactions ORDER BY created_at DESC`;
  return rows.map(rowToTransaction);
}

export async function createTransaction(
  data: Omit<Transaction, "id" | "createdAt">
): Promise<Transaction> {
  await ensureDb();
  const sql = getDb();

  const count = await sql`SELECT COUNT(*) as cnt FROM transactions`;
  const num = (count[0].cnt as number) + 1;
  const id = `ZP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(num).padStart(3, "0")}`;
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO transactions (id, link_id, transid, product, method, amount, currency, krw_amount, buyer_name, status, created_at)
    VALUES (${id}, ${data.linkId}, ${data.transid}, ${data.product}, ${data.method}, ${data.amount}, ${data.currency}, ${data.krwAmount}, ${data.buyerName}, ${data.status}, ${createdAt})
  `;

  // 링크 거래 수 증가
  await sql`UPDATE payment_links SET transactions = transactions + 1 WHERE id = ${data.linkId}`;

  return { ...data, id, createdAt };
}

export async function updateTransactionStatus(transid: string, status: Transaction["status"]) {
  await ensureDb();
  const sql = getDb();
  await sql`UPDATE transactions SET status = ${status} WHERE transid = ${transid}`;
}
