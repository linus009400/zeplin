/**
 * 결제 Provider 패턴
 * - 각 결제수단(알리페이, 위챗페이, 카카오페이 등)을 동일한 인터페이스로 추상화
 * - 새 결제수단 추가 시 Provider만 구현하면 됨
 */

export interface PaymentRequestParams {
  orderId: string;
  amount: string;
  currency: string;
  buyerName: string;
  productName: string;
  reqtype: "P" | "M";
  email?: string;
  tel?: string;
}

export interface PaymentResult {
  success: boolean;
  transid?: string;
  rescode: string;
  resmsg: string;
  paymentUrl?: string;
  qrCode?: string;
}

export interface PaymentProvider {
  name: string;
  code: string;
  requestPayment(params: PaymentRequestParams): Promise<PaymentResult>;
}

// Provider 레지스트리
const providers = new Map<string, PaymentProvider>();

export function registerProvider(provider: PaymentProvider) {
  providers.set(provider.code, provider);
}

export function getProvider(code: string): PaymentProvider | undefined {
  return providers.get(code);
}

export function getAllProviders(): PaymentProvider[] {
  return Array.from(providers.values());
}
