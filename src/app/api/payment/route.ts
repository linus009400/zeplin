import { NextRequest, NextResponse } from "next/server";
import { generateFgkey, SERVICE_TYPE, type PaymentMethod } from "@/lib/funpay";

/**
 * 결제 요청 API
 * - fgkey를 생성하고 FunPay 폼 제출에 필요한 파라미터를 반환
 * - 프론트엔드에서 FunPay로 직접 폼 POST (팝업)
 */
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
      linkId,
    } = body;

    // 필수값 검증
    if (!method || !amount || !currency || !buyerName || !productName) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    if (!["alipay", "wechat"].includes(method)) {
      return NextResponse.json(
        { error: "지원하지 않는 결제수단입니다." },
        { status: 400 }
      );
    }

    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const mid = process.env.FUNPAY_MID || "";
    const orderId = `ZP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    console.log("[Payment] 환경변수 확인:", {
      FUNPAY_MID: mid ? `${mid.slice(0, 4)}...` : "(비어있음)",
      FUNPAY_ENV: process.env.FUNPAY_ENV || "(미설정)",
      FUNPAY_SECRET_KEY: process.env.FUNPAY_SECRET_KEY ? "설정됨" : "(비어있음)",
      NEXT_PUBLIC_APP_URL: appBaseUrl,
    });

    const params: Record<string, string> = {
      ver: "V2",
      mid,
      servicetype: SERVICE_TYPE[method as PaymentMethod],
      refno: orderId,
      reqcur: currency,
      reqamt: String(amount),
      buyername: buyerName,
      product: productName,
      trade_information: JSON.stringify({}),
      refer_url: appBaseUrl,
      returnurl: `${appBaseUrl}/payment/complete`,
      statusurl: `${appBaseUrl}/api/payment/callback`,
      reqtype: reqtype || "P",
      restype: "JSON",
    };

    if (email) params.email = email;
    if (tel) params.tel = tel;
    if (linkId) params.param2 = linkId;

    // fgkey 생성
    params.fgkey = generateFgkey(params);

    const funpayUrl =
      process.env.FUNPAY_ENV === "production"
        ? "https://online.funpay.co.kr/payment/payment.icb"
        : "https://onlinetest.funpay.co.kr/payment/payment.icb";

    console.log("[Payment] fgkey 생성 완료:", {
      orderId,
      method,
      amount,
      currency,
      mid: params.mid,
      funpayUrl,
    });

    return NextResponse.json({
      funpayUrl,
      params,
    });
  } catch (error) {
    console.error("Payment request error:", error);
    return NextResponse.json(
      { error: "결제 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
