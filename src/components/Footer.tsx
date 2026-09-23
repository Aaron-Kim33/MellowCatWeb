import { Github, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "@/lib/portfolio";
import { usePortfolioLanguage } from "@/lib/portfolio-language";

export default function Footer() {
  const { t } = usePortfolioLanguage();
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <div>
          <Link to="/" className="portfolio-footer-brand">MellowCat</Link>
          <p>{t.footer.description}</p>
        </div>
        <div className="portfolio-footer-links">
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          <a href={links.email} aria-label="Email"><Mail size={20} /></a>
        </div>
      </div>
      <div className="portfolio-footer-bottom">© {new Date().getFullYear()} {t.footer.rights}</div>
    </footer>
  );
}
