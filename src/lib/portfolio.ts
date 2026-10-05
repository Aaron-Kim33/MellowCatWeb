export type Language = "ko" | "en";
export type ProjectId = "mellowcat-launcher" | "lumber-rush";

export type Localized = Record<Language, string>;

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
      ko: "AI 워크플로우 실행부터 영상 편집까지 연결하는 데스크톱 도구",
      en: "A desktop workspace connecting AI workflows and video editing",
    },
    detail: {
      ko: "Claude Code와 MCP 패키지 실행을 바탕으로 소재 수집, 대본 생성, 음성·자막 편집, 영상 출력까지 이어지는 작업 공간을 만들고 있습니다. 타임라인 편집과 롱폼에서 숏폼 초안을 만드는 기능을 함께 다듬습니다.",
      en: "Built around Claude Code and MCP packages, this workspace connects source collection, script generation, voice and caption editing, and video export. Current work includes timeline editing and shortform drafts extracted from longform projects.",
    },
    status: { ko: "개발 중 · 배포 파일 제공", en: "In development · Downloads available" },
    highlights: [
      { ko: "Claude Code·MCP 실행과 콘텐츠 제작 흐름", en: "Claude Code, MCP, and content production workflows" },
      { ko: "영상·음성·자막을 다루는 타임라인 편집", en: "Timeline editing for video, voice, and captions" },
      { ko: "롱폼에서 숏폼 초안 추출과 저장", en: "Extracting and saving shortform drafts from longform" },
    ],
    process: [
      { ko: "생성된 소재를 수동으로 검토하고 편집할 수 있도록 연결했습니다.", en: "Connected generated materials to manual review and editing." },
      { ko: "재생 속도와 자막이 미리보기·출력에서 일치하도록 다듬고 있습니다.", en: "Aligning playback speed and captions between preview and export." },
      { ko: "저장된 숏폼 초안을 다시 열어 반복 생성과 AI 호출을 줄입니다.", en: "Reopening saved shortform drafts to reduce repeated generation and AI calls." },
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
    screenshot: "/media/lumber-rush-personal.png",
    screenshotAlt: { ko: "개발 중인 Lumber Rush 게임의 실제 플레이 화면", en: "Actual gameplay screen from the Lumber Rush development build" },
    eyebrow: { ko: "Android 게임 · Solana Mobile 대상", en: "Android game · Built for Solana Mobile" },
    title: "Lumber Rush",
    summary: {
      ko: "벌목과 수집, 장비 성장을 반복하는 모바일 게임",
      en: "A mobile game about chopping, collecting, and growing your gear",
    },
    detail: {
      ko: "나무를 길게 눌러 베고 떨어진 목재를 수레나 저장고로 모읍니다. 피로도를 관리하며 도끼와 보석을 키우고, 공동 숲·농장·다람쥐 탐험으로 성장 루프를 확장하고 있습니다. 지갑 로그인과 서버 저장을 연결한 해커톤 프리뷰를 공개했으며, Release 안내 기준 Solana Seeker에서 빌드와 테스트를 진행했습니다.",
      en: "Hold to chop trees and gather fallen logs into a trolley or storage. Fatigue, axes, and gems shape progression, alongside a shared forest, farming, and squirrel expeditions. The public hackathon preview connects wallet sign-in and server saves; its release notes report builds and tests on a Solana Seeker.",
    },
    status: { ko: "개발/테스트 중 · 정식 출시 전", en: "In development/testing · Not released" },
    highlights: [
      { ko: "홀드 벌목과 수레·저장고 수집", en: "Hold-to-chop and trolley or storage collection" },
      { ko: "피로도, 도끼 성장, 보석 옵션", en: "Fatigue, axe growth, and gem options" },
      { ko: "공동 숲·농장·다람쥐 탐험 프리뷰", en: "Shared forest, farming, and squirrel expedition preview" },
    ],
    process: [
      { ko: "벌목 후 목재를 직접 수집하는 짧은 플레이 루프를 만들었습니다.", en: "Built a short loop around chopping trees and manually collecting logs." },
      { ko: "피로도와 장비 성장으로 반복 플레이의 리듬을 조정하고 있습니다.", en: "Tuning repeat play through fatigue and equipment growth." },
      { ko: "공동 시설 성장과 탐험 보상을 연결하고, 테스트용 APK와 플레이 데모를 공개했습니다.", en: "Connected community facility growth to expedition rewards and published a preview APK and gameplay demo." },
    ],
    seoDescription: {
      ko: "Lumber Rush 개발 사례. Solana Mobile 대상 Android 게임의 벌목, 수집, 도끼 성장과 공동 숲 프리뷰를 소개합니다.",
      en: "Explore Lumber Rush, an Android game in development for Solana Mobile, with chopping, collection, upgrades, and a shared forest preview.",
    },
  },
];

export const copy = {
  ko: {
    nav: { projects: "프로젝트", about: "소개", updates: "개발 기록", contact: "연락처", product: "Launcher", download: "다운로드", help: "도움말", payment: "결제", account: "계정", login: "로그인", signup: "회원가입", logout: "로그아웃", menu: "메뉴 열기" },
    home: {
      eyebrow: "MELLOWCAT / INDEPENDENT PROJECTS",
      featuredLabel: "지금 가장 집중하는 프로젝트",
      title: "숲에서 시작되는 작은 성장 게임.",
      lead: "나무를 베고, 목재를 모아 도끼를 키웁니다. Lumber Rush는 Solana Mobile을 대상으로 개발 중인 Android 게임입니다. MellowCat은 이 게임과 함께 도구를 만드는 개인 개발 포트폴리오입니다.",
      leadMobile: "나무를 베고, 목재를 모아 도끼를 키우세요. Solana Mobile을 위한 Android 게임을 개발 중입니다.",
      viewFeatured: "Lumber Rush 살펴보기", viewProjects: "모든 프로젝트", screenshotCaption: "실제 개발 빌드 화면", heroFootnote: "개발 중인 게임과 도구",
      contact: "연락하기", projectsKicker: "SELECTED WORK", projectsTitle: "게임도, 도구도 직접 만듭니다.", projectsIntro: "Lumber Rush를 중심으로, AI 워크플로우를 돕는 Launcher도 함께 개발하고 있습니다.",
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
      eyebrow: "MELLOWCAT / INDEPENDENT PROJECTS",
      featuredLabel: "The project in focus",
      title: "A small growth game set in the forest.",
      lead: "Chop trees, collect logs, and grow your axe. Lumber Rush is an Android game in development for Solana Mobile. MellowCat is an independent portfolio of this game and the tools built alongside it.",
      leadMobile: "Chop trees, collect logs, and grow your axe. An Android game in development for Solana Mobile.",
      viewFeatured: "Explore Lumber Rush", viewProjects: "All projects", screenshotCaption: "Actual development build", heroFootnote: "Games and tools in progress",
      contact: "Get in touch", projectsKicker: "SELECTED WORK", projectsTitle: "Games and tools, made independently", projectsIntro: "Lumber Rush leads the way, alongside a Launcher that helps manage AI workflows.",
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
