import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const siteSettingsTable = pgTable("site_settings", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  key: varchar("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type SiteSetting = typeof siteSettingsTable.$inferSelect;
