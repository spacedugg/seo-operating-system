import { getDb, initializeDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  await initializeDb();
  const { produktId } = await params;
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM content WHERE produkt_id = ? ORDER BY version ASC",
    args: [produktId],
  });
  return NextResponse.json(result.rows);
}
