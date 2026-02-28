"use client";

import { useState } from "react";
import { Settings, Key, Info } from "lucide-react";

export default function Einstellungen() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Einstellungen</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold">Claude API Konfiguration</h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">API-Key einrichten</p>
              <p>
                Der API-Key wird in der Datei <code className="bg-blue-100 px-1 rounded">.env.local</code> im
                Webapp-Verzeichnis konfiguriert:
              </p>
              <pre className="bg-blue-100 rounded p-2 mt-2 text-xs">
                ANTHROPIC_API_KEY=sk-ant-...
              </pre>
              <p className="mt-2">
                Nach dem Setzen des Keys den Dev-Server neu starten.
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>
            <strong>Modell:</strong> Claude Sonnet 4 (claude-sonnet-4-20250514)
          </p>
          <p>
            <strong>Verwendung:</strong> Content-Generierung (Titel, Bulletpoints, Beschreibung, Backend-Keywords)
          </p>
          <p>
            <strong>Kosten:</strong> ca. $0.01–0.03 pro Content-Generierung
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold">Über die App</h2>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>
            <strong>SEO Content Tool</strong> – Internes Tool für den SEO-Content-Fulfillment-Prozess
          </p>
          <p>
            <strong>Workflow:</strong> Produkt anlegen → Keywords importieren → Content generieren → QA prüfen → Exportieren
          </p>
          <p>
            <strong>Tech-Stack:</strong> Next.js, TypeScript, Tailwind CSS, SQLite, Claude API
          </p>
        </div>
      </div>
    </div>
  );
}
