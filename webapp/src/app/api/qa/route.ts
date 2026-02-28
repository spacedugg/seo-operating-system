import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { runAutomatedQA, getScoreStatus } from "@/lib/qa-checks";
import type { Content, Keyword } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contentId } = body;

  if (!contentId) {
    return NextResponse.json(
      { error: "contentId ist erforderlich" },
      { status: 400 }
    );
  }

  const db = getDb();
  const content = db
    .prepare("SELECT * FROM content WHERE id = ?")
    .get(contentId) as Content | undefined;

  if (!content) {
    return NextResponse.json(
      { error: "Content nicht gefunden" },
      { status: 404 }
    );
  }

  const keywords = db
    .prepare(
      "SELECT * FROM keywords WHERE produkt_id = ? AND ist_relevant = 1"
    )
    .all(content.produkt_id) as Keyword[];

  const scores = runAutomatedQA(content, keywords);
  const totalScore = scores.reduce((sum, s) => sum + s.punkte, 0);
  const maxScore = scores.reduce((sum, s) => sum + s.max, 0);
  const status = getScoreStatus(totalScore);

  const result = db
    .prepare(
      `INSERT INTO qa_scores (content_id, scores, total_score, max_score, status)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(contentId, JSON.stringify(scores), totalScore, maxScore, status);

  db.prepare(
    "UPDATE produkte SET status = 'qa', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).run(content.produkt_id);

  const qaScore = db
    .prepare("SELECT * FROM qa_scores WHERE id = ?")
    .get(result.lastInsertRowid);

  return NextResponse.json({ qaScore, scores, totalScore, maxScore, status });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { qaId, scores, notizen } = body;

  if (!qaId || !scores) {
    return NextResponse.json(
      { error: "qaId und scores sind erforderlich" },
      { status: 400 }
    );
  }

  const db = getDb();
  const parsedScores = typeof scores === "string" ? JSON.parse(scores) : scores;
  const totalScore = parsedScores.reduce(
    (sum: number, s: { punkte: number }) => sum + s.punkte,
    0
  );
  const status = getScoreStatus(totalScore);

  db.prepare(
    `UPDATE qa_scores SET scores = ?, total_score = ?, status = ?, notizen = ? WHERE id = ?`
  ).run(JSON.stringify(parsedScores), totalScore, status, notizen || null, qaId);

  const qaScore = db
    .prepare("SELECT * FROM qa_scores WHERE id = ?")
    .get(qaId);

  return NextResponse.json(qaScore);
}
