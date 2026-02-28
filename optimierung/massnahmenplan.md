# Massnahmenplan – 7 Optimierungshebel

Jeder Hebel adressiert einen strukturellen Engpass im aktuellen SEO-Content-Workflow.
Priorisierung: **Quick Wins zuerst**, dann systematische Verbesserungen.

---

## 1. Standardisierte Input-Architektur

**Problem**: Jede Kundenübergabe sieht anders aus. 90% der Kunden liefern kein Voice & Tone. Unvollständige Inputs verursachen Rückfragen und Verzögerungen.

### Massnahmen

#### 1.1 Pflicht-Input-Paket definieren

Mindest-Inputs, ohne die kein Ticket erstellt werden darf:

| Input | Pflicht | Optional |
|---|---|---|
| Produktname / ASIN (falls vorhanden) | Pflicht | – |
| Produktbeschreibung / Datenblatt | Pflicht | – |
| Produktbilder (min. 3) | Pflicht | – |
| Zielmarktplatz (z.B. Amazon DE) | Pflicht | – |
| Hauptkategorie auf Amazon | Pflicht | – |
| Markenname | Pflicht | – |
| UVP / Preisspanne | Pflicht | – |
| Voice & Tone Dokument | – | Optional (Fallback: Standard-Tone) |
| Wettbewerber-ASINs | – | Optional (Fallback: eigene Recherche) |
| Bestehende Listings (falls vorhanden) | – | Optional |

#### 1.2 Google Drive Template-Ordnerstruktur

Für jeden neuen Kunden automatisch kopierbare Ordnerstruktur:

```
📁 [Kundenname] – Projekt
├── 📁 01_Input
│   ├── 📄 Produktinformationen (Template)
│   ├── 📄 Voice & Tone (Template mit Fallback-Defaults)
│   └── 📄 Bestehende Listings
├── 📁 02_Keywords
│   ├── 📄 Cerebro-Export
│   ├── 📄 Gefilterte Keyword-Liste
│   └── 📄 Backend-Keywords
├── 📁 03_Content
│   ├── 📄 Content-Projektübersicht (Template)
│   └── 📄 Produkt-Master-Sheet (Template)
├── 📁 04_Freigabe
│   └── 📄 Kunden-Feedback-Log
└── 📁 05_Final
    └── 📄 Upload-Ready Content
```

#### 1.3 Automatische Ordnererstellung

- Google Apps Script oder Zapier-Automation: Bei neuem Asana-Projekt → Ordnerstruktur automatisch in Google Drive anlegen
- Alle Templates werden vorbefüllt kopiert

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| Input-Vollständigkeit | ~10% | >80% |
| Rückfragen an Kunden | Häufig | Selten |
| Onboarding-Zeit | Variabel | Standardisiert |

---

## 2. Automatisierte Keyword-Pipeline

**Problem**: Die Keyword-Filterung (10–20 Min.) ist der grösste manuelle Engpass. Wettbewerber-Markennamen und irrelevante Keywords werden manuell aussortiert.

### Massnahmen

#### 2.1 Semi-automatische Keyword-Filterung

Stufenmodell mit zunehmendem Automatisierungsgrad:

**Stufe 1 – Regelbasierte Vorfilterung** (sofort umsetzbar):
- CSV-Export aus Cerebro automatisch durch Script laufen lassen
- Bekannte Wettbewerber-Marken aus einer gepflegten Blacklist entfernen
- Keywords unter Mindest-Suchvolumen (z.B. <100/Monat) entfernen
- Offensichtlich irrelevante Kategorien filtern (z.B. "Ersatzteil" wenn kein Ersatzteil-Produkt)

**Stufe 2 – KI-gestützte Vorfilterung** (mittelfristig):
- LLM-basierte Relevanzprüfung: "Ist Keyword X relevant für Produkt Y?"
- Marken-Erkennung: LLM prüft, ob ein Keyword eine Marke enthält
- **Wichtig**: Menschlicher Review bleibt als letzte Instanz – KI filtert vor, Mensch bestätigt
- Erwartete Zeitersparnis: 50–70% der Filterungszeit

**Stufe 3 – Vollautomatische Pipeline** (langfristig):
- Helium 10 API-Integration (falls verfügbar) für automatischen Keyword-Pull
- Automatische Wettbewerber-Identifikation basierend auf Produktkategorie + Preisspanne
- Vollständiger Pipeline: ASIN → Wettbewerber → Keywords → Filterung → Hauptkeywords

#### 2.2 Wettbewerber-Markenliste (Blacklist)

- Zentrale Google Tabelle mit bekannten Marken pro Kategorie
- Wird bei jedem Projekt ergänzt (lernendes System)
- Automatischer Abgleich bei CSV-Import

#### 2.3 Wettbewerber-Bewertungsanalyse (neuer Schritt)

- Systematisches Scraping/Auswerten der Wettbewerber-Reviews
- Identifikation von:
  - Häufig bemängelten Punkten (→ Content-Chance)
  - Ungelösten Kundenproblemen (→ USP-Hervorhebung)
  - Feature-Wünschen (→ Produktentwicklungs-Feedback an Kunden)
- Tool-Option: Helium 10 Review Insights oder LLM-basierte Zusammenfassung

### Erwarteter Impact

| Metrik | Vorher | Nachher (Stufe 2) |
|---|---|---|
| Keyword-Filterung | 10–20 Min. | 3–5 Min. (Review only) |
| Markenrechts-Risiko | Manuell geprüft | Automatisch + manuell |
| Wettbewerber-Insights | Kaum genutzt | Systematisch integriert |

---

## 3. Modularisierte Produktionslogik

**Problem**: Der Content-Erstellungsprozess ist monolithisch – ein Mitarbeiter macht alles sequentiell. Bei Varianten (Farbe, Grösse) wird repetitiv manuell angepasst.

### Massnahmen

#### 3.1 Content-Bausteine trennen

| Baustein | Kann parallel laufen? | Automatisierbar? |
|---|---|---|
| Keyword-Recherche | Nein (Basis) | Teilweise (s. Hebel 2) |
| Backend-Keywords | Ja (nach Recherche) | Ja (Frankenstein + Regeln) |
| Titel | Ja (nach Keywords) | Semi (LLM + Review) |
| Bulletpoints | Ja (nach Keywords) | Semi (LLM + Review) |
| Produktbeschreibung | Ja (nach Keywords) | Semi (LLM + Review) |
| Varianten-Anpassung | Ja (nach Basis-Content) | Ja (regelbasiert) |

#### 3.2 Varianten-Automatisierung

Regelbasierte Ersetzung für Produktvarianten:

```
Basis-Text: "Die blaue Premium-Yogamatte in 180x60cm..."
Variante 1: {farbe: "grün", groesse: "180x60cm"} → "Die grüne Premium-Yogamatte in 180x60cm..."
Variante 2: {farbe: "rot", groesse: "200x80cm"} → "Die rote Premium-Yogamatte in 200x80cm..."
```

- Platzhalter-System im Content-Template: `{{farbe}}`, `{{groesse}}`, `{{material}}`
- Batch-Generierung aller Varianten aus einer Konfigurationstabelle
- Menschlicher Review des Basis-Texts, automatische Generierung der Varianten

#### 3.3 Content-Prompt als versioniertes Template

- Prompts nicht lose in ChatGPT-Verläufen, sondern als versionierte Dokumente
- Zentrale Prompt-Bibliothek (Google Doc oder hier im Repository)
- Versionierung: Änderungen am Prompt werden dokumentiert mit Datum + Grund
- Verschiedene Prompt-Varianten für verschiedene Produktkategorien

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| Varianten-Erstellung | 5–10 Min./Variante | <1 Min./Variante |
| Prompt-Konsistenz | Abhängig vom Mitarbeiter | Standardisiert |
| Parallelisierbarkeit | Gering | Hoch |

---

## 4. Klare QA-Scorecard

**Problem**: Kein formalisierter Qualitätsstandard. Qualität hängt vom einzelnen Mitarbeiter ab. Keyword-Prüfung, Zeichenlängen und Content-Regeln werden ad hoc geprüft.

### Massnahmen

#### 4.1 SEO-Content-Scorecard einführen

→ Siehe: [`checklisten/seo-content-qa.md`](../checklisten/seo-content-qa.md)

Jeder Content durchläuft die Scorecard, bevor er zum Kunden geht. Mindestens **80% Score** für Freigabe.

#### 4.2 Automatisierte Prüfpunkte

Folgende Checks lassen sich automatisieren (z.B. Google Sheets Script oder eigenständiges Tool):

- **Zeichenlängen**: Titel ≤200 Zeichen, jeder Bullet ≤500 Zeichen
- **Keyword-Häufigkeit**: Jedes der 6 Hauptkeywords min. 1x vorhanden
- **Keine Keyword-Dopplung im Titel**: Kein Keyword >2x im Titel
- **ALL CAPS am Bulletpoint-Anfang**: Regex-Check
- **Keine Wettbewerber-Markennamen**: Abgleich mit Blacklist

#### 4.3 Peer-Review bei Volumen >20/Monat

- Ab 20+ Contents/Monat: Stichproben-Review durch zweiten Mitarbeiter (jeder 5. Content)
- Bei neuem Mitarbeiter: Jeder Content wird reviewed bis Scorecard-Schnitt >85%

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| QA-Standard | Nicht formalisiert | Scorecard mit Min. 80% |
| Korrekturschleifen mit Kunden | Gelegentlich | Seltener |
| Einarbeitungszeit neuer Mitarbeiter | Hoch (implizites Wissen) | Niedriger (explizite Regeln) |

---

## 5. Produktisiertes Leistungsmodul

**Problem**: SEO-Content wird als unstrukturierter Projektbestandteil behandelt, nicht als standardisiertes Produkt mit klarem Scope, Lieferformat und SLA.

### Massnahmen

#### 5.1 SEO-Content als Leistungsmodul definieren

```
Leistungsmodul: SEO-Content Amazon
───────────────────────────────────
Scope:          1 Produkt (Titel + 5 Bullets + Beschreibung + Backend-Keywords)
Input:          Pflicht-Input-Paket (s. Hebel 1)
Output:         Content in Content-Projektübersicht + Backend-Keywords
Lieferzeit:     3 Werktage nach vollständigem Input
Feedback-Runde: 1 Korrekturschleife inkl.
Varianten:      +0.5 Tage pro zusätzliche Farbvariante (max. 5 Min. Aufwand)
```

#### 5.2 Service-Level-Agreements (intern)

| SLA | Wert |
|---|---|
| Erstlieferung nach Input-Vollständigkeit | ≤3 Werktage |
| Korrekturschleife nach Kundenfeedback | ≤1 Werktag |
| Upload nach finaler Freigabe | ≤1 Werktag |
| Eskalation bei fehlendem Input | Nach 48h automatischer Reminder |

#### 5.3 Kapazitätsplanung

Basierend auf aktuellen Werten:

| Szenario | Volumen/Monat | Mitarbeiterkapazität |
|---|---|---|
| Normal | 15–30 Contents | 1 Mitarbeiter |
| Hoch | 30–60 Contents | 1.5–2 Mitarbeiter |
| Peak | 60–100+ Contents | 2–3 Mitarbeiter oder Automatisierung Stufe 2+ |

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| Kundenerwartung | Unklar | Definiertes SLA |
| Interne Planung | Ad hoc | Kapazitätsbasiert |
| Skalierbarkeit | Unklar | Planbar |

---

## 6. Volumenspitzen-fähige Delivery

**Problem**: Volumen schwankt zwischen 5 und 100+ Contents/Monat. Bei Peaks fehlt Kapazität, bei Tiefs fehlt Auslastung.

### Massnahmen

#### 6.1 Batch-Processing für Peaks

Statt jeden Content einzeln durchzuführen, bei >10 Produkten desselben Kunden:

1. **Keyword-Recherche einmal** für die gesamte Produktkategorie
2. **Keyword-Pool teilen** zwischen ähnlichen Produkten
3. **Varianten-Engine** (s. Hebel 3) für Farb-/Grössenanpassungen
4. **Batch-Upload** via Flat File statt manuell in Seller Central

#### 6.2 Priorisierungs-Framework

| Priorität | Kriterium | Bearbeitung |
|---|---|---|
| P1 – Kritisch | Launch-Datum in <5 Tagen | Sofort, vor allem anderen |
| P2 – Hoch | Retailer-Kunde oder >10 Produkte | Innerhalb von 3 Tagen |
| P3 – Normal | Standard-Projekt | Innerhalb SLA (3 Werktage) |
| P4 – Niedrig | Varianten-Anpassungen | Batch-Processing |

#### 6.3 Skalierung durch Automatisierung

Bei konsequenter Umsetzung von Hebel 2 (Keyword-Pipeline) und Hebel 3 (Modularisierung):

| Schritt | Aktuell (manuell) | Mit Automatisierung |
|---|---|---|
| Keyword-Recherche | 15–25 Min. | 5–10 Min. |
| Content-Erstellung | 20 Min. | 10–15 Min. |
| QA & Übertragung | 10–15 Min. | 5 Min. |
| **Gesamt pro Content** | **~60 Min.** | **~25–30 Min.** |

Bei 8h Arbeitstag: Von ~8 Contents/Tag auf ~16 Contents/Tag = **Verdopplung der Kapazität** ohne zusätzliche Mitarbeiter.

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| Max. Tageskapazität | ~8 Contents | ~16 Contents |
| Peak-Handling | Überstunden/Engpass | Batch + Automatisierung |
| Batch-Effizienz | Nicht genutzt | 30–40% Zeitersparnis bei >10 Produkten |

---

## 7. Reduzierte Tool-Friktion

**Problem**: Zu viele Medienbrüche – Google Drive, Google Sheets, Asana, ChatGPT, Helium 10, Slack, E-Mail, Amazon Seller Central. Jeder Wechsel kostet Kontext und Zeit.

### Massnahmen

#### 7.1 Tool-Landkarte bereinigen

| Tool | Funktion | Behalten? | Verbesserung |
|---|---|---|---|
| Google Drive | File Storage | Ja | Template-Automatisierung |
| Google Sheets | Content-Tabelle, Master-Sheet | Ja | Automatisierte Checks (Apps Script) |
| Asana | Projektmanagement | Ja | Automatische Status-Updates |
| ChatGPT | Content-Generierung | Prüfen | Eigene Lösung oder API-Anbindung |
| Helium 10 | Keyword-Recherche | Ja | API-Nutzung wenn möglich |
| Slack | Interne Kommunikation | Ja | Asana-Slack-Integration |
| E-Mail | Kundenkommunikation | Ja | Templates + ggf. automatisierte Benachrichtigung |
| Amazon SC | Upload | Ja | Flat File für Batch-Upload |

#### 7.2 Integrationen aufsetzen

**Quick Wins** (sofort umsetzbar):
- **Asana ↔ Slack**: Automatische Slack-Notification bei Ticket-Statuswechsel
- **Google Drive ↔ Asana**: Links automatisch im Ticket hinterlegen bei Ordnererstellung
- **E-Mail-Templates**: Standardisierte E-Mails für "Content fertig", "Feedback Reminder"

**Mittelfristig**:
- **Google Sheets Apps Script**: Automatische Zeichenlängen-Prüfung, Keyword-Count
- **ChatGPT API statt Web-UI**: Prompts programmatisch senden, Output direkt in Sheet schreiben
- **Asana API**: Tickets automatisch erstellen bei neuem Projekt-Setup

**Langfristig**:
- **Zentrales Dashboard**: Ein Interface, das Asana-Status, Content-Fortschritt und Keyword-Daten zusammenführt
- **Helium 10 API**: Keyword-Recherche direkt aus dem Workflow-Tool heraus

#### 7.3 Benachrichtigungen zentralisieren

Statt manueller E-Mails:
- Google Sheets Trigger: Wenn Content-Status = "Fertig" → automatische E-Mail an Kunden
- Oder: Shared Google Sheet mit Kommentarfunktion → Kunde wird bei @-Mention benachrichtigt
- Asana-Automatisierung: Status "Ready for Feedback" → E-Mail-Template an Kunden senden

### Erwarteter Impact

| Metrik | Vorher | Nachher |
|---|---|---|
| Medienbrüche pro Content | ~8 Tool-Wechsel | ~4 Tool-Wechsel |
| Manuelle Benachrichtigungen | Jedes Mal | Automatisiert |
| Kontext-Verlust | Hoch (Copy-Paste zwischen Tools) | Reduziert durch Integrationen |

---

## Umsetzungs-Roadmap

### Phase 1 – Quick Wins (Woche 1–2)

- [ ] Onboarding-Checkliste einführen (Hebel 1)
- [ ] QA-Scorecard implementieren (Hebel 4)
- [ ] E-Mail-Templates erstellen (Hebel 7)
- [ ] Google Drive Template-Ordner anlegen (Hebel 1)
- [ ] Wettbewerber-Marken-Blacklist starten (Hebel 2)

### Phase 2 – Systematisierung (Woche 3–6)

- [ ] Regelbasierte Keyword-Vorfilterung aufsetzen (Hebel 2, Stufe 1)
- [ ] Varianten-Template mit Platzhaltern einführen (Hebel 3)
- [ ] Asana-Slack-Integration aktivieren (Hebel 7)
- [ ] SLAs intern kommunizieren (Hebel 5)
- [ ] Priorisierungs-Framework einführen (Hebel 6)

### Phase 3 – Automatisierung (Woche 7–12)

- [ ] KI-gestützte Keyword-Filterung testen (Hebel 2, Stufe 2)
- [ ] Google Sheets Apps Script für QA-Checks (Hebel 4 + 7)
- [ ] ChatGPT API-Integration evaluieren (Hebel 7)
- [ ] Batch-Processing für Flat File Upload (Hebel 6)
- [ ] Wettbewerber-Bewertungsanalyse als Standard-Schritt (Hebel 2)

### Phase 4 – Skalierung (ab Monat 4)

- [ ] Vollautomatische Keyword-Pipeline (Hebel 2, Stufe 3)
- [ ] Zentrales Dashboard (Hebel 7)
- [ ] Kapazitätsplanung an SLA-Daten koppeln (Hebel 5 + 6)
