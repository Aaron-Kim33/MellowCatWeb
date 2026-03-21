import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Instagram, Mail, Send, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contactLinks = [
  { icon: <MessageCircle className="h-5 w-5" />, href: "https://discord.gg/PQ4Evvqw", label: "Discord" },
  { icon: <span className="text-base font-bold leading-none">@</span>, href: "https://www.threads.com/@mellowcat_kr", label: "Threads" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/mellowcat_kr", label: "Instagram" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:hi.mellowcat@gmail.com", label: "Email" },
  { icon: <Send className="h-5 w-5" />, href: "https://web.telegram.org/a/#8601684253", label: "Telegram" },
];

const Help = () => {
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

        <h1 className="font-display text-4xl font-bold text-primary mb-8">도움말</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">시현 영상</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              원클릭 런처로 텔레그램, 디스코드에 연동하는 방법을 확인하세요.
            </p>
            <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/JTCnBiHmqDs"
                title="MellowCat 시현 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">MellowCat이란?</h2>
            <p className="text-muted-foreground leading-relaxed">
              MellowCat은 사용자를 위한 서비스입니다. 자세한 내용은 곧 업데이트될 예정입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">자주 묻는 질문</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-1">어떻게 시작하나요?</h3>
                <p className="text-sm text-muted-foreground">홈 페이지에서 다운로드 버튼을 눌러 시작할 수 있습니다.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Windows에서 Docker 및 가상화 설정</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>MellowCat은 Docker 기반으로 동작하므로, Windows에서는 아래 설정이 필요합니다.</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>WSL 2 활성화</strong> — 설정 → Windows 기능 켜기/끄기 → "Linux용 Windows 하위 시스템" 체크</li>
                    <li><strong>가상화(VT-x) 활성화</strong> — BIOS에서 Intel VT-x 또는 AMD-V를 활성화</li>
                    <li><strong>Docker Desktop 설치</strong> — WSL 2 백엔드 사용 권장</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">런처 실행 방법 (OS별)</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>🪟 Windows:</strong> 다운로드한 설치 파일을 실행하면 보안 경고가 뜰 수 있습니다. <em>"추가 정보"</em> → <em>"실행"</em>을 클릭하세요.</p>
                  <p><strong>🍎 macOS:</strong> 다운로드 후 앱을 열 때 경고가 뜨면, 파일을 <em>우클릭</em> → <em>"열기"</em>를 선택하여 관리자 권한으로 실행하세요.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">문의하기</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              추가 질문이 있으시면 언제든지 연락해주세요.
            </p>
            <div className="flex items-center gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;