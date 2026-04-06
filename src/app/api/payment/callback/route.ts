import { NextRequest, NextResponse } from "next/server";
import { verifyCallback } from "@/lib/funpay";
import { createTransaction, updateTransactionStatus } from "@/lib/store";

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
      const method = servicetype === "S000" ? "alipay" : "wechat";

      await createTransaction({
        linkId: params.param2 || "",
        transid: transid || "",
        product: decodeURIComponent(params.product || ""),
        method: method as "alipay" | "wechat",
        amount: reqamt || "",
        currency: reqcur || "",
        krwAmount: "", // TODO: 환율 변환
        buyerName: decodeURIComponent(params.buyername || ""),
        status: "완료",
      });

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
