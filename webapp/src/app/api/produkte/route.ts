import { getDb, initializeDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await initializeDb();
  const db = getDb();
  const result = await db.execute(
    "SELECT * FROM produkte ORDER BY created_at DESC"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  await initializeDb();
  const body = await req.json();
  const { name, brand, asin, marketplace, kategorie, preis, produktinfo, voice_tone } = body;

  if (!name || !brand) {
    return NextResponse.json(
      { error: "Name und Brand sind Pflichtfelder" },
      { status: 400 }
    );
  }

  const db = getDb();
  const result = await db.execute({
    sql: `INSERT INTO produkte (name, brand, asin, marketplace, kategorie, preis, produktinfo, voice_tone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      name,
      brand,
      asin || null,
      marketplace || "Amazon.de",
      kategorie || null,
      preis || null,
      produktinfo || null,
      voice_tone || null,
    ],
  });

  const produkt = await db.execute({
    sql: "SELECT * FROM produkte WHERE id = ?",
    args: [result.lastInsertRowid!],
  });

  return NextResponse.json(produkt.rows[0], { status: 201 });
}
