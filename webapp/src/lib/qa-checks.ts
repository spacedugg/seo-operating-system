import type { Content, Keyword, QAScoreDetail } from "./types";

export function runAutomatedQA(
  content: Content,
  keywords: Keyword[]
): QAScoreDetail[] {
  const hauptkeywords = keywords.filter((k) => k.ist_hauptkeyword);
  const allText = [
    content.titel,
    content.bullet1,
    content.bullet2,
    content.bullet3,
    content.bullet4,
    content.bullet5,
    content.beschreibung,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const bullets = [
    content.bullet1,
    content.bullet2,
    content.bullet3,
    content.bullet4,
    content.bullet5,
  ].filter(Boolean) as string[];

  const titel = content.titel || "";

  const scores: QAScoreDetail[] = [];

  // A1: Alle 6 Hauptkeywords vorhanden
  const foundMain = hauptkeywords.filter((k) =>
    allText.includes(k.keyword.toLowerCase())
  ).length;
  const missingMain = hauptkeywords.length - foundMain;
  scores.push({
    id: "A1",
    name: "Alle Hauptkeywords vorhanden",
    kategorie: "Keyword-Integration",
    punkte: missingMain === 0 ? 2 : missingMain <= 2 ? 1 : 0,
    max: 2,
    kommentar:
      missingMain === 0
        ? `Alle ${hauptkeywords.length} Hauptkeywords gefunden`
        : `${missingMain} Hauptkeyword(s) fehlen`,
  });

  // A2: Keywords 6-12x insgesamt
  let totalKeywordCount = 0;
  for (const kw of hauptkeywords) {
    const regex = new RegExp(escapeRegex(kw.keyword.toLowerCase()), "gi");
    const matches = allText.match(regex);
    totalKeywordCount += matches ? matches.length : 0;
  }
  scores.push({
    id: "A2",
    name: "Keyword-Frequenz 6–12x",
    kategorie: "Keyword-Integration",
    punkte:
      totalKeywordCount >= 6 && totalKeywordCount <= 12
        ? 2
        : totalKeywordCount >= 6 || totalKeywordCount <= 15
          ? 1
          : 0,
    max: 2,
    kommentar: `Keywords ${totalKeywordCount}x im Content gefunden`,
  });

  // A3: Kein Keyword >2x im Titel
  let titleDuplicates = 0;
  for (const kw of hauptkeywords) {
    const regex = new RegExp(escapeRegex(kw.keyword.toLowerCase()), "gi");
    const matches = titel.toLowerCase().match(regex);
    if (matches && matches.length > 2) titleDuplicates++;
  }
  scores.push({
    id: "A3",
    name: "Keine Keyword-Duplikate im Titel",
    kategorie: "Keyword-Integration",
    punkte: titleDuplicates === 0 ? 2 : titleDuplicates === 1 ? 1 : 0,
    max: 2,
    kommentar:
      titleDuplicates === 0
        ? "Keine Duplikate im Titel"
        : `${titleDuplicates} Keyword(s) >2x im Titel`,
  });

  // A4: Backend-Keywords vorhanden
  const hasBackend =
    content.backend_keywords && content.backend_keywords.trim().length > 0;
  scores.push({
    id: "A4",
    name: "Backend-Keywords vorhanden",
    kategorie: "Keyword-Integration",
    punkte: hasBackend ? 2 : 0,
    max: 2,
    kommentar: hasBackend
      ? "Backend-Keywords vorhanden"
      : "Backend-Keywords fehlen",
  });

  // A5: Keine Wettbewerber-Markennamen (manuell – Standard 2)
  scores.push({
    id: "A5",
    name: "Keine Wettbewerber-Markennamen",
    kategorie: "Keyword-Integration",
    punkte: 2,
    max: 2,
    kommentar: "Manuell prüfen",
  });

  // B1: Titel beginnt mit Hauptkeyword
  const firstKeyword = hauptkeywords[0];
  const titelStartsWithKw =
    firstKeyword &&
    titel.toLowerCase().startsWith(firstKeyword.keyword.toLowerCase());
  scores.push({
    id: "B1",
    name: "Titel beginnt mit Hauptkeyword",
    kategorie: "Content-Struktur",
    punkte: titelStartsWithKw ? 2 : titel.length > 0 ? 1 : 0,
    max: 2,
    kommentar: titelStartsWithKw
      ? "Titel beginnt korrekt mit Hauptkeyword"
      : "Titel beginnt nicht mit Hauptkeyword",
  });

  // B2: Titel ≤200 Zeichen
  const titelLen = titel.length;
  scores.push({
    id: "B2",
    name: "Titel ≤200 Zeichen",
    kategorie: "Content-Struktur",
    punkte: titelLen <= 200 ? 2 : titelLen <= 250 ? 1 : 0,
    max: 2,
    kommentar: `Titel hat ${titelLen} Zeichen`,
  });

  // B3: Genau 5 Bulletpoints
  scores.push({
    id: "B3",
    name: "Genau 5 Bulletpoints",
    kategorie: "Content-Struktur",
    punkte: bullets.length === 5 ? 2 : 0,
    max: 2,
    kommentar: `${bullets.length} Bulletpoints vorhanden`,
  });

  // B4: Bulletpoints starten mit GROSSBUCHSTABEN
  const capsCount = bullets.filter((b) => {
    const firstWord = b.split(/[\s–—:-]/)[0];
    return firstWord === firstWord.toUpperCase() && firstWord.length > 1;
  }).length;
  scores.push({
    id: "B4",
    name: "Bulletpoints mit CAPS",
    kategorie: "Content-Struktur",
    punkte: capsCount === 5 ? 2 : capsCount >= 3 ? 1 : 0,
    max: 2,
    kommentar: `${capsCount}/5 Bulletpoints mit Großbuchstaben-Start`,
  });

  // B5: Bulletpoints ≤500 Zeichen
  const overLenBullets = bullets.filter((b) => b.length > 500).length;
  scores.push({
    id: "B5",
    name: "Bulletpoints ≤500 Zeichen",
    kategorie: "Content-Struktur",
    punkte: overLenBullets === 0 ? 2 : overLenBullets === 1 ? 1 : 0,
    max: 2,
    kommentar:
      overLenBullets === 0
        ? "Alle Bulletpoints unter 500 Zeichen"
        : `${overLenBullets} Bulletpoint(s) über 500 Zeichen`,
  });

  // C1-C6: Content-Qualität (manuell, Standard 1)
  const manualChecks = [
    {
      id: "C1",
      name: "Natürliche Keyword-Integration",
      kommentar: "Manuell bewerten",
    },
    {
      id: "C2",
      name: "Verkaufspsychologie (Benefits + Features)",
      kommentar: "Manuell bewerten",
    },
    {
      id: "C3",
      name: "Emotionalisierung / Kaufimpuls",
      kommentar: "Manuell bewerten",
    },
    { id: "C4", name: "Voice & Tone passend", kommentar: "Manuell bewerten" },
    {
      id: "C5",
      name: "Keine Rechtschreib-/Grammatikfehler",
      kommentar: "Manuell bewerten",
    },
    {
      id: "C6",
      name: "Produktbeschreibung vorhanden & vollständig",
      kommentar:
        content.beschreibung && content.beschreibung.length > 50
          ? "Beschreibung vorhanden"
          : "Beschreibung prüfen",
    },
  ];

  for (const check of manualChecks) {
    scores.push({
      ...check,
      kategorie: "Content-Qualität",
      punkte: 1,
      max: 2,
    });
  }

  // D1-D4: Prozess-Compliance (Standard 2, da App intern)
  const processChecks = [
    { id: "D1", name: "Content in Projektübersicht", kommentar: "Via App" },
    { id: "D2", name: "Keyword-Pool dokumentiert", kommentar: "Via App" },
    { id: "D3", name: "Ticket-Status korrekt", kommentar: "Via App" },
    { id: "D4", name: "Varianten konsistent", kommentar: "Manuell prüfen" },
  ];

  for (const check of processChecks) {
    scores.push({
      ...check,
      kategorie: "Prozess-Compliance",
      punkte: 2,
      max: 2,
    });
  }

  return scores;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getScoreStatus(
  total: number
): "excellent" | "good" | "adequate" | "insufficient" {
  if (total >= 36) return "excellent";
  if (total >= 32) return "good";
  if (total >= 24) return "adequate";
  return "insufficient";
}

export function getScoreLabel(status: string): string {
  switch (status) {
    case "excellent":
      return "Exzellent (36–40) – Direkt freigeben";
    case "good":
      return "Gut (32–35) – Freigabe (optional verbessern)";
    case "adequate":
      return "Ausreichend (24–31) – Nachbesserung nötig";
    case "insufficient":
      return "Ungenügend (<24) – Überarbeitung erforderlich";
    default:
      return "";
  }
}

export function getScoreColor(status: string): string {
  switch (status) {
    case "excellent":
      return "text-green-600 bg-green-50";
    case "good":
      return "text-blue-600 bg-blue-50";
    case "adequate":
      return "text-yellow-600 bg-yellow-50";
    case "insufficient":
      return "text-red-600 bg-red-50";
    default:
      return "";
  }
}
