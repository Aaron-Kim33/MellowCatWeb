import { Github, MessageCircle, Instagram, Mail, Send } from "lucide-react";

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "https://github.com/Aaron-Kim33/MellowCat", label: "GitHub" },
  { icon: <MessageCircle className="h-5 w-5" />, href: "https://discord.gg/eUFmjFME", label: "Discord" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.threads.com/@mellowcat2026", label: "Instagram" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:hi.mellowcat@gmail.com", label: "Email" },
  { icon: <Send className="h-5 w-5" />, href: "https://t.me/", label: "Telegram" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card soft-shadow flex items-center justify-center text-muted-foreground hover:text-primary hover:warm-glow transition-all"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 MellowCat 🐱 Open Source Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;
