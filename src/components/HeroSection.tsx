import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6 text-6xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🐱
          </motion.div>

          <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="text-sm font-display font-semibold text-primary">One Brand, Multiple Launchers</span>
          </div>

          <h1 className="mb-6 text-5xl font-display font-bold tracking-tight text-foreground md:text-7xl">
            MellowCat
          </h1>

          <p className="mx-auto mb-3 max-w-3xl text-lg font-medium text-muted-foreground md:text-xl">
            OpenClaw와 ClaudeCode를 위한 런처를 하나의 브랜드 안에서 더 부드럽게 만나보세요.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-muted-foreground">
            다운로드는 상단의 Download 메뉴에서 제품별로 선택할 수 있습니다.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="lg" className="min-w-[220px] h-14 text-base" asChild>
              <a href="#products">런처 살펴보기</a>
            </Button>

            <Button variant="hero-outline" size="lg" className="min-w-[220px] h-14 text-base" asChild>
              <a href="https://github.com/Aaron-Kim33/MellowCat" target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
