import { Router, type IRouter, type Request, type Response } from "express";
import { db, leadsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

const router: IRouter = Router();

async function sendLeadEmail(lead: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  budget?: string | null;
  deadline?: string | null;
  description: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">Nowe zapytanie ofertowe - CodeMaster</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Imię i nazwisko:</td><td style="padding: 8px;">${lead.name}</td></tr>
        <tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Email:</td><td style="padding: 8px;">${lead.email}</td></tr>
        ${lead.phone ? `<tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Telefon:</td><td style="padding: 8px;">${lead.phone}</td></tr>` : ""}
        ${lead.company ? `<tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Firma:</td><td style="padding: 8px;">${lead.company}</td></tr>` : ""}
        <tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Typ projektu:</td><td style="padding: 8px;">${lead.projectType}</td></tr>
        ${lead.budget ? `<tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Budżet:</td><td style="padding: 8px;">${lead.budget}</td></tr>` : ""}
        ${lead.deadline ? `<tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Termin:</td><td style="padding: 8px;">${lead.deadline}</td></tr>` : ""}
        <tr><td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Opis projektu:</td><td style="padding: 8px;">${lead.description}</td></tr>
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || "noreply@codemaster.pl",
      to: "montewkapiotr@gmail.com",
      subject: `[CodeMaster] Nowe zapytanie od ${lead.name} - ${lead.projectType}`,
      html: emailHtml,
    });
    return true;
  } catch (err) {
    console.error("Email send error:", err);
    return false;
  }
}

router.post("/leads", async (req: Request, res: Response) => {
  const { name, email, phone, company, projectType, budget, deadline, description, consentContact, consentPrivacy } = req.body;
  
  if (!name || !email || !projectType || !description) {
    res.status(400).json({ error: "Wypełnij wszystkie wymagane pola" });
    return;
  }
  
  if (!consentContact || !consentPrivacy) {
    res.status(400).json({ error: "Wymagana jest zgoda na kontakt i politykę prywatności" });
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Nieprawidłowy adres email" });
    return;
  }
  
  const [lead] = await db.insert(leadsTable).values({
    id: crypto.randomUUID(),
    name,
    email,
    phone: phone || null,
    company: company || null,
    projectType,
    budget: budget || null,
    deadline: deadline || null,
    description,
    status: "new",
    userId: req.isAuthenticated() ? req.user!.id : null,
  }).returning();
  
  await sendLeadEmail({ name, email, phone, company, projectType, budget, deadline, description });
  
  res.status(201).json({
    success: true,
    message: "Dziękujemy za zapytanie! Odpowiemy w ciągu 24 godzin.",
  });
});

router.get("/leads", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const { status } = req.query;
  
  let query = db.select().from(leadsTable);
  
  if (status && typeof status === "string") {
    query = query.where(eq(leadsTable.status, status as "new" | "in_progress" | "quoted" | "closed_won" | "closed_lost")) as typeof query;
  }
  
  const leads = await query.orderBy(leadsTable.createdAt);
  res.json({ leads: leads.reverse() });
});

router.put("/leads/:id", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const { status, notes, priority } = req.body;
  
  const [lead] = await db
    .update(leadsTable)
    .set({
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(priority !== undefined ? { priority } : {}),
      updatedAt: new Date(),
    })
    .where(eq(leadsTable.id, req.params.id))
    .returning();
  
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  
  res.json(lead);
});

export default router;
