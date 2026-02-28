# SEO-Content-Workflow – IST-Prozess

Dokumentation des aktuellen End-to-End-Prozesses für die Erstellung von SEO-optimiertem Amazon-Content.

---

## Phase 1: Kundenübergabe (Sales → Fulfillment)

### Ablauf

1. Sales-Mitarbeiter schliesst Kundenprojekt ab
2. Übergabe an Fulfillment-Mitarbeiter mit:
   - **Google Drive Shared Folder** mit Input-Ordner
   - **E-Mail-Adresse** des Kunden für Rückfragen
3. Im Input-Ordner liegen (im Idealfall):
   - Produktinformationen
   - Farben, Schriftarten, Brand Guidelines
   - Voice & Tone Dokument
4. Fulfillment-Mitarbeiter erhält zusätzlich Zugang zu:
   - **Content-Projektübersicht** (Google Tabelle) – Produktliste mit Fortschrittsstatus + Platz für SEO-Content
   - **Produkt-Master-Sheet** (Google Tabelle) – Marke, Gewicht, Preis, EAN-Nummer etc.

### Projektplanung

- **Kleine Projekte**: Sales-Person oder Fulfillment-Mitarbeiter plant eigenständig
- **Retailer-Projekte** (grosser Umfang): Dedizierter Mitarbeiter übernimmt Projektplanung mit Timelines und Enddates
- Aufgaben werden als **Asana-Tickets** erstellt und dem ausführenden Mitarbeiter zugewiesen

### Asana-Ticket enthält (im Idealfall)

- Aufgabenbeschreibung (z.B. "SEO-Text erstellen für Produkt Y")
- Link zum Input-Ordner (Produktinformationen)
- Link zur Content-Projektübersicht
- Link zum Produkt-Master-Sheet

### Pain Points – Phase 1

| Problem | Häufigkeit | Auswirkung |
|---|---|---|
| Voice & Tone fehlt im Input | ~90% der Fälle | Mitarbeiter muss selbst recherchieren oder raten |
| Unvollständige Produktinformationen | Häufig | Rückfragen an Kunden verzögern den Prozess |
| Asana-Ticket ohne Links | Gelegentlich | Mitarbeiter muss Ordner selbst suchen |
| Kein standardisiertes Übergabeformat | Immer | Jede Übergabe sieht anders aus |

---

## Phase 2: Keyword-Recherche (~15–25 Min.)

### Schritt 2.1: Wettbewerber identifizieren (~5 Min.)

1. Mitarbeiter sucht auf Amazon nach vergleichbaren Produkten
2. Kriterien für Wettbewerber:
   - Produkt muss dem eigenen möglichst ähnlich sein
   - Wettbewerber muss umsatzseitig besser performen
3. **4–5 Wettbewerber** werden ausgewählt
4. ASINs der Wettbewerber werden notiert

### Schritt 2.2: Helium 10 Cerebro Analyse (~5 Min.)

1. ASINs der 4–5 Wettbewerber in Cerebro eingeben
2. Filtereinstellungen:
   - **Nur Organic Keywords** (keine Paid/Sponsored Keywords)
   - Mindestens **2 Wettbewerber auf Seite 1** der Suchergebnisse
   - Keyword muss **ausreichend Suchvolumen** haben
   - Keyword muss **zum Produkt passen** (Relevanz)
3. Keyword-Liste exportieren

### Schritt 2.3: Manuelle Keyword-Filterung (~10–20 Min.)

1. Exportierte Liste durchgehen (typisch: 100–200 Keywords)
2. **Aussortieren**:
   - Nicht relevante Keywords
   - Keywords mit Wettbewerber-Markennamen
   - Keywords die nicht zum Produkt passen
3. **Behalten**: Relevante Keywords mit gutem Suchvolumen

> **Hinweis**: Dieser Schritt ist aktuell 100% manuell. Automatisierung ist gewünscht,
> aber die Fehleranfälligkeit bei KI-basierter Filterung wird als Risiko gesehen –
> insbesondere beim Erkennen von Wettbewerber-Markennamen und Nischenrelevanz.

### Schritt 2.4: Backend-Keywords & Keyword-Pool (~5 Min.)

1. Keyword-Liste in **Helium 10 Frankenstein** laden
2. Duplikate entfernen lassen
3. Backend-Keywords extrahieren
4. **6 Hauptkeywords** identifizieren (Sweetspot: hohes Suchvolumen + hohe Relevanz)
5. Gesamten Keyword-Pool + Hauptkeywords ins Content-Sheet übertragen

### Pain Points – Phase 2

| Problem | Häufigkeit | Auswirkung |
|---|---|---|
| Manuelle Keyword-Filterung bei 200+ Keywords | Bei grösseren Nischen | 20+ Min. nur für Aussortierung |
| Keine systematische Wettbewerber-Auswahl | Immer | Abhängig von individueller Einschätzung |
| Wettbewerber-Markennamen nicht automatisch erkennbar | Immer | Risiko: Markenrechtsverstoss im Content |
| Kein Review-Bewertungsabgleich | Fast immer | Hidden Spots der Wettbewerber werden übersehen |

---

## Phase 3: Content-Erstellung (~20 Min.)

### Schritt 3.1: ChatGPT-Prompt vorbereiten (~5 Min.)

1. Bestehenden Standard-Prompt öffnen (liegt im Content-Sheet als Vorlage)
2. Folgende Informationen einfügen:
   - 6 Hauptkeywords
   - Produktvorteile und -merkmale
   - Ggf. Produktdatenblatt / Informationssheet
   - Ggf. Voice & Tone (wenn vorhanden)
3. Prompt an ChatGPT senden

### Schritt 3.2: Content-Regeln (bereits im Prompt hinterlegt)

**Titel:**
- Beginnt mit Hauptkeyword in ALL CAPS
- Hauptvorteil als Eyecatcher
- Keywords maximal 2x im Titel (keine Doppelungen)
- Zeichenlängenbegrenzung beachten

**Bulletpoints (5 Stück):**
- Beginnen jeweils mit ALL CAPS Keyword/Vorteil
- Jedes der 6 Hauptkeywords mindestens 1–2x integriert
- Insgesamt 6–12 Keyword-Erwähnungen über alle Bulletpoints
- Kein Keyword-Stuffing
- Verkaufspsychologisch: Nutzenkommunikation + Emotionalisierung
- Vorteile UND Merkmale beschreiben

**Produktbeschreibung:**
- Lesefreundlich
- Keywords natürlich eingebaut
- Verkaufspsychologischer Ansatz

**Generell:**
- Keywords so einbauen, wie sie von Konsumenten gesucht werden
- Lesefreundlich und natürlich klingend
- Keine Wettbewerber-Keywords im Content

### Schritt 3.3: Iteration & Korrektur (~15 Min.)

1. Ersten Output von ChatGPT prüfen (~5 Min.)
2. Korrekturen und Nachjustierung im Dialog (~10 Min.):
   - Keyword-Platzierung prüfen (alle 6 Keywords vorhanden?)
   - Doppelungen im Titel identifizieren und korrigieren
   - Lesefreundlichkeit und Verkaufspsychologie bewerten
   - Zeichenlängen prüfen
3. Finalen Text in Content-Sheet übertragen (~5 Min.)

### Pain Points – Phase 3

| Problem | Häufigkeit | Auswirkung |
|---|---|---|
| Voice & Tone muss geraten werden | ~90% | Inkonsistente Markensprache |
| Keyword-Überprüfung manuell | Immer | Fehleranfällig bei 6+ Keywords |
| Kein automatisierter Zeichenzähler | Immer | Manuelle Prüfung nötig |
| Farbliche/Grössenanpassungen manuell | Bei Varianten | 5–10 Min. pro Variante, repetitiv |

---

## Phase 4: Review & Freigabe (~variabel)

### Ablauf

1. Fertigen Text in **Content-Projektübersicht** (Google Tabelle) kopieren
2. Asana-Ticket auf **"Ready for Feedback"** verschieben
3. Kunden per **E-Mail** informieren: "SEO-Text ist fertig, bitte prüfen"
4. Kunde gibt Feedback direkt in der geteilten Google Tabelle
5. Ggf. Korrekturschleife (selten nötig, meist kleinere Anpassungen)
6. Finale Abnahme durch Kunden

### Kommunikationskanäle

| Kanal | Verwendung |
|---|---|
| E-Mail | Kundenkommunikation (Fertigstellung, Feedback) |
| Asana | Ticket-Status (To Do → In Progress → Ready for Feedback → Done) |
| Slack | Interne Kommunikation (Statusfragen, Scope-Klärung, Reminders) |
| Google Drive | Content-Sharing mit Kunden (Shared Drive) |

### Pain Points – Phase 4

| Problem | Häufigkeit | Auswirkung |
|---|---|---|
| Keine automatische Benachrichtigung bei Fertigstellung | Immer | Manueller E-Mail-Versand |
| Kundenfeedback in Google Tabelle unstrukturiert | Gelegentlich | Feedback schwer nachzuverfolgen |
| Asana-Status wird vergessen zu aktualisieren | Gelegentlich | Internes Tracking ungenau |

---

## Phase 5: Upload & Abschluss

### Ablauf

1. Freigegebenen Content **manuell in Amazon Seller Central** hochladen
2. Asana-Ticket auf **"Done"** verschieben
3. Ggf. interne Slack-Nachricht an Team

> **Hinweis**: Bei kleineren Projekten wird aktuell manuell über Seller Central hochgeladen.
> Die Lagerbestandsdatei (Flat File) wird bisher nicht standardmässig genutzt.
> Bei Retailer-Projekten mit vielen Produkten wäre ein Bulk-Upload sinnvoll.

### Pain Points – Phase 5

| Problem | Häufigkeit | Auswirkung |
|---|---|---|
| Manueller Upload pro Produkt | Immer | Zeitaufwand bei vielen Produkten |
| Keine Flat-File-Nutzung bei kleinen Projekten | Immer | Skaliert nicht |

---

## Zeitanalyse (Gesamtprozess)

| Phase | Schritt | Dauer |
|---|---|---|
| **2. Keyword-Recherche** | Wettbewerber finden | ~5 Min. |
| | Cerebro-Analyse | ~5 Min. |
| | Keyword-Filterung (manuell) | ~10–20 Min. |
| | Backend-Keywords & Pool | ~5 Min. |
| **3. Content-Erstellung** | Prompt vorbereiten & senden | ~5 Min. |
| | ChatGPT-Output prüfen | ~5 Min. |
| | Korrektur & Feinschliff | ~10 Min. |
| | Keyword-Check & Übertragung | ~10 Min. |
| **Gesamt** | | **~55–65 Min.** |

> Nicht enthalten: Kundenübergabe (Phase 1), Wartezeit auf Kundenfeedback (Phase 4),
> manueller Upload (Phase 5), sowie Korrekturschleifen.

---

## Sonderfälle

### Farbliche / Grössenanpassungen (Produktvarianten)

- Wenn sich nur Farbe oder Grösse ändert: Content wird dupliziert und manuell angepasst
- Dauer: ~5–10 Min. pro Variante
- Aktuell rein manuell in ChatGPT oder direkt in Google Sheets
- **Automatisierungspotenzial**: Hoch – regelbasierte Ersetzung möglich

### SEO-Content als Design-Vorlage

- Der SEO-Recherche-Output dient gleichzeitig als inhaltliche Grundlage für das Design-Team
- Produkt ist nach der SEO-Phase bereits inhaltlich durchdrungen:
  - Produktfunktion verstanden
  - Kern-USPs identifiziert
  - Konsumenten-Suchverhalten bekannt
- **Zusätzliche Möglichkeit**: Wettbewerber-Bewertungsanalyse (aktuell nicht standardmässig durchgeführt)
  - Hidden Spots der Wettbewerber identifizieren
  - Häufig bemängelte Punkte als Content-Chance nutzen
  - Langfristig: Erkenntnisse an Kunden für Produktentwicklung weitergeben
