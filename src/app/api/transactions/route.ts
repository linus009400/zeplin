import { NextResponse } from "next/server";
import { getTransactions } from "@/lib/store";

// 거래 내역 조회
export async function GET() {
  const transactions = getTransactions();
  return NextResponse.json(transactions);
}
