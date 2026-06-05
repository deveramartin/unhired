import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Roast Records
export const roastRecords = pgTable("roast_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  parsedName: text("parsed_name").notNull(),
  role: text("role").notNull(),
  rating: integer("rating").notNull(),
  roastText: text("roast_text").notNull(),
  buzzwords: text("buzzwords").array().notNull().default([]),
  grammarSins: text("grammar_sins").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  roastRecords: many(roastRecords),
}));

export const roastRecordsRelations = relations(roastRecords, ({ one }) => ({
  user: one(users, {
    fields: [roastRecords.userId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type RoastRecord = typeof roastRecords.$inferSelect;
export type NewRoastRecord = typeof roastRecords.$inferInsert;