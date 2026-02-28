"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Content, Produkt, Keyword } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Download,
} from "lucide-react";

export default function ContentGenerator() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [produkt, setProdukt] = useState<Produkt | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [anweisungen, setAnweisungen] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/produkte/${id}`).then((r) => r.json()),
      fetch(`/api/keywords/${id}`).then((r) => r.json()),
      fetch(`/api/content/${id}`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([p, kw, c]) => {
        setProdukt(p);
        setKeywords(Array.isArray(kw) ? kw : []);
        const contents = Array.isArray(c) ? c : [];
        if (contents.length > 0) {
          setContent(contents[contents.length - 1]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleGenerate() {
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produktId: parseInt(id as string),
          anweisungen: anweisungen || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Fehler bei der Generierung");
      }

      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setGenerating(false);
    }
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  function exportAsText() {
    if (!content) return;
    const text = `TITEL:\n${content.titel || ""}\n\nBULLETPOINT 1:\n${content.bullet1 || ""}\n\nBULLETPOINT 2:\n${content.bullet2 || ""}\n\nBULLETPOINT 3:\n${content.bullet3 || ""}\n\nBULLETPOINT 4:\n${content.bullet4 || ""}\n\nBULLETPOINT 5:\n${content.bullet5 || ""}\n\nBESCHREIBUNG:\n${content.beschreibung || ""}\n\nBACKEND-KEYWORDS:\n${content.backend_keywords || ""}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${produkt?.name || "content"}-seo.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Laden...</div>;
  }

  const hauptkeywords = keywords.filter((k) => k.ist_hauptkeyword);

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
          <h1 className="text-2xl font-bold">Content-Generator</h1>
          <p className="text-gray-500 mt-1">
            {hauptkeywords.length} Hauptkeywords ·{" "}
            {content ? `Version ${content.version}` : "Kein Content"}
          </p>
        </div>
        <div className="flex gap-2">
          {content && (
            <>
              <button
                onClick={exportAsText}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <Link
                href={`/produkte/${id}/qa`}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors text-sm"
              >
                Weiter zu QA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </div>

      {hauptkeywords.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800 font-medium">
            Keine Hauptkeywords definiert
          </p>
          <p className="text-yellow-700 text-sm mt-1">
            Bitte zuerst Keywords importieren und Hauptkeywords markieren.
          </p>
          <Link
            href={`/produkte/${id}/keywords`}
            className="text-primary hover:underline text-sm mt-3 inline-block"
          >
            Zum Keyword-Management
          </Link>
        </div>
      ) : (
        <>
          {/* Generator Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold mb-3">Content generieren</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zusätzliche Anweisungen (optional)
              </label>
              <textarea
                value={anweisungen}
                onChange={(e) => setAnweisungen(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="z.B. Fokus auf Nachhaltigkeit, bestimmte Features hervorheben..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                {generating
                  ? "Generiere..."
                  : content
                    ? "Neu generieren"
                    : "Content generieren"}
              </button>

              {generating && (
                <span className="text-sm text-gray-400">
                  Claude erstellt den Content... (ca. 15-30 Sekunden)
                </span>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Content Anzeige */}
          {content && (
            <div className="space-y-4">
              <ContentField
                label="Titel"
                value={content.titel}
                maxLen={200}
                copied={copied === "titel"}
                onCopy={() =>
                  copyToClipboard(content.titel || "", "titel")
                }
              />

              {[
                { key: "bullet1", label: "Bulletpoint 1", val: content.bullet1 },
                { key: "bullet2", label: "Bulletpoint 2", val: content.bullet2 },
                { key: "bullet3", label: "Bulletpoint 3", val: content.bullet3 },
                { key: "bullet4", label: "Bulletpoint 4", val: content.bullet4 },
                { key: "bullet5", label: "Bulletpoint 5", val: content.bullet5 },
              ].map((b) => (
                <ContentField
                  key={b.key}
                  label={b.label}
                  value={b.val}
                  maxLen={500}
                  copied={copied === b.key}
                  onCopy={() => copyToClipboard(b.val || "", b.key)}
                />
              ))}

              <ContentField
                label="Produktbeschreibung"
                value={content.beschreibung}
                copied={copied === "beschreibung"}
                onCopy={() =>
                  copyToClipboard(content.beschreibung || "", "beschreibung")
                }
              />

              <ContentField
                label="Backend-Keywords"
                value={content.backend_keywords}
                copied={copied === "backend"}
                onCopy={() =>
                  copyToClipboard(
                    content.backend_keywords || "",
                    "backend"
                  )
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ContentField({
  label,
  value,
  maxLen,
  copied,
  onCopy,
}: {
  label: string;
  value: string | null;
  maxLen?: number;
  copied: boolean;
  onCopy: () => void;
}) {
  const text = value || "";
  const len = text.length;
  const overLimit = maxLen ? len > maxLen : false;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-sm">{label}</h3>
          {maxLen && (
            <span
              className={`text-xs ${overLimit ? "text-red-500 font-medium" : "text-gray-400"}`}
            >
              {len}/{maxLen} Zeichen
            </span>
          )}
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">Kopiert</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Kopieren
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {text || <span className="text-gray-300 italic">Noch kein Inhalt</span>}
      </p>
    </div>
  );
}
