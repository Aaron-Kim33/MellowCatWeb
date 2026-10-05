import type { Language, Localized, ProjectId } from "./portfolio";

export type MediaSlot = {
  id: string;
  title: Localized;
  caption: Localized;
  src: string | null;
};

export type ProjectMediaData = {
  title: Localized;
  description: Localized;
  video: { src: string | null; poster: string | null; youtubeId?: string; captions?: Partial<Record<Language, string>> };
  screenshots: MediaSlot[];
};

// Add public/media file paths here once approved footage and screenshots are ready.
export const projectMedia: Record<ProjectId, ProjectMediaData> = {
  "lumber-rush": {
    title: { ko: "숲이 자라는 순간들", en: "Moments of a growing forest" },
    description: { ko: "벌목부터 수집, 성장까지. Lumber Rush 해커톤 프리뷰의 실제 플레이 데모를 살펴보세요.", en: "From chopping to collection and growth. Watch actual gameplay from the Lumber Rush hackathon preview." },
    video: { src: null, poster: null, youtubeId: "OJtHmIFAJ9s" },
    screenshots: [
      { id: "farm", title: { ko: "농장", en: "Sapling farm" }, caption: { ko: "묘목을 키워 숲에 옮겨 심고 카르마를 모읍니다.", en: "Grow saplings, transplant them into the forest, and earn karma." }, src: "/media/lumber-rush-farm.png" },
      { id: "personal-forest", title: { ko: "개인 숲", en: "Personal forest" }, caption: { ko: "나무를 베고 목재를 수레와 저장고로 모으며 성장합니다.", en: "Chop trees, gather wood into your trolley and storage, and grow." }, src: "/media/lumber-rush-personal.png" },
      { id: "shared-forest", title: { ko: "공동 숲", en: "Community forest" }, caption: { ko: "자재를 기여해 광산과 묘목 길 등 공동 시설을 키웁니다.", en: "Contribute materials to grow shared facilities such as the mine and sapling path." }, src: "/media/lumber-rush-community.png" },
      { id: "world-boss", title: { ko: "월드 보스", en: "World boss" }, caption: { ko: "고목 보스에 도전하고 공동 피해량과 주간 참여 보상을 확인합니다.", en: "Challenge the ancient tree boss and track community damage and weekly participation rewards." }, src: "/media/lumber-rush-world-boss.png" },
    ],
  },
  "mellowcat-launcher": {
    title: { ko: "아이디어가 영상이 되기까지", en: "From an idea to a video" },
    description: { ko: "소재와 대본을 검토하고, 영상과 자막을 다듬는 실제 작업 공간을 소개합니다.", en: "A look at the workspace for reviewing sources and scripts, then editing video and captions." },
    video: { src: null, poster: null },
    screenshots: [
      { id: "sources", title: { ko: "소재와 대본", en: "Sources and scripts" }, caption: { ko: "생성 결과를 검토하고 수정하는 화면", en: "Reviewing and editing generated material" }, src: null },
      { id: "timeline", title: { ko: "타임라인 편집", en: "Timeline editor" }, caption: { ko: "영상·음성·자막을 함께 편집", en: "Editing video, voice, and captions together" }, src: null },
      { id: "shortform", title: { ko: "숏폼 작업", en: "Shortform workflow" }, caption: { ko: "롱폼에서 추출한 초안과 출력", en: "Drafts extracted from longform and export" }, src: null },
    ],
  },
};

export const lumberResources = [
  { id: "demo", url: "https://www.youtube.com/watch?v=OJtHmIFAJ9s", label: { ko: "YouTube 데모 보기", en: "Watch on YouTube" } },
  { id: "deck", url: "https://drive.google.com/file/d/1VpNFQkKhMwFTgm_A3vLV12bt_y9zfo0M/view", label: { ko: "소개 덱 · PDF", en: "Project deck · PDF" } },
  { id: "source", url: "https://github.com/Aaron-Kim33/solana_hackathon", label: { ko: "GitHub 소스 코드", en: "Source on GitHub" } },
  { id: "apk", url: "https://github.com/Aaron-Kim33/solana_hackathon/releases/tag/preview-2026-10-05", label: { ko: "Android APK · 테스트 빌드", en: "Android APK · Preview build" } },
];

export const gameplaySteps = [
  { title: { ko: "베고", en: "Chop" }, body: { ko: "길게 눌러 고목을 베며 숲에서의 하루를 시작합니다.", en: "Hold to chop an ancient tree and start your day in the forest." } },
  { title: { ko: "모으고", en: "Collect" }, body: { ko: "떨어진 목재를 수레와 저장고로 직접 옮깁니다.", en: "Move fallen logs into a trolley or storage yourself." } },
  { title: { ko: "키우고", en: "Grow" }, body: { ko: "도끼를 성장시키고 공동 숲과 탐험으로 나아갑니다.", en: "Grow your axe and explore the shared forest and expeditions." } },
];

export const launcherSteps = [
  { title: { ko: "소재 수집", en: "Collect sources" }, body: { ko: "주제를 모으고 사용할 자료를 검토합니다.", en: "Gather topics and review source materials." } },
  { title: { ko: "대본 생성", en: "Build a script" }, body: { ko: "AI가 만든 초안을 읽고 직접 수정합니다.", en: "Review and edit an AI-generated draft." } },
  { title: { ko: "영상 편집", en: "Edit the video" }, body: { ko: "타임라인에서 영상·음성·자막을 다듬습니다.", en: "Refine video, voice, and captions on the timeline." } },
  { title: { ko: "숏폼과 출력", en: "Shortform and export" }, body: { ko: "롱폼의 소재를 재사용해 숏폼 초안을 만듭니다.", en: "Reuse longform assets to create shortform drafts." } },
];

export const experiments = [
  {
    id: "findyourjob", title: "FindYourJob", number: "03", category: { ko: "AI 서비스 프로토타입", en: "AI service prototype" },
    summary: { ko: "지금 가능한 진로와 다음 행동을 찾는 도구", en: "A tool for finding realistic career paths and next steps" },
    body: { ko: "사용자의 경험을 바탕으로 직무 3개, 시장 데이터와 실행 로드맵을 만드는 웹·API 프로토타입입니다. 유사 입력을 재사용하는 구조와 결과 공유 화면을 구현했습니다.", en: "A web and API prototype producing three role suggestions, market data, and an action roadmap from a user's experience. It implements similar-input reuse and shareable reports." },
    tags: ["Next.js", "Fastify", "pgvector"],
  },
  {
    id: "bibot", title: "Bibot", number: "04", category: { ko: "데이터 연구 · 자동화", en: "Data research · Automation" },
    summary: { ko: "시장 데이터를 모으고 가설을 검증하는 작업 공간", en: "A workspace for collecting market data and testing hypotheses" },
    body: { ko: "신규 상장 선물 데이터를 수집하고 시간 순서에 따른 백테스트를 구현했습니다. 1시간봉 후보를 1분봉으로 재검증하고, 운영 상태 보고와 Telegram 연동을 다듬었습니다. 데이터의 한계와 검증 방법을 중심으로 정리한 연구·도구 개발 사례입니다.", en: "Collects newly listed futures data and runs time-ordered backtests. Hourly candidates are replayed with minute candles, alongside work on operational reports and Telegram integration. This research and tooling case focuses on data limitations and validation methods." },
    tags: ["Python", "Backtesting", "Telegram"],
  },
];

export const developmentNotes = [
  { id: "forest-growth", project: "Lumber Rush", title: { ko: "공동 숲의 성장을 어떻게 보여줄까", en: "Making shared forest growth visible" }, summary: { ko: "자재 기여가 시설 성장과 탐험 보상으로 이어지는 흐름", en: "Connecting material contributions, facility growth, and expedition rewards" }, body: { ko: "공동 시설의 단계와 다음 성장 조건을 보여주고, 시설 레벨이 다람쥐 탐험 보상에 미치는 영향을 안내하도록 프리뷰를 다듬었습니다. 실제 기기에서의 가시성과 플레이 감각은 검수 단계입니다.", en: "The preview shows community facility stages and growth requirements, and explains how facility levels affect squirrel expedition rewards. Visibility and play feel still need real-device validation." } },
  { id: "preview-export", project: "MellowCat Launcher", title: { ko: "미리보기와 출력이 같아야 하는 이유", en: "Why preview and export need to match" }, summary: { ko: "재생 속도·자막·미디어 타이밍을 함께 다루는 편집기", en: "An editor that coordinates playback speed, captions, and media timing" }, body: { ko: "영상 속도가 바뀌면 클립 길이뿐 아니라 뒤에 오는 장면·자막·음성의 타이밍도 영향을 받습니다. 편집기의 미리보기와 FFmpeg 출력이 같은 기준을 쓰도록 다듬고, 저장된 숏폼 초안을 다시 열 수 있게 했습니다.", en: "Changing video speed affects clip duration and the timing of later scenes, captions, and audio. Work aligns editor preview with FFmpeg export and makes saved shortform drafts reusable." } },
  { id: "minute-validation", project: "Bibot", title: { ko: "1시간봉 결과를 1분봉으로 다시 검증하기", en: "Rechecking hourly results with minute candles" }, summary: { ko: "결과보다 사건의 순서가 중요했던 백테스트", en: "A backtest where event order mattered more than the final price" }, body: { ko: "같은 캔들 안에서 진입과 청산 조건이 모두 발생하면 순서를 알기 어렵습니다. 보수적인 시간 순서 규칙으로 후보를 탐색한 뒤, 최종 후보를 1분봉으로 재생해 더 세밀한 데이터에서 결과가 어떻게 달라지는지 확인했습니다.", en: "When entry and liquidation conditions occur within one candle, their order is uncertain. Candidates were explored using conservative event-order rules, then replayed with minute candles to examine how finer data changes the results." } },
  { id: "report-reuse", project: "FindYourJob", title: { ko: "비슷한 입력의 결과를 재사용하기", en: "Reusing reports for similar inputs" }, summary: { ko: "AI 호출과 추천 결과 저장을 함께 설계한 프로토타입", en: "A prototype connecting AI calls and stored recommendations" }, body: { ko: "입력 임베딩과 pgvector를 이용해 유사한 리포트를 찾는 구조를 만들었습니다. 재사용 기준과 생성 실패 시 대체 흐름을 두고, 직무 추천부터 실행 계획까지 공통 스키마로 연결했습니다.", en: "Input embeddings and pgvector find similar reports. Reuse criteria and fallback generation connect role suggestions and action plans through a shared schema." } },
];

export const contentCopy = {
  ko: {
    playDemo: "플레이 데모 재생", youtubePrivacy: "재생을 누르면 YouTube 플레이어가 로드됩니다.", previewNotice: "2026-10-05 해커톤 프리뷰 · 정식 출시 전 테스트 빌드입니다. APK 파일과 설치 안내는 GitHub Release에서 확인하세요.", walletNotice: "게임 지갑은 MellowCat 웹 계정과 별개입니다. 성장 기록을 남기는 선택적 Mainnet Memo에는 SOL 네트워크 수수료가 발생하며, 건너뛰어도 플레이할 수 있습니다.",
    mediaKicker: "실제 플레이와 작업 화면", videoPending: "플레이 영상 준비 중", launcherVideoPending: "작업 영상 준비 중", pendingBody: "실제 촬영 영상을 준비하고 있습니다. 준비되면 이곳에서 볼 수 있습니다.", screenshotPending: "새 화면 준비 중", videoLabel: "프로젝트 영상", mediaUnavailable: "영상을 불러오지 못했습니다. 잠시 후 다시 확인해주세요.",
    workflowKicker: "MellowCat Launcher", workflowTitle: "소재에서 완성된 영상까지", workflowIntro: "AI가 만든 초안을 직접 검토하고 편집하는 콘텐츠 제작 흐름입니다.", workflowLink: "Launcher 제작 과정 보기",
    experimentsKicker: "다른 작업들", experimentsTitle: "작은 실험도 계속합니다.", experimentsIntro: "AI 서비스와 데이터 분석 도구를 만들며 쌓은 경험입니다.", readMore: "개발 내용 펼치기", notesIntro: "만들며 마주친 문제와 해결 과정을 짧게 기록합니다.",
  },
  en: {
    playDemo: "Play gameplay demo", youtubePrivacy: "Playing loads the YouTube player.", previewNotice: "2026-10-05 hackathon preview · A test build, not a full release. Find the APK and installation instructions on GitHub Releases.", walletNotice: "The game wallet is separate from your MellowCat web account. An optional Mainnet Memo for growth milestones requires a SOL network fee; skipping it does not block gameplay.",
    mediaKicker: "Gameplay and workspace", videoPending: "Gameplay video in preparation", launcherVideoPending: "Workflow video in preparation", pendingBody: "Actual footage is being prepared. It will be available here when ready.", screenshotPending: "New screen in preparation", videoLabel: "Project video", mediaUnavailable: "The video could not be loaded. Please check again later.",
    workflowKicker: "MellowCat Launcher", workflowTitle: "From source to finished video", workflowIntro: "A content workflow for reviewing and editing AI-generated drafts yourself.", workflowLink: "Explore the Launcher workflow",
    experimentsKicker: "Other work", experimentsTitle: "Room for smaller experiments", experimentsIntro: "Experience from building AI services and data analysis tools.", readMore: "Read development details", notesIntro: "Short notes on the problems encountered and the decisions made while building.",
  },
} satisfies Record<Language, Record<string, string>>;
