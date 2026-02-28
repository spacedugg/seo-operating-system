"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Produkt } from "@/lib/types";
import { Package, Search, FileText, CheckCircle, PlusCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string }> = {
  neu: { label: "Neu", color: "bg-gray-100 text-gray-700" },
  keywords: { label: "Keywords", color: "bg-blue-100 text-blue-700" },
  content: { label: "Content", color: "bg-purple-100 text-purple-700" },
  qa: { label: "QA", color: "bg-yellow-100 text-yellow-700" },
  fertig: { label: "Fertig", color: "bg-green-100 text-green-700" },
};

export default function Dashboard() {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produkte")
      .then((r) => r.json())
      .then(setProdukte)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: produkte.length,
    neu: produkte.filter((p) => p.status === "neu").length,
    inArbeit: produkte.filter((p) =>
      ["keywords", "content", "qa"].includes(p.status)
    ).length,
    fertig: produkte.filter((p) => p.status === "fertig").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            SEO Content Fulfillment Übersicht
          </p>
        </div>
        <Link
          href="/produkte/neu"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Neues Produkt
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Gesamt",
            value: stats.total,
            color: "bg-slate-50 border-slate-200",
          },
          {
            label: "Neu",
            value: stats.neu,
            color: "bg-blue-50 border-blue-200",
          },
          {
            label: "In Arbeit",
            value: stats.inArbeit,
            color: "bg-purple-50 border-purple-200",
          },
          {
            label: "Fertig",
            value: stats.fertig,
            color: "bg-green-50 border-green-200",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} border rounded-xl p-5`}
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Produktliste */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Aktuelle Produkte</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Laden...</div>
        ) : produkte.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Noch keine Produkte vorhanden.</p>
            <Link
              href="/produkte/neu"
              className="text-primary hover:underline text-sm mt-2 inline-block"
            >
              Erstes Produkt anlegen
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Produkt</th>
                <th className="px-4 py-3 font-medium">Marke</th>
                <th className="px-4 py-3 font-medium">Marketplace</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Erstellt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produkte.map((p) => {
                const cfg = statusConfig[p.status] || statusConfig.neu;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/produkte/${p.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {p.brand}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {p.marketplace}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(p.created_at).toLocaleDateString("de-DE")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
