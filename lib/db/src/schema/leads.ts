import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  projectType: varchar("project_type").notNull(),
  budget: varchar("budget"),
  deadline: varchar("deadline"),
  description: text("description").notNull(),
  status: varchar("status", { enum: ["new", "in_progress", "quoted", "closed_won", "closed_lost"] }).notNull().default("new"),
  notes: text("notes"),
  priority: varchar("priority"),
  userId: varchar("user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
