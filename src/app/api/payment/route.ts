import { NextRequest, NextResponse } from "next/server";
import { requestPayment, type PaymentMethod } from "@/lib/funpay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      method,
      amount,
      currency,
      buyerName,
      productName,
      email,
      tel,
      reqtype,
    } = body;

    // 필수값 검증
    if (!method || !amount || !currency || !buyerName || !productName) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 결제수단 검증
    if (!["alipay", "wechat"].includes(method)) {
      return NextResponse.json(
        { error: "지원하지 않는 결제수단입니다." },
        { status: 400 }
      );
    }

    // 주문번호 생성
    const orderId = `ZP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    console.log("[Payment] 결제 요청:", {
      method,
      orderId,
      amount,
      currency,
      buyerName,
      productName,
      reqtype: reqtype || "P",
    });

    const result = await requestPayment({
      method: method as PaymentMethod,
      orderId,
      amount: String(amount),
      currency,
      buyerName,
      productName,
      reqtype: reqtype || "P",
      email,
      tel,
    });

    console.log("[Payment] FunPay 응답:", {
      success: result.success,
      rescode: result.rescode,
      resmsg: result.resmsg,
      transid: result.transid,
      hasPaymentUrl: !!result.paymentUrl,
    });

    if (result.success) {
      return NextResponse.json({
        orderId,
        transid: result.transid,
        rescode: result.rescode,
        paymentUrl: result.paymentUrl,
        qrCode: result.qrCode,
      });
    }

    return NextResponse.json(
      {
        error: result.resmsg,
        rescode: result.rescode,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Payment request error:", error);
    return NextResponse.json(
      { error: "결제 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
