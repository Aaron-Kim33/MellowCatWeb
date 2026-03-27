import { Button } from "@/components/ui/button";

type CheckoutButtonProps = {
  busy: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const CheckoutButton = ({ busy, disabled, onClick }: CheckoutButtonProps) => {
  return (
    <Button variant="hero" size="lg" className="h-14 w-full text-base" onClick={onClick} disabled={busy || disabled}>
      {busy ? "Preparing checkout..." : "Continue to payment"}
    </Button>
  );
};

export default CheckoutButton;
