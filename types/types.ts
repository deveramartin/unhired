export interface User {
  // name: string;
  email?: string;
  image?: string;
}

export type ViewType = 'landing' | 'login' | 'roast' | 'history';

export interface RoastRecord {
  id: string;
  date: string;
  fileName: string;
  fileSize: string;
  parsedName: string;
  role: string;
  roastText: string;
  rating: number; // 0 to 10 (or -5 to -1 on self-esteem impact)
  buzzwords: string[];
  grammarSins: string[];
}

export interface LoadingPhrase {
  text: string;
  duration: number; // ms to display
}
