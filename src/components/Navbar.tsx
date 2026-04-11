import { getCurrentUser, logoutCurrentUser, type CurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "홈", href: "/#home" },
  { label: "결제", href: "/payment", isRoute: true },
  { label: "Download", href: "/download/launcher", isRoute: true },
  { label: "Help", href: "/help/launcher", isRoute: true },
  { label: "기부", href: "/#donate" },
  { label: "백서", href: "/whitepaper", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authBusy, setAuthBusy] = useState(true);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item: typeof navItems[number]) => {
    if (item.isRoute) {
      navigate(item.href);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      const user = await getCurrentUser();
      if (cancelled) {
        return;
      }

      setCurrentUser(user);
      setAuthBusy(false);
    };

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Account";

  const handleLogout = async () => {
    setLogoutBusy(true);
    await logoutCurrentUser();
    setCurrentUser(null);
    setLogoutBusy(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/#home" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <span role="img" aria-label="Cat">
            {"\u{1F431}"}
          </span>
          MellowCat
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
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
          {authBusy ? null : currentUser ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/account">{displayName}</Link>
              </Button>
              <Button variant="hero-outline" onClick={handleLogout} disabled={logoutBusy}>
                {logoutBusy ? "Logging out..." : "Log out"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navItems.map((item) =>
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

          {!authBusy && (
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              {currentUser ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/account" onClick={() => setOpen(false)}>
                      {displayName}
                    </Link>
                  </Button>
                  <Button variant="hero-outline" onClick={handleLogout} disabled={logoutBusy}>
                    {logoutBusy ? "Logging out..." : "Log out"}
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
