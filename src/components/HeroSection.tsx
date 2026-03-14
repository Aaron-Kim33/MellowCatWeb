import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Soft gradient blobs */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          
          {/* Cat emoji animation */}
          <motion.div
            className="text-6xl mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            
            🐱
          </motion.div>

          <div className="inline-block mb-6 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-display font-semibold text-primary">Windows & macOS 겸용</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-foreground">
            MellowCat
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 font-medium">
            원클릭으로 OpenClaw를 설치하고 시작하세요.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-10">
            Llama 3.1 등 무료 모델 지원 — 유료 API 없이도 바로 사용 가능 🌿
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="min-w-[220px] h-14 text-base" asChild>
              <a href="https://github.com/Aaron-Kim33/MellowCat/releases/download/v0.0.1/MellowCat_Win.exe">
                <Download className="mr-2 h-5 w-5" />
                무료 다운로드 (Win)
              </a>
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="min-w-[220px] h-14 text-base" asChild>
              <a href="https://github.com/Aaron-Kim33/MellowCat/releases/download/v0.0.1/MellowCat_Mac.zip">
                <Download className="mr-2 h-5 w-5" />
                무료 다운로드 (Mac)
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" className="min-w-[220px] h-14 text-base" asChild>
              <a href="https://github.com/Aaron-Kim33/MellowCat" target="_blank" rel="noopener noreferrer">
                ★ Star on GitHub 
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;