"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Keyword, Produkt } from "@/lib/types";
import Papa from "papaparse";
import {
  ArrowLeft,
  Upload,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function KeywordManagement() {
  const params = useParams();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const id = params.id;

  const [produkt, setProdukt] = useState<Produkt | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newVolume, setNewVolume] = useState("");
  const [filter, setFilter] = useState<"alle" | "relevant" | "hauptkeywords">(
    "alle"
  );

  useEffect(() => {
    Promise.all([
      fetch(`/api/produkte/${id}`).then((r) => r.json()),
      fetch(`/api/keywords/${id}`).then((r) => r.json()),
    ])
      .then(([p, kw]) => {
        setProdukt(p);
        setKeywords(Array.isArray(kw) ? kw : []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCsvImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as Record<string, string>[];
        const mapped = rows
          .map((row) => {
            // Helium 10 Cerebro CSV-Format erkennen
            const keyword =
              row["Keyword"] ||
              row["keyword"] ||
              row["Phrase"] ||
              row["phrase"] ||
              row["Search Term"] ||
              Object.values(row)[0] ||
              "";
            const volume =
              row["Search Volume"] ||
              row["search_volume"] ||
              row["Suchvolumen"] ||
              row["Volume"] ||
              row["Estimated Exact Search Volume"] ||
              "0";

            return {
              keyword: keyword.trim(),
              suchvolumen: parseInt(volume.replace(/[^0-9]/g, "")) || 0,
              quelle: "csv-import",
            };
          })
          .filter((k) => k.keyword.length > 0);

        if (mapped.length === 0) {
          alert(
            "Keine Keywords in der CSV gefunden. Stelle sicher, dass eine Spalte 'Keyword' oder 'Phrase' existiert."
          );
          setImporting(false);
          return;
        }

        const res = await fetch(`/api/keywords/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mapped),
        });

        const updated = await res.json();
        setKeywords(Array.isArray(updated) ? updated : []);
        setImporting(false);
        if (fileRef.current) fileRef.current.value = "";
      },
      error: () => {
        alert("Fehler beim Lesen der CSV-Datei.");
        setImporting(false);
      },
    });
  }

  async function addKeyword() {
    if (!newKeyword.trim()) return;
    const res = await fetch(`/api/keywords/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: newKeyword.trim(),
        suchvolumen: parseInt(newVolume) || 0,
        quelle: "manuell",
      }),
    });
    const updated = await res.json();
    setKeywords(Array.isArray(updated) ? updated : []);
    setNewKeyword("");
    setNewVolume("");
  }

  async function toggleHauptkeyword(kwId: number) {
    const res = await fetch(`/api/keywords/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: kwId, action: "toggle_hauptkeyword" }),
    });
    const updated = await res.json();
    setKeywords(Array.isArray(updated) ? updated : []);
  }

  async function toggleRelevant(kwId: number) {
    const res = await fetch(`/api/keywords/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: kwId, action: "toggle_relevant" }),
    });
    const updated = await res.json();
    setKeywords(Array.isArray(updated) ? updated : []);
  }

  async function deleteKeyword(kwId: number) {
    const res = await fetch(`/api/keywords/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: kwId, action: "delete" }),
    });
    const updated = await res.json();
    setKeywords(Array.isArray(updated) ? updated : []);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Laden...</div>;
  }

  const hauptkeywords = keywords.filter((k) => k.ist_hauptkeyword);
  const filteredKeywords = keywords.filter((k) => {
    if (filter === "relevant") return k.ist_relevant;
    if (filter === "hauptkeywords") return k.ist_hauptkeyword;
    return true;
  });

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
          <h1 className="text-2xl font-bold">Keyword-Management</h1>
          <p className="text-gray-500 mt-1">
            {keywords.length} Keywords · {hauptkeywords.length}/6
            Hauptkeywords
          </p>
        </div>
        <Link
          href={`/produkte/${id}/content`}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          Weiter zu Content
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Import & Hinzufügen */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          {/* CSV Import */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CSV importieren (Helium 10 / Cerebro)
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept=".csv"
                onChange={handleCsvImport}
                className="text-sm file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {importing && (
                <span className="text-sm text-gray-400">Importiere...</span>
              )}
            </div>
          </div>

          <div className="border-l border-gray-200 pl-4 flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keyword manuell hinzufügen
            </label>
            <div className="flex gap-2">
              <input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Keyword eingeben"
              />
              <input
                value={newVolume}
                onChange={(e) => setNewVolume(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Volumen"
                type="number"
              />
              <button
                onClick={addKeyword}
                className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptkeywords Anzeige */}
      {hauptkeywords.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-yellow-800 text-sm mb-2">
            Hauptkeywords ({hauptkeywords.length}/6)
          </h3>
          <div className="flex flex-wrap gap-2">
            {hauptkeywords.map((k) => (
              <span
                key={k.id}
                className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <Star className="w-3.5 h-3.5" />
                {k.keyword}
                {k.suchvolumen > 0 && (
                  <span className="text-yellow-600 text-xs ml-1">
                    ({k.suchvolumen.toLocaleString("de-DE")})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["alle", "relevant", "hauptkeywords"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "alle"
              ? `Alle (${keywords.length})`
              : f === "relevant"
                ? `Relevant (${keywords.filter((k) => k.ist_relevant).length})`
                : `Hauptkeywords (${hauptkeywords.length})`}
          </button>
        ))}
      </div>

      {/* Keyword-Tabelle */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredKeywords.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {keywords.length === 0
              ? "Noch keine Keywords. Importiere eine CSV oder füge Keywords manuell hinzu."
              : "Keine Keywords für diesen Filter."}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium w-12">Haupt</th>
                <th className="px-4 py-3 font-medium">Keyword</th>
                <th className="px-4 py-3 font-medium w-32">Suchvolumen</th>
                <th className="px-4 py-3 font-medium w-24">Quelle</th>
                <th className="px-4 py-3 font-medium w-24">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredKeywords.map((kw) => (
                <tr
                  key={kw.id}
                  className={`transition-colors ${
                    !kw.ist_relevant
                      ? "opacity-40 bg-gray-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2.5 text-center">
                    <button
                      onClick={() => toggleHauptkeyword(kw.id)}
                      className={`transition-colors ${
                        kw.ist_hauptkeyword
                          ? "text-yellow-500"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                      title={
                        kw.ist_hauptkeyword
                          ? "Hauptkeyword entfernen"
                          : "Als Hauptkeyword markieren"
                      }
                    >
                      {kw.ist_hauptkeyword ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : (
                        <StarOff className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-sm font-medium">
                    {kw.keyword}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-600 font-mono">
                    {kw.suchvolumen > 0
                      ? kw.suchvolumen.toLocaleString("de-DE")
                      : "–"}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-400">
                    {kw.quelle}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleRelevant(kw.id)}
                        className={`p-1 rounded transition-colors ${
                          kw.ist_relevant
                            ? "text-green-500 hover:text-green-700"
                            : "text-gray-300 hover:text-gray-500"
                        }`}
                        title={
                          kw.ist_relevant
                            ? "Als irrelevant markieren"
                            : "Als relevant markieren"
                        }
                      >
                        {kw.ist_relevant ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteKeyword(kw.id)}
                        className="p-1 rounded text-gray-300 hover:text-red-500 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
