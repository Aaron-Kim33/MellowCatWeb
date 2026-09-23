import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolioLanguage } from "@/lib/portfolio-language";
import { links, projects, type ProjectId } from "@/lib/portfolio";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectPage({ id }: { id: ProjectId }) {
  const { language, t } = usePortfolioLanguage();
  const project = projects.find((item) => item.id === id)!;
  const isGame = id === "lumber-rush";

  return (
    <div className={`portfolio-site portfolio-project-page ${isGame ? "portfolio-game-page" : "portfolio-launcher-page"}`}>
      <Navbar />
      <main>
        <section className="portfolio-detail-hero">
          <div className="portfolio-container">
            <Link to="/#projects" className="portfolio-back"><ArrowLeft size={16} />{t.project.back}</Link>
            <div className="portfolio-detail-grid">
              <div className="portfolio-detail-intro"><p className="portfolio-eyebrow">{project.eyebrow[language]}</p><h1>{project.title}</h1><p className="portfolio-detail-summary">{project.summary[language]}</p><span className="portfolio-status-pill">{project.status[language]}</span></div>
              <figure className={`portfolio-detail-visual ${project.screenshot ? "portfolio-detail-with-screen" : ""}`}>
                <img src={project.image} alt={project.imageAlt[language]} />
                {project.screenshot && project.screenshotAlt && <img className="portfolio-detail-screen" src={project.screenshot} alt={project.screenshotAlt[language]} />}
                <figcaption>{project.screenshot ? t.project.screenshotCaption : t.project.iconCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="portfolio-section portfolio-detail-body">
          <div className="portfolio-container portfolio-detail-content">
            <div><p className="portfolio-eyebrow">01 / {t.project.overview}</p><h2>{project.summary[language]}</h2><p className="portfolio-detail-paragraph">{project.detail[language]}</p></div>
            <div className="portfolio-detail-divider" />
            <div><p className="portfolio-eyebrow">02 / {t.project.features}</p><div className="portfolio-feature-list">{project.highlights.map((item, index) => <div key={index}><span>0{index + 1}</span><strong>{item[language]}</strong></div>)}</div></div>
            <div className="portfolio-detail-divider" />
            <div><p className="portfolio-eyebrow">03 / {t.project.process}</p><div className="portfolio-process-grid">{project.process.map((item, index) => <div key={index}><span>0{index + 1}</span><p>{item[language]}</p></div>)}</div></div>
            <div className="portfolio-detail-divider" />
            <div className="portfolio-detail-links"><div><p className="portfolio-eyebrow">04 / {t.project.links}</p><h2>{t.project.status}</h2><p>{project.status[language]}</p></div><div className="portfolio-link-stack">
              {isGame ? <div className="portfolio-game-notice"><strong>{t.project.gameSite}</strong><span>{t.project.gameNotice}</span></div> : <>
                <Link to="/download/launcher">{t.project.download}<ArrowUpRight size={18} /></Link>
                <Link to="/help/launcher">{t.project.help}<ArrowUpRight size={18} /></Link>
                <Link to="/payment">{t.project.payment}<ArrowUpRight size={18} /></Link>
                <a href={links.github} target="_blank" rel="noopener noreferrer">{t.project.github}<ArrowUpRight size={18} /></a>
              </>}
            </div></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
