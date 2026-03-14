import { motion } from "framer-motion";
import { Zap, Globe, Cpu, Shield } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "원클릭 설치",
    desc: "복잡한 설정 없이 클릭 한 번이면 끝. 초보자도 쉽게 시작할 수 있어요.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Windows & macOS",
    desc: "하나의 런처로 윈도우와 맥 모두 지원합니다.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "무료 모델 지원",
    desc: "Llama 3.1 등 오픈소스 모델을 유료 API 없이 바로 사용할 수 있어요.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "오픈소스",
    desc: "소스코드가 공개되어 있어 누구나 기여하고 검증할 수 있습니다.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-4 text-foreground">
          왜 <span className="text-primary">MellowCat</span>인가요?
        </h2>
        <p className="text-center text-muted-foreground mb-16">부드럽고 간편한 AI 경험을 만나보세요 🐾</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-card soft-shadow hover:warm-glow transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
