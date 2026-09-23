import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolioLanguage } from "@/lib/portfolio-language";
import { links, projects } from "@/lib/portfolio";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const { language, t } = usePortfolioLanguage();

  return (
    <div className="portfolio-site">
      <Navbar />
      <main>
        <section className="portfolio-hero" id="home">
          <div className="portfolio-orbit portfolio-orbit-one" aria-hidden="true" />
          <div className="portfolio-orbit portfolio-orbit-two" aria-hidden="true" />
          <div className="portfolio-container portfolio-hero-content">
            <div className="portfolio-hero-copy">
              <p className="portfolio-eyebrow">{t.home.eyebrow}</p>
              <h1>{t.home.title}</h1>
              <p className="portfolio-lead">{t.home.lead}</p>
              <div className="portfolio-hero-actions">
                <Link to="/#projects" className="portfolio-button portfolio-button-solid">{t.home.viewProjects}<ArrowDownRight size={18} /></Link>
                <a href={links.email} className="portfolio-button portfolio-button-text">{t.home.contact}<ArrowUpRight size={18} /></a>
              </div>
            </div>
            <div className="portfolio-hero-art" aria-hidden="true">
              <div className="portfolio-hero-art-ring" />
              <div className="portfolio-hero-art-disc"><span>{"\u{1F431}"}</span></div>
              <span className="portfolio-art-note portfolio-art-note-one">01 / TOOL</span>
              <span className="portfolio-art-note portfolio-art-note-two">02 / GAME</span>
            </div>
          </div>
          <div className="portfolio-hero-bottom portfolio-container"><span>{t.home.portfolio}</span><span>01 — 02</span></div>
        </section>

        <section id="projects" className="portfolio-section portfolio-projects-section">
          <div className="portfolio-container">
            <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{t.home.projectsKicker}</p><h2>{t.home.projectsTitle}</h2></div><p>{t.home.projectsIntro}</p></div>
            <div className="portfolio-project-grid">
              {projects.map((project, index) => (
                <Link to={project.path} className={`portfolio-project-card ${project.id === "lumber-rush" ? "portfolio-project-forest" : "portfolio-project-launcher"}`} key={project.id}>
                  <div className="portfolio-card-top"><span>0{index + 1} / {project.eyebrow[language]}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
                  <div className={`portfolio-card-visual ${project.screenshot ? "portfolio-card-with-screen" : ""}`}>
                    <img src={project.image} alt={project.imageAlt[language]} loading="lazy" />
                    {project.screenshot && project.screenshotAlt && <img className="portfolio-card-screen" src={project.screenshot} alt={project.screenshotAlt[language]} loading="lazy" />}
                  </div>
                  <div className="portfolio-card-copy"><h3>{project.title}</h3><p>{project.summary[language]}</p><span className="portfolio-card-status">{project.status[language]}</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="portfolio-section portfolio-about-section">
          <div className="portfolio-container portfolio-about-grid"><p className="portfolio-eyebrow">{t.home.aboutKicker}</p><div><h2>{t.home.aboutTitle}</h2><p>{t.home.aboutBody}</p></div></div>
        </section>

        <section id="updates" className="portfolio-section portfolio-updates-section">
          <div className="portfolio-container"><div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{t.home.updatesKicker}</p><h2>{t.home.updatesTitle}</h2></div><p>{t.home.updatesIntro}</p></div>
            <div className="portfolio-update-list">
              {projects.map((project, index) => <Link key={project.id} to={project.path} className="portfolio-update-row"><span>0{index + 1}</span><strong>{project.title}</strong><p>{index === 0 ? t.home.updateLauncher : t.home.updateLumber}</p><ArrowUpRight size={19} aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>

        <section id="contact" className="portfolio-section portfolio-contact-section">
          <div className="portfolio-container portfolio-contact-grid"><div><p className="portfolio-eyebrow">{t.home.contactKicker}</p><h2>{t.home.contactTitle}</h2><p>{t.home.contactBody}</p></div><a href={links.email} className="portfolio-button portfolio-button-light">{t.home.email}<Mail size={18} /></a></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
