import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolioLanguage } from "@/lib/portfolio-language";
import { links, projects } from "@/lib/portfolio";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectMedia from "@/components/ProjectMedia";
import { contentCopy, developmentNotes, experiments, gameplaySteps, launcherSteps } from "@/lib/portfolio-content";

export default function Index() {
  const { language, t } = usePortfolioLanguage();
  const c = contentCopy[language];
  const featuredProject = projects.find((project) => project.id === "lumber-rush")!;
  const homeProjects = [featuredProject, ...projects.filter((project) => project.id !== featuredProject.id)];

  return (
    <div className="portfolio-site">
      <Navbar />
      <main>
        <section className="portfolio-hero portfolio-game-hero" id="home">
          <div className="portfolio-container portfolio-hero-content">
            <div className="portfolio-hero-copy">
              <p className="portfolio-eyebrow">{t.home.eyebrow}</p>
              <div className="portfolio-hero-project-label">
                <img src={featuredProject.image} alt="" />
                <span>{t.home.featuredLabel}</span>
              </div>
              <h1>{featuredProject.title}</h1>
              <p className="portfolio-hero-tagline">{t.home.title}</p>
              <p className="portfolio-lead portfolio-lead-wide">{t.home.lead}</p>
              <p className="portfolio-lead portfolio-lead-compact">{t.home.leadMobile}</p>
              <p className="portfolio-hero-status"><span aria-hidden="true" />{featuredProject.status[language]}</p>
              <div className="portfolio-hero-actions">
                <Link to={featuredProject.path} className="portfolio-button portfolio-button-solid">{t.home.viewFeatured}<ArrowUpRight size={18} /></Link>
                <Link to="/#projects" className="portfolio-button portfolio-button-text">{t.home.viewProjects}<ArrowDownRight size={18} /></Link>
              </div>
            </div>
            <figure className="portfolio-hero-showcase">
              <div className="portfolio-hero-showcase-ring" aria-hidden="true" />
              <img className="portfolio-hero-game-icon" src={featuredProject.image} alt={featuredProject.imageAlt[language]} />
              {featuredProject.screenshot && featuredProject.screenshotAlt && <img className="portfolio-hero-game-screen" src={featuredProject.screenshot} alt={featuredProject.screenshotAlt[language]} fetchPriority="high" />}
              <figcaption>{t.home.screenshotCaption}</figcaption>
            </figure>
          </div>
          <div className="portfolio-hero-bottom portfolio-container"><span>{t.home.portfolio}</span><span>{t.home.heroFootnote}</span></div>
        </section>

        <ProjectMedia id="lumber-rush" compact />
        <div className="portfolio-container portfolio-gameplay-strip">
          {gameplaySteps.map((step, index) => <div key={index}><span>0{index + 1}</span><h3>{step.title[language]}</h3><p>{step.body[language]}</p></div>)}
        </div>

        <section id="projects" className="portfolio-section portfolio-projects-section">
          <div className="portfolio-container">
            <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{t.home.projectsKicker}</p><h2>{t.home.projectsTitle}</h2></div><p>{t.home.projectsIntro}</p></div>
            <div className="portfolio-project-grid">
              {homeProjects.map((project, index) => (
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

        <section className="portfolio-section portfolio-workflow-section">
          <div className="portfolio-container">
            <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{c.workflowKicker}</p><h2>{c.workflowTitle}</h2></div><p>{c.workflowIntro}</p></div>
            <ol className="portfolio-workflow-grid">{launcherSteps.map((step, index) => <li key={index}><span>0{index + 1}</span><h3>{step.title[language]}</h3><p>{step.body[language]}</p></li>)}</ol>
            <Link className="portfolio-workflow-link" to="/projects/mellowcat-launcher#mellowcat-launcher-media">{c.workflowLink}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="portfolio-section portfolio-experiments-section">
          <div className="portfolio-container">
            <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{c.experimentsKicker}</p><h2>{c.experimentsTitle}</h2></div><p>{c.experimentsIntro}</p></div>
            <div className="portfolio-experiment-grid">{experiments.map((item) => <article key={item.id} className="portfolio-experiment-card"><div className="portfolio-experiment-meta"><span>{item.number}</span><span>{item.category[language]}</span></div><h3>{item.title}</h3><p>{item.summary[language]}</p><ul className="portfolio-tech-tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><details><summary>{c.readMore}</summary><p>{item.body[language]}</p></details></article>)}</div>
          </div>
        </section>

        <section id="about" className="portfolio-section portfolio-about-section">
          <div className="portfolio-container portfolio-about-grid"><p className="portfolio-eyebrow">{t.home.aboutKicker}</p><div><h2>{t.home.aboutTitle}</h2><p>{t.home.aboutBody}</p></div></div>
        </section>

        <section id="updates" className="portfolio-section portfolio-updates-section">
          <div className="portfolio-container"><div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">{t.home.updatesKicker}</p><h2>{t.home.updatesTitle}</h2></div><p>{c.notesIntro}</p></div>
            <div className="portfolio-note-list">{developmentNotes.map((note) => <details key={note.id}><summary><span className="portfolio-note-project">{note.project}</span><span className="portfolio-note-heading"><strong>{note.title[language]}</strong><span>{note.summary[language]}</span></span><span className="portfolio-note-toggle" aria-hidden="true">+</span></summary><p>{note.body[language]}</p></details>)}</div>
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
