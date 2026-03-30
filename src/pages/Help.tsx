import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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

type HelpSection = {
  id: string;
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
  sections?: HelpSection[];
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
  sections = [],
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

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
                <div className="leading-relaxed text-muted-foreground">{section.body}</div>
              </section>
            ))}

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
    videoTitle="시연 영상"
    videoUrl="https://www.youtube.com/embed/JTCnBiHmqDs"
    overviewTitle="MellowCat이란?"
    overviewBody={<p>MellowCat은 사용자를 위한 서비스입니다. 자세한 내용은 곧 업데이트될 예정입니다.</p>}
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
                <strong>WSL 2 활성화</strong> - 설정에서 Linux용 Windows 하위 시스템을 켜주세요.
              </li>
              <li>
                <strong>가상화 VT-x 활성화</strong> - BIOS에서 Intel VT-x 또는 AMD-V를 활성화해주세요.
              </li>
              <li>
                <strong>Docker Desktop 설치</strong> - WSL 2 백엔드 사용을 권장합니다.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "런처 실행 방법 OS별",
        body: (
          <div className="space-y-2">
            <p>
              <strong>Windows:</strong> 설치 파일 실행 시 보안 경고가 뜨면 추가 정보 후 실행을 눌러주세요.
            </p>
            <p>
              <strong>macOS:</strong> 경고가 뜨면 파일을 우클릭한 뒤 열기를 선택해 관리자 권한으로 실행해주세요.
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
    description="ClaudeCode 설치, 연동, 트러블슈팅을 순서대로 찾아볼 수 있도록 정리한 도움말입니다."
    overviewTitle="ClaudeCode란?"
    overviewBody={
      <p>
        ClaudeCode Launcher는 ClaudeCode 실행 흐름을 더 간단하게 만들기 위한 런처입니다. 아래에서 로그인, 결제, 텔레그램 연동 같은
        자주 쓰는 설정을 번호와 주제별로 바로 찾아볼 수 있습니다.
      </p>
    }
    sections={[
      {
        id: "telegramAPI",
        title: "Telegram Bot Token API 및 Admin ID 설정",
        body: (
          <div className="space-y-4">
            <p>
              텔레그램 봇을 연동하려면 보통 두 가지가 필요합니다. 하나는 봇과 연결할 때 쓰는 <strong>Bot Token</strong>이고, 다른 하나는 봇이
              누구에게 메시지를 보낼지 구분하는 <strong>Admin ID 숫자 ID</strong>입니다.
            </p>

            <details className="rounded-lg border border-border bg-card/60 p-4">
              <summary className="cursor-pointer list-none font-medium text-foreground">1. 텔레그램 봇 토큰 API 받는 방법</summary>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="font-medium text-foreground">1) 텔레그램에서 @BotFather 찾기</h3>
                  <p>
                    텔레그램 검색창에 <code>@BotFather</code>를 입력하세요. 공식 봇이 나오면 들어갑니다. 링크로 열려면{" "}
                    <a className="text-primary underline underline-offset-4" href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer">
                      https://t.me/BotFather
                    </a>
                    를 사용해도 됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">2) /start 입력</h3>
                  <p>대화창에 <code>/start</code>를 입력하면 봇 생성과 관리 메뉴를 볼 수 있습니다.</p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">3) /newbot 입력</h3>
                  <p>
                    이제 <code>/newbot</code> 명령어를 입력하세요. BotFather가 새 봇을 만들 수 있게 단계별로 안내해줍니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">4) 봇 이름 입력</h3>
                  <p>
                    먼저 사람들이 보게 될 표시 이름을 정합니다. 예시: <code>MellowCat Alarm Bot</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">5) 봇 유저네임 입력</h3>
                  <p>
                    username은 영어, 숫자, 언더바 <code>_</code>를 쓸 수 있고 반드시 끝이 <code>bot</code>이어야 합니다. 예시:{" "}
                    <code>mellowcat_alarm_bot</code>, <code>MellowCatNotifyBot</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">6) 토큰 발급 확인</h3>
                  <p>
                    생성이 완료되면 <code>1234567890:AAExampleExampleExampleExample12345</code>처럼 긴 문자열이 나옵니다. 이 값이 바로 봇
                    토큰 API입니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">7) 프로그램 또는 .env에 저장</h3>
                  <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 text-xs text-foreground">
                    <code>TELEGRAM_BOT_TOKEN=1234567890:AAExampleExampleExampleExample12345</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">8) 주의사항</h3>
                  <p>
                    토큰은 비밀번호처럼 아주 중요합니다. 다른 사람에게 보내거나 GitHub, 커뮤니티, 스크린샷으로 공개하지 마세요. 유출된 것 같으면
                    @BotFather에서 토큰을 다시 발급받는 것이 안전합니다.
                  </p>
                </div>
              </div>
            </details>

            <details className="rounded-lg border border-border bg-card/60 p-4">
              <summary className="cursor-pointer list-none font-medium text-foreground">2. 관리자 ID 내 텔레그램 숫자 ID 찾는 방법</summary>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="font-medium text-foreground">준비물</h3>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>위에서 만든 봇 토큰</li>
                    <li>텔레그램에서 내 봇과 대화할 준비</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">1) 내 봇 열기</h3>
                  <p>BotFather가 만들어준 봇 링크를 열거나, 텔레그램 검색창에서 내 봇 아이디를 검색합니다.</p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">2) 봇과 대화 시작</h3>
                  <p>
                    채팅방에서 시작 버튼을 누르거나 <code>/start</code>, 혹은 아무 메시지나 하나 보내세요. 내가 먼저 말을 걸어야 내 정보가 들어옵니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">3) 브라우저에서 getUpdates 열기</h3>
                  <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 text-xs text-foreground">
                    <code>https://api.telegram.org/bot내봇토큰/getUpdates</code>
                  </pre>
                  <p>예를 들면 아래처럼 됩니다.</p>
                  <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 text-xs text-foreground">
                    <code>https://api.telegram.org/bot1234567890:AAExampleExampleExampleExample12345/getUpdates</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">4) JSON 결과에서 숫자 ID 찾기</h3>
                  <p>
                    결과 JSON에서 보통 <code>from.id</code> 또는 <code>chat.id</code>를 보면 됩니다. 개인 채팅에서는 보통 둘 다 같은 숫자입니다.
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 text-xs text-foreground">
                    <code>{`{
  "ok": true,
  "result": [
    {
      "message": {
        "from": { "id": 987654321 },
        "chat": { "id": 987654321 },
        "text": "/start"
      }
    }
  ]
}`}</code>
                  </pre>
                  <p>위 예시라면 관리자 ID는 <code>987654321</code>입니다.</p>
                </div>
              </div>
            </details>

            <details className="rounded-lg border border-border bg-card/60 p-4">
              <summary className="cursor-pointer list-none font-medium text-foreground">3. 어디 숫자를 쓰는지와 자주 헷갈리는 부분</summary>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="font-medium text-foreground">환경 변수 예시</h3>
                  <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 text-xs text-foreground">
                    <code>{`TELEGRAM_BOT_TOKEN=1234567890:AAExampleExampleExampleExample12345
TELEGRAM_ADMIN_ID=987654321`}</code>
                  </pre>
                  <p>
                    프로그램마다 <code>BOT_TOKEN</code>, <code>CHAT_ID</code>, <code>TELEGRAM_ID</code>처럼 이름이 다를 수 있지만 의미는 거의 같습니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">제일 많이 헷갈리는 부분</h3>
                  <ul className="ml-2 list-inside list-disc space-y-2">
                    <li>
                      <strong>관리자 ID는 username과 다릅니다.</strong> 예: <code>@mellowcat</code>가 아니라 <code>987654321</code> 같은 숫자를 넣어야 합니다.
                    </li>
                    <li>
                      <strong>봇 username을 관리자 ID 칸에 넣으면 안 됩니다.</strong> 숫자 ID가 필요합니다.
                    </li>
                    <li>
                      <strong>getUpdates에 내 메시지가 안 보이면</strong> 봇에게 먼저 <code>/start</code>를 보내세요.
                    </li>
                    <li>
                      <strong>chat not found</strong>는 관리자 ID가 틀렸거나, 봇에게 먼저 말을 안 걸었거나, 그룹 ID와 개인 ID를 헷갈린 경우가 많습니다.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">아주 쉬운 한 줄 요약</h3>
                  <p>
                    <code>@BotFather</code>에서 <code>/newbot</code>으로 봇 토큰을 받고, 내 봇 채팅방에서 <code>/start</code>를 보낸 뒤{" "}
                    <code>https://api.telegram.org/bot내토큰/getUpdates</code> 결과에서 <code>from.id</code> 또는 <code>chat.id</code> 숫자를 확인하면 됩니다.
                  </p>
                </div>
              </div>
            </details>
          </div>
        ),
      },
    ]}
    faqs={[
      {
        title: "어떻게 시작하나요?",
        body: <p>Download 메뉴에서 ClaudeCode 런처를 선택한 뒤 설치를 진행하면 됩니다.</p>,
      },
      {
        title: "어떤 운영체제를 지원하나요?",
        body: <p>현재 기준으로 Windows x64와 macOS Apple Silicon을 우선 지원하는 흐름으로 안내하고 있습니다.</p>,
      },
      {
        title: "설치 전 준비 사항이 있나요?",
        body: <p>ClaudeCode 계정 연결, 로컬 권한 승인, 런처 업데이트 확인 등의 절차가 필요할 수 있습니다.</p>,
      },
      {
        title: "문제가 생기면 어디서 확인하나요?",
        body: <p>추후 로그 확인, 재설치, 버전 확인, 지원 채널 안내를 계속 보강할 예정입니다.</p>,
      },
    ]}
  />
);

export default HelpRedirect;
