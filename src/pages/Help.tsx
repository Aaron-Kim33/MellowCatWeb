import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, Mail, MessageCircle, Send } from "lucide-react";
import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";

const contactLinks = [
  { icon: <MessageCircle className="h-5 w-5" />, href: "https://discord.gg/PQ4Evvqw", label: "Discord" },
  { icon: <span className="text-base font-bold leading-none">@</span>, href: "https://www.threads.com/@mellowcat_kr", label: "Threads" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/mellowcat_kr", label: "Instagram" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:hi.mellowcat@gmail.com", label: "Email" },
  { icon: <Send className="h-5 w-5" />, href: "https://web.telegram.org/a/#8601684253", label: "Telegram" },
];

type FAQItem = {
  title: string;
  body: ReactNode;
};

type HelpPageProps = {
  badge: string;
  title: string;
  description: string;
  videoTitle?: string;
  videoUrl?: string;
  overviewTitle: string;
  overviewBody: ReactNode;
  faqs: FAQItem[];
};

const HelpLayout = ({
  badge,
  title,
  description,
  videoTitle,
  videoUrl,
  overviewTitle,
  overviewBody,
  faqs,
}: HelpPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/#home">
              <ArrowLeft className="mr-2" /> 돌아가기
            </Link>
          </Button>

          <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <span className="text-sm font-display font-semibold text-primary">{badge}</span>
          </div>

          <h1 className="mb-3 font-display text-4xl font-bold text-primary">{title}</h1>
          <p className="mb-8 text-muted-foreground">{description}</p>

          <div className="space-y-8">
            {videoUrl && videoTitle && (
              <section>
                <h2 className="mb-3 text-2xl font-semibold">{videoTitle}</h2>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  원클릭 런처 사용 흐름과 기본 연결 과정을 확인할 수 있습니다.
                </p>
                <div className="relative w-full overflow-hidden rounded-lg border border-border" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={videoUrl}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-3 text-2xl font-semibold">{overviewTitle}</h2>
              <div className="leading-relaxed text-muted-foreground">{overviewBody}</div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">자주 묻는 질문</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.title} className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 font-medium">{faq.title}</h3>
                    <div className="text-sm text-muted-foreground">{faq.body}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">문의하기</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                추가 질문이 있으시면 언제든지 연락해주세요.
              </p>
              <div className="flex items-center gap-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:text-primary"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const HelpRedirect = () => <Navigate to="/help/openclaw" replace />;

export const OpenClawHelpPage = () => (
  <HelpLayout
    badge="OpenClaw Help"
    title="OpenClaw 도움말"
    description="기존 도움말 내용을 OpenClaw 전용 가이드로 정리했습니다."
    videoTitle="시현 영상"
    videoUrl="https://www.youtube.com/embed/JTCnBiHmqDs"
    overviewTitle="MellowCat이란?"
    overviewBody={
      <p>
        MellowCat은 사용자를 위한 서비스입니다. 자세한 내용은 곧 업데이트될 예정입니다.
      </p>
    }
    faqs={[
      {
        title: "어떻게 시작하나요?",
        body: <p>상단 Help 메뉴에서 OpenClaw 도움말로 들어오거나 Download 메뉴에서 OpenClaw 런처를 선택해 시작할 수 있습니다.</p>,
      },
      {
        title: "Windows에서 Docker 및 가상화 설정",
        body: (
          <div className="space-y-2">
            <p>MellowCat은 Docker 기반으로 동작하므로, Windows에서는 아래 설정이 필요합니다.</p>
            <ul className="ml-2 list-inside list-disc space-y-1">
              <li>
                <strong>WSL 2 활성화</strong> - 설정 → Windows 기능 켜기/끄기 → &quot;Linux용 Windows 하위 시스템&quot; 체크
              </li>
              <li>
                <strong>가상화(VT-x) 활성화</strong> - BIOS에서 Intel VT-x 또는 AMD-V를 활성화
              </li>
              <li>
                <strong>Docker Desktop 설치</strong> - WSL 2 백엔드 사용 권장
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "런처 실행 방법 (OS별)",
        body: (
          <div className="space-y-2">
            <p>
              <strong>Windows:</strong> 다운로드한 설치 파일을 실행하면 보안 경고가 뜰 수 있습니다. <em>&quot;추가 정보&quot;</em> →
              <em> &quot;실행&quot;</em>을 클릭하세요.
            </p>
            <p>
              <strong>macOS:</strong> 다운로드 후 앱을 열 때 경고가 뜨면, 파일을 <em>우클릭</em> → <em>&quot;열기&quot;</em>를 선택하여 관리자
              권한으로 실행하세요.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export const ClaudeCodeHelpPage = () => (
  <HelpLayout
    badge="ClaudeCode Help"
    title="ClaudeCode 도움말"
    description="ClaudeCode 전용 도움말 영역입니다. 아래 내용은 현재 목업 데이터입니다."
    overviewTitle="ClaudeCode란?"
    overviewBody={
      <p>
        ClaudeCode Launcher는 ClaudeCode 실행 흐름을 더 간단하게 만들기 위한 제품으로 가정한 목업 설명입니다. 실제 제품 안내,
        설치 요구사항, 연동 범위는 추후 정식 문서로 교체될 예정입니다.
      </p>
    }
    faqs={[
      {
        title: "어떻게 시작하나요?",
        body: <p>Download 메뉴에서 ClaudeCode 런처를 선택한 뒤 설치를 진행하는 흐름을 가정한 목업 안내입니다.</p>,
      },
      {
        title: "어떤 운영체제를 지원하나요?",
        body: <p>현재 목업 기준으로 Windows x64와 macOS Apple Silicon을 우선 지원하는 것으로 표시해두었습니다.</p>,
      },
      {
        title: "설치 전 준비 사항이 있나요?",
        body: <p>ClaudeCode 계정 연결, 로컬 권한 승인, 런처 업데이트 확인 등의 절차가 필요하다는 가상의 안내 문구를 넣어두었습니다.</p>,
      },
      {
        title: "문제가 생기면 어디서 확인하나요?",
        body: <p>차후 로그 확인, 재설치, 버전 확인, 지원 채널 안내가 들어갈 자리이며 지금은 임시 텍스트로 구성되어 있습니다.</p>,
      },
    ]}
  />
);

export default HelpRedirect;
