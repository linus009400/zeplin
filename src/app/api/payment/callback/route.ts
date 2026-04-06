import { NextRequest, NextResponse } from "next/server";
import { verifyCallback } from "@/lib/funpay";

/**
 * FunPay 결제 승인 콜백 (statusurl)
 * - 서버 간 비동기 POST
 * - 성공 시 "SUCCESS", 실패 시 "FAIL" 텍스트 응답
 * - 실패 시 1분, 3분, 5분, 10분... 간격으로 최대 9회 재시도
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let params: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        params[key] = String(value);
      });
    } else {
      params = await request.json();
    }

    const {
      rescode,
      resmsg,
      transid,
      refno,
      mid,
      servicetype,
      reqamt,
      reqcur,
    } = params;

    console.log("[FunPay Callback]", {
      rescode,
      transid,
      refno,
      servicetype,
      reqamt,
      reqcur,
      resmsg: resmsg ? decodeURIComponent(resmsg) : "",
    });

    // fgkey 검증
    if (!verifyCallback(params)) {
      console.error("[FunPay Callback] fgkey 검증 실패:", refno);
      return new NextResponse("FAIL", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (rescode === "0000") {
      // 결제 성공 처리
      // TODO: DB에 거래 정보 저장
      // - transid: FunPay 거래번호
      // - refno: 주문번호
      // - mid: 가맹점 ID
      // - servicetype: 결제수단 (S000=알리페이, S001=위챗페이)
      // - reqamt: 결제금액
      // - reqcur: 결제통화

      console.log("[FunPay Callback] 결제 성공:", refno, transid);

      return new NextResponse("SUCCESS", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 결제 실패/기타 상태
    console.error("[FunPay Callback] 결제 실패:", rescode, resmsg);

    return new NextResponse("SUCCESS", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("[FunPay Callback] 처리 오류:", error);
    return new NextResponse("FAIL", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
