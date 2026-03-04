"use client";
import { useState } from "react";
import {
  Target,
  FileText,
  BarChart3,
  Settings,
  ArrowRight,
  Star,
  Users,
  Zap,
  TrendingUp,
  ShieldCheck,
  Brain,
  Sparkles,
  Clock,
  Bot,
  ChartNoAxesCombined,
  Puzzle,
  RefreshCw,
  Eye,
  MousePointerClick,
  ShoppingCart,
  Award,
  ChevronRight,
  CircleDot,
} from "lucide-react";

/* ── Brand Colors ── */
const brand = {
  strategy: "#FF9903",
  content: "#FF3132",
  advertising: "#043047",
  management: "#CDE6F4",
};

const c = {
  bg: "#fafafa",
  card: "#ffffff",
  border: "#e2e4e9",
  dark: "#111827",
  text: "#1f2937",
  muted: "#6b7280",
  dim: "#9ca3af",
  green: "#16a34a",
  red: "#dc2626",
  amber: "#d97706",
};

/* ================================================================
   SLIDE 1 – Cover
   "Dein Amazon Growth Partner" oben, Name-Platzhalter,
   Kunden-Logo + Agentur-Logo
   ================================================================ */
function Slide1() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 4,
          color: brand.strategy,
          marginBottom: 40,
          textTransform: "uppercase",
        }}
      >
        Dein Amazon Growth Partner
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: c.dark,
          lineHeight: 1.1,
          marginBottom: 48,
        }}
      >
        [Name]
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            width: 120,
            height: 60,
            background: "#f3f4f6",
            border: "1px solid " + c.border,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: c.dim,
          }}
        >
          [Kunden-Logo]
        </div>
        <div style={{ fontSize: 18, color: c.dim }}>×</div>
        <div
          style={{
            width: 120,
            height: 60,
            background: "#f3f4f6",
            border: "1px solid " + c.border,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: c.dim,
          }}
        >
          [Agentur-Logo]
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 2 – Statement
   ================================================================ */
function Slide2() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: c.dark,
          lineHeight: 1.25,
          maxWidth: 600,
        }}
      >
        {'"Amazon hat sich verändert.'}
        <br />
        {'Die meisten Seller noch nicht."'}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 3 – Markt-Realität (nur 3 Zahlen, kein Heading, kein gelbes Feld)
   ================================================================ */
function Slide3() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 40,
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: c.muted,
          marginBottom: 32,
        }}
      >
        Die Realität auf Amazon in 2026
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          width: "100%",
        }}
      >
        {[
          {
            stat: "73%",
            desc: "der Klicks gehen an die Top-3 Suchergebnisse. Der Rest teilt sich die Krümel.",
            src: "Jungle Scout",
          },
          {
            stat: "300M+",
            desc: "Nutzer verwenden Rufus, Amazons KI-Assistent. Er entscheidet, wer empfohlen wird.",
            src: "Amazon",
          },
          {
            stat: "70%+",
            desc: "aller Seller schalten Ads. Ohne optimierte Listings verbrennt das Budget.",
            src: "Marketplace Pulse",
          },
        ].map(function (item, i) {
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: 24,
                background: c.card,
                border: "1px solid " + c.border,
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: brand.advertising,
                }}
              >
                {item.stat}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: c.text,
                  marginTop: 12,
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </div>
              <div style={{ fontSize: 10, color: c.dim, marginTop: 10 }}>
                {item.src}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 4 – Statement (neuer Platzhalter)
   ================================================================ */
function Slide4() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: c.dark,
          lineHeight: 1.25,
          maxWidth: 600,
        }}
      >
        [Statement-Platzhalter]
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 5 – Audit Score
   ================================================================ */
function Slide5() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 13, color: brand.strategy, fontWeight: 600, marginBottom: 8 }}>
        Euer Audit-Ergebnis
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.dark,
          marginBottom: 24,
        }}
      >
        Wo ihr heute steht – und wo die Top-Seller sind
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          {
            label: "Euer Score",
            val: "[X/10]",
            sub: "Retail Readiness · INDIVIDUELL",
            bg: "#fff7ed",
            bc: brand.strategy,
          },
          {
            label: "Top-Seller in eurer Kategorie",
            val: "8-9/10",
            sub: "Benchmark · TEMPLATE",
            bg: "#f0fdf4",
            bc: c.green,
          },
          {
            label: "Die Lücke",
            val: "[X] Punkte",
            sub: "= Top-Seller Score − Euer Score",
            bg: "#fef3c7",
            bc: c.amber,
          },
        ].map(function (k, i) {
          return (
            <div
              key={i}
              style={{
                flex: 1,
                minWidth: 160,
                textAlign: "center",
                padding: 24,
                background: k.bg,
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 11, color: c.muted }}>{k.label}</div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: k.bc,
                  margin: "8px 0",
                }}
              >
                {k.val}
              </div>
              <div style={{ fontSize: 12, color: c.muted }}>{k.sub}</div>
            </div>
          );
        })}
      </div>
      {[
        "Content und SEO-Texte",
        "Main Image und Gallery",
        "A+ Content und Brand Story",
        "Brandstore",
        "Reviews und Trust Signals",
        "Advertising-Struktur",
        "Backend-Attribute (COSMO)",
      ].map(function (area, i) {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
              borderBottom: "1px solid " + c.border,
            }}
          >
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: c.text }}>
              {area}
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) {
                return (
                  <div
                    key={n}
                    style={{
                      width: 22,
                      height: 7,
                      borderRadius: 3,
                      background: "#e5e7eb",
                    }}
                  />
                );
              })}
            </div>
            <div
              style={{
                width: 40,
                textAlign: "right",
                fontSize: 12,
                fontWeight: 700,
                color: c.muted,
              }}
            >
              {"[X]"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   SLIDE 6 – Findings (gelber Bereich prominenter)
   ================================================================ */
function Slide6() {
  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.dark,
          marginBottom: 24,
        }}
      >
        Was wir konkret gefunden haben
      </div>
      {[1, 2, 3].map(function (n) {
        return (
          <div
            key={n}
            style={{
              background: c.card,
              border: "1px solid " + c.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: c.dark,
                marginBottom: 8,
              }}
            >
              {"[Finding " + n + ": z.B. Titel nicht Rufus-optimiert]"}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div style={{ padding: 10, background: "#fef2f2", borderRadius: 8 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.red,
                    letterSpacing: 1,
                  }}
                >
                  WAS WIR SEHEN
                </div>
                <div style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>
                  {"[Konkrete Schwäche beschreiben]"}
                </div>
              </div>
              <div style={{ padding: 10, background: "#f0fdf4", borderRadius: 8 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.green,
                    letterSpacing: 1,
                  }}
                >
                  WAS TOP-SELLER MACHEN
                </div>
                <div style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>
                  {"[Best Practice als Referenz]"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          padding: 18,
          background: "#fef3c7",
          borderRadius: 12,
          textAlign: "center",
          border: "2px solid #fbbf24",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: c.amber, letterSpacing: 1, marginBottom: 6 }}>
          FAZIT
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#92400e",
            lineHeight: 1.4,
          }}
        >
          {"Jede dieser Lücken kostet euch täglich Klicks, Conversions und Umsatz."}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 7 – Kostprobe Hauptbild (Vorher / Nachher)
   "Unsere Version" visuell hervorgehoben
   ================================================================ */
function Slide7() {
  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.dark,
          marginBottom: 24,
        }}
      >
        Eure Kostprobe – Vorher und Nachher
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 40px 1.25fr",
          gap: 0,
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fca5a533",
            borderRadius: 14,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: c.red,
              marginBottom: 12,
            }}
          >
            AKTUELL
          </div>
          <div
            style={{
              width: "100%",
              height: 220,
              background: "#fee2e2",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c.red,
              fontSize: 12,
              border: "1px dashed #fca5a555",
            }}
          >
            {"[Screenshot aktuelles Bild]"}
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 28, color: c.dim }}>→</div>
        <div
          style={{
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            border: "2px solid #22c55e",
            borderRadius: 14,
            padding: 24,
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(34,197,94,0.15)",
            transform: "scale(1.02)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: c.green,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Sparkles size={14} /> UNSERE VERSION
          </div>
          <div
            style={{
              width: "100%",
              height: 240,
              background: "#dcfce7",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c.green,
              fontSize: 12,
              border: "1px dashed #4ade8055",
            }}
          >
            {"[Fertig designtes Listing-Bild]"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 8 – Galerie-Bilder + Flywheel (CTR → Absatz → Ranking → CVR)
   ================================================================ */
function Slide8() {
  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.dark,
          marginBottom: 24,
        }}
      >
        Weitere Listing-Bilder – exklusiv für euch
      </div>
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 28,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            flex: "0 0 220px",
            height: 180,
            background: "#f0fdf4",
            borderRadius: 12,
            border: "2px solid #4ade8033",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.green,
            fontSize: 12,
          }}
        >
          {"[Galeriebild 1]"}
        </div>
        <div
          style={{
            flex: "0 0 220px",
            height: 180,
            background: "#f0fdf4",
            borderRadius: 12,
            border: "2px solid #4ade8033",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.green,
            fontSize: 12,
          }}
        >
          {"[Galeriebild 2]"}
        </div>
        <div
          style={{
            flex: "0 0 220px",
            height: 180,
            background: "#f0fdf4",
            borderRadius: 12,
            border: "1px solid #4ade8022",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.dim,
            fontSize: 11,
            filter: "blur(3px)",
            opacity: 0.6,
          }}
        >
          {"[Galeriebild 3]"}
        </div>
        <div
          style={{
            flex: "0 0 220px",
            height: 180,
            background: "#f3f4f6",
            borderRadius: 12,
            border: "1px solid " + c.border,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.dim,
            fontSize: 11,
            filter: "blur(5px)",
            opacity: 0.35,
          }}
        >
          {"[Galeriebild 4]"}
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, transparent, #ffffff)",
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Flywheel */}
      <div style={{ position: "relative", padding: "8px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          <div style={{ textAlign: "center", padding: 16, background: c.card, border: "2px solid " + brand.strategy, borderRadius: 12, minWidth: 140 }}>
            <MousePointerClick size={22} color={brand.strategy} style={{ margin: "0 auto 6px" }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: brand.strategy }}>CTR ↑</div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>Click-Through-Rate steigt</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px" }}>
            <ChevronRight size={20} color={c.dim} />
          </div>
          <div style={{ textAlign: "center", padding: 16, background: c.card, border: "2px solid " + c.green, borderRadius: 12, minWidth: 140 }}>
            <ShoppingCart size={22} color={c.green} style={{ margin: "0 auto 6px" }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: c.green }}>Absatz ↑</div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>Mehr Verkäufe</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px" }}>
            <ChevronRight size={20} color={c.dim} />
          </div>
          <div style={{ textAlign: "center", padding: 16, background: c.card, border: "2px solid " + brand.advertising, borderRadius: 12, minWidth: 140 }}>
            <TrendingUp size={22} color={brand.advertising} style={{ margin: "0 auto 6px" }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: brand.advertising }}>Ranking ↑</div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>Organic Ranking steigt</div>
          </div>
        </div>
        {/* Flywheel return arrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 20px",
              background: "#f9fafb",
              borderRadius: 20,
              border: "1px solid " + c.border,
            }}
          >
            <RefreshCw size={14} color={brand.strategy} />
            <span style={{ fontSize: 11, fontWeight: 700, color: c.dark }}>
              Flywheel: Ranking → CVR → Absatz → Ranking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 9 – Durchschnittlicher Seller vs. optimierte Brand (unverändert)
   ================================================================ */
function Slide9() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 8 }}>
        Der Unterschied
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 24 }}>
        Durchschnittlicher Seller vs. optimierte Brand
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          style={{
            border: "2px solid #fca5a533",
            borderRadius: 14,
            padding: 20,
            background: "#fef2f2",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: c.red,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            DURCHSCHNITT
          </div>
          {[
            "Titel: Keyword-Stuffing, nicht lesbar",
            "Bilder: Handy-Fotos, kein Konzept",
            "Kein A+ Content, keine Brand Story",
            "Ads auf schwache Listings geschaltet",
            "Kein System, kein Reporting",
            "Backend-Attribute: leer",
          ].map(function (t, i) {
            return (
              <div key={i} style={{ fontSize: 13, color: "#991b1b", padding: "5px 0" }}>
                {"✗ " + t}
              </div>
            );
          })}
          <div
            style={{
              marginTop: 14,
              padding: 10,
              background: "#fee2e2",
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>
              CTR 0,2% · CVR 5% · ACoS 45%+
            </div>
          </div>
        </div>
        <div
          style={{
            border: "2px solid #4ade8033",
            borderRadius: 14,
            padding: 20,
            background: "#f0fdf4",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: c.green,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            TOP-SELLER / UNSERE KUNDEN
          </div>
          {[
            "Titel: Intent-optimiert, Rufus-lesbar",
            "Bilder: A/B-getestet, strategisch aufgebaut",
            "Premium A+ mit Video und Hotspots",
            "Ads auf Retail-Ready Listings",
            "Weekly Monitoring, Monthly Reports",
            "750+ Attribute für COSMO optimiert",
          ].map(function (t, i) {
            return (
              <div key={i} style={{ fontSize: 13, color: "#166534", padding: "5px 0" }}>
                {"✓ " + t}
              </div>
            );
          })}
          <div
            style={{
              marginTop: 14,
              padding: 10,
              background: "#dcfce7",
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>
              {"CTR 0,5%+ · CVR 15%+ · ACoS <20%"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 10 – CTR / CVR Split (2 Spalten: CTR links, CVR rechts)
   ================================================================ */
function Slide10() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 28 }}>
        3 Hebel, die sofort wirken würden
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          style={{
            background: c.card,
            border: "1px solid " + c.border,
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: brand.strategy,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MousePointerClick size={18} color={brand.strategy} />
            CTR – Click-Through-Rate
          </div>
          <div
            style={{
              width: "100%",
              height: 160,
              background: "#fff7ed",
              borderRadius: 8,
              border: "1px dashed " + brand.strategy + "44",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: brand.strategy,
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            {"[Bild-Platzhalter CTR]"}
          </div>
          <div style={{ fontSize: 12, color: c.text, padding: "4px 0" }}>
            {"→ [Bullet Point 1: z.B. Main Image optimieren]"}
          </div>
          <div style={{ fontSize: 12, color: c.text, padding: "4px 0" }}>
            {"→ [Bullet Point 2: z.B. Titel Rufus-optimiert]"}
          </div>
        </div>
        <div
          style={{
            background: c.card,
            border: "1px solid " + c.border,
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: c.green,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ShoppingCart size={18} color={c.green} />
            CVR – Conversion Rate
          </div>
          <div
            style={{
              width: "100%",
              height: 160,
              background: "#f0fdf4",
              borderRadius: 8,
              border: "1px dashed #4ade8044",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c.green,
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            {"[Bild-Platzhalter CVR]"}
          </div>
          <div style={{ fontSize: 12, color: c.text, padding: "4px 0" }}>
            {"→ [Bullet Point 1: z.B. A+ Content mit Strategie]"}
          </div>
          <div style={{ fontSize: 12, color: c.text, padding: "4px 0" }}>
            {"→ [Bullet Point 2: z.B. Gallery-Bilder optimieren]"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 11 – Warum intern selten funktioniert (unverändert)
   ================================================================ */
function Slide11() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 8 }}>
        Das kennt ihr vielleicht
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 24 }}>
        Warum intern optimieren selten funktioniert
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            title: "Keine Bandwidth",
            desc: "Amazon ist ein Fulltime-Job. Euer Team hat andere Prioritäten – eigener Shop, Einzelhandel, Tagesgeschäft.",
            Icon: Clock,
          },
          {
            title: "KI-Tools ohne Workflow",
            desc: "ChatGPT, Midjourney, DALL-E – alle ausprobiert, aber kein System dahinter. Ergebnis: mittelmäßig.",
            Icon: Bot,
          },
          {
            title: "Agentur-Enttäuschung",
            desc: "Die letzte Agentur hat den ACoS hochgetrieben und am Ende war weniger Profit da. Verständlich, dass ihr skeptisch seid.",
            Icon: ChartNoAxesCombined,
          },
          {
            title: "Fehlende Tiefe",
            desc: "Euer Team kann Amazon bedienen – aber nicht auf dem Niveau optimieren, das nötig wäre. 750+ Datenpunkte sind kein Hobby-Projekt.",
            Icon: Puzzle,
          },
        ].map(function (item, i) {
          return (
            <div
              key={i}
              style={{
                padding: 18,
                background: c.card,
                border: "1px solid " + c.border,
                borderRadius: 12,
              }}
            >
              <item.Icon size={24} color={c.dim} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: c.dark, marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 12 – COSMO / Rufus KI (ehemals Slide 4, jetzt hier eingefügt)
   ================================================================ */
function Slide12() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 8 }}>
        Was sich verändert hat
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 6 }}>
        {"Amazons KI sieht alles."}
        <br />
        {"Nicht nur eure Keywords."}
      </div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 24 }}>
        Die meisten Seller optimieren 10–20 sichtbare Felder. Amazons COSMO und
        Rufus analysieren 750+ Datenpunkte.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding: 18,
            background: "#fef2f2",
            border: "1px solid #fca5a533",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: c.red, marginBottom: 10 }}>
            WAS DIE MEISTEN OPTIMIEREN
          </div>
          {[
            "Titel mit Keywords füllen",
            "Ein paar Bullet Points schreiben",
            "Bilder hochladen",
            "Ads einschalten und hoffen",
          ].map(function (t, i) {
            return (
              <div key={i} style={{ fontSize: 13, color: "#991b1b", padding: "4px 0" }}>
                {"✗ " + t}
              </div>
            );
          })}
        </div>
        <div
          style={{
            padding: 18,
            background: "#f0fdf4",
            border: "1px solid #4ade8033",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: c.green, marginBottom: 10 }}>
            WAS COSMO & RUFUS ANALYSIEREN
          </div>
          {[
            "Texte, Bilder, A+ Content, Videos",
            "Alle Produkt-Attribute im Backend",
            "Review-Sentiment und Fragen",
            "Kaufintent und Use-Case-Matching",
          ].map(function (t, i) {
            return (
              <div key={i} style={{ fontSize: 13, color: "#166534", padding: "4px 0" }}>
                {"✓ " + t}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          padding: 14,
          background: "#eff6ff",
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: brand.advertising }}>
          Rufus-Nutzer kaufen 60% wahrscheinlicher. Wer von Rufus empfohlen
          wird, gewinnt.
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 13 – Framework / Approach
   ================================================================ */
function Slide13() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 6 }}>
        Erst Fundament.
        <br />
        Dann Skalierung.
      </div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 28 }}>
        Die meisten Agenturen starten mit Ads. Wir starten mit dem, was Ads
        erst profitabel macht.
      </div>
      {/* 4 Bausteine – vergrößert, ohne Emojis, mit Icons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          { Icon: Target, name: "Strategy", color: brand.strategy },
          { Icon: FileText, name: "Content", color: brand.content },
          { Icon: BarChart3, name: "Advertising", color: brand.advertising },
          { Icon: Settings, name: "Management", color: brand.management === "#CDE6F4" ? "#6ba3be" : brand.management },
        ].map(function (p, i) {
          const bgColor = p.name === "Management" ? brand.management + "44" : p.color + "10";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "20px 12px",
                  border: "2px solid " + p.color,
                  borderRadius: 14,
                  width: "100%",
                  background: bgColor,
                }}
              >
                <p.Icon size={28} color={p.color} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: p.color }}>
                  {p.name}
                </div>
              </div>
              {i < 3 ? (
                <div style={{ padding: "4px 0", fontSize: 16, color: c.dim }}>→</div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: 12,
          background: "#eff6ff",
          borderRadius: 10,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: c.dark }}>
          Organic First. PPC Second.
        </div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>
          Wir positionieren eure Marke unter den besten organischen Ergebnissen
          – nicht nur unter den Sponsored.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <div style={{ padding: 10, background: "#f0fdf4", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.green }}>Phase 1</div>
          <div style={{ fontSize: 10, color: c.muted, marginTop: 3 }}>
            Listing überlebt alleine – auch ohne Werbung
          </div>
        </div>
        <div style={{ padding: 10, background: "#eff6ff", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: brand.advertising }}>Phase 2</div>
          <div style={{ fontSize: 10, color: c.muted, marginTop: 3 }}>
            PPC pushed Rankings, Reviews kommen, Organik wächst
          </div>
        </div>
        <div style={{ padding: 10, background: "#fef3c7", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.amber }}>Phase 3</div>
          <div style={{ fontSize: 10, color: c.muted, marginTop: 3 }}>
            Flywheel dreht – günstigerer Traffic, höhere Profitabilität
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 14 – Case Studies
   ================================================================ */
function Slide14() {
  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.dark,
          marginBottom: 24,
        }}
      >
        Das passiert, wenn unser Framework
        <br />
        an eure Brand angeschlossen wird
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            brand: "[Brand A]",
            cat: "[Kategorie]",
            res: [
              { l: "Umsatz", b: "[XX]k", a: "[XX]k", d: "+[XXX]%" },
              { l: "TACoS", b: "[XX]%", a: "[X]%", d: "-[XX]pp" },
              { l: "Organic", b: "[XX]%", a: "[XX]%", d: "+[XX]pp" },
            ],
          },
          {
            brand: "[Brand B]",
            cat: "[Kategorie]",
            res: [
              { l: "Umsatz", b: "[XX]k", a: "[XX]k", d: "+[XXX]%" },
              { l: "ACoS", b: "[XX]%", a: "[X]%", d: "-[XX]pp" },
              { l: "CVR", b: "[X]%", a: "[XX]%", d: "+[XX]pp" },
            ],
          },
        ].map(function (cs, i) {
          return (
            <div
              key={i}
              style={{
                background: c.card,
                border: "1px solid " + c.border,
                borderRadius: 14,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: brand.strategy,
                  letterSpacing: 1,
                }}
              >
                {cs.cat}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: c.dark,
                  marginBottom: 12,
                }}
              >
                {cs.brand}
              </div>
              {cs.res.map(function (r, j) {
                return (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid " + c.border,
                    }}
                  >
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>
                      {r.l}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: c.dim,
                        textDecoration: "line-through",
                        marginRight: 10,
                      }}
                    >
                      {r.b}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: c.green,
                        marginRight: 8,
                      }}
                    >
                      {r.a}
                    </div>
                    <div
                      style={{
                        padding: "2px 8px",
                        background: "#dcfce7",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        color: c.green,
                      }}
                    >
                      {r.d}
                    </div>
                  </div>
                );
              })}
              {/* Platzhalter für Gesicht / Zitat */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 14,
                  padding: 10,
                  background: "#f9fafb",
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: c.dim,
                    flexShrink: 0,
                  }}
                >
                  [Foto]
                </div>
                <div style={{ fontSize: 11, color: c.muted, fontStyle: "italic" }}>
                  {"\"[Zitat des Brand Owners]\""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 15 – A/B Tests (ehem. Case Study Detail)
   ================================================================ */
function Slide15() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 24 }}>
        Kürzliche A/B-Tests für unsere Kunden
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            height: 180,
            background: "#f3f4f6",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid " + c.border,
            fontSize: 12,
            color: c.dim,
          }}
        >
          {"[Vorher]"}
        </div>
        <div
          style={{
            height: 180,
            background: "#f0fdf4",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #4ade8022",
            fontSize: 12,
            color: c.dim,
          }}
        >
          {"[Nachher]"}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {[
          { v: "[+XX%]", l: "Umsatz" },
          { v: "[-XX%]", l: "ACoS" },
          { v: "[+XX%]", l: "Umsatz" },
          { v: "[-XX%]", l: "ACoS" },
        ].map(function (k, i) {
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: 12,
                background: c.card,
                border: "1px solid " + c.border,
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: brand.advertising }}>
                {k.v}
              </div>
              <div style={{ fontSize: 11, color: c.muted }}>{k.l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 16 – Vier Bausteine, ein System
   ================================================================ */
function Slide16() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 24 }}>
        Vier Bausteine. Ein System.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            Icon: Target,
            name: "Strategy",
            items: [
              "Wettbewerbsanalyse",
              "Margenkalkulation",
              "Positionierung",
              "COSMO/Rufus Audit",
            ],
            color: brand.strategy,
          },
          {
            Icon: FileText,
            name: "Content",
            items: [
              "SEO-Texte und Keywords",
              "Listing-Bilder und Video",
              "A+ Premium und Brand Story",
              "Brandstore",
            ],
            color: brand.content,
          },
          {
            Icon: BarChart3,
            name: "Advertising",
            items: [
              "Full-Funnel SP/SB/SD/DSP",
              "AMC Analytics",
              "Budget-Optimierung",
              "Keyword-Management",
            ],
            color: brand.advertising,
          },
          {
            Icon: Settings,
            name: "Management",
            items: [
              "Weekly Ad Monitoring",
              "A/B Testing",
              "Monthly Reporting",
              "Review-Management",
            ],
            color: brand.management === "#CDE6F4" ? "#6ba3be" : brand.management,
            bgColor: brand.management,
          },
        ].map(function (b, i) {
          const bg = b.bgColor ? b.bgColor + "33" : b.color + "08";
          return (
            <div
              key={i}
              style={{
                padding: 20,
                background: c.card,
                border: "2px solid " + b.color,
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <b.Icon size={22} color={b.color} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: b.color }}>
                  {b.name}
                </span>
              </div>
              {b.items.map(function (item, j) {
                return (
                  <div key={j} style={{ fontSize: 12, color: c.muted, padding: "3px 0" }}>
                    {"· " + item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 17 – Brand Logos (Überlauf links/rechts)
   ================================================================ */
function Slide17() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "40px 0",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 36 }}>
        Brands, die mit uns wachsen
      </div>
      {/* Logos row 1 – overflows both sides */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 16,
          width: "130%",
          marginLeft: "-15%",
          justifyContent: "center",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
          return (
            <div
              key={n}
              style={{
                flex: "0 0 110px",
                height: 60,
                background: "#f9fafb",
                border: "1px solid " + c.border,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: c.dim,
              }}
            >
              {"[Logo " + n + "]"}
            </div>
          );
        })}
      </div>
      {/* Logos row 2 */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 36,
          width: "130%",
          marginLeft: "-15%",
          justifyContent: "center",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {[9, 10, 11, 12, 13, 14, 15, 16].map(function (n) {
          return (
            <div
              key={n}
              style={{
                flex: "0 0 110px",
                height: 60,
                background: "#f9fafb",
                border: "1px solid " + c.border,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: c.dim,
              }}
            >
              {"[Logo " + n + "]"}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 14, color: c.muted, fontStyle: "italic", maxWidth: 500 }}>
        {"\"[Testimonial-Quote – 1 Satz]\""}
      </div>
      <div style={{ fontSize: 12, color: c.dim, marginTop: 6 }}>
        {"[Name, Position] – [Brand]"}
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 18 – Warum wir (Framework × AI = Agentur)
   ================================================================ */
function Slide18() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 8 }}>
        Warum [Agenturname]
      </div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 28 }}>
        Unser Framework verbindet datengetriebene Amazon-Expertise mit AI-first
        Technologie – das macht uns in 2026 einzigartig.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {/* Framework */}
        <div
          style={{
            flex: "1",
            height: 200,
            background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
            border: "2px solid " + c.border,
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, transparent 60%, #ffffff88)",
              backdropFilter: "blur(2px)",
            }}
          />
          <ShieldCheck size={32} color={brand.advertising} style={{ position: "relative", zIndex: 1, marginBottom: 8 }} />
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: brand.advertising,
              position: "relative",
              zIndex: 1,
            }}
          >
            Framework
          </div>
          <div
            style={{
              fontSize: 10,
              color: c.dim,
              position: "relative",
              zIndex: 1,
              marginTop: 4,
            }}
          >
            [Framework-Bild / Ausschnitt]
          </div>
        </div>
        {/* Plus */}
        <div style={{ fontSize: 28, fontWeight: 800, color: c.dim }}>+</div>
        {/* AI */}
        <div
          style={{
            flex: "1",
            height: 200,
            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
            border: "2px solid " + brand.advertising,
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Brain size={32} color={brand.advertising} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: brand.advertising }}>
            AI-First
          </div>
          <div style={{ fontSize: 10, color: c.muted, marginTop: 4 }}>
            Technologie & Automation
          </div>
        </div>
      </div>
      {/* Result */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 20, color: c.dim, marginRight: 16 }}>↓</div>
      </div>
      <div
        style={{
          padding: 20,
          background: brand.advertising,
          borderRadius: 14,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
          [Agenturname] – AI-First Amazon Growth Agency
        </div>
        <div style={{ fontSize: 12, color: "#ffffffaa", marginTop: 6 }}>
          Der Grund, warum Brands in 2026 mit uns zusammenarbeiten.
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 19 – Team (7 Team + 1 Kunden-Logo)
   ================================================================ */
function Slide19() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 6 }}>
        [Agenturname]
      </div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 24 }}>
        Ihr bekommt nicht einen Ansprechpartner – ihr bekommt ein ganzes Team.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { v: "[X]+", l: "Brands betreut" },
          { v: "[X]M", l: "Ad Budget verwaltet" },
          { v: "[X]+", l: "Jahre Erfahrung" },
          { v: "[X]", l: "Marketplaces" },
        ].map(function (s, i) {
          return (
            <div key={i} style={{ textAlign: "center", padding: 12, background: "#f9fafb", borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: brand.advertising }}>
                {s.v}
              </div>
              <div style={{ fontSize: 10, color: c.muted }}>{s.l}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
        {[
          { r: "Gründer", cl: brand.strategy },
          { r: "Head of Content", cl: brand.content },
          { r: "Head of Ads", cl: brand.advertising },
          { r: "Client Success", cl: "#6ba3be" },
          { r: "Content Manager", cl: brand.content },
          { r: "Ad Manager", cl: brand.advertising },
          { r: "Designer", cl: brand.strategy },
        ].map(function (p, i) {
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: 10,
                background: c.card,
                border: "1px solid " + c.border,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: p.cl + "15",
                  border: "2px solid " + p.cl,
                  margin: "0 auto 5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  color: c.dim,
                }}
              >
                [Foto]
              </div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>[Name]</div>
              <div style={{ fontSize: 10, color: p.cl }}>{p.r}</div>
            </div>
          );
        })}
        {/* Kunden-Logo Platzhalter */}
        <div
          style={{
            textAlign: "center",
            padding: 10,
            background: "#fffbeb",
            border: "2px dashed " + brand.strategy,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: brand.strategy + "15",
              border: "2px solid " + brand.strategy,
              margin: "0 auto 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: brand.strategy,
            }}
          >
            [Logo]
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: brand.strategy }}>
            Eure Brand
          </div>
          <div style={{ fontSize: 10, color: c.muted }}>Euer Platz im Team</div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 20 – Nächste Schritte + Bewertungen
   ================================================================ */
function Slide20() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: c.dark, marginBottom: 4 }}>
        Ein 30-Minuten-Gespräch.
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: brand.strategy,
          fontStyle: "italic",
          marginBottom: 28,
        }}
      >
        Kein Pitch. Keine Verpflichtung.
      </div>
      <div
        style={{
          padding: 20,
          background: "#f0fdf4",
          borderRadius: 14,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: c.dark, marginBottom: 12 }}>
          Was ihr aus dem Gespräch mitnehmt – egal was passiert:
        </div>
        {[
          "Klares Bild eures ungenutzten Potenzials auf Amazon",
          "Priorisierte Maßnahmen-Liste für eure nächsten Schritte",
          "Verständnis für COSMO, Rufus und warum 750+ Attribute zählen",
          "Das fertige Listing-Bild – das gehört euch, ohne Bedingungen",
        ].map(function (t, i) {
          return (
            <div key={i} style={{ fontSize: 13, color: c.text, padding: "5px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: c.green, fontWeight: 700 }}>✓</span> {t}
            </div>
          );
        })}
      </div>
      {/* Google + Trustpilot Reviews */}
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: c.card,
            border: "1px solid " + c.border,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#f3f4f6",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: c.dim,
            }}
          >
            G
          </div>
          <div>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map(function (n) {
                return <Star key={n} size={14} fill="#facc15" color="#facc15" />;
              })}
            </div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>
              Google Reviews · [X.X/5]
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: c.card,
            border: "1px solid " + c.border,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#00b67a15",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: "#00b67a",
              fontWeight: 700,
            }}
          >
            TP
          </div>
          <div>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map(function (n) {
                return <Star key={n} size={14} fill="#00b67a" color="#00b67a" />;
              })}
            </div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>
              Trustpilot · [X.X/5]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 21 – CTA (Pattern Interrupt mit leichtem Witz)
   ================================================================ */
function Slide21() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 48,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: c.dark,
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Euer Listing wartet nicht.
        <br />
        Eure Konkurrenz auch nicht.
      </div>
      <div
        style={{
          fontSize: 15,
          color: c.muted,
          marginBottom: 40,
          maxWidth: 480,
        }}
      >
        Die einzige Frage: Wer optimiert zuerst – ihr oder der Wettbewerb?
        <br />
        (Hinweis: Die lesen wahrscheinlich gerade kein Audit.)
      </div>
      <div
        style={{
          padding: "20px 48px",
          background: brand.advertising,
          borderRadius: 12,
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
          Termin buchen
        </div>
        <div style={{ fontSize: 12, color: "#ffffffaa", marginTop: 4 }}>
          [Calendly-Link / E-Mail / Telefon]
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   APP – Navigation & Slide Container
   ================================================================ */
const SLIDES = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
  Slide20,
  Slide21,
];

const SLIDE_TYPES: ("T" | "I")[] = [
  "T", // 1  Cover
  "T", // 2  Statement
  "T", // 3  Markt-Realität
  "T", // 4  Statement
  "I", // 5  Audit Score
  "I", // 6  Findings
  "I", // 7  Kostprobe
  "I", // 8  Galerie + Flywheel
  "T", // 9  Durchschnitt vs Top
  "I", // 10 CTR/CVR Hebel
  "T", // 11 Warum intern nicht
  "T", // 12 COSMO/Rufus KI
  "T", // 13 Framework
  "T", // 14 Case Studies
  "I", // 15 A/B Tests
  "T", // 16 4 Bausteine
  "T", // 17 Logos
  "T", // 18 Warum wir
  "T", // 19 Team
  "T", // 20 Nächste Schritte
  "T", // 21 CTA
];

const SPEAKER_NOTES = [
  "Cover – Kundenname einsetzen. Kein Preis, kein Scope – nur Neugier wecken.",
  "Statement – Setzt den Ton. Lassen, wirken lassen, dann weiter.",
  "Harte Zahlen. Erzeugt Dringlichkeit ohne Vorwurf.",
  "Statement – Überleitung zu den Audit-Ergebnissen.",
  "INDIVIDUELL – Audit-Scores eintragen. Gap zu Top-Sellern sichtbar machen.",
  "INDIVIDUELL – Konkrete Findings aus dem Audit. Ist vs. Best Practice. Fazit-Box betonen.",
  "INDIVIDUELL – Das Gratis-Bild! DER emotionale Höhepunkt. Vorher/Nachher.",
  "INDIVIDUELL – Galeriebilder zeigen. Flywheel-Logik erklären: CTR → Absatz → Ranking → CVR.",
  "Durchschnitt vs. Top-Seller mit konkreten KPIs. Stärkste Vergleichs-Slide.",
  "INDIVIDUELL – CTR-Hebel links, CVR-Hebel rechts. Konkrete Maßnahmen.",
  "Empathie-Slide. Spricht Pain Points an die der ICP wirklich hat. Baut Vertrauen.",
  "COSMO/Rufus erklären. 750+ Datenpunkte. Positioniert euch als Experten.",
  "Framework auf 1 Slide. Organic First. 3-Phasen-Logik.",
  "Case Studies: Framework an Brand anschließen. Ergebnisse + Zitat.",
  "INDIVIDUELL – A/B-Tests Vorher/Nachher mit Umsatz + ACoS.",
  "4 Bausteine als Übersicht. Scannbar, klar, kein Textwand.",
  "Social Proof. Logos über den Rand hinaus – zeigt Masse.",
  "Framework × AI = Agentur. Der USP auf einer Slide.",
  "Team + Kunden-Logo. Ihr bekommt das ganze Team.",
  "Soft CTA. Outcomes des Gesprächs. Google/Trustpilot Reviews.",
  "Hard CTA. Pattern Interrupt – leichter Witz, aber professionell.",
];

const TOTAL = SLIDES.length;

export default function Praesentation() {
  const [cur, setCur] = useState(0);
  const [notes, setNotes] = useState(false);
  const Comp = SLIDES[cur];
  const tp = SLIDE_TYPES[cur];

  return (
    <div
      style={{
        background: c.bg,
        minHeight: "100vh",
        fontFamily: "Inter, Segoe UI, system-ui, sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderBottom: "1px solid " + c.border,
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: c.dark }}>
            {cur + 1 + "/" + TOTAL}
          </span>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 700,
              background: tp === "I" ? "#fef3c7" : "#eff6ff",
              color: tp === "I" ? c.amber : brand.advertising,
            }}
          >
            {tp === "I" ? "INDIVIDUELL" : "TEMPLATE"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {SLIDES.map(function (_, i) {
            const active = i === cur;
            const isIndiv = SLIDE_TYPES[i] === "I";
            return (
              <div
                key={i}
                onClick={function () {
                  setCur(i);
                }}
                style={{
                  width: active ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  cursor: "pointer",
                  background: active
                    ? isIndiv
                      ? c.amber
                      : brand.advertising
                    : "#e5e7eb",
                  transition: "all 0.2s",
                }}
              />
            );
          })}
        </div>
        <button
          onClick={function () {
            setNotes(!notes);
          }}
          style={{
            fontSize: 11,
            padding: "4px 10px",
            border: "1px solid " + c.border,
            borderRadius: 6,
            background: notes ? "#fef3c7" : "#fff",
            color: c.text,
            cursor: "pointer",
          }}
        >
          {"Notes " + (notes ? "✓" : "")}
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "12px 16px" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid " + c.border,
            borderRadius: 16,
            minHeight: 500,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <Comp />
        </div>
        {notes && (
          <div
            style={{
              marginTop: 8,
              padding: "10px 14px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: c.amber,
                letterSpacing: 1,
              }}
            >
              SPEAKER NOTES
            </div>
            <div style={{ fontSize: 12, color: c.text, marginTop: 4, lineHeight: 1.6 }}>
              {SPEAKER_NOTES[cur]}
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            paddingBottom: 20,
          }}
        >
          <button
            onClick={function () {
              setCur(Math.max(0, cur - 1));
            }}
            disabled={cur === 0}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid " + c.border,
              background: "#fff",
              color: cur === 0 ? c.dim : c.dark,
              cursor: cur === 0 ? "default" : "pointer",
              fontSize: 13,
            }}
          >
            ← Zurück
          </button>
          <button
            onClick={function () {
              setCur(Math.min(TOTAL - 1, cur + 1));
            }}
            disabled={cur === TOTAL - 1}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid " + brand.advertising,
              background: cur === TOTAL - 1 ? "#fff" : brand.advertising,
              color: cur === TOTAL - 1 ? c.dim : "#fff",
              cursor: cur === TOTAL - 1 ? "default" : "pointer",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}
