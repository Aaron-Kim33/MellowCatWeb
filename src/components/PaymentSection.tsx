import { Button } from "@/components/ui/button";
import { CreditCard, Heart } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSection = () => {
  return (
    <section id="payment" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">후원하기</h2>
          <p className="text-muted-foreground mb-12">
            MellowCat은 무료입니다. 따뜻한 후원으로 프로젝트를 응원해주세요 ☕
          </p>

          <div className="max-w-md mx-auto" id="donate">
            <div className="p-8 rounded-2xl bg-card soft-shadow hover:warm-glow transition-all">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">일회성 후원</h3>
              <p className="text-sm text-muted-foreground mb-6">
                커피 한 잔 값으로 개발을 응원해주세요.
              </p>
              <Button variant="hero" className="w-full rounded-full" asChild>
                <a href="https://buymeacoffee.com/mellowcat" target="_blank" rel="noopener noreferrer">
                  후원하기
                </a>
              </Button>
            </div>

            {/* 정기 후원 카드 - 추후 활성화 예정
            <div className="p-8 rounded-2xl bg-card soft-shadow hover:warm-glow transition-all">
              <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">정기 후원</h3>
              <p className="text-sm text-muted-foreground mb-6">
                지속적인 개발을 지원해주세요.
              </p>
              <Button variant="hero-outline" className="w-full rounded-full">
                월간 구독
              </Button>
            </div>
            */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentSection;
