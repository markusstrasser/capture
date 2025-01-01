export interface Card {
  question: string;
  answer: string;
  isAnswerRevealed: boolean;
  rating: number | null;
  comment: string;
  options?: Record<string, string>;
}

export const STORAGE_KEY = "srs-cards";
export const EXPORT_DIR = "/Users/alien/Downloads";
