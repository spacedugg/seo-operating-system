"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Produkt, Content, Keyword } from "@/lib/types";
import {
  Search,
  FileText,
  CheckCircle,
  Download,
  ArrowLeft,
} from "lucide-react";

export default function ProduktDetail() {
  const params = useParams();
  const router = useRouter();
  const [produkt, setProdukt] = useState<Produkt | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const id = params.id;

  useEffect(() => {
    Promise.all([
      fetch(`/api/produkte/${id}`).then((r) => r.json()),
      fetch(`/api/keywords/${id}`).then((r) => r.json()),
    ])
      .then(([p, kw]) => {
        setProdukt(p);
        setKeywords(Array.isArray(kw) ? kw : []);
        // Content separat laden
        return fetch(
          `/api/produkte/${id}`,
          { method: "GET" }
        );
      })
      .finally(() => setLoading(false));

    // Content laden
    fetch(`/api/content/${id}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((c) => setContents(Array.isArray(c) ? c : []))
      .catch(() => {});
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Laden...</div>;
  }

  if (!produkt) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Produkt nicht gefunden.</p>
        <Link href="/produkte" className="text-primary hover:underline mt-2 inline-block">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  const hauptkeywords = keywords.filter((k) => k.ist_hauptkeyword);
  const relevantKeywords = keywords.filter((k) => k.ist_relevant);

  const steps = [
    {
      label: "Keywords",
      href: `/produkte/${id}/keywords`,
      icon: Search,
      done: keywords.length > 0,
      count: `${hauptkeywords.length}/6 Hauptkeywords`,
    },
    {
      label: "Content",
      href: `/produkte/${id}/content`,
      icon: FileText,
      done: contents.length > 0,
      count: contents.length > 0 ? `Version ${contents.length}` : "Noch kein Content",
    },
    {
      label: "QA",
      href: `/produkte/${id}/qa`,
      icon: CheckCircle,
      done: produkt.status === "qa" || produkt.status === "fertig",
      count: produkt.status === "fertig" ? "Freigegeben" : "Ausstehend",
    },
  ];

  return (
    <div>
      <button
        onClick={() => router.push("/produkte")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{produkt.name}</h1>
          <p className="text-gray-500 mt-1">
            {produkt.brand} · {produkt.marketplace}
            {produkt.asin ? ` · ${produkt.asin}` : ""}
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            {
              neu: "bg-gray-100 text-gray-700",
              keywords: "bg-blue-100 text-blue-700",
              content: "bg-purple-100 text-purple-700",
              qa: "bg-yellow-100 text-yellow-700",
              fertig: "bg-green-100 text-green-700",
            }[produkt.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {
            {
              neu: "Neu",
              keywords: "Keywords",
              content: "Content",
              qa: "QA",
              fertig: "Fertig",
            }[produkt.status] || produkt.status
          }
        </span>
      </div>

      {/* Produktinfo */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-3">Produktdetails</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {produkt.kategorie && (
            <div>
              <span className="text-gray-500">Kategorie:</span>{" "}
              {produkt.kategorie}
            </div>
          )}
          {produkt.preis && (
            <div>
              <span className="text-gray-500">Preis:</span> {produkt.preis}
            </div>
          )}
        </div>
        {produkt.produktinfo && (
          <div className="mt-3 text-sm">
            <span className="text-gray-500">Info:</span>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              {produkt.produktinfo}
            </p>
          </div>
        )}
        {produkt.voice_tone && (
          <div className="mt-3 text-sm">
            <span className="text-gray-500">Voice & Tone:</span>
            <p className="mt-1 text-gray-700">{produkt.voice_tone}</p>
          </div>
        )}
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <Link
            key={step.label}
            href={step.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  step.done
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400">Schritt {i + 1}</span>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {step.label}
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-500">{step.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
