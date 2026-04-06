import { requestPayment } from "@/lib/funpay";
import type { PaymentProvider, PaymentRequestParams, PaymentResult } from "./index";
import { registerProvider } from "./index";

const wechatProvider: PaymentProvider = {
  name: "WeChat Pay",
  code: "wechat",

  async requestPayment(params: PaymentRequestParams): Promise<PaymentResult> {
    return requestPayment({
      method: "wechat",
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

registerProvider(wechatProvider);

export default wechatProvider;
