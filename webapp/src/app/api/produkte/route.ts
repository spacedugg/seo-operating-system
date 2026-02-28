import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const produkte = db
    .prepare("SELECT * FROM produkte ORDER BY created_at DESC")
    .all();
  return NextResponse.json(produkte);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    brand,
    asin,
    marketplace,
    kategorie,
    preis,
    produktinfo,
    voice_tone,
  } = body;

  if (!name || !brand) {
    return NextResponse.json(
      { error: "Name und Brand sind Pflichtfelder" },
      { status: 400 }
    );
  }

  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO produkte (name, brand, asin, marketplace, kategorie, preis, produktinfo, voice_tone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      name,
      brand,
      asin || null,
      marketplace || "Amazon.de",
      kategorie || null,
      preis || null,
      produktinfo || null,
      voice_tone || null
    );

  const produkt = db
    .prepare("SELECT * FROM produkte WHERE id = ?")
    .get(result.lastInsertRowid);
  return NextResponse.json(produkt, { status: 201 });
}
