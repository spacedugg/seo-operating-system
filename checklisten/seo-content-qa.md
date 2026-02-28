# SEO-Content QA-Scorecard

Jeder SEO-Content wird vor der Kundenfreigabe anhand dieser Scorecard geprüft.
**Mindest-Score für Freigabe: 80% (32 von 40 Punkten).**

---

## Bewertungssystem

- **2 Punkte** = Vollständig erfüllt
- **1 Punkt** = Teilweise erfüllt / mit kleinen Mängeln
- **0 Punkte** = Nicht erfüllt / kritischer Mangel

---

## Scorecard

### A. Keyword-Integration (max. 10 Punkte)

| # | Kriterium | 0 | 1 | 2 | Punkte |
|---|---|---|---|---|---|
| A1 | Alle 6 Hauptkeywords kommen mindestens 1x im Content vor (Titel + Bullets + Beschreibung) | Fehlen >2 | Fehlen 1–2 | Alle vorhanden | ___ |
| A2 | Hauptkeywords tauchen insgesamt 6–12x auf (kein Keyword-Stuffing) | <6 oder >15 | 6 oder >12 | 6–12 | ___ |
| A3 | Kein Keyword kommt >2x im Titel vor | >2 Doppelungen | 1 Doppelung | Keine Doppelung | ___ |
| A4 | Backend-Keywords sind erstellt und ohne Duplikate | Fehlen | Vorhanden, mit Duplikaten | Vorhanden, sauber | ___ |
| A5 | Keine Wettbewerber-Markennamen im Content | Markenname gefunden | – | Keine Markennamen | ___ |

### B. Content-Struktur (max. 10 Punkte)

| # | Kriterium | 0 | 1 | 2 | Punkte |
|---|---|---|---|---|---|
| B1 | Titel beginnt mit Hauptkeyword | Kein Keyword am Anfang | Keyword vorhanden, nicht am Anfang | Hauptkeyword am Anfang | ___ |
| B2 | Titel-Zeichenlänge innerhalb des Limits (≤200 Zeichen) | >250 | 201–250 | ≤200 | ___ |
| B3 | Genau 5 Bulletpoints vorhanden | ≠5 | – | Genau 5 | ___ |
| B4 | Jeder Bulletpoint beginnt mit ALL CAPS Keyword/Vorteil | <3 mit ALL CAPS | 3–4 mit ALL CAPS | Alle 5 mit ALL CAPS | ___ |
| B5 | Bulletpoint-Zeichenlänge innerhalb des Limits (je ≤500 Zeichen) | >2 überschritten | 1 überschritten | Alle ≤500 | ___ |

### C. Content-Qualität (max. 12 Punkte)

| # | Kriterium | 0 | 1 | 2 | Punkte |
|---|---|---|---|---|---|
| C1 | Keywords sind natürlich und lesefreundlich integriert | Keyword-Stuffing / unlesbar | Teilweise holprig | Natürlich fliessend | ___ |
| C2 | Verkaufspsychologie: Vorteile UND Merkmale werden kommuniziert | Nur Features oder nur vage | Überwiegend Features | Klarer Nutzen + Features | ___ |
| C3 | Emotionalisierung: Text weckt Kaufimpuls | Rein sachlich | Ansatzweise emotional | Klar verkaufsfördernd | ___ |
| C4 | Voice & Tone passt zur Marke | Passt nicht | Teilweise passend | Konsistent passend | ___ |
| C5 | Keine Rechtschreib-/Grammatikfehler | >3 Fehler | 1–3 Fehler | Fehlerfrei | ___ |
| C6 | Produktbeschreibung vorhanden und vollständig | Fehlt | Vorhanden, dünn | Vollständig, verkaufsstark | ___ |

### D. Prozess-Compliance (max. 8 Punkte)

| # | Kriterium | 0 | 1 | 2 | Punkte |
|---|---|---|---|---|---|
| D1 | Content ist in Content-Projektübersicht eingetragen | Fehlt | Eingetragen, unvollständig | Korrekt eingetragen | ___ |
| D2 | Keyword-Pool ist dokumentiert (Sheet / Export) | Fehlt | Vorhanden, unsortiert | Vorhanden, sortiert mit Hauptkeywords markiert | ___ |
| D3 | Asana-Ticket ist auf korrektem Status | Falscher Status | – | Korrekter Status | ___ |
| D4 | Bei Varianten: Basis-Text und Varianten sind konsistent | Inkonsistenzen | Kleinere Abweichungen | Konsistent | ___ |

---

## Auswertung

| Score | Bewertung | Aktion |
|---|---|---|
| 36–40 | Exzellent | Direkt freigeben |
| 32–35 | Gut | Freigeben (kleinere Verbesserungen optional) |
| 24–31 | Ausreichend | Nachbesserung in markierten Bereichen, dann erneut prüfen |
| <24 | Ungenügend | Grundlegende Überarbeitung nötig |

---

## Automatisierbare Checks

Folgende Prüfpunkte können per Google Sheets Script oder separatem Tool automatisiert werden:

| Check | Typ | Automatisierbar? |
|---|---|---|
| A1: Keyword-Vorkommen zählen | Text-Suche | Ja (COUNTIF / Script) |
| A2: Keyword-Häufigkeit gesamt | Text-Suche | Ja |
| A3: Keyword-Dopplung im Titel | Text-Suche | Ja |
| A5: Wettbewerber-Markennamen | Blacklist-Abgleich | Ja |
| B2: Titel-Zeichenlänge | LEN() | Ja |
| B3: Anzahl Bulletpoints | Zählung | Ja |
| B5: Bulletpoint-Zeichenlänge | LEN() | Ja |
| C5: Rechtschreibung | Spellcheck-API | Teilweise |

**Empfehlung**: Automatisierte Checks als "Pre-Flight" vor der manuellen Qualitätsprüfung laufen lassen. Spart ca. 5 Min. pro Content und verhindert einfache Fehler.

---

## Anwendung

1. Content ist fertig geschrieben
2. Mitarbeiter führt **automatisierte Checks** durch (Zeichenlängen, Keywords)
3. Mitarbeiter bewertet **manuelle Kriterien** (Qualität, Voice & Tone, Verkaufspsychologie)
4. Score wird notiert (z.B. als Spalte in der Content-Projektübersicht)
5. Bei Score ≥32: Content geht zum Kunden
6. Bei Score <32: Nachbesserung, dann erneute Bewertung
