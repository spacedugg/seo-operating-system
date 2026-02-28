# SEO Operating System

Operatives Handbuch für den SEO-Content-Fulfillment-Prozess – von der Kundenübergabe bis zum fertigen Amazon-Listing.

## Zweck

Dieses Repository dokumentiert den End-to-End-Workflow für die Erstellung von SEO-optimiertem Amazon-Content. Es dient als:

- **Prozessdokumentation** (IST-Zustand) für Onboarding neuer Mitarbeiter
- **Optimierungsfahrplan** (SOLL-Zustand) mit konkreten Massnahmen
- **Checklisten & Scorecards** für konsistente Qualität bei jedem Volumen

## Struktur

```
├── prozesse/
│   └── seo-content-workflow.md      # IST-Prozess mit Zeitanalyse & Pain Points
│
├── optimierung/
│   └── massnahmenplan.md            # 7 Optimierungshebel mit konkreten Massnahmen
│
├── checklisten/
│   ├── kunden-onboarding.md         # Input-Checkliste für Kundenübergabe
│   └── seo-content-qa.md            # QA-Scorecard für Content-Abnahme
```

## Prozessübersicht

```
Sales-Abschluss
    │
    ▼
┌─────────────────────────┐
│  1. Kundenübergabe       │  Sales → Fulfillment (Google Drive, E-Mail, Asana)
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  2. Keyword-Recherche    │  Helium 10 Cerebro, Wettbewerbsanalyse
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  3. Content-Erstellung   │  ChatGPT-Prompt, Titel + Bullets + Beschreibung
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  4. QA & Kunden-Review   │  Keyword-Check, Content-Tabelle, Kundenfeedback
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  5. Upload & Abschluss   │  Amazon Seller Central, Asana → Done
└────────────┘────────────┘
```

## Kennzahlen (Baseline)

| Metrik | Aktueller Wert |
|---|---|
| Durchlaufzeit pro SEO-Content | ~60 Min. |
| Monatliches Volumen | 5–100+ Stück |
| Keyword-Filterung | 100% manuell |
| QA-Standard | Nicht formalisiert |
| Input-Vollständigkeit | ~10% der Kunden liefern Voice/Tone |
