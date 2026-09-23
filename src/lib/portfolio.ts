export type Language = "ko" | "en";
export type ProjectId = "mellowcat-launcher" | "lumber-rush";

type Localized = Record<Language, string>;

export type Project = {
  id: ProjectId;
  path: string;
  image: string;
  imageAlt: Localized;
  screenshot?: string;
  screenshotAlt?: Localized;
  eyebrow: Localized;
  title: string;
  summary: Localized;
  detail: Localized;
  status: Localized;
  highlights: Localized[];
  process: Localized[];
  seoDescription: Localized;
};

export const links = {
  github: "https://github.com/Aaron-Kim33/mellowcat-claude-v2",
  email: "mailto:hi.mellowcat@gmail.com",
  instagram: "https://www.instagram.com/mellowcat_kr",
  threads: "https://www.threads.com/@mellowcat_kr",
  gameSite: "https://lumber.mellowcat.xyz",
} as const;

export const projects: Project[] = [
  {
    id: "mellowcat-launcher",
    path: "/projects/mellowcat-launcher",
    image: "/launcher-icon.png",
    imageAlt: { ko: "MellowCat Launcher 앱 아이콘", en: "MellowCat Launcher app icon" },
    eyebrow: { ko: "데스크톱 도구 · 대표 프로젝트", en: "Desktop tool · Featured project" },
    title: "MellowCat Launcher",
    summary: {
      ko: "AI 워크플로우를 설치하고 실행하며 관리하는 데스크톱 런처",
      en: "A desktop launcher for installing, running, and managing AI workflows",
    },
    detail: {
      ko: "복잡한 준비 과정을 줄이고 필요한 도구와 워크플로우에 빠르게 도달하도록 만든 프로젝트입니다. 웹 계정, 런처 로그인, 상품 구매 및 권한 확인 흐름도 연결되어 있습니다.",
      en: "Built to reduce setup steps and make tools and workflows easier to reach. It also connects web accounts, browser sign-in, product purchases, and access checks.",
    },
    status: { ko: "개발 중 · 배포 파일 제공", en: "In development · Downloads available" },
    highlights: [
      { ko: "Windows와 macOS용 설치 파일", en: "Windows and macOS installers" },
      { ko: "브라우저 기반 로그인과 런처 연결", en: "Browser sign-in linked to the launcher" },
      { ko: "상품 구매 후 권한 새로고침", en: "Purchase access and entitlement refresh" },
    ],
    process: [
      { ko: "설치와 실행 단계를 한 화면에서 찾도록 구성했습니다.", en: "Brought setup and launch steps into one place." },
      { ko: "웹 로그인과 런처 세션은 1회용 요청으로 연결합니다.", en: "Linked web sign-in and launcher sessions through one-time requests." },
      { ko: "다운로드, 도움말, 결제는 기존 웹 경로를 유지합니다.", en: "Kept existing download, help, and checkout routes available." },
    ],
    seoDescription: {
      ko: "MellowCat Launcher 개발 사례. AI 워크플로우 실행과 관리, 데스크톱 다운로드, 도움말과 계정 연동을 살펴보세요.",
      en: "Explore MellowCat Launcher, a desktop project for AI workflow setup, management, downloads, and account access.",
    },
  },
  {
    id: "lumber-rush",
    path: "/projects/lumber-rush",
    image: "/lumber-rush-icon.png",
    imageAlt: { ko: "Lumber Rush 게임 앱 아이콘", en: "Lumber Rush game app icon" },
    screenshot: "/lumber-rush-screen.png",
    screenshotAlt: { ko: "개발 중인 Lumber Rush 게임의 실제 플레이 화면", en: "Actual gameplay screen from the Lumber Rush development build" },
    eyebrow: { ko: "Android 게임 · Solana Mobile 대상", en: "Android game · Built for Solana Mobile" },
    title: "Lumber Rush",
    summary: {
      ko: "벌목과 수집, 장비 성장을 반복하는 모바일 게임",
      en: "A mobile game about chopping, collecting, and growing your gear",
    },
    detail: {
      ko: "나무를 탭해 공격하고 떨어진 목재를 드래그해 회수합니다. 피로도를 관리하며 도끼를 키우고 보석 옵션을 모으는 성장 루프를 실험하고 있습니다. 지갑 연결과 Devnet 기록도 테스트 단계입니다.",
      en: "Tap trees to attack and drag logs to collect them. The current build explores fatigue, axe upgrades, and gem options. Wallet connection and Devnet records are being tested.",
    },
    status: { ko: "개발/테스트 중 · 정식 출시 전", en: "In development/testing · Not released" },
    highlights: [
      { ko: "탭 공격과 드래그 수집", en: "Tap attacks and drag-to-collect logs" },
      { ko: "피로도, 도끼 성장, 보석 옵션", en: "Fatigue, axe growth, and gem options" },
      { ko: "지갑 연결 및 Devnet 기록 테스트", en: "Wallet connection and Devnet record tests" },
    ],
    process: [
      { ko: "탭 공격 후 목재를 직접 수집하는 짧은 플레이 루프를 만들었습니다.", en: "Built a short loop around tapping trees and manually collecting logs." },
      { ko: "피로도와 장비 성장으로 반복 플레이의 리듬을 조정하고 있습니다.", en: "Tuning repeat play through fatigue and equipment growth." },
      { ko: "Solana Mobile 지갑 연결과 Devnet 기록을 검증 중입니다.", en: "Validating Solana Mobile wallet connection and Devnet records." },
    ],
    seoDescription: {
      ko: "Lumber Rush 개발 사례. Solana Mobile 대상 Android 벌목 성장 게임의 탭 공격, 수집, 도끼 성장과 Devnet 테스트를 소개합니다.",
      en: "Explore Lumber Rush, an Android chopping game in development for Solana Mobile, with collection, upgrades, and Devnet testing.",
    },
  },
];

export const copy = {
  ko: {
    nav: { projects: "프로젝트", about: "소개", updates: "개발 기록", contact: "연락처", product: "Launcher", download: "다운로드", help: "도움말", payment: "결제", account: "계정", login: "로그인", signup: "회원가입", logout: "로그아웃", menu: "메뉴 열기" },
    home: {
      eyebrow: "INDEPENDENT DEVELOPMENT / 2026",
      title: "아이디어를 직접 만들고, 다듬고, 세상에 내놓습니다.",
      lead: "MellowCat은 작은 도구와 게임을 꾸준히 만드는 개인 개발 프로젝트입니다. 지금은 AI 워크플로우 런처와 숲을 무대로 한 모바일 게임을 개발하고 있습니다.",
      viewProjects: "프로젝트 보기", contact: "연락하기", projectsKicker: "SELECTED WORK", projectsTitle: "만들고 있는 것들", projectsIntro: "하나는 일을 시작하는 방식을, 다른 하나는 잠깐의 플레이를 다룹니다.",
      aboutKicker: "ABOUT", aboutTitle: "직접 만들고 끝까지 다듬습니다.", aboutBody: "기획에서 인터페이스, 구현, 배포까지 이어지는 작업을 좋아합니다. 사용자가 처음 만나는 화면과 그 뒤에서 실제로 돌아가는 흐름을 함께 설계합니다.",
      updatesKicker: "FIELD NOTES", updatesTitle: "개발 기록", updatesIntro: "확인된 작업만 기록합니다. 새 소식과 테스트 결과는 프로젝트 진행에 따라 갱신합니다.",
      contactKicker: "SAY HELLO", contactTitle: "이야기를 나눠요.", contactBody: "프로젝트, 협업, 피드백에 관한 이야기를 환영합니다.",
      email: "이메일 보내기", learnMore: "프로젝트 살펴보기", projectCount: "진행 중인 프로젝트", portfolio: "개인 개발 포트폴리오",
      updateLauncher: "Launcher의 브라우저 로그인과 다운로드 흐름을 연결했습니다.", updateLumber: "Lumber Rush의 벌목·수집 루프와 성장 시스템을 테스트 중입니다.",
    },
    project: { overview: "프로젝트 소개", features: "핵심 경험", process: "개발 포인트", links: "바로가기", back: "전체 프로젝트", download: "런처 다운로드", help: "도움말", payment: "상품 결제", github: "GitHub 저장소", gameNotice: "게임 전용 사이트는 공개 준비 중입니다. 플레이 또는 다운로드 링크는 준비되면 이곳에 안내합니다.", gameSite: "게임 사이트 예정", iconCaption: "실제 앱 아이콘", screenshotCaption: "개발 빌드의 실제 게임 화면", status: "현재 상태" },
    footer: { description: "도구와 게임을 만드는 개인 개발 프로젝트", rights: "MellowCat. Independent projects." },
  },
  en: {
    nav: { projects: "Projects", about: "About", updates: "Updates", contact: "Contact", product: "Launcher", download: "Download", help: "Help", payment: "Checkout", account: "Account", login: "Log in", signup: "Sign up", logout: "Log out", menu: "Open menu" },
    home: {
      eyebrow: "INDEPENDENT DEVELOPMENT / 2026",
      title: "Ideas, built and refined with care.",
      lead: "MellowCat is an independent home for small tools and games. Current work includes an AI workflow launcher and a mobile game set in a forest.",
      viewProjects: "Explore projects", contact: "Get in touch", projectsKicker: "SELECTED WORK", projectsTitle: "What I'm building", projectsIntro: "One project changes how work begins. The other makes room for a little play.",
      aboutKicker: "ABOUT", aboutTitle: "From first idea to working product.", aboutBody: "I enjoy working across product thinking, interface design, implementation, and shipping. I care about both the first screen people see and the systems that make it work.",
      updatesKicker: "FIELD NOTES", updatesTitle: "Development notes", updatesIntro: "Only confirmed work appears here. Progress and test results will be updated as the projects evolve.",
      contactKicker: "SAY HELLO", contactTitle: "Let's talk.", contactBody: "I'm open to project conversations, collaboration, and feedback.",
      email: "Send an email", learnMore: "Explore project", projectCount: "Projects in progress", portfolio: "Independent developer portfolio",
      updateLauncher: "Connected browser sign-in and download flows for the Launcher.", updateLumber: "Testing Lumber Rush's chopping, collection, and growth loop.",
    },
    project: { overview: "Overview", features: "Core experience", process: "Development notes", links: "Explore", back: "All projects", download: "Download Launcher", help: "Help", payment: "Product checkout", github: "GitHub repository", gameNotice: "The game site is being prepared. Play and download links will appear here when ready.", gameSite: "Game site planned", iconCaption: "Actual app icon", screenshotCaption: "Actual screen from the development build", status: "Current status" },
    footer: { description: "Independent tools and games", rights: "MellowCat. Independent projects." },
  },
} as const;
