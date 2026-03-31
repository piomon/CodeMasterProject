import { Link } from "wouter";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImg from "@assets/image_1774885839551.webp";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src={logoImg} alt="CodeMaster" className="w-8 h-8 rounded-lg object-contain" 
                   onError={(e) => { e.currentTarget.style.display='none'; }}/>
              <span className="font-display font-bold text-xl">CodeMaster</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t("footer.ourServices")}</a></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t("footer.portfolioDemos")}</Link></li>
              <li><a href="/#process" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t("footer.processColab")}</a></li>
              <li><a href="/#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">{t("footer.webApps")}</li>
              <li className="text-muted-foreground text-sm">{t("footer.aiAgents")}</li>
              <li className="text-muted-foreground text-sm">{t("footer.configurators")}</li>
              <li className="text-muted-foreground text-sm">{t("footer.trainingMentoring")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t("footer.contactTitle")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:montewkapiotr@gmail.com" className="hover:text-primary transition-colors">
                  montewkapiotr@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+48793020820" className="hover:text-primary transition-colors">
                  +48 793 020 820
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{t("footer.location")}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}
