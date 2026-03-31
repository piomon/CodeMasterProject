import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@workspace/replit-auth-web";
import { useGetUserFavorites, useGetUserInquiries, useUpdateUserProfile, useDeleteUserAccount } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "./Home";
import { Loader2, Mail, LogOut, Star, Clock, Edit, Trash2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Dashboard() {
  const { t } = useLanguage();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: favData, isLoading: favLoading } = useGetUserFavorites({ query: { enabled: isAuthenticated } });
  const { data: inqData, isLoading: inqLoading } = useGetUserInquiries({ query: { enabled: isAuthenticated } });
  const updateProfileMutation = useUpdateUserProfile();
  const deleteAccountMutation = useDeleteUserAccount();

  if (authLoading) {
    return <Layout><div className="flex justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></Layout>;
  }

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center max-w-md">
          <h1 className="text-3xl font-display font-bold mb-4">{t("dashboard.loginRequired")}</h1>
          <p className="text-muted-foreground mb-8">{t("dashboard.loginDesc")}</p>
          <Button onClick={() => window.location.href = '/api/login?returnTo=/dashboard'} className="w-full bg-primary text-white">
            {t("dashboard.loginGoogle")}
          </Button>
        </div>
      </Layout>
    );
  }

  const startEdit = () => {
    setEditFirstName(user.firstName || "");
    setEditLastName(user.lastName || "");
    setEditMode(true);
  };

  const saveProfile = () => {
    updateProfileMutation.mutate(
      { data: { firstName: editFirstName, lastName: editLastName } },
      {
        onSuccess: () => {
          toast({ title: t("dashboard.profileUpdated") });
          setEditMode(false);
          window.location.reload();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
        },
      }
    );
  };

  const deleteAccount = () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: t("dashboard.deleteAccountSuccess") });
        setShowDeleteConfirm(false);
        setTimeout(() => { window.location.href = "/"; }, 1500);
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to delete account", variant: "destructive" });
      },
    });
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, {label: string, color: string}> = {
      'new': { label: t("dashboard.statusNew"), color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'in_progress': { label: t("dashboard.statusProgress"), color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'quoted': { label: t("dashboard.statusQuoted"), color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
      'closed_won': { label: t("dashboard.statusWon"), color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'closed_lost': { label: t("dashboard.statusLost"), color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    const s = map[status] || { label: status, color: 'bg-secondary text-foreground' };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium border ${s.color}`}>{s.label}</span>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 glass-panel p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-6">
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-primary/50 shadow-[var(--shadow-neon)]" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder={t("dashboard.firstName")}
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="bg-secondary/50 border-white/10 h-9 w-32"
                    />
                    <Input
                      placeholder={t("dashboard.lastName")}
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="bg-secondary/50 border-white/10 h-9 w-32"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveProfile} disabled={updateProfileMutation.isPending} className="bg-primary text-white h-8">
                      <Save className="w-3 h-3 mr-1" /> {t("admin.save")}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditMode(false)} className="h-8">
                      <X className="w-3 h-3 mr-1" /> {t("admin.cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-display font-bold text-foreground">{user.firstName} {user.lastName}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" /> {user.email}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {!editMode && (
              <Button variant="outline" size="sm" onClick={startEdit} className="border-white/10">
                <Edit className="w-4 h-4 mr-2" /> {t("dashboard.editProfile")}
              </Button>
            )}
            <Button variant="outline" onClick={logout} className="border-white/10 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50 transition-colors">
              <LogOut className="w-4 h-4 mr-2" /> {t("dashboard.logout")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-destructive/60 hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-1" /> {t("dashboard.deleteAccount")}
            </Button>
          </div>
        </div>

        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="bg-background border-white/10 text-foreground">
            <DialogHeader>
              <DialogTitle>{t("dashboard.deleteAccount")}</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm">{t("dashboard.deleteAccountConfirm")}</p>
            <div className="flex gap-3 justify-end mt-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="border-white/10">{t("admin.cancel")}</Button>
              <Button variant="destructive" onClick={deleteAccount} disabled={deleteAccountMutation.isPending}>
                {deleteAccountMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t("dashboard.deleteAccount")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2 border-b border-white/5 pb-4">
              <Clock className="w-6 h-6 text-primary" /> {t("dashboard.myInquiries")}
            </h2>
            
            {inqLoading ? (
              <div className="h-32 glass-card rounded-2xl animate-pulse" />
            ) : inqData?.inquiries && inqData.inquiries.length > 0 ? (
              <div className="space-y-4">
                {inqData.inquiries.map(inq => (
                  <div key={inq.id} className="glass-card p-5 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-foreground">{inq.projectType}</h3>
                      {getStatusBadge(inq.status)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{inq.description}</p>
                    <div className="text-xs text-muted-foreground/50">
                      {t("dashboard.sentOn")}: {format(new Date(inq.createdAt), "dd.MM.yyyy")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 glass-card rounded-2xl">
                <p className="text-muted-foreground text-sm mb-4">{t("dashboard.noInquiries")}</p>
                <a href="/#contact"><Button size="sm">{t("dashboard.startProject")}</Button></a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2 border-b border-white/5 pb-4">
              <Star className="w-6 h-6 text-accent" /> {t("dashboard.favDemos")}
            </h2>

            {favLoading ? (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="h-64 glass-card rounded-2xl animate-pulse" />
                <div className="h-64 glass-card rounded-2xl animate-pulse" />
              </div>
            ) : favData?.projects && favData.projects.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {favData.projects.map(p => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 glass-card rounded-2xl">
                <Star className="w-12 h-12 text-white/5 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t("dashboard.noFavorites")}</p>
                <Link href="/portfolio"><Button variant="outline" className="border-white/10">{t("dashboard.browseShowroom")}</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
