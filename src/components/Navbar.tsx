import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "홈", href: "#home" },
  { label: "다운로드", href: "#home" },
  { label: "결제", href: "#payment" },
  { label: "기부", href: "#donate" },
  { label: "도움말", href: "/help", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="font-display font-bold text-xl text-primary flex items-center gap-2">
          🐱 MellowCat
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.isRoute ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            )
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navItems.map((item) =>
            item.isRoute ? (
              <button
                key={item.label}
                onClick={() => { handleNavClick(item); setOpen(false); }}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors w-full text-left"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
