# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:4321/bks-news)
npm run build    # Build static site to ./dist
npm run preview  # Preview production build
```

## Architecture

Astro 5 static site for AI-generated news briefings. Deployed via GitHub Actions to GitHub Pages at https://bks-lab.github.io/bks-news.

### Content Pipeline

```
launchd auf macminim4 (Workload bks-weekly-newsletter, Sonntag 10:00)
  → newsletter-wrapper.sh (Skill bks-news-generator in der Bridge, 10 Schritte)
  → Commit + Push auf main → GitHub Actions (deploy.yml) → GitHub Pages
```

Die Pipeline lebt nicht in diesem Repo, sondern in Michaels Bridge
(`mboiman/mboiman-bks-bridge`): Skill `skills/bks-news-generator/`, Deklaration
`workflow/workloads/bks-weekly-newsletter.yaml`. Der alte claude-scheduler
(`~/.claude/scheduler`, `run-task.sh`) ist abgelöst.

Die 10 Schritte: Quellen sammeln und Datum prüfen, Stories auswählen, Entwurf DE,
Bilder, Validierung durch vier Agenten, Korrekturen, Audio DE, Übersetzung EN,
Audio EN, Review mit Commit und Push.

- **Titelbild:** Codex-CLI mit gpt-image-2 (`generate-hero.sh`, ChatGPT-Login der
  Maschine), Rückfall ist ein Symbolfoto von Lorem Picsum.
- **Audio:** edge-tts (`de-DE-ConradNeural`, `en-US-AndrewNeural`).
- **Deploy:** nur bei Push auf `main` oder per Hand (`workflow_dispatch`). Ein PR
  löst weder Build noch Deploy aus.

### Key Structure

- `src/content/briefings/YYYY/MM/` - Markdown content with Zod-validated frontmatter
- `src/content/config.ts` - Content collection schema (briefings with title, date, tags, type, sources)
- `src/layouts/Base.astro` - Main layout with theme toggle, global styles, RSS link
- `src/pages/briefings/[...slug].astro` - Dynamic briefing pages with ToC, related articles, prev/next nav
- `src/pages/tags/[tag].astro` - Tag-based filtering

### Path Alias

Use `@/*` for imports from `src/` (configured in tsconfig.json).

### Briefing Frontmatter

```yaml
title: "Briefing Title"
description: "Short description"
date: 2025-12-27
heroImage: "/images/briefings/2025/12/2025-12-27-hero.jpg"
heroImageAlt: "AI-generierte Illustration zum Thema..."
tags: [ai, weekly]
type: weekly  # weekly | breaking | research | digest
sources:
  - title: "Source Name"
    url: "https://..."
draft: false
```

### Optionale Felder für Erklärung und Transparenz

```yaml
keyFigure:            # Karte unter "## Zahl der Woche" (fehlt die Überschrift: oben)
  value: 16.8
  suffix: " Mrd. USD"
  label: "Quartalsumsatz laut FT-Bericht"
  source: 4           # 1-basierter Index in sources
images:               # Herkunft je Bild, zugeordnet über den Dateinamen
  - file: "/images/briefings/2026/10/2026-10-18-hero.jpg"
    role: hero        # hero | inline
    generated: true   # zeigt "KI-generiert" und "Wie entstanden?"
    prompt: "..."
    model: "gpt-image-2"
    tool: "OpenAI Codex CLI 0.163.0"
    host: "macminim4"
    createdAt: "2026-10-18T20:21:00+02:00"
  # Symbolfoto: generated: false, credit: "Lorem Picsum (Unsplash)", sourceUrl: "..."
```

Ein Bild ohne `images[]`-Eintrag bekommt keine Herkunftszeile. Ist es ein
Inline-Bild, meldet der Build eine Warnung.

Erklär-Grafiken stehen als Codeblock im Text, Typen `bars`, `growth`, `timeline`
und `flow`, `source` ist Pflicht:

````markdown
```animation
type: growth
title: "Quartalsumsatz Anthropic (laut FT-Bericht)"
source: 4
items:
  from: {label: "Q2", value: 11.5}
  to: {label: "Q3", value: 16.8}
unit: "Mrd. USD"
```
````

Welche Typen und Felder die Site kann, steht in `src/lib/capabilities.json` (eine Quelle der
Wahrheit, die Pipeline liest sie aus diesem Checkout). Passen Datei und Renderer nicht
zusammen, bricht der Build ab. Typen und wann welcher passt: Kommentar oben im Abschnitt animation in `src/lib/explain.mjs`
(bars, rank, share, growth, trend, timeline, flow). Umgesetzt in `src/lib/explain.mjs` (remark/rehype, in `astro.config.mjs`) und
`src/components/Explain.astro` (Stile, Bewegung). Ein ungültiger Block bleibt als
Codeblock stehen und meldet eine Warnung, der Build bricht nicht ab. Ohne
JavaScript und bei `prefers-reduced-motion` steht sofort der Endzustand da.

Bilder liegen unter `/public/images/briefings/YYYY/MM/`, Format 1200×630 (OG-Image).

**Falle:** Astro speichert gerenderte Ausgaben in `node_modules/.astro/data-store.json`. Nach
einer Änderung an den Plugins dort löschen, sonst baut lokal das alte HTML (CI baut frisch).

### Feeds

`src/lib/feeds.ts` baut alle vier Feeds: `rss.xml` und `en/rss.xml` mit Volltext
(`content:encoded`, die 10 jüngsten Ausgaben), `podcast.xml` (DE) und `podcast-en.xml`
(EN, alte Adresse `en/podcast.xml` bleibt). Die MP3 findet der Podcast-Feed über die
Konvention `public/audio/briefings/YYYY/MM/<slug>-<de|en>.mp3`, Größe aus der Datei,
Dauer aus der `.vtt` daneben. Cover: `public/podcast-cover.png` (3000×3000).

## Bildrechte (WICHTIG!)

**NIEMALS externe Bilder von News-Seiten einbetten!**

Das Hotlinking oder Einbetten von Bildern von Quellseiten (TechCrunch, Fortune, OpenAI Blog, etc.) ist eine **Urheberrechtsverletzung** und kann zu Abmahnungen führen.

### Erlaubte Bildquellen

| Quelle | Beispiel | Hinweis |
|--------|----------|---------|
| KI-generiert | gpt-image-2 über die Codex-CLI | Herkunft in `images[]` eintragen |
| Lizenzfrei (CC0) | Unsplash, Pexels | Keine Attribution nötig |
| Eigene Bilder | `/public/images/` | Selbst erstellt |
| Offizielle Press-Kits | openai.com/brand | Nur mit Genehmigung |

### Verboten

- Screenshots von Artikeln
- Bilder von News-Websites (TechCrunch, Verge, Fortune, etc.)
- Hotlinking zu externen Bild-URLs
- Social Media Bilder ohne Embed

### Bei Unsicherheit

**Nur verlinken, nicht einbetten.** Die aktuelle Text-basierte Lösung mit Source-Links ist rechtlich am sichersten.

### Rechtlicher Hintergrund

- §2 UrhG: Bilder sind urheberrechtlich geschützt
- §49 UrhG (Pressespiegel): Gilt NICHT für Bilder
- BGH "Vorschaubilder": Gilt nur für Suchmaschinen, nicht für redaktionelle Nutzung
- Risiko bei Verstoß: 500-2000 EUR pro Bild + Unterlassungserklärung

### Site Configuration

- Base URL: `/bks-news` (required for all internal links)
- Output: Static HTML
- Markdown: Shiki syntax highlighting (github-dark theme)
- Themes: Dark (default) / Light with localStorage persistence
