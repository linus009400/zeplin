import { requestPayment } from "@/lib/funpay";
import type { PaymentProvider, PaymentRequestParams, PaymentResult } from "./index";
import { registerProvider } from "./index";

const alipayProvider: PaymentProvider = {
  name: "Alipay",
  code: "alipay",

  async requestPayment(params: PaymentRequestParams): Promise<PaymentResult> {
    return requestPayment({
      method: "alipay",
      orderId: params.orderId,
      amount: params.amount,
      currency: params.currency as "CNY" | "USD" | "KRW",
      buyerName: params.buyerName,
      productName: params.productName,
      reqtype: params.reqtype,
      email: params.email,
      tel: params.tel,
    });
  },
};

registerProvider(alipayProvider);

export default alipayProvider;
