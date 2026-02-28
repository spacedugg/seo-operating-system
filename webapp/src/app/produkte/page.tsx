"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Produkt } from "@/lib/types";
import { PlusCircle, Trash2 } from "lucide-react";

export default function ProdukteListe() {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produkte")
      .then((r) => r.json())
      .then(setProdukte)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Produkt wirklich löschen? Alle Keywords und Content werden ebenfalls gelöscht.")) return;
    await fetch(`/api/produkte/${id}`, { method: "DELETE" });
    setProdukte((prev) => prev.filter((p) => p.id !== id));
  }

  const statusLabels: Record<string, string> = {
    neu: "Neu",
    keywords: "Keywords",
    content: "Content",
    qa: "QA",
    fertig: "Fertig",
  };

  const statusColors: Record<string, string> = {
    neu: "bg-gray-100 text-gray-700",
    keywords: "bg-blue-100 text-blue-700",
    content: "bg-purple-100 text-purple-700",
    qa: "bg-yellow-100 text-yellow-700",
    fertig: "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produkte</h1>
        <Link
          href="/produkte/neu"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Neues Produkt
        </Link>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Laden...</div>
      ) : produkte.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">Noch keine Produkte vorhanden.</p>
          <Link href="/produkte/neu" className="text-primary hover:underline">
            Erstes Produkt anlegen
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Produkt</th>
                <th className="px-4 py-3 font-medium">Marke</th>
                <th className="px-4 py-3 font-medium">ASIN</th>
                <th className="px-4 py-3 font-medium">Marketplace</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Erstellt</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produkte.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/produkte/${p.id}`} className="font-medium text-primary hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.brand}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{p.asin || "–"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.marketplace}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[p.status] || statusColors.neu}`}>
                      {statusLabels[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(p.created_at).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Löschen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
