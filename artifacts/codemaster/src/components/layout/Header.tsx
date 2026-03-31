import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@workspace/replit-auth-web";
import { Menu, X, User, ChevronRight, Sun, Moon, Monitor, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import logoImg from "@assets/image_1774885839551.webp";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [location] = useLocation();
  const { user, login } = useAuth();
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = () => setShowThemeMenu(false);
    if (showThemeMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showThemeMenu]);

  const navLinks = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.process"), href: "/#process" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const themeIcons: Record<Theme, React.ReactNode> = {
    dark: <Moon className="w-4 h-4" />,
    light: <Sun className="w-4 h-4" />,
    grey: <Monitor className="w-4 h-4" />,
  };

  const themes: { key: Theme; label: string }[] = [
    { key: "dark", label: t("theme.dark") },
    { key: "light", label: t("theme.light") },
    { key: "grey", label: t("theme.grey") },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="CodeMaster Logo" 
              className="w-10 h-10 object-contain rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[var(--shadow-neon)] transition-all duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center font-bold text-primary">CM</div>');
              }}
            />
            <span className="font-display font-bold text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">
              CodeMaster
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "pl" ? "en" : "pl")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all border border-transparent hover:border-border"
              title={lang === "pl" ? "Switch to English" : "Zmień na Polski"}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "pl" ? "EN" : "PL"}
            </button>

            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowThemeMenu(!showThemeMenu); }}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all border border-transparent hover:border-border"
                title={t("theme." + theme)}
              >
                {themeIcons[theme]}
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl glass-card border border-border shadow-xl py-1 z-50" onClick={(e) => e.stopPropagation()}>
                  {themes.map((th) => (
                    <button
                      key={th.key}
                      onClick={() => { setTheme(th.key); setShowThemeMenu(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        theme === th.key ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {themeIcons[th.key]}
                      {th.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-all">
                <Avatar imageUrl={user.profileImageUrl} name={user.firstName || user.email || 'U'} />
                <span className="text-sm font-medium">{user.firstName || t("nav.panel")}</span>
              </Link>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={login}
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4 mr-2" />
                {t("nav.login")}
              </Button>
            )}
            <a href="/#contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-neon)] rounded-full px-6">
                {t("nav.projectQuote")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === "pl" ? "en" : "pl")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-all text-xs font-bold"
            >
              {lang === "pl" ? "EN" : "PL"}
            </button>
            <button 
              onClick={() => { setTheme(theme === "dark" ? "light" : theme === "light" ? "grey" : "dark"); }}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-all"
            >
              {themeIcons[theme]}
            </button>
            <button 
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-panel border-t border-border p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-base font-medium text-foreground p-3 hover:bg-secondary/50 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-border my-2" />
          {user ? (
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3">
              <Avatar imageUrl={user.profileImageUrl} name={user.firstName || user.email || 'U'} />
              <span className="font-medium">{t("nav.myProfile")}</span>
            </Link>
          ) : (
            <Button variant="outline" className="w-full justify-start" onClick={() => { login(); setMobileMenuOpen(false); }}>
              <User className="w-4 h-4 mr-2" />
              {t("nav.login")}
            </Button>
          )}
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full bg-primary text-white">{t("nav.startProject")}</Button>
          </a>
        </div>
      )}
    </header>
  );
}

function Avatar({ imageUrl, name }: { imageUrl?: string | null, name: string }) {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className="w-6 h-6 rounded-full object-cover" />;
  }
  return (
    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold uppercase">
      {name.charAt(0)}
    </div>
  );
}
