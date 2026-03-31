import { useState } from "react";
import { useAuth } from "@workspace/replit-auth-web";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListProjects, useCreateProject, useUpdateProject, useDeleteProject, useListLeads, useUpdateLead, useListUsers, useUpdateUserRole } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, Plus, Trash2, Edit, ShieldAlert, Eye, MessageSquare, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Admin() {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const { error: usersError, isLoading: usersLoading } = useListUsers({ query: { retry: false } });

  if (isLoading || usersLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  if (usersError) {
    return (
      <Layout>
        <div className="container mx-auto py-32 text-center">
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">{t("admin.noAccess")}</h1>
          <p className="text-muted-foreground">{t("admin.noAccessDesc")}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">{t("admin.title")}</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50 border border-white/5 mb-8">
            <TabsTrigger value="projects">{t("admin.projects")}</TabsTrigger>
            <TabsTrigger value="leads">{t("admin.leads")}</TabsTrigger>
            <TabsTrigger value="users">{t("admin.users")}</TabsTrigger>
          </TabsList>

          <TabsContent value="projects"><ProjectsAdminTab /></TabsContent>
          <TabsContent value="leads"><LeadsAdminTab /></TabsContent>
          <TabsContent value="users"><UsersAdminTab /></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function ProjectsAdminTab() {
  const { t } = useLanguage();
  const { data, isLoading } = useListProjects();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProject, setEditProject] = useState<any>(null);
  const deleteMutation = useDeleteProject();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (confirm(t("admin.confirmDelete"))) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: t("admin.deleted") });
          queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
        }
      });
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t("admin.manageProjects")}</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary"><Plus className="w-4 h-4 mr-2" /> {t("admin.addProject")}</Button>
          </DialogTrigger>
          <DialogContent className="bg-background border-white/10 sm:max-w-[600px] text-foreground max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("admin.newProject")}</DialogTitle>
            </DialogHeader>
            <ProjectForm onSuccess={() => setIsAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editProject} onOpenChange={(open) => !open && setEditProject(null)}>
        <DialogContent className="bg-background border-white/10 sm:max-w-[600px] text-foreground max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.editProject")}</DialogTitle>
          </DialogHeader>
          {editProject && <ProjectForm project={editProject} onSuccess={() => setEditProject(null)} />}
        </DialogContent>
      </Dialog>

      {isLoading ? <Loader2 className="animate-spin" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-secondary/50 border-y border-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">{t("admin.name")}</th>
                <th className="px-4 py-3 font-medium">{t("admin.category")}</th>
                <th className="px-4 py-3 font-medium">{t("admin.status")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.projects?.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${p.status === 'demo' ? 'bg-blue-500/20 text-blue-400' : p.status === 'realization' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => setEditProject(p)} className="text-muted-foreground hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/20 hover:text-destructive" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProjectForm({ project, onSuccess }: { project?: any; onSuccess: () => void }) {
  const { t } = useLanguage();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    name: project?.name || "",
    category: project?.category || "",
    industry: project?.industry || "",
    description: project?.description || "",
    features: project?.features?.join(", ") || "",
    status: project?.status || "demo",
    thumbnailUrl: project?.thumbnailUrl || "",
    demoUrl: project?.demoUrl || "",
    technologies: project?.technologies?.join(", ") || "",
    featured: project?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies ? formData.technologies.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    if (isEditing) {
      updateMutation.mutate({ id: project.id, data: payload }, {
        onSuccess: () => {
          toast({ title: t("admin.updated") });
          queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
          onSuccess();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
        }
      });
    } else {
      createMutation.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: t("admin.created") });
          queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
          onSuccess();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder={t("admin.name")} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-secondary/50 border-white/10" />
        <Input placeholder={t("admin.category")} required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-secondary/50 border-white/10" />
        <Input placeholder={t("admin.industry")} required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="bg-secondary/50 border-white/10" />
        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="flex h-10 w-full rounded-md border border-white/10 bg-secondary/50 px-3 py-2 text-sm text-foreground">
          <option value="demo">Demo</option>
          <option value="realization">Realizacja</option>
          <option value="concept">Koncept</option>
        </select>
      </div>
      <Textarea placeholder={t("admin.description")} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-secondary/50 border-white/10 min-h-[80px]" />
      <Input placeholder={t("admin.features")} required value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="bg-secondary/50 border-white/10" />
      <Input placeholder={t("admin.technologies")} value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="bg-secondary/50 border-white/10" />
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder={t("admin.thumbnailUrl")} value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="bg-secondary/50 border-white/10" />
        <Input placeholder={t("admin.demoUrl")} value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className="bg-secondary/50 border-white/10" />
      </div>
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-primary" />
        {t("admin.category") === "Kategoria" ? "Wyróżniony projekt" : "Featured project"}
      </label>
      <Button type="submit" disabled={isPending} className="w-full bg-primary text-white">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {t("admin.save")}
      </Button>
    </form>
  );
}

function LeadsAdminTab() {
  const { t } = useLanguage();
  const { data, isLoading } = useListLeads({});
  const updateMutation = useUpdateLead();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: any) => {
    updateMutation.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => {
        toast({ title: t("admin.statusUpdated") });
        queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      }
    });
  };

  const handleNotesUpdate = (id: string, notes: string) => {
    updateMutation.mutate({ id, data: { notes } }, {
      onSuccess: () => {
        toast({ title: t("admin.updated") });
        queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      }
    });
  };

  const handlePriorityChange = (id: string, priority: string) => {
    updateMutation.mutate({ id, data: { priority } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      }
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">{t("admin.leadsTitle")}</h2>
      {isLoading ? <Loader2 className="animate-spin" /> : (
        <div className="space-y-3">
          {data?.leads?.map(l => (
            <div key={l.id} className="border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpandedLead(expandedLead === l.id ? null : l.id)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">{l.name}</p>
                    <span className="text-xs text-muted-foreground">{l.email}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{l.projectType} • {format(new Date(l.createdAt), "dd.MM.yyyy HH:mm")}</p>
                </div>
                <select
                  value={l.priority || "normal"}
                  onChange={(e) => { e.stopPropagation(); handlePriorityChange(l.id, e.target.value); }}
                  className="bg-secondary border border-white/10 text-xs rounded px-2 py-1 text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <select
                  value={l.status}
                  onChange={(e) => { e.stopPropagation(); handleStatusChange(l.id, e.target.value); }}
                  className="bg-secondary border border-white/10 text-xs rounded px-2 py-1 text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="new">{t("dashboard.statusNew")}</option>
                  <option value="in_progress">{t("dashboard.statusProgress")}</option>
                  <option value="quoted">{t("dashboard.statusQuoted")}</option>
                  <option value="closed_won">{t("dashboard.statusWon")}</option>
                  <option value="closed_lost">{t("dashboard.statusLost")}</option>
                </select>
                <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
              {expandedLead === l.id && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="text-muted-foreground">{t("contact.phone")}:</span> <span className="text-foreground">{l.phone || "—"}</span></div>
                    <div><span className="text-muted-foreground">{t("contact.company")}:</span> <span className="text-foreground">{l.company || "—"}</span></div>
                    <div><span className="text-muted-foreground">{t("admin.budget")}:</span> <span className="text-foreground">{l.budget || "—"}</span></div>
                    <div><span className="text-muted-foreground">{t("admin.deadline")}:</span> <span className="text-foreground">{l.deadline || "—"}</span></div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t("admin.leadDescription")}:</p>
                    <p className="text-sm text-foreground bg-secondary/50 rounded-lg p-3">{l.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t("admin.notes")}:</p>
                    <Textarea
                      defaultValue={l.notes || ""}
                      onBlur={(e) => handleNotesUpdate(l.id, e.target.value)}
                      placeholder={t("admin.notes") + "..."}
                      className="bg-secondary/50 border-white/10 text-sm min-h-[60px]"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsersAdminTab() {
  const { t } = useLanguage();
  const { data, isLoading } = useListUsers();
  const updateMutation = useUpdateUserRole();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleRoleChange = (id: string, newRole: any) => {
    updateMutation.mutate({ id, data: { role: newRole } }, {
      onSuccess: () => {
        toast({ title: t("admin.roleUpdated") });
        queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      }
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">{t("admin.usersTitle")}</h2>
      {isLoading ? <Loader2 className="animate-spin" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-secondary/50 border-y border-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">{t("admin.user")}</th>
                <th className="px-4 py-3 font-medium">{t("admin.email")}</th>
                <th className="px-4 py-3 font-medium">{t("admin.registration")}</th>
                <th className="px-4 py-3 font-medium">{t("admin.role")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                    {u.profileImageUrl && <img src={u.profileImageUrl} className="w-6 h-6 rounded-full" alt="" />}
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{format(new Date(u.createdAt), "dd.MM.yyyy")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`text-xs rounded px-2 py-1 border text-foreground ${u.role === 'admin' ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-secondary border-white/10'}`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
