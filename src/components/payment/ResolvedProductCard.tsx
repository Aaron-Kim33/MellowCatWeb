import { formatPrice, type ResolvedPaymentContext } from "@/lib/payment";

type ResolvedProductCardProps = {
  payload: ResolvedPaymentContext;
};

const ResolvedProductCard = ({ payload }: ResolvedProductCardProps) => {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-8 soft-shadow">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Secure Checkout</p>
          <h2 className="text-3xl font-display font-bold text-foreground">{payload.product.name}</h2>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Price</p>
          <p className="text-xl font-bold text-primary">
            {formatPrice(payload.product.priceAmount, payload.product.priceCurrency)}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-secondary/40 p-4">
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
        <p className="font-semibold text-foreground">{payload.user.displayName || payload.user.email}</p>
        <p className="text-sm text-muted-foreground">{payload.user.email}</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Product ID</p>
          <p className="font-mono text-sm text-foreground">{payload.product.id}</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Summary</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{payload.product.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ResolvedProductCard;
