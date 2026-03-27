export type PaymentErrorCode =
  | "HANDOFF_INVALID"
  | "HANDOFF_EXPIRED"
  | "UNAUTHENTICATED"
  | "PRODUCT_NOT_FOUND"
  | "ALREADY_OWNED"
  | "CHECKOUT_DISABLED";

export type PaymentApiError = {
  ok: false;
  code: PaymentErrorCode;
  message: string;
};

export type ResolvedPaymentContext = {
  ok: true;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
  product: {
    id: string;
    name: string;
    summary: string;
    priceAmount: number;
    priceCurrency: string;
  };
  source: string;
};

export type CheckoutSessionResponse = {
  ok: true;
  provider: string;
  checkoutUrl: string;
  paymentId: string;
};

export const NETWORK_ERROR_CODE = "NETWORK_ERROR" as const;

export type PaymentClientError = {
  ok: false;
  code: PaymentErrorCode | typeof NETWORK_ERROR_CODE;
  message: string;
};

export const getPaymentApiBaseUrl = () => {
  const explicitBase = import.meta.env.VITE_PAYMENT_API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? "";
  return explicitBase.replace(/\/$/, "");
};

const buildPaymentApiUrl = (path: string) => `${getPaymentApiBaseUrl()}${path}`;

async function postJson<T>(path: string, body: Record<string, string>): Promise<T | PaymentClientError> {
  try {
    const response = await fetch(buildPaymentApiUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const payload = (await response.json()) as T | PaymentApiError;

    if (!response.ok) {
      return payload as PaymentClientError;
    }

    return payload;
  } catch {
    return {
      ok: false,
      code: NETWORK_ERROR_CODE,
      message: "Unable to reach the payment backend. Check the API base URL or backend availability.",
    };
  }
}

export const resolvePaymentHandoff = (handoffToken: string) =>
  postJson<ResolvedPaymentContext>("/api/payment/resolve-handoff", { handoffToken });

export const createCheckoutSession = (handoffToken: string) =>
  postJson<CheckoutSessionResponse>("/api/payment/create-checkout-session", { handoffToken });

export const readPaymentHandoff = (search: string) => new URLSearchParams(search).get("handoff");

export const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
