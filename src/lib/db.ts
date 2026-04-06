import { neon } from "@neondatabase/serverless";

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

/**
 * DB 테이블 초기화 (앱 시작 시 1회 실행)
 */
export async function initializeDb() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS payment_links (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      currency TEXT NOT NULL,
      method TEXT NOT NULL DEFAULT 'all',
      description TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      clicks INTEGER NOT NULL DEFAULT 0,
      transactions INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      link_id TEXT NOT NULL,
      transid TEXT NOT NULL,
      product TEXT NOT NULL,
      method TEXT NOT NULL,
      amount TEXT NOT NULL,
      currency TEXT NOT NULL,
      krw_amount TEXT NOT NULL DEFAULT '0',
      buyer_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT '대기',
      created_at TEXT NOT NULL
    )
  `;
}
