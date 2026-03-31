import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "./Home";
import { useListProjects } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Portfolio() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  
  const { data, isLoading } = useListProjects({ search, category: category || undefined });
  const projects = data?.projects || [];

  const categories = [
    t("portfolio.all"), "Booking", "E-commerce", "Configurator", "Dashboard", "E-learning", "AI"
  ];

  return (
    <Layout>
      <div className="relative min-h-[40vh] flex items-center pt-24 pb-16 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/portfolio-bg.png`} 
            alt="Portfolio Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
            onError={(e) => { e.currentTarget.style.display='none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{t("portfolio.title")} <span className="text-primary">{t("portfolio.titleAccent")}</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("portfolio.desc")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(c => {
              const isAll = c === t("portfolio.all");
              return (
                <button
                  key={c}
                  onClick={() => setCategory(isAll ? "" : c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    (isAll && !category) || c === category
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={t("portfolio.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50 border-border rounded-full"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl">
            <h3 className="text-xl font-medium mb-2">{t("portfolio.noResults")}</h3>
            <p className="text-muted-foreground">{t("portfolio.noResultsDesc")}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
