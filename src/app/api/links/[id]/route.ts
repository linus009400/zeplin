import { NextResponse } from "next/server";
import { getPaymentLink, incrementLinkClicks } from "@/lib/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const link = await getPaymentLink(id);

  if (!link) {
    return NextResponse.json(
      { error: "결제 링크를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 클릭 수 증가
  await incrementLinkClicks(id);

  return NextResponse.json(link);
}
