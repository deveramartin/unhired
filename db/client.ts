import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { _db: DrizzleDb | undefined };

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});

export const db: DrizzleDb = globalForDb._db ?? drizzle(client, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb._db = db;
}