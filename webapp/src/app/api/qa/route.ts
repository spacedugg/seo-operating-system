import { getDb, initializeDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { runAutomatedQA, getScoreStatus } from "@/lib/qa-checks";
import type { Content, Keyword } from "@/lib/types";

export async function POST(req: NextRequest) {
  await initializeDb();
  const body = await req.json();
  const { contentId } = body;

  if (!contentId) {
    return NextResponse.json(
      { error: "contentId ist erforderlich" },
      { status: 400 }
    );
  }

  const db = getDb();
  const contentResult = await db.execute({
    sql: "SELECT * FROM content WHERE id = ?",
    args: [contentId],
  });

  if (contentResult.rows.length === 0) {
    return NextResponse.json(
      { error: "Content nicht gefunden" },
      { status: 404 }
    );
  }

  const content = contentResult.rows[0] as unknown as Content;

  const keywordsResult = await db.execute({
    sql: "SELECT * FROM keywords WHERE produkt_id = ? AND ist_relevant = 1",
    args: [content.produkt_id],
  });

  const keywords = keywordsResult.rows as unknown as Keyword[];

  const scores = runAutomatedQA(content, keywords);
  const totalScore = scores.reduce((sum, s) => sum + s.punkte, 0);
  const maxScore = scores.reduce((sum, s) => sum + s.max, 0);
  const status = getScoreStatus(totalScore);

  const result = await db.execute({
    sql: `INSERT INTO qa_scores (content_id, scores, total_score, max_score, status)
          VALUES (?, ?, ?, ?, ?)`,
    args: [contentId, JSON.stringify(scores), totalScore, maxScore, status],
  });

  await db.execute({
    sql: "UPDATE produkte SET status = 'qa', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [content.produkt_id],
  });

  const qaScore = await db.execute({
    sql: "SELECT * FROM qa_scores WHERE id = ?",
    args: [result.lastInsertRowid!],
  });

  return NextResponse.json({
    qaScore: qaScore.rows[0],
    scores,
    totalScore,
    maxScore,
    status,
  });
}

export async function PUT(req: NextRequest) {
  await initializeDb();
  const body = await req.json();
  const { qaId, scores, notizen } = body;

  if (!qaId || !scores) {
    return NextResponse.json(
      { error: "qaId und scores sind erforderlich" },
      { status: 400 }
    );
  }

  const db = getDb();
  const parsedScores =
    typeof scores === "string" ? JSON.parse(scores) : scores;
  const totalScore = parsedScores.reduce(
    (sum: number, s: { punkte: number }) => sum + s.punkte,
    0
  );
  const status = getScoreStatus(totalScore);

  await db.execute({
    sql: `UPDATE qa_scores SET scores = ?, total_score = ?, status = ?, notizen = ? WHERE id = ?`,
    args: [JSON.stringify(parsedScores), totalScore, status, notizen || null, qaId],
  });

  const qaScore = await db.execute({
    sql: "SELECT * FROM qa_scores WHERE id = ?",
    args: [qaId],
  });

  return NextResponse.json(qaScore.rows[0]);
}
