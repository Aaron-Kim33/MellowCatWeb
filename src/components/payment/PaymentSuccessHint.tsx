import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type PaymentSuccessHintProps = {
  title: string;
  message: string;
};

const PaymentSuccessHint = ({ title, message }: PaymentSuccessHintProps) => {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-8 text-center soft-shadow">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
        ✓
      </div>
      <h2 className="mb-3 text-2xl font-display font-bold text-foreground">{title}</h2>
      <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="hero" asChild>
          <Link to="/">Return to MellowCat</Link>
        </Button>
        <Button variant="hero-outline" asChild>
          <a href="mellowcat://refresh-entitlements">Refresh in launcher</a>
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessHint;
