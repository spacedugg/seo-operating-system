import { getDb, initializeDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeDb();
  const { id } = await params;
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM produkte WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Produkt nicht gefunden" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeDb();
  const { id } = await params;
  const body = await req.json();
  const db = getDb();

  const allowedFields = [
    "name", "brand", "asin", "marketplace", "kategorie",
    "preis", "produktinfo", "voice_tone", "status",
  ];

  const fields: string[] = [];
  const values: (string | null)[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (allowedFields.includes(key)) {
      fields.push(`${key} = ?`);
      values.push(value as string);
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

  await db.execute({
    sql: `UPDATE produkte SET ${fields.join(", ")} WHERE id = ?`,
    args: values,
  });

  const result = await db.execute({
    sql: "SELECT * FROM produkte WHERE id = ?",
    args: [id],
  });
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeDb();
  const { id } = await params;
  const db = getDb();
  await db.execute({ sql: "DELETE FROM produkte WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
