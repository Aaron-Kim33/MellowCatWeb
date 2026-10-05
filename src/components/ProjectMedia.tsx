import { ArrowUpRight, Film, Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";
import { usePortfolioLanguage } from "@/lib/portfolio-language";
import { contentCopy, lumberResources, projectMedia } from "@/lib/portfolio-content";
import type { Language, ProjectId } from "@/lib/portfolio";

function ProjectVideo({ id, language }: { id: ProjectId; language: Language }) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { video } = projectMedia[id];
  const c = contentCopy[language];

  if (video.youtubeId) {
    return playing ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
        title={`Lumber Rush — ${c.videoLabel}`}
        allow="encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    ) : (
      <button type="button" className="portfolio-video-launch" onClick={() => setPlaying(true)}>
        <Play size={38} aria-hidden="true" />
        <strong>{c.playDemo}</strong>
        <span>{c.youtubePrivacy}</span>
      </button>
    );
  }

  if (video.src && !failed) {
    return (
      <video controls playsInline preload="none" poster={video.poster ?? undefined} aria-label={c.videoLabel} onError={() => setFailed(true)}>
        <source src={video.src} />
        {Object.entries(video.captions ?? {}).map(([lang, src]) => (
          <track key={lang} kind="captions" src={src} srcLang={lang} label={lang === "ko" ? "한국어" : "English"} default={lang === language} />
        ))}
      </video>
    );
  }

  return (
    <div className="portfolio-media-pending">
      <Film size={32} strokeWidth={1.3} aria-hidden="true" />
      <strong>{failed ? c.mediaUnavailable : id === "lumber-rush" ? c.videoPending : c.launcherVideoPending}</strong>
      {!failed && <p>{c.pendingBody}</p>}
    </div>
  );
}

export default function ProjectMedia({ id, compact = false }: { id: ProjectId; compact?: boolean }) {
  const { language } = usePortfolioLanguage();
  const media = projectMedia[id];
  const c = contentCopy[language];

  return (
    <section id={`${id}-media`} className={`portfolio-section portfolio-media-section ${compact ? "portfolio-media-compact" : ""}`}>
      <div className="portfolio-container">
        <div className="portfolio-media-layout">
          <div className="portfolio-media-intro">
            <p className="portfolio-eyebrow">{c.mediaKicker}</p>
            <h2>{media.title[language]}</h2>
            <p>{media.description[language]}</p>
          </div>
          <div className="portfolio-video-frame">
            <ProjectVideo key={`${id}:${media.video.src}:${media.video.youtubeId}:${language}`} id={id} language={language} />
          </div>
        </div>
        {id === "lumber-rush" && <div className="portfolio-media-resources">
          <div className="portfolio-resource-links">{lumberResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer">{resource.label[language]}<ArrowUpRight size={17} aria-hidden="true" /></a>)}</div>
          <p>{c.previewNotice}</p>
          <p>{c.walletNotice}</p>
        </div>}
        {!compact && <div className="portfolio-screen-gallery">
          {media.screenshots.map((slot) => (
            <figure key={slot.id}>
              <div className="portfolio-screen-frame">
                {slot.src ? <a href={slot.src} target="_blank" rel="noopener noreferrer"><img src={slot.src} alt={`${slot.title[language]} — ${slot.caption[language]}`} loading="lazy" /></a> : <div className="portfolio-screen-pending"><ImageIcon size={28} strokeWidth={1.3} aria-hidden="true" /><span>{c.screenshotPending}</span></div>}
              </div>
              <figcaption><strong>{slot.title[language]}</strong><span>{slot.caption[language]}</span></figcaption>
            </figure>
          ))}
        </div>}
      </div>
    </section>
  );
}
