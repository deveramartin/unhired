export type { User } from "@/db/schema";

export type ViewType = "landing" | "login" | "roast" | "history";

export interface RoastRecord {
  id: string;
  date: string;
  fileName: string;
  fileSize: string;
  parsedName: string;
  role: string;
  roastText: string;
  rating: number;
  buzzwords: string[];
  grammarSins: string[];
}

export interface LoadingPhrase {
  text: string;
  duration: number;
}
