import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { Keyword, Produkt } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { produktId, anweisungen } = body;

  if (!produktId) {
    return NextResponse.json(
      { error: "produktId ist erforderlich" },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY ist nicht konfiguriert. Bitte in .env.local setzen." },
      { status: 500 }
    );
  }

  const db = getDb();
  const produkt = db
    .prepare("SELECT * FROM produkte WHERE id = ?")
    .get(produktId) as Produkt | undefined;

  if (!produkt) {
    return NextResponse.json(
      { error: "Produkt nicht gefunden" },
      { status: 404 }
    );
  }

  const keywords = db
    .prepare(
      "SELECT * FROM keywords WHERE produkt_id = ? AND ist_relevant = 1 ORDER BY ist_hauptkeyword DESC, suchvolumen DESC"
    )
    .all(produktId) as Keyword[];

  const hauptkeywords = keywords.filter((k) => k.ist_hauptkeyword);
  const weitereKeywords = keywords.filter((k) => !k.ist_hauptkeyword);

  if (hauptkeywords.length === 0) {
    return NextResponse.json(
      { error: "Keine Hauptkeywords definiert. Bitte zuerst Keywords markieren." },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(produkt, hauptkeywords, weitereKeywords, anweisungen);

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const parsed = parseContentResponse(responseText);

    // Neue Version speichern
    const existingCount = db
      .prepare("SELECT COUNT(*) as count FROM content WHERE produkt_id = ?")
      .get(produktId) as { count: number };

    const result = db
      .prepare(
        `INSERT INTO content (produkt_id, titel, bullet1, bullet2, bullet3, bullet4, bullet5, beschreibung, backend_keywords, version)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        produktId,
        parsed.titel,
        parsed.bullets[0] || null,
        parsed.bullets[1] || null,
        parsed.bullets[2] || null,
        parsed.bullets[3] || null,
        parsed.bullets[4] || null,
        parsed.beschreibung,
        parsed.backend_keywords,
        existingCount.count + 1
      );

    db.prepare(
      "UPDATE produkte SET status = 'content', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(produktId);

    const content = db
      .prepare("SELECT * FROM content WHERE id = ?")
      .get(result.lastInsertRowid);

    return NextResponse.json({
      content,
      raw: responseText,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return NextResponse.json(
      { error: `Claude API Fehler: ${message}` },
      { status: 500 }
    );
  }
}

function buildPrompt(
  produkt: Produkt,
  hauptkeywords: Keyword[],
  weitereKeywords: Keyword[],
  anweisungen?: string
): string {
  const hauptkwList = hauptkeywords.map((k) => k.keyword).join(", ");
  const weitereKwList = weitereKeywords
    .slice(0, 30)
    .map((k) => k.keyword)
    .join(", ");

  return `Du bist ein erfahrener Amazon-SEO-Spezialist. Erstelle ein vollständig optimiertes Amazon-Listing für folgendes Produkt.

## Produkt-Informationen
- **Produktname:** ${produkt.name}
- **Marke:** ${produkt.brand}
- **Marketplace:** ${produkt.marketplace}
- **Kategorie:** ${produkt.kategorie || "Nicht angegeben"}
- **Preis:** ${produkt.preis || "Nicht angegeben"}
- **Produktdetails:** ${produkt.produktinfo || "Nicht angegeben"}
${produkt.voice_tone ? `- **Voice & Tone:** ${produkt.voice_tone}` : ""}

## Keywords
- **6 Hauptkeywords (MÜSSEN integriert werden):** ${hauptkwList}
- **Weitere relevante Keywords (optional integrieren):** ${weitereKwList || "Keine"}

## Regeln

### Titel
- Beginnt mit dem wichtigsten Hauptkeyword in GROSSBUCHSTABEN
- Enthält einen Eyecatcher-Vorteil
- Maximal 2x das gleiche Keyword
- Maximal 200 Zeichen
- Format: HAUPTKEYWORD - Marke - Kernvorteil - weitere Keywords

### 5 Bulletpoints
- Jeder Bulletpoint beginnt mit einem KEYWORD oder VORTEIL in GROSSBUCHSTABEN
- Integriere alle 6 Hauptkeywords jeweils 1–2x (insgesamt 6–12 Nennungen)
- Kein Keyword-Stuffing – natürlich lesbar
- Verkaufspsychologie: Vorteile + Features kombinieren
- Jeder Bulletpoint maximal 500 Zeichen
- Emotionalisierung und Kaufimpulse setzen

### Produktbeschreibung
- Fließtext, lesbar und natürlich
- Keywords organisch einbauen
- Verkaufsorientiert: Vorteile hervorheben
- Keine Wettbewerber-Keywords

### Backend-Keywords
- Alle übrigen relevanten Keywords, die nicht im sichtbaren Content sind
- Kommagetrennt, keine Duplikate zum sichtbaren Text
- Maximal 249 Bytes

${anweisungen ? `## Zusätzliche Anweisungen\n${anweisungen}` : ""}

## Ausgabeformat
Antworte EXAKT in diesem Format (die Marker sind wichtig für die automatische Verarbeitung):

[TITEL]
Dein Titel hier

[BULLET1]
Erster Bulletpoint hier

[BULLET2]
Zweiter Bulletpoint hier

[BULLET3]
Dritter Bulletpoint hier

[BULLET4]
Vierter Bulletpoint hier

[BULLET5]
Fünfter Bulletpoint hier

[BESCHREIBUNG]
Deine Produktbeschreibung hier

[BACKEND]
keyword1, keyword2, keyword3`;
}

function parseContentResponse(text: string): {
  titel: string;
  bullets: string[];
  beschreibung: string;
  backend_keywords: string;
} {
  const extract = (marker: string, nextMarker?: string): string => {
    const pattern = nextMarker
      ? new RegExp(`\\[${marker}\\]\\s*\\n([\\s\\S]*?)(?=\\[${nextMarker}\\])`)
      : new RegExp(`\\[${marker}\\]\\s*\\n([\\s\\S]*?)$`);
    const match = text.match(pattern);
    return match ? match[1].trim() : "";
  };

  return {
    titel: extract("TITEL", "BULLET1"),
    bullets: [
      extract("BULLET1", "BULLET2"),
      extract("BULLET2", "BULLET3"),
      extract("BULLET3", "BULLET4"),
      extract("BULLET4", "BULLET5"),
      extract("BULLET5", "BESCHREIBUNG"),
    ],
    beschreibung: extract("BESCHREIBUNG", "BACKEND"),
    backend_keywords: extract("BACKEND"),
  };
}
