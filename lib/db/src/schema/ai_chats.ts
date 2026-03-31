import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const aiChatsTable = pgTable("ai_chats", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  sessionId: varchar("session_id"),
  userId: varchar("user_id"),
  role: varchar("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AiChat = typeof aiChatsTable.$inferSelect;
