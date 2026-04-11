import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Cpu, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Whitepaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Button variant="ghost" className="mb-8" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2" /> 돌아가기
        </Button>

        <div className="mb-4 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">v1.0 Official Document</span>
        </div>

        <h1 className="mb-2 font-display text-4xl font-bold text-primary">Whitepaper</h1>
        <p className="mb-12 text-muted-foreground">MellowCat: AI 에이전트 대중화를 위한 원클릭 런처 기술 백서</p>

        <div className="space-y-12">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
              <Zap className="h-5 w-5 text-yellow-500" /> 1. Executive Summary
            </h2>
            <div className="rounded-xl border border-border bg-secondary/30 p-6">
              <p className="leading-relaxed text-foreground">
                MellowCat은 AI 에이전트 구축 시 발생하는 환경 격리와 OS 호환성 문제를 해결하기 위해 설계되었습니다. 기술적 복잡성을 추상화하여
                사용자에게 <strong>Zero-Configuration</strong> 경험을 제공하는 것을 목표로 합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">2. Problem Statement</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-primary">01.</span>
                <div>
                  <h3 className="font-medium">Dependency Hell</h3>
                  <p className="text-sm text-muted-foreground">시스템 전역 Python 환경과 프로젝트별 라이브러리 간의 충돌 문제</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">02.</span>
                <div>
                  <h3 className="font-medium">OS Fragmentation</h3>
                  <p className="text-sm text-muted-foreground">Windows와 macOS 간의 서로 다른 실행 환경 및 스크립트 파편화</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
              <Cpu className="h-5 w-5 text-blue-500" /> 3. Technical Solution
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium">Adaptive Setup</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  시스템을 실시간 스캔하여 최적화된 venv를 자동 생성하고 미설치 패키지만 선택적으로 동기화합니다.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium">Cross-Platform</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  플랫폼 추상화 계층을 통해 OS에 관계없이 동일한 Python 코어를 호출하여 일관성을 보장합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
              <Globe className="h-5 w-5 text-green-500" /> 4. Future Roadmap
            </h2>
            <div className="ml-2 space-y-6 border-l-2 border-primary/20 pl-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary" />
                <h3 className="font-bold text-primary">Phase 1: Foundation (Current)</h3>
                <p className="text-pretty text-sm text-muted-foreground">가상환경 자동 구축 및 런처 실행 안정화</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary/20 bg-muted" />
                <h3 className="font-bold">Phase 2: Management UI</h3>
                <p className="text-pretty text-sm text-muted-foreground">GUI 기반 설정 관리 및 API Key 보안 관리 도구 도입</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary/20 bg-muted" />
                <h3 className="font-bold">Phase 3: Ecosystem</h3>
                <p className="text-pretty text-sm text-muted-foreground">다중 에이전트 지원 및 원격 배포 옵션 제공</p>
              </div>
            </div>
          </section>

          <footer className="border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 MellowCat Project. All rights reserved.
              <br />
              This document is for informational purposes only.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
