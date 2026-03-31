import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useGetProject, useToggleFavoriteProject, useGetCurrentAuthUser } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Star, CheckCircle2, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { DemoPreview } from "@/components/DemoPreview";

export default function ProjectDetail() {
  const { t } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const { data: project, isLoading, error } = useGetProject(id);
  const { data: authData } = useGetCurrentAuthUser();
  const toggleFavMutation = useToggleFavoriteProject();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("project.notFound")}</h1>
          <Link href="/portfolio">
            <Button>{t("project.backToPortfolio")}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleFavorite = () => {
    if (!authData?.user) {
      toast({ title: t("project.loginToFav"), description: t("project.loginToFavDesc"), variant: "destructive" });
      return;
    }
    toggleFavMutation.mutate({ id }, {
      onSuccess: (data) => {
        toast({ title: data.favorited ? t("project.addedToFav") : t("project.removedFromFav") });
        queryClient.invalidateQueries({ queryKey: ["/api/user/favorites"] });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/portfolio" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t("project.back")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <DemoPreview project={project} />
            
            <div className="flex gap-4">
              {project.demoUrl && (
                <Button className="flex-1 bg-primary text-white" onClick={() => window.open(project.demoUrl!, '_blank')}>
                  <Play className="w-4 h-4 mr-2" /> {t("project.runApp")}
                </Button>
              )}
              <Button variant="outline" className="flex-1 border-border" onClick={handleFavorite} disabled={toggleFavMutation.isPending}>
                <Star className={`w-4 h-4 mr-2 ${toggleFavMutation.isPending ? 'animate-pulse' : ''}`} /> 
                {t("project.saveFav")}
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30 uppercase tracking-wider">
                  {project.status}
                </span>
                <span className="text-muted-foreground text-sm">{project.category} / {project.industry}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">{project.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-display font-semibold mb-4 border-b border-border pb-2">{t("project.features")}</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" /> {t("project.techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="glass-card p-6 rounded-2xl border-primary/20 bg-primary/5 mt-8">
              <h4 className="font-display font-semibold text-lg mb-2">{t("project.wantSimilar")}</h4>
              <p className="text-sm text-muted-foreground mb-4">{t("project.wantSimilarDesc")}</p>
              <a href="/#contact">
                <Button className="w-full">{t("project.askQuote")}</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
