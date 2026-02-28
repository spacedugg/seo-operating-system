"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Content, Produkt, QAScoreDetail } from "@/lib/types";
import { getScoreLabel, getScoreColor } from "@/lib/qa-checks";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  ClipboardCheck,
} from "lucide-react";

export default function QAScorecard() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [produkt, setProdukt] = useState<Produkt | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [scores, setScores] = useState<QAScoreDetail[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(40);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/produkte/${id}`).then((r) => r.json()),
      fetch(`/api/content/${id}`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([p, c]) => {
        setProdukt(p);
        const contents = Array.isArray(c) ? c : [];
        if (contents.length > 0) {
          setContent(contents[contents.length - 1]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function runQA() {
    if (!content) return;
    setRunning(true);
    setError("");

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: content.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "QA-Fehler");
      }

      const data = await res.json();
      setScores(data.scores);
      setTotalScore(data.totalScore);
      setMaxScore(data.maxScore);
      setStatus(data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setRunning(false);
    }
  }

  function updateScore(scoreId: string, newPoints: number) {
    setScores((prev) => {
      const updated = prev.map((s) =>
        s.id === scoreId ? { ...s, punkte: newPoints } : s
      );
      const newTotal = updated.reduce((sum, s) => sum + s.punkte, 0);
      setTotalScore(newTotal);
      if (newTotal >= 36) setStatus("excellent");
      else if (newTotal >= 32) setStatus("good");
      else if (newTotal >= 24) setStatus("adequate");
      else setStatus("insufficient");
      return updated;
    });
  }

  async function markAsFertig() {
    await fetch(`/api/produkte/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "fertig" }),
    });
    router.push(`/produkte/${id}`);
  }

  function exportScorecard() {
    const lines = [
      `QA-Scorecard: ${produkt?.name}`,
      `Datum: ${new Date().toLocaleDateString("de-DE")}`,
      `Ergebnis: ${totalScore}/${maxScore} Punkte - ${getScoreLabel(status)}`,
      "",
      "Kategorie | Kriterium | Punkte | Max | Kommentar",
      "--- | --- | --- | --- | ---",
      ...scores.map(
        (s) =>
          `${s.kategorie} | ${s.name} | ${s.punkte} | ${s.max} | ${s.kommentar}`
      ),
    ];
    const text = lines.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${produkt?.name || "qa"}-scorecard.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Laden...</div>;
  }

  const kategorien = [
    "Keyword-Integration",
    "Content-Struktur",
    "Content-Qualität",
    "Prozess-Compliance",
  ];

  return (
    <div>
      <button
        onClick={() => router.push(`/produkte/${id}`)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zu {produkt?.name}
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">QA-Scorecard</h1>
          <p className="text-gray-500 mt-1">
            Mindestanforderung: 80% (32 von 40 Punkten)
          </p>
        </div>
        {scores.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={exportScorecard}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {totalScore >= 32 && (
              <button
                onClick={markAsFertig}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Freigeben
              </button>
            )}
          </div>
        )}
      </div>

      {!content ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800 font-medium">Kein Content vorhanden</p>
          <p className="text-yellow-700 text-sm mt-1">
            Bitte zuerst Content generieren.
          </p>
        </div>
      ) : (
        <>
          {/* QA starten */}
          {scores.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
              <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">
                QA-Check für Content Version {content.version} starten
              </p>
              <button
                onClick={runQA}
                disabled={running}
                className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {running ? "Prüfe..." : "QA-Check starten"}
              </button>
              {error && (
                <p className="mt-3 text-sm text-red-600">{error}</p>
              )}
            </div>
          )}

          {/* Ergebnis */}
          {scores.length > 0 && (
            <>
              <div
                className={`rounded-xl p-6 mb-6 ${getScoreColor(status)}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      {totalScore}/{maxScore}
                    </p>
                    <p className="text-sm mt-1 font-medium">
                      {getScoreLabel(status)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-75">
                      {Math.round((totalScore / maxScore) * 100)}%
                    </p>
                    <div className="w-32 h-3 bg-white/50 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-current rounded-full transition-all"
                        style={{
                          width: `${(totalScore / maxScore) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scorecard Details */}
              {kategorien.map((kat) => {
                const katScores = scores.filter(
                  (s) => s.kategorie === kat
                );
                if (katScores.length === 0) return null;
                const katTotal = katScores.reduce(
                  (sum, s) => sum + s.punkte,
                  0
                );
                const katMax = katScores.reduce(
                  (sum, s) => sum + s.max,
                  0
                );

                return (
                  <div
                    key={kat}
                    className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{kat}</h3>
                      <span className="text-sm text-gray-500">
                        {katTotal}/{katMax}
                      </span>
                    </div>
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-100">
                        {katScores.map((score) => (
                          <tr key={score.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm w-12 font-mono text-gray-400">
                              {score.id}
                            </td>
                            <td className="px-4 py-3 text-sm flex-1">
                              {score.name}
                            </td>
                            <td className="px-4 py-3 w-40">
                              <div className="flex gap-1">
                                {[0, 1, 2].map((p) => (
                                  <button
                                    key={p}
                                    onClick={() =>
                                      updateScore(score.id, p)
                                    }
                                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                                      score.punkte === p
                                        ? p === 2
                                          ? "bg-green-500 text-white"
                                          : p === 1
                                            ? "bg-yellow-500 text-white"
                                            : "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                    }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400 w-60">
                              {score.kommentar}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
