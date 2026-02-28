import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const produkt = db.prepare("SELECT * FROM produkte WHERE id = ?").get(id);

  if (!produkt) {
    return NextResponse.json(
      { error: "Produkt nicht gefunden" },
      { status: 404 }
    );
  }

  return NextResponse.json(produkt);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const db = getDb();

  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(body)) {
    if (
      [
        "name",
        "brand",
        "asin",
        "marketplace",
        "kategorie",
        "preis",
        "produktinfo",
        "voice_tone",
        "status",
      ].includes(key)
    ) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) {
    return NextResponse.json(
      { error: "Keine Felder zum Aktualisieren" },
      { status: 400 }
    );
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  db.prepare(`UPDATE produkte SET ${fields.join(", ")} WHERE id = ?`).run(
    ...values
  );

  const produkt = db.prepare("SELECT * FROM produkte WHERE id = ?").get(id);
  return NextResponse.json(produkt);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM produkte WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
