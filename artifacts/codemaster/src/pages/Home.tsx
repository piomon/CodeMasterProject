import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Terminal, Code2, Cpu, Globe, Rocket, MonitorPlay, 
  Layers, Database, Play, ArrowRight,
  Sparkles, Bot, Mail, Phone,
  CheckCircle2, Loader2
} from "lucide-react";
import { DemoThumbnail } from "@/components/DemoThumbnail";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useListProjects, useSubmitLead } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ShowroomPreviewSection />
      <ProcessSection />
      <ContactSection />
      <FAQSection />
    </Layout>
  );
}

function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10">
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" /> {t("hero.badge")}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6">
            {t("hero.title1")} <br/>
            <span className="text-gradient">{t("hero.title2")}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio">
              <Button size="lg" className="h-14 px-8 text-base bg-primary text-white shadow-[var(--shadow-neon)] hover:shadow-[var(--shadow-neon-hover)] rounded-full w-full sm:w-auto">
                <MonitorPlay className="w-5 h-5 mr-2" />
                {t("hero.cta1")}
              </Button>
            </Link>
            <a href="#contact">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border bg-secondary/30 backdrop-blur hover:bg-secondary/60 rounded-full w-full sm:w-auto text-foreground">
                {t("hero.cta2")}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {t("about.title1")} <br/> <span className="text-primary">{t("about.title2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("about.desc")}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <SkillBadge icon={<Code2 />} text={t("about.skill1")} />
              <SkillBadge icon={<Globe />} text={t("about.skill2")} />
              <SkillBadge icon={<Cpu />} text={t("about.skill3")} />
              <SkillBadge icon={<Database />} text={t("about.skill4")} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/80 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">codemaster.config.ts</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed overflow-hidden">
                <div className="text-muted-foreground/60">{"// CodeMaster — Software House & Training"}</div>
                <div className="mt-2">
                  <span className="text-purple-400">import</span>
                  <span className="text-foreground"> {"{ "}</span>
                  <span className="text-yellow-300">createApp</span>
                  <span className="text-foreground">{" } "}</span>
                  <span className="text-purple-400">from</span>
                  <span className="text-green-400"> "@codemaster/core"</span>
                </div>
                <div className="mt-4">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-300"> app</span>
                  <span className="text-foreground"> = </span>
                  <span className="text-yellow-300">createApp</span>
                  <span className="text-foreground">{"({"}</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">name</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">"CodeMaster"</span>
                  <span className="text-foreground">,</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">stack</span>
                  <span className="text-foreground">: [</span>
                  <span className="text-green-400">"React"</span>
                  <span className="text-foreground">, </span>
                  <span className="text-green-400">"Node.js"</span>
                  <span className="text-foreground">, </span>
                  <span className="text-green-400">"AI"</span>
                  <span className="text-foreground">],</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">features</span>
                  <span className="text-foreground">: {"{"}</span>
                </div>
                <div className="ml-12">
                  <span className="text-blue-300">ai</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">true</span>
                  <span className="text-foreground">,</span>
                </div>
                <div className="ml-12">
                  <span className="text-blue-300">configurator3D</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">true</span>
                  <span className="text-foreground">,</span>
                </div>
                <div className="ml-12">
                  <span className="text-blue-300">demos</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">20</span>
                  <span className="text-foreground">,</span>
                </div>
                <div className="ml-12">
                  <span className="text-blue-300">languages</span>
                  <span className="text-foreground">: [</span>
                  <span className="text-green-400">"PL"</span>
                  <span className="text-foreground">, </span>
                  <span className="text-green-400">"EN"</span>
                  <span className="text-foreground">],</span>
                </div>
                <div className="ml-6">
                  <span className="text-foreground">{"}"}</span>
                  <span className="text-foreground">,</span>
                </div>
                <div>
                  <span className="text-foreground">{"})"}</span>
                </div>
                <div className="mt-4">
                  <span className="text-purple-400">await</span>
                  <span className="text-foreground"> app.</span>
                  <span className="text-yellow-300">deploy</span>
                  <span className="text-foreground">()</span>
                </div>
                <div className="mt-1 text-green-400">{"// ✓ Deployed successfully 🚀"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border text-sm font-medium">
      <div className="text-primary">{icon}</div>
      {text}
    </div>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const services = [
    { icon: <Globe />, title: t("services.web"), desc: t("services.webDesc") },
    { icon: <MonitorPlay />, title: t("services.desktop"), desc: t("services.desktopDesc") },
    { icon: <Database />, title: t("services.backend"), desc: t("services.backendDesc") },
    { icon: <Bot className="w-6 h-6" />, title: t("services.ai"), desc: t("services.aiDesc") },
    { icon: <Layers />, title: t("services.configurators"), desc: t("services.configuratorsDesc") },
    { icon: <Terminal />, title: t("services.training"), desc: t("services.trainingDesc") },
    { icon: <Code2 />, title: t("services.review"), desc: t("services.reviewDesc") },
    { icon: <Rocket />, title: t("services.devops"), desc: t("services.devopsDesc") },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("services.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("services.desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-glow group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowroomPreviewSection() {
  const { t } = useLanguage();
  const { data, isLoading } = useListProjects();
  const projects = data?.projects?.slice(0, 6) || [];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("showroom.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">{t("showroom.desc")}</p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="rounded-full border-border hover:bg-secondary/50">
              {t("showroom.viewAll")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-80 rounded-2xl bg-secondary/50 animate-pulse" />)}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl">
            <MonitorPlay className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{t("showroom.preparing")}</h3>
            <p className="text-muted-foreground">{t("showroom.preparingDesc")}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useLanguage();
  const steps = [
    { title: t("process.step1"), desc: t("process.step1Desc") },
    { title: t("process.step2"), desc: t("process.step2Desc") },
    { title: t("process.step3"), desc: t("process.step3Desc") },
    { title: t("process.step4"), desc: t("process.step4Desc") },
    { title: t("process.step5"), desc: t("process.step5Desc") },
    { title: t("process.step6"), desc: t("process.step6Desc") },
  ];

  return (
    <section id="process" className="py-24 bg-secondary/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t("process.title")}</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-accent/10 z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full glass-card border border-primary/20 flex items-center justify-center text-xl font-bold font-display text-primary mb-6 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const submitMutation = useSubmitLead();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "", email: "", phone: "", company: "", projectType: "", budget: "", deadline: "", description: "", consentContact: false, consentPrivacy: false
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: t("contact.success"), description: t("contact.successDesc") });
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: t("contact.error"), description: t("contact.errorDesc") });
      }
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t("contact.title")}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("contact.desc")}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.writeDirect")}</p>
                  <a href="mailto:montewkapiotr@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">montewkapiotr@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.callUs")}</p>
                  <a href="tel:+48793020820" className="text-lg font-medium hover:text-primary transition-colors">+48 793 020 820</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary">
                  <MonitorPlay className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.bookDemo")}</p>
                  <p className="text-lg font-medium">{t("contact.videoCall")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.name")} *</label>
                  <Input {...form.register("name")} className="bg-background/50" />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.email")} *</label>
                  <Input {...form.register("email")} type="email" className="bg-background/50" />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.phone")}</label>
                  <Input {...form.register("phone")} className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.company")}</label>
                  <Input {...form.register("company")} className="bg-background/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact.projectType")} *</label>
                <select 
                  {...form.register("projectType")}
                  className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="" className="bg-background text-foreground">{t("contact.choose")}</option>
                  <option value="web" className="bg-background text-foreground">{t("contact.typeWeb")}</option>
                  <option value="ecommerce" className="bg-background text-foreground">{t("contact.typeEcommerce")}</option>
                  <option value="ai" className="bg-background text-foreground">{t("contact.typeAi")}</option>
                  <option value="desktop" className="bg-background text-foreground">{t("contact.typeDesktop")}</option>
                  <option value="training" className="bg-background text-foreground">{t("contact.typeTraining")}</option>
                  <option value="other" className="bg-background text-foreground">{t("contact.typeOther")}</option>
                </select>
                {form.formState.errors.projectType && <p className="text-xs text-destructive">{form.formState.errors.projectType.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.budget")}</label>
                  <select 
                    {...form.register("budget")}
                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="" className="bg-background text-foreground">{t("contact.choose")}</option>
                    <option value="small" className="bg-background text-foreground">{t("contact.budgetSmall")}</option>
                    <option value="medium" className="bg-background text-foreground">{t("contact.budgetMedium")}</option>
                    <option value="large" className="bg-background text-foreground">{t("contact.budgetLarge")}</option>
                    <option value="enterprise" className="bg-background text-foreground">{t("contact.budgetEnterprise")}</option>
                    <option value="tbd" className="bg-background text-foreground">{t("contact.budgetUndefined")}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.deadline")}</label>
                  <select 
                    {...form.register("deadline")}
                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="" className="bg-background text-foreground">{t("contact.choose")}</option>
                    <option value="asap" className="bg-background text-foreground">{t("contact.deadlineAsap")}</option>
                    <option value="1m" className="bg-background text-foreground">{t("contact.deadline1m")}</option>
                    <option value="3m" className="bg-background text-foreground">{t("contact.deadline3m")}</option>
                    <option value="6m" className="bg-background text-foreground">{t("contact.deadline6m")}</option>
                    <option value="flexible" className="bg-background text-foreground">{t("contact.deadlineFlexible")}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact.projectDesc")} *</label>
                <Textarea {...form.register("description")} rows={4} className="bg-background/50 resize-none" placeholder={t("contact.projectDescPlaceholder")} />
                {form.formState.errors.description && <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="consentContact" 
                    checked={form.watch("consentContact")}
                    onCheckedChange={(c) => form.setValue("consentContact", c === true)}
                  />
                  <label htmlFor="consentContact" className="text-xs text-muted-foreground leading-tight">
                    {t("contact.consentContact")}
                  </label>
                </div>
                {form.formState.errors.consentContact && <p className="text-xs text-destructive">{form.formState.errors.consentContact.message}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="consentPrivacy"
                    checked={form.watch("consentPrivacy")}
                    onCheckedChange={(c) => form.setValue("consentPrivacy", c === true)}
                  />
                  <label htmlFor="consentPrivacy" className="text-xs text-muted-foreground leading-tight">
                    {t("contact.consentPrivacy")}
                  </label>
                </div>
                {form.formState.errors.consentPrivacy && <p className="text-xs text-destructive">{form.formState.errors.consentPrivacy.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-12 text-base rounded-xl"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : t("contact.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useLanguage();
  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq.title")}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-medium hover:text-primary">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function getCategoryPreview(category: string, industry: string, name: string): { emoji: string; gradient: string } {
  const cat = (category || "").toLowerCase();
  const ind = (industry || "").toLowerCase();
  const nm = (name || "").toLowerCase();

  if (cat.includes("booking") || ind.includes("salon") || ind.includes("hotel") || ind.includes("fitness") || nm.includes("rezerwacj"))
    return { emoji: "📅", gradient: "from-blue-500/20 via-cyan-500/10 to-blue-600/5" };
  if (cat.includes("configurator") || nm.includes("konfigurator"))
    return { emoji: "⚙️", gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/5" };
  if (ind.includes("food") || nm.includes("restauracja"))
    return { emoji: "🍽️", gradient: "from-orange-500/20 via-red-500/10 to-orange-600/5" };
  if (cat.includes("e-commerce") || nm.includes("sklep"))
    return { emoji: "🛒", gradient: "from-green-500/20 via-emerald-500/10 to-green-600/5" };
  if (cat.includes("dashboard") || cat.includes("client portal") || ind.includes("finance") || ind.includes("legal"))
    return { emoji: "📊", gradient: "from-slate-500/20 via-gray-500/10 to-slate-600/5" };
  if (cat.includes("e-learning") || ind.includes("education"))
    return { emoji: "🎓", gradient: "from-yellow-500/20 via-amber-500/10 to-yellow-600/5" };
  if (cat.includes("ai") || nm.includes("ai") || nm.includes("chatbot"))
    return { emoji: "🤖", gradient: "from-purple-500/20 via-pink-500/10 to-purple-600/5" };
  if (cat.includes("healthcare") || ind.includes("medical"))
    return { emoji: "🏥", gradient: "from-teal-500/20 via-cyan-500/10 to-teal-600/5" };
  if (cat.includes("service") || nm.includes("serwis"))
    return { emoji: "🔧", gradient: "from-amber-500/20 via-orange-500/10 to-amber-600/5" };
  if (cat.includes("events") || ind.includes("entertainment"))
    return { emoji: "🎫", gradient: "from-pink-500/20 via-rose-500/10 to-pink-600/5" };
  if (cat.includes("calculator") || nm.includes("kalkulator"))
    return { emoji: "🧮", gradient: "from-indigo-500/20 via-blue-500/10 to-indigo-600/5" };
  if (cat.includes("real estate") || ind.includes("construction"))
    return { emoji: "🏗️", gradient: "from-stone-500/20 via-amber-500/10 to-stone-600/5" };
  if (ind.includes("marketing"))
    return { emoji: "📈", gradient: "from-rose-500/20 via-pink-500/10 to-rose-600/5" };
  return { emoji: "💻", gradient: "from-primary/15 via-accent/10 to-primary/5" };
}

export function ProjectCard({ project }: { project: any }) {
  const { t } = useLanguage();
  const getStatusColor = (s: string) => {
    if (s === 'demo') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (s === 'realization') return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  const preview = getCategoryPreview(project.category, project.industry, project.name);

  return (
    <Link href={`/project/${project.id}`}>
      <div className="glass-card rounded-2xl overflow-hidden hover-glow cursor-pointer group h-full flex flex-col transition-all duration-300">
        <div className="h-48 bg-secondary/80 relative overflow-hidden">
          {project.thumbnailUrl ? (
            <img src={project.thumbnailUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-500">
              <DemoThumbnail category={project.category} industry={project.industry} name={project.name} />
            </div>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-md font-medium ${getStatusColor(project.status)}`}>
              {project.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-primary mb-3 font-medium">
            <Layers className="w-3.5 h-3.5" />
            {project.category} • {project.industry}
          </div>
          <h3 className="font-display font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {project.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <span className="text-sm font-medium flex items-center text-foreground group-hover:text-primary transition-colors">
              {t("project.preview")} <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </span>
            <Button size="sm" variant="secondary" className="rounded-full bg-secondary hover:bg-primary hover:text-white border border-border">
              <Play className="w-3 h-3 mr-1.5" /> Demo
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
