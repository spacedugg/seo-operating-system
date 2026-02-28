import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "seo-tool.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS produkte (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      asin TEXT,
      marketplace TEXT DEFAULT 'Amazon.de',
      kategorie TEXT,
      preis TEXT,
      produktinfo TEXT,
      voice_tone TEXT,
      status TEXT DEFAULT 'neu',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS keywords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produkt_id INTEGER NOT NULL,
      keyword TEXT NOT NULL,
      suchvolumen INTEGER DEFAULT 0,
      ist_hauptkeyword INTEGER DEFAULT 0,
      ist_relevant INTEGER DEFAULT 1,
      quelle TEXT DEFAULT 'manuell',
      FOREIGN KEY (produkt_id) REFERENCES produkte(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produkt_id INTEGER NOT NULL,
      titel TEXT,
      bullet1 TEXT,
      bullet2 TEXT,
      bullet3 TEXT,
      bullet4 TEXT,
      bullet5 TEXT,
      beschreibung TEXT,
      backend_keywords TEXT,
      version INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (produkt_id) REFERENCES produkte(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS qa_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL,
      scores TEXT,
      total_score INTEGER,
      max_score INTEGER DEFAULT 40,
      status TEXT DEFAULT 'ausstehend',
      notizen TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
    );
  `);
}
