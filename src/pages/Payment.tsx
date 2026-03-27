import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/payment/CheckoutButton";
import PaymentErrorState from "@/components/payment/PaymentErrorState";
import PaymentSuccessHint from "@/components/payment/PaymentSuccessHint";
import ResolvedProductCard from "@/components/payment/ResolvedProductCard";
import { Button } from "@/components/ui/button";
import {
  createCheckoutSession,
  readPaymentHandoff,
  resolvePaymentHandoff,
  type CheckoutSessionResponse,
  type PaymentClientError,
  type ResolvedPaymentContext,
} from "@/lib/payment";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type ResolveState =
  | { status: "loading" }
  | { status: "ready"; payload: ResolvedPaymentContext }
  | { status: "already-owned"; error: PaymentClientError }
  | { status: "success" }
  | { status: "cancel" }
  | { status: "error"; title: string; message: string };

const renderPaymentShell = (content: ReactNode) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute top-24 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />
      {content}
    </main>
    <Footer />
  </div>
);

const errorMessages: Record<PaymentClientError["code"], { title: string; message: string }> = {
  HANDOFF_INVALID: {
    title: "This checkout link is invalid.",
    message: "Return to MellowCat and start checkout again.",
  },
  HANDOFF_EXPIRED: {
    title: "This checkout link is invalid or expired.",
    message: "Return to MellowCat and start checkout again.",
  },
  UNAUTHENTICATED: {
    title: "You need to sign in again.",
    message: "Return to MellowCat, sign in again, and restart checkout.",
  },
  PRODUCT_NOT_FOUND: {
    title: "This product is no longer available.",
    message: "Return to MellowCat and choose a different product.",
  },
  ALREADY_OWNED: {
    title: "You already own this product.",
    message: "Return to MellowCat to install it.",
  },
  CHECKOUT_DISABLED: {
    title: "Checkout is temporarily unavailable.",
    message: "Return to MellowCat and try again later.",
  },
  NETWORK_ERROR: {
    title: "Payment backend is unreachable.",
    message: "The checkout page could not reach the payment API. Verify the API base URL and backend deployment.",
  },
};

const PaymentPage = () => {
  const location = useLocation();
  const [state, setState] = useState<ResolveState>({ status: "loading" });
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("status");

    if (paymentStatus === "success") {
      setState({ status: "success" });
      return;
    }

    if (paymentStatus === "cancel" || paymentStatus === "canceled") {
      setState({ status: "cancel" });
      return;
    }

    const handoffToken = readPaymentHandoff(location.search);
    if (!handoffToken) {
      setState({
        status: "error",
        title: "Checkout needs to be started from MellowCat.",
        message: "Open checkout from the launcher so it can create a one-time handoff token for this payment.",
      });
      return;
    }

    const load = async () => {
      setState({ status: "loading" });
      const payload = await resolvePaymentHandoff(handoffToken);

      if (cancelled) {
        return;
      }

      if (!payload.ok) {
        if (payload.code === "ALREADY_OWNED") {
          setState({ status: "already-owned", error: payload });
          return;
        }

        const copy = errorMessages[payload.code];
        setState({ status: "error", title: copy.title, message: copy.message });
        return;
      }

      setState({ status: "ready", payload });
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [location.search]);

  const handleCheckout = async () => {
    const handoffToken = readPaymentHandoff(location.search);
    if (!handoffToken) {
      setState({
        status: "error",
        title: "Checkout needs to be started from MellowCat.",
        message: "Open checkout from the launcher so it can create a one-time handoff token for this payment.",
      });
      return;
    }

    setCheckoutBusy(true);

    const payload = (await createCheckoutSession(handoffToken)) as CheckoutSessionResponse | PaymentClientError;
    if (!payload.ok) {
      setCheckoutBusy(false);
      if (payload.code === "ALREADY_OWNED") {
        setState({ status: "already-owned", error: payload });
        return;
      }

      const copy = errorMessages[payload.code];
      setState({ status: "error", title: copy.title, message: copy.message });
      return;
    }

    window.location.assign(payload.checkoutUrl);
  };

  if (state.status === "success") {
    return <PaymentSuccessPage />;
  }

  if (state.status === "cancel") {
    return <PaymentCancelPage />;
  }

  return renderPaymentShell(
    <section className="container relative z-10 mx-auto max-w-4xl px-4 py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to MellowCat
        </Link>
      </Button>

      <div className="mb-8 max-w-2xl">
        <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <span className="text-sm font-display font-semibold text-primary">Payment</span>
        </div>
        <h1 className="mb-3 text-4xl font-display font-bold text-foreground md:text-5xl">Secure checkout</h1>
        <p className="text-muted-foreground">
          MellowCat launcher initiated this payment flow with a one-time handoff token. Product ownership is granted
          only after backend webhook confirmation.
        </p>
      </div>

      {state.status === "loading" && (
        <div className="rounded-[2rem] border border-border bg-card/90 p-12 text-center soft-shadow">
          <LoaderCircle className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <h2 className="mb-2 text-2xl font-display font-bold text-foreground">Loading checkout</h2>
          <p className="text-sm text-muted-foreground">Resolving your payment handoff and product details...</p>
        </div>
      )}

      {state.status === "error" && <PaymentErrorState title={state.title} message={state.message} />}

      {state.status === "already-owned" && (
        <PaymentErrorState title={errorMessages.ALREADY_OWNED.title} message={errorMessages.ALREADY_OWNED.message} />
      )}

      {state.status === "ready" && (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <ResolvedProductCard payload={state.payload} />

          <div className="rounded-[2rem] border border-border bg-card/90 p-8 soft-shadow">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Next step</p>
            <h2 className="mb-3 text-2xl font-display font-bold text-foreground">Continue to payment</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              You will be redirected to the payment provider to complete this purchase. Ownership will refresh in
              MellowCat after the provider webhook confirms payment.
            </p>
            <CheckoutButton busy={checkoutBusy} onClick={handleCheckout} />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              If this tab was opened by accident, return to MellowCat and restart checkout from the launcher.
            </p>
          </div>
        </div>
      )}
    </section>,
  );
};

export const PaymentSuccessPage = () =>
  renderPaymentShell(
    <section className="container mx-auto max-w-3xl px-4 py-36">
      <PaymentSuccessHint
        title="Payment received."
        message="Return to MellowCat. Your access should refresh automatically, or use Refresh Purchases in the launcher."
      />
    </section>,
  );

export const PaymentCancelPage = () =>
  renderPaymentShell(
    <section className="container mx-auto max-w-3xl px-4 py-36">
      <PaymentErrorState
        title="Checkout was canceled."
        message="You can return to MellowCat and try again."
      />
    </section>,
  );

export default PaymentPage;
