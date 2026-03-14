import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Cpu, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Whitepaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2" /> 돌아가기
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary w-8 h-8" />
          <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">v1.0 Official Document</span>
        </div>
        
        <h1 className="font-display text-4xl font-bold text-primary mb-2">Whitepaper</h1>
        <p className="text-muted-foreground mb-12">MellowCat: AI 에이전트 대중화를 위한 원클릭 런처 기술 백서</p>

        <div className="space-y-12">
          {/* Section 1: 요약 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> 1. Executive Summary
            </h2>
            <div className="bg-secondary/30 p-6 rounded-xl border border-border">
              <p className="text-foreground leading-relaxed">
                MellowCat은 OpenClaw와 같은 자율형 AI 에이전트 구축 시 발생하는 환경 격리 및 OS 호환성 문제를 해결하기 위해 설계되었습니다. 
                기술적 복잡성을 추상화하여 사용자에게 <strong>Zero-Configuration</strong> 경험을 제공하는 것을 목표로 합니다.
              </p>
            </div>
          </section>

          {/* Section 2: 문제 정의 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Problem Statement</h2>
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

          {/* Section 3: 기술 솔루션 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" /> 3. Technical Solution
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-medium mb-2">Adaptive Setup</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  시스템을 실시간 스캔하여 최적화된 venv를 자동 생성하고 미설치 패키지만 선택적으로 동기화합니다.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-medium mb-2">Cross-Platform</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  플랫폼 추상화 계층을 통해 OS에 관계없이 동일한 Python 코어를 호출하여 일관성을 보장합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: 로드맵 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" /> 4. Future Roadmap
            </h2>
            <div className="border-l-2 border-primary/20 ml-2 pl-6 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary" />
                <h3 className="font-bold text-primary">Phase 1: Foundation (Current)</h3>
                <p className="text-sm text-muted-foreground text-pretty">가상환경 자동 구축 및 OpenClaw 실행 안정화</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-muted border-2 border-primary/20" />
                <h3 className="font-bold">Phase 2: Management UI</h3>
                <p className="text-sm text-muted-foreground text-pretty">GUI 기반 설정 관리 및 API Key 보안 관리 도구 도입</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-muted border-2 border-primary/20" />
                <h3 className="font-bold">Phase 3: Ecosystem</h3>
                <p className="text-sm text-muted-foreground text-pretty">다중 에이전트 지원 및 원격 배포 옵션 제공</p>
              </div>
            </div>
          </section>

          <footer className="pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 MellowCat Project. All rights reserved. <br />
              This document is for informational purposes only.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;


{/*🐱 Whitepaper: MellowCat Project
An Autonomous Open-Source Agent Launcher for Seamless Cross-Platform Deployment

Version: 1.0

Author: Aaron Kim

Date: March 2026

Status: Alpha / Active Development

1. Executive Summary (요약)
최근 AI 에이전트 기술, 특히 OpenClaw와 같은 자율형 에이전트의 발전은 눈부시지만, 일반 사용자가 이를 로컬 환경에 구축하기에는 '환경 격리(Dependency Isolation)'와 'OS 호환성'이라는 높은 진입장벽이 존재합니다.

MellowCat은 이러한 기술적 복잡성을 추상화하여, 단 한 번의 실행으로 Python 가상환경 구축, 의존성 해결, 그리고 에이전트 구동까지 자동화하는 자율형 크로스 플랫폼 런처입니다. 본 백서는 MellowCat의 설계 철학과 기술적 구현 방식을 다룹니다.

2. Problem Statement (문제 정의)
현재 오픈소스 AI 도구들을 설치할 때 발생하는 주요 페인 포인트(Pain Points)는 다음과 같습니다:

Dependency Hell: 시스템 전역 Python 환경과 프로젝트별 라이브러리 간의 충돌.

OS Fragmentation: Windows의 .bat 환경과 macOS/Linux의 Shell 환경 차이로 인한 설치 스크립트 파편화.

High Entry Barrier: CLI(Command Line Interface)에 익숙하지 않은 비개발자 유저들의 접근성 저하.

3. Technical Solution (기술적 솔루션)
MellowCat은 **"Zero-Configuration, One-Click Execution"**을 목표로 설계되었습니다.

3.1 Adaptive Environment Setup
MellowCat의 setup.py 엔진은 실행 환경을 실시간으로 스캔합니다.

Venv Automation: 유저의 시스템에 적합한 가상환경(venv)을 생성하고 관리합니다.

Smart Sync: requirements.txt를 분석하여 미설치된 패키지만 선택적으로 설치, 시스템 자원을 최적화합니다.

3.2 Cross-Platform Abstraction Layer
Windows(run_mellowcat.bat)와 macOS(run_mellowcat.command)를 동시에 지원하는 이중 진입점 구조를 가집니다. 각 스크립트는 내부적으로 동일한 Python 코어를 호출하여 플랫폼에 관계없이 일관된 실행 결과를 보장합니다.

3.3 OpenClaw Integration
OpenClaw AI 에이전트 엔진과의 긴밀한 통합을 통해, 런처 실행 즉시 에이전트의 라이브사이클(Lifecycle)을 관리합니다. 이는 단순한 실행기(Runner)를 넘어 에이전트의 상태를 감시하는 관리자 역할을 수행합니다.

4. System Architecture (시스템 구조)
코드 스니펫
graph TD
    A[User Entry: .bat / .command] --> B{OS Detection}
    B --> C[Python Virtual Env Check]
    C -- Not Found --> D[Automatic Setup & Dependency Install]
    C -- Found --> E[Launch MellowCat Core]
    D --> E
    E --> F[Initialize OpenClaw Agent]
    F --> G[Active Session]
5. Roadmap & Future Vision (로드맵)
MellowCat은 단순한 런처를 넘어 AI 에이전트 허브로 진화할 계획입니다.

Phase 1 (Current): 안정적인 가상환경 구축 및 OpenClaw 실행 자동화.

Phase 2: GUI 기반의 설정 관리 도구 도입 (API Key 관리, 환경 설정 UI).

Phase 3: 다중 에이전트 지원 및 원격 배포(Docker 컨테이너화) 옵션 제공.

6. Conclusion (결론)
MellowCat은 오픈소스 AI 생태계의 대중화를 앞당기는 핵심 인프라 역할을 지향합니다. 복잡한 설정을 유저로부터 분리함으로써, 개발자와 사용자 모두가 본질적인 AI 경험에 집중할 수 있도록 돕습니다.*/}