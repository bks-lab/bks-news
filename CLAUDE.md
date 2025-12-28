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
launchd (cron) → run-task.sh → Claude CLI → output-repo.sh → Git push → GitHub Actions → Static Site
```

## News Generation (Claude Scheduler)

Briefings werden automatisch via Claude Scheduler generiert.

### Relevante Dateien (außerhalb dieses Repos)

| Datei | Pfad | Beschreibung |
|-------|------|--------------|
| Task-Config | `~/.claude/scheduler/config/tasks.yaml` | Prompt, Schedule, Output-Routing |
| run-task.sh | `~/.claude/skills/claude-scheduler/scripts/run-task.sh` | Führt Claude aus, routet Output |
| output-repo.sh | `~/.claude/skills/claude-scheduler/scripts/output-repo.sh` | Schreibt MD, committed, pushed |

### Manuelle Ausführung

```bash
# Test (schreibt in test-briefing.md)
~/.claude/skills/claude-scheduler/scripts/run-task.sh "AI Weekly Briefing"

# Dry-run (zeigt Config, führt nicht aus)
~/.claude/skills/claude-scheduler/scripts/run-task.sh "AI Weekly Briefing" --dry-run
```

### Production aktivieren

Die Konfiguration ist bereits vorbereitet in `~/.claude/scheduler/config/tasks.yaml`:

```yaml
output:
  type: repo
  destination: ~/Developer/bks/bks-news
  path_pattern: src/content/briefings/{{YYYY}}/{{MM}}/{{DATE}}-{{SLUG}}.md
```

**Scheduler aktivieren:**
```bash
~/.claude/skills/claude-scheduler/scripts/install-schedule.sh install
```

**Scheduler deaktivieren:**
```bash
~/.claude/skills/claude-scheduler/scripts/install-schedule.sh uninstall
```

**Status prüfen:**
```bash
~/.claude/skills/claude-scheduler/scripts/install-schedule.sh status
```

### Schedule

- **AI Weekly Briefing**: Montag 8:00 (`0 8 * * 1`)

Siehe [PLAN.md](./PLAN.md) für vollständige Architektur-Dokumentation.

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
tags: [ai, weekly]
type: weekly  # weekly | breaking | research | digest
autoImage: true  # Optional: AI-generiertes Hero-Image via Pollinations.ai
sources:
  - title: "Source Name"
    url: "https://..."
draft: false
```

### Auto-Image Feature

Setze `autoImage: true` im Frontmatter für automatisch generierte Hero-Images via Pollinations.ai:

- **Kostenlos** - Keine API-Keys oder Kosten
- **Automatisch** - Bild wird aus Titel generiert
- **Rechtlich sicher** - AI-generiert, keine Urheberrechte
- **Optional** - Standard ist `false`, bestehende Artikel unverändert

## Bildrechte (WICHTIG!)

**NIEMALS externe Bilder von News-Seiten einbetten!**

Das Hotlinking oder Einbetten von Bildern von Quellseiten (TechCrunch, Fortune, OpenAI Blog, etc.) ist eine **Urheberrechtsverletzung** und kann zu Abmahnungen führen.

### Erlaubte Bildquellen

| Quelle | Beispiel | Hinweis |
|--------|----------|---------|
| KI-generiert | DALL-E, Midjourney | Rechtlich am sichersten |
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
