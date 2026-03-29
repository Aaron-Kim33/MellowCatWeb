import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "홈", href: "/#home" },
  { label: "결제", href: "/payment", isRoute: true },
  { label: "기부", href: "/#donate" },
  { label: "백서", href: "/whitepaper", isRoute: true },
];

const downloadItems = [
  {
    label: "OpenClaw",
    description: "One-click Launcher",
    href: "/download/openclaw",
  },
  {
    label: "ClaudeCode",
    description: "Launcher",
    href: "/download/claudecode",
  },
];

const helpItems = [
  {
    label: "OpenClaw",
    description: "Product Help",
    href: "/help/openclaw",
  },
  {
    label: "ClaudeCode",
    description: "Product Help",
    href: "/help/claudecode",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDownloadsOpen, setMobileDownloadsOpen] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/#home" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          MellowCat
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, 1).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Download
              <ChevronDown className="h-4 w-4" />
            </button>

            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur">
                {downloadItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Help
              <ChevronDown className="h-4 w-4" />
            </button>

            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur">
                {helpItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navItems.slice(1).map((item) =>
            item.isRoute ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <a
            href="/#home"
            className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            홈
          </a>

          <button
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={() => setMobileDownloadsOpen(!mobileDownloadsOpen)}
          >
            Download
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileDownloadsOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileDownloadsOpen && (
            <div className="mb-2 rounded-2xl border border-border bg-card/70 p-2">
              {downloadItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          )}

          <button
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={() => setMobileHelpOpen(!mobileHelpOpen)}
          >
            Help
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileHelpOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileHelpOpen && (
            <div className="mb-2 rounded-2xl border border-border bg-card/70 p-2">
              {helpItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          )}

          {navItems.slice(1).map((item) =>
            item.isRoute ? (
              <button
                key={item.label}
                onClick={() => {
                  handleNavClick(item);
                  setOpen(false);
                }}
                className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ),
          )}

          <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
            <Button variant="ghost" asChild>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
