import { NextRequest, NextResponse } from "next/server";
import { getPaymentLinks, createPaymentLink } from "@/lib/store";

// 결제 링크 목록 조회
export async function GET() {
  const links = getPaymentLinks();
  return NextResponse.json(links);
}

// 결제 링크 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, currency, method, description } = body;

    if (!name || !price || !currency || !method) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    const link = createPaymentLink({
      name,
      price,
      currency,
      method,
      description: description || "",
    });

    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "결제 링크 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
