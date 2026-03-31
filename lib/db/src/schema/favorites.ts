import { pgTable, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  userId: varchar("user_id").notNull(),
  projectId: varchar("project_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.projectId] }),
]);

export type Favorite = typeof favoritesTable.$inferSelect;
