import { getDb, initializeDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import type { InStatement } from "@libsql/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  await initializeDb();
  const { produktId } = await params;
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC",
    args: [produktId],
  });
  return NextResponse.json(result.rows);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  await initializeDb();
  const { produktId } = await params;
  const body = await req.json();
  const db = getDb();

  if (Array.isArray(body)) {
    const statements: InStatement[] = body.map((kw) => ({
      sql: `INSERT INTO keywords (produkt_id, keyword, suchvolumen, ist_hauptkeyword, ist_relevant, quelle)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        produktId,
        kw.keyword,
        kw.suchvolumen || 0,
        kw.ist_hauptkeyword ? 1 : 0,
        kw.ist_relevant !== false ? 1 : 0,
        kw.quelle || "import",
      ],
    }));

    await db.batch(statements, "write");
  } else {
    await db.execute({
      sql: `INSERT INTO keywords (produkt_id, keyword, suchvolumen, ist_hauptkeyword, ist_relevant, quelle)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        produktId,
        body.keyword,
        body.suchvolumen || 0,
        body.ist_hauptkeyword ? 1 : 0,
        body.ist_relevant !== false ? 1 : 0,
        body.quelle || "manuell",
      ],
    });
  }

  // Status aktualisieren
  await db.execute({
    sql: "UPDATE produkte SET status = 'keywords', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'neu'",
    args: [produktId],
  });

  const keywords = await db.execute({
    sql: "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC",
    args: [produktId],
  });

  return NextResponse.json(keywords.rows, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  await initializeDb();
  const { produktId } = await params;
  const body = await req.json();
  const db = getDb();

  if (body.id && body.action === "toggle_hauptkeyword") {
    const kw = await db.execute({
      sql: "SELECT * FROM keywords WHERE id = ?",
      args: [body.id],
    });
    if (kw.rows.length > 0) {
      const current = kw.rows[0].ist_hauptkeyword as number;
      await db.execute({
        sql: "UPDATE keywords SET ist_hauptkeyword = ? WHERE id = ?",
        args: [current ? 0 : 1, body.id],
      });
    }
  } else if (body.id && body.action === "toggle_relevant") {
    const kw = await db.execute({
      sql: "SELECT * FROM keywords WHERE id = ?",
      args: [body.id],
    });
    if (kw.rows.length > 0) {
      const current = kw.rows[0].ist_relevant as number;
      await db.execute({
        sql: "UPDATE keywords SET ist_relevant = ? WHERE id = ?",
        args: [current ? 0 : 1, body.id],
      });
    }
  } else if (body.action === "delete") {
    await db.execute({
      sql: "DELETE FROM keywords WHERE id = ? AND produkt_id = ?",
      args: [body.id, produktId],
    });
  }

  const keywords = await db.execute({
    sql: "SELECT * FROM keywords WHERE produkt_id = ? ORDER BY ist_hauptkeyword DESC, suchvolumen DESC",
    args: [produktId],
  });
  return NextResponse.json(keywords.rows);
}
