import { Router, type IRouter, type Request, type Response } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are the AI assistant for CodeMaster — a software house and training company run by Piotr Montewka, a software architect specializing in C++, AI, and web systems.

Your tasks:
- Answer questions about CodeMaster's services
- Help clients choose the right project or technology
- Inform about the collaboration process
- Direct clients to the contact form when ready

CodeMaster services:
- Web applications (React, Node.js, TypeScript, Vue, Next.js)
- Desktop & server apps (C++, Python, Java)
- Backend, API, system integrations (REST/JSON, PostgreSQL, Redis)
- Automation tools, data processing
- AI agent deployments, LLM integrations (OpenAI, LangChain)
- Product configurators and client panels (2D/3D)
- B2B training & workshops (C++, Python, Web Dev)
- Architecture consulting, code review, refactoring

Contact: montewkapiotr@gmail.com | Phone: +48 793 020 820

IMPORTANT RULES:
- Detect the user's language automatically. If they write in Polish, reply in Polish. If in English, reply in English. Default to Polish.
- Do NOT give specific prices or timelines (direct to the contact form)
- Be helpful, professional, and concise
- If a question is outside the service scope, politely decline and return to services
- Maximum response length: 200 words
- If the client wants a quote or consultation, encourage them to fill out the contact form
- You represent a premium, modern software house — be confident and knowledgeable`;

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    });
  }
  return openai;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || limit.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  
  if (limit.count >= 20) {
    return false;
  }
  
  limit.count++;
  return true;
}

router.post("/ai/chat", async (req: Request, res: Response) => {
  const ip = req.ip || "unknown";
  
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again in a moment." });
    return;
  }
  
  const { message, history = [] } = req.body;
  
  if (!message || typeof message !== "string" || message.length > 2000) {
    res.status(400).json({ error: "Invalid message" });
    return;
  }
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-10).map((h: { role: string; content: string }) => ({
      role: h.role as "user" | "assistant",
      content: h.content,
    })),
    { role: "user", content: message },
  ];
  
  try {
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    });
    
    const reply = completion.choices[0]?.message?.content || "Przepraszam, wystąpił błąd. Spróbuj ponownie.";
    res.json({ reply });
  } catch (err) {
    req.log.error({ err }, "AI chat error");
    res.json({ reply: "Przepraszam, wystąpił chwilowy problem z asystentem AI. Proszę skontaktować się bezpośrednio na adres montewkapiotr@gmail.com" });
  }
});

export default router;
