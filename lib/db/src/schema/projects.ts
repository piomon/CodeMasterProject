import { pgTable, text, varchar, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = pgTable("projects", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  category: varchar("category").notNull(),
  industry: varchar("industry").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").notNull().$type<string[]>(),
  status: varchar("status", { enum: ["demo", "realization", "concept"] }).notNull().default("demo"),
  featured: boolean("featured").notNull().default(false),
  thumbnailUrl: text("thumbnail_url"),
  demoUrl: text("demo_url"),
  technologies: jsonb("technologies").notNull().$type<string[]>().default([]),
  sortOrder: varchar("sort_order").default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
