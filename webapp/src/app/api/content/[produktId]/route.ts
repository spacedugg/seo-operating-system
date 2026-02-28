import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ produktId: string }> }
) {
  const { produktId } = await params;
  const db = getDb();
  const contents = db
    .prepare(
      "SELECT * FROM content WHERE produkt_id = ? ORDER BY version ASC"
    )
    .all(produktId);
  return NextResponse.json(contents);
}
