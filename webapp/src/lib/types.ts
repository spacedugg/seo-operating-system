export interface Produkt {
  id: number;
  name: string;
  brand: string;
  asin: string | null;
  marketplace: string;
  kategorie: string | null;
  preis: string | null;
  produktinfo: string | null;
  voice_tone: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: number;
  produkt_id: number;
  keyword: string;
  suchvolumen: number;
  ist_hauptkeyword: number;
  ist_relevant: number;
  quelle: string;
}

export interface Content {
  id: number;
  produkt_id: number;
  titel: string | null;
  bullet1: string | null;
  bullet2: string | null;
  bullet3: string | null;
  bullet4: string | null;
  bullet5: string | null;
  beschreibung: string | null;
  backend_keywords: string | null;
  version: number;
  created_at: string;
}

export interface QAScore {
  id: number;
  content_id: number;
  scores: string;
  total_score: number;
  max_score: number;
  status: string;
  notizen: string | null;
  created_at: string;
}

export interface QAScoreDetail {
  id: string;
  name: string;
  kategorie: string;
  punkte: number;
  max: number;
  kommentar: string;
}

export type ProduktStatus = "neu" | "keywords" | "content" | "qa" | "fertig";
