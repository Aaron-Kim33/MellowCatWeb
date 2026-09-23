import { getCurrentUser, logoutCurrentUser, type CurrentUser } from "@/lib/auth";
import { usePortfolioLanguage } from "@/lib/portfolio-language";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { language, setLanguage, t } = usePortfolioLanguage();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authBusy, setAuthBusy] = useState(true);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    void getCurrentUser().then((user) => {
      if (active) {
        setCurrentUser(user);
        setAuthBusy(false);
      }
    });
    return () => { active = false; };
  }, []);

  const logout = async () => {
    setLogoutBusy(true);
    const success = await logoutCurrentUser();
    setLogoutBusy(false);
    if (success) {
      setCurrentUser(null);
      setOpen(false);
      navigate("/");
    }
  };

  const navLinks = [
    { label: t.nav.projects, to: "/#projects" },
    { label: t.nav.about, to: "/#about" },
    { label: t.nav.updates, to: "/#updates" },
    { label: t.nav.contact, to: "/#contact" },
  ];
  const productLinks = [
    { label: "MellowCat Launcher", to: "/projects/mellowcat-launcher" },
    { label: t.nav.download, to: "/download/launcher" },
    { label: t.nav.help, to: "/help/launcher" },
    { label: t.nav.payment, to: "/payment" },
  ];
  const accountName = currentUser?.displayName || currentUser?.email?.split("@")[0] || t.nav.account;

  return (
    <header className="portfolio-nav">
      <div className="portfolio-nav-inner">
        <Link to="/" className="portfolio-brand" onClick={() => setOpen(false)}>
          <span className="portfolio-brand-mark" aria-hidden="true">{"\u{1F431}"}</span>
          <span>MellowCat</span>
        </Link>

        <nav aria-label="Primary" className="portfolio-nav-links">
          {navLinks.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          <div className="portfolio-menu-group">
            <button type="button" className="portfolio-menu-trigger" aria-label={t.nav.product}>
              {t.nav.product}<ChevronDown size={15} aria-hidden="true" />
            </button>
            <div className="portfolio-menu-panel">
              {productLinks.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
            </div>
          </div>
        </nav>

        <div className="portfolio-nav-actions">
          <div className="portfolio-language" role="group" aria-label="Language">
            <button type="button" className={language === "ko" ? "active" : ""} onClick={() => setLanguage("ko")} aria-pressed={language === "ko"}>KO</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          {!authBusy && (currentUser ? (
            <>
              <Link to="/account" className="portfolio-account-link">{accountName}</Link>
              <button type="button" className="portfolio-logout" onClick={logout} disabled={logoutBusy}>{t.nav.logout}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="portfolio-account-link">{t.nav.login}</Link>
              <Link to="/signup" className="portfolio-nav-signup">{t.nav.signup}</Link>
            </>
          ))}
        </div>

        <button type="button" className="portfolio-mobile-toggle" aria-expanded={open} aria-label={t.nav.menu} onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && (
        <nav className="portfolio-mobile-menu" aria-label="Mobile">
          {navLinks.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <span className="portfolio-mobile-label">{t.nav.product}</span>
          {productLinks.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <div className="portfolio-mobile-language">
            <button type="button" onClick={() => setLanguage("ko")} aria-pressed={language === "ko"}>한국어</button>
            <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>English</button>
          </div>
          {!authBusy && (currentUser ? (
            <>
              <Link to="/account" onClick={() => setOpen(false)}>{accountName}</Link>
              <button type="button" onClick={logout} disabled={logoutBusy}>{t.nav.logout}</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>{t.nav.login}</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>{t.nav.signup}</Link>
            </>
          ))}
        </nav>
      )}
    </header>
  );
}
