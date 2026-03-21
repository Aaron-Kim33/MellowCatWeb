import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

type DownloadLink = {
  label: string;
  href: string;
  external?: boolean;
};

type DownloadProductProps = {
  badge: string;
  title: string;
  description: string;
  links: DownloadLink[];
  note: string;
};

const DownloadProduct = ({ badge, title, description, links, note }: DownloadProductProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute top-24 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

        <section className="container relative z-10 mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card/80 p-8 soft-shadow backdrop-blur md:p-12">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              메인으로 돌아가기
            </Link>

            <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <span className="text-sm font-display font-semibold text-primary">{badge}</span>
            </div>

            <h1 className="mb-4 text-4xl font-display font-bold text-foreground md:text-5xl">{title}</h1>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              {links.map((link) => (
                <Button key={link.label} variant="hero" size="lg" className="h-14 text-base" asChild>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.external ? <ExternalLink className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">{note}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const OpenClawDownloadPage = () => (
  <DownloadProduct
    badge="OpenClaw Product"
    title="OpenClaw One-click Launcher"
    description="기존 메인 다운로드를 OpenClaw 전용 상품 페이지로 옮겼습니다. 운영체제에 맞는 설치 파일을 선택해서 바로 시작할 수 있습니다."
    links={[
      {
        label: "무료 다운로드 (Win)",
        href: "https://github.com/Aaron-Kim33/MellowCat/releases/latest/download/MellowCat_Win.exe",
      },
      {
        label: "무료 다운로드 (Mac)",
        href: "https://github.com/Aaron-Kim33/MellowCat/releases/latest/download/MellowCat_Mac.zip",
      },
    ]}
    note="Windows와 macOS를 모두 지원합니다."
  />
);

export const ClaudeCodeDownloadPage = () => (
  <DownloadProduct
    badge="ClaudeCode Product"
    title="ClaudeCode Launcher"
    description="ClaudeCode 전용 런처 다운로드 페이지입니다. 운영체제에 맞는 최신 설치 파일을 선택해서 바로 시작할 수 있습니다."
    links={[
      {
        label: "무료 다운로드 (Win)",
        href: "https://github.com/Aaron-Kim33/mellowcat-claude-v2/releases/latest/download/MellowCat-Claude-win-x64.exe",
      },
      {
        label: "무료 다운로드 (Mac)",
        href: "https://github.com/Aaron-Kim33/mellowcat-claude-v2/releases/latest/download/MellowCat-Claude-mac-arm64.dmg",
      },
    ]}
    note="현재는 GitHub latest 릴리스 경로로 연결되어 있습니다. 자산 파일명이 다음 버전에서도 유지되면 자동으로 최신 릴리스를 받게 됩니다."
  />
);

export default DownloadProduct;
