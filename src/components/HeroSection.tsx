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
            ðŸ±
          </motion.div>

          <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="text-sm font-display font-semibold text-primary">MellowCat Launcher</span>
          </div>

          <h1 className="mb-6 text-5xl font-display font-bold tracking-tight text-foreground md:text-7xl">MellowCat</h1>

          <p className="mx-auto mb-3 max-w-3xl text-lg font-medium text-muted-foreground md:text-xl">
            MellowCat Launcher로 AI 워크플로우를 더 부드럽게 시작하고 관리해보세요.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-muted-foreground">
            다운로드와 도움말은 상단 메뉴에서 바로 확인할 수 있습니다.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="lg" className="h-14 min-w-[240px] text-base" asChild>
              <a href="https://github.com/Aaron-Kim33/mellowcat-claude-v2" target="_blank" rel="noopener noreferrer">
                Star on GitHub (MellowCat Launcher)
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
