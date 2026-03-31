import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko musi mieć min. 2 znaki"),
  email: z.string().email("Niepoprawny format email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Wybierz typ projektu"),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(10, "Opis musi mieć min. 10 znaków"),
  consentContact: z.boolean().refine(val => val === true, "Zgoda jest wymagana"),
  consentPrivacy: z.boolean().refine(val => val === true, "Zgoda jest wymagana"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const projectFormSchema = z.object({
  name: z.string().min(2, "Nazwa jest wymagana"),
  category: z.string().min(2, "Kategoria jest wymagana"),
  industry: z.string().min(2, "Branża jest wymagana"),
  description: z.string().min(10, "Opis jest wymagany"),
  features: z.string().min(2, "Funkcjonalności są wymagane (po przecinku)"),
  status: z.enum(["demo", "realization", "concept"]),
  featured: z.boolean().default(false),
  thumbnailUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  technologies: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
