import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type PaymentErrorStateProps = {
  title: string;
  message: string;
};

const PaymentErrorState = ({ title, message }: PaymentErrorStateProps) => {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-8 text-center soft-shadow">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-xl text-destructive">
        !
      </div>
      <h2 className="mb-3 text-2xl font-display font-bold text-foreground">{title}</h2>
      <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      <Button variant="hero-outline" asChild>
        <Link to="/">Return to MellowCat</Link>
      </Button>
    </div>
  );
};

export default PaymentErrorState;
