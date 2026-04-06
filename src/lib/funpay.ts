import { createHash } from "crypto";

// FunPay API 설정
const FUNPAY_BASE_URL =
  process.env.FUNPAY_ENV === "production"
    ? "https://online.funpay.co.kr"
    : "https://onlinetest.funpay.co.kr";

const FUNPAY_MID = process.env.FUNPAY_MID || "P00000000000"; // 테스트 MID
const FUNPAY_SECRET_KEY = process.env.FUNPAY_SECRET_KEY || "";

// 서비스 타입 매핑
export const SERVICE_TYPE = {
  alipay: "S000",
  wechat: "S001",
  alipay_plus: "S006",
  paypal: "S005",
} as const;

export type PaymentMethod = keyof typeof SERVICE_TYPE;

/**
 * fgkey 생성
 * 1. 모든 파라미터 key=value를 한줄로 연결
 * 2. 문자 단위로 오름차순 정렬
 * 3. "secretkey?정렬된문자열" 형태로 연결
 * 4. SHA-256 해싱
 * 5. 대문자 변환
 */
export function generateFgkey(params: Record<string, string>): string {
  // key=value 쌍을 한줄로 연결
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("");

  // 문자 단위로 오름차순 정렬
  const sorted = paramString.split("").sort().join("");

  // secretkey + ? + 정렬된 문자열
  const hashInput = `${FUNPAY_SECRET_KEY}?${sorted}`;

  // SHA-256 해싱 후 대문자
  return createHash("sha256").update(hashInput, "utf8").digest("hex").toUpperCase();
}

export interface PaymentRequest {
  method: PaymentMethod;
  orderId: string;
  amount: string;
  currency: "CNY" | "USD" | "KRW";
  buyerName: string;
  productName: string;
  reqtype?: "P" | "M" | "A" | "J" | "N"; // PC, Mobile, APP, JSAPI, Mini Program
  email?: string;
  tel?: string;
  tradeInformation?: Record<string, unknown>;
}

export interface PaymentResponse {
  success: boolean;
  transid?: string;
  rescode: string;
  resmsg: string;
  paymentUrl?: string;
  qrCode?: string;
}

/**
 * FunPay 결제 요청
 */
export async function requestPayment(
  req: PaymentRequest
): Promise<PaymentResponse> {
  const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const params: Record<string, string> = {
    ver: "V2",
    mid: FUNPAY_MID,
    servicetype: SERVICE_TYPE[req.method],
    refno: req.orderId,
    reqcur: req.currency,
    reqamt: req.amount,
    buyername: req.buyerName,
    product: req.productName,
    trade_information: JSON.stringify(req.tradeInformation || {}),
    refer_url: appBaseUrl,
    returnurl: `${appBaseUrl}/payment/complete`,
    statusurl: `${appBaseUrl}/api/payment/callback`,
    reqtype: req.reqtype || "P",
    restype: "JSON",
  };

  if (req.email) params.email = req.email;
  if (req.tel) params.tel = req.tel;

  // fgkey 생성 및 추가
  params.fgkey = generateFgkey(params);

  const response = await fetch(`${FUNPAY_BASE_URL}/payment/payment.icb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams(params).toString(),
  });

  const data = await response.json();

  if (data.rescode === "0000") {
    return {
      success: true,
      transid: data.transid,
      rescode: data.rescode,
      resmsg: decodeURIComponent(data.resmsg || ""),
      paymentUrl: data.resmsg, // Mobile/H5일 경우 URL
      qrCode: data.resmsg, // PC일 경우 QR 정보
    };
  }

  return {
    success: false,
    rescode: data.rescode,
    resmsg: decodeURIComponent(data.resmsg || "결제 요청 실패"),
  };
}

/**
 * 콜백 fgkey 검증
 */
export function verifyCallback(params: Record<string, string>): boolean {
  const receivedFgkey = params.fgkey;
  if (!receivedFgkey) return false;

  const paramsWithoutFgkey = { ...params };
  delete paramsWithoutFgkey.fgkey;

  const expectedFgkey = generateFgkey(paramsWithoutFgkey);
  return receivedFgkey === expectedFgkey;
}
