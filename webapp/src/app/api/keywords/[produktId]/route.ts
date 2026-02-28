import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  const { produktId } = await params;
  const db = getDb();
  const keywords = db
    .prepare(
      "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC"
    )
    .all(produktId);
  return NextResponse.json(keywords);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  const { produktId } = await params;
  const body = await req.json();
  const db = getDb();

  if (Array.isArray(body)) {
    const insert = db.prepare(
      `INSERT INTO keywords (produkt_id, keyword, suchvolumen, ist_hauptkeyword, ist_relevant, quelle)
       VALUES (?, ?, ?, ?, ?, ?)`
    );

    const insertMany = db.transaction((keywords: typeof body) => {
      for (const kw of keywords) {
        insert.run(
          produktId,
          kw.keyword,
          kw.suchvolumen || 0,
          kw.ist_hauptkeyword ? 1 : 0,
          kw.ist_relevant !== false ? 1 : 0,
          kw.quelle || "import"
        );
      }
    });

    insertMany(body);
  } else {
    db.prepare(
      `INSERT INTO keywords (produkt_id, keyword, suchvolumen, ist_hauptkeyword, ist_relevant, quelle)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      produktId,
      body.keyword,
      body.suchvolumen || 0,
      body.ist_hauptkeyword ? 1 : 0,
      body.ist_relevant !== false ? 1 : 0,
      body.quelle || "manuell"
    );
  }

  const keywords = db
    .prepare(
      "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC"
    )
    .all(produktId);

  // Status aktualisieren
  db.prepare(
    "UPDATE produkte SET status = 'keywords', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'neu'"
  ).run(produktId);

  return NextResponse.json(keywords, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  const { produktId } = await params;
  const body = await req.json();
  const db = getDb();

  if (body.id && body.action === "toggle_hauptkeyword") {
    const kw = db.prepare("SELECT * FROM keywords WHERE id = ?").get(body.id) as { ist_hauptkeyword: number } | undefined;
    if (kw) {
      db.prepare("UPDATE keywords SET ist_hauptkeyword = ? WHERE id = ?").run(
        kw.ist_hauptkeyword ? 0 : 1,
        body.id
      );
    }
  } else if (body.id && body.action === "toggle_relevant") {
    const kw = db.prepare("SELECT * FROM keywords WHERE id = ?").get(body.id) as { ist_relevant: number } | undefined;
    if (kw) {
      db.prepare("UPDATE keywords SET ist_relevant = ? WHERE id = ?").run(
        kw.ist_relevant ? 0 : 1,
        body.id
      );
    }
  } else if (body.action === "delete") {
    db.prepare(
      "DELETE FROM keywords WHERE id = ? AND produkt_id = ?"
    ).run(body.id, produktId);
  }

  const keywords = db
    .prepare(
      "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC"
    )
    .all(produktId);
  return NextResponse.json(keywords);
}
