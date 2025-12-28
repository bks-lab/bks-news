# BKS-News: AI-generierte Briefings als Static Site

## Projektziel

Umbau des Claude Schedulers von Apple Notes Output zu einem Git-basierten Markdown-System mit automatischem Build und Deployment.

**Vorher:** Cron → Claude → Apple Notes (isoliert, nicht versioniert)
**Nachher:** Cron → Claude → Markdown → Git → GitHub Actions → Static Site

## Live-URLs

- **Site:** https://bks-lab.github.io/bks-news
- **RSS Feed:** https://bks-lab.github.io/bks-news/rss.xml
- **Repo:** https://github.com/bks-lab/bks-news
- **Scheduler Skill:** ~/.claude/skills/claude-scheduler/

## Architektur

```
┌─────────────────────────────────────────────────────────────────┐
│  MAC (Cron-Rechner)                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   launchd    │───▶│ run-task.sh  │───▶│  Claude CLI  │      │
│  │  (Schedule)  │    │              │    │  (AI News)   │      │
│  └──────────────┘    └──────────────┘    └──────┬───────┘      │
│                                                  │              │
│                                                  ▼              │
│                                          ┌──────────────┐      │
│                                          │output-repo.sh│      │
│                                          │ • Write MD   │      │
│                                          │ • Git commit │      │
│                                          │ • Git push   │      │
│                                          └──────┬───────┘      │
└─────────────────────────────────────────────────┼───────────────┘
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  GITHUB                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  bks-news    │───▶│GitHub Actions│───▶│ GitHub Pages │      │
│  │  (Repo)      │    │ (Astro Build)│    │   (Deploy)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                  │              │
│                                                  ▼              │
│                                     bks-lab.github.io/bks-news  │
└─────────────────────────────────────────────────────────────────┘
```

## Features

### Implementiert ✅

| Feature | Status | Beschreibung |
|---------|--------|--------------|
| Astro Static Site | ✅ | Content Collections mit Zod-Schema |
| GitHub Pages Deploy | ✅ | Automatischer Build bei Push |
| RSS Feed | ✅ | `/rss.xml` für Feed-Reader |
| Dark/Light Mode | ✅ | Toggle mit localStorage-Persistenz |
| Table of Contents | ✅ | Automatisch aus Headings generiert |
| Reading Time | ✅ | Berechnet basierend auf Wortanzahl |
| Responsive Images | ✅ | Max-Height Constraints, object-fit |
| Source Citations | ✅ | Grid-Layout mit Domain-Anzeige |
| Prev/Next Navigation | ✅ | Zwischen Briefings navigieren |
| Scroll-to-Top | ✅ | Floating Button bei Scroll |
| Footer Links | ✅ | BKS-Lab.com, GitHub, RSS |

### Geplant 📋

| Feature | Priorität | Beschreibung |
|---------|-----------|--------------|
| Custom Domain | Niedrig | news.bks-lab.com statt github.io |
| Pagefind Search | Mittel | Client-side Suche wie bks-web |
| Newsletter Integration | Niedrig | Buttondown/Substack Export |

## Komponenten

### 1. Astro Site (dieses Repo)

```
bks-news/
├── src/
│   ├── content/
│   │   ├── config.ts                    # Zod Schema für Briefings
│   │   └── briefings/
│   │       └── YYYY/MM/YYYY-MM-DD-title.md
│   ├── components/
│   │   ├── TableOfContents.astro        # TOC aus Headings
│   │   ├── ThemeToggle.astro            # Dark/Light Mode
│   │   ├── ScrollToTop.astro            # Floating Button
│   │   ├── Footer.astro                 # Site Footer
│   │   └── ReadingTime.astro            # Reading Time Display
│   ├── pages/
│   │   ├── index.astro                  # Briefing-Liste
│   │   ├── rss.xml.ts                   # RSS Feed
│   │   └── briefings/[...slug].astro    # Briefing-Detail
│   └── layouts/
│       └── Base.astro                   # Layout mit Theme Support
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml                   # GitHub Pages Deploy
├── astro.config.mjs
├── package.json
└── PLAN.md                              # Diese Datei
```

### 2. Scheduler Erweiterung (claude-scheduler)

**Location:** `~/.claude/skills/claude-scheduler/`

**Neues Script:** `scripts/output-repo.sh`
- Schreibt Markdown ins Repo
- Generiert Dateinamen aus Date-Pattern
- Git add, commit, push

**Erweiterung run-task.sh:** Neuer case "repo" in Output-Routing

### 3. Task-Konfiguration

**Location:** `~/.claude/scheduler/config/tasks.yaml`

```yaml
- name: "AI Weekly Briefing"
  enabled: true
  prompt: |
    KRITISCH: Deine Antwort IST der fertige Newsletter...

    ## RECHERCHE-PROZESS
    1. WebSearch für Top AI-News
    2. WebFetch für og:image und Details

    ## OUTPUT FORMAT
    ---
    title: "AI Weekly - KW XX/2025"
    heroImage: "https://..."
    sources:
      - title: "..."
        url: "..."
    ---
  schedule: "0 8 * * 1"  # Montag 8:00
  output:
    type: repo  # Oder "file" für Tests
    destination: ~/Developer/bks/bks-news
    path_pattern: src/content/briefings/{{YYYY}}/{{MM}}/{{DATE}}-{{SLUG}}.md
  permissions:
    allowedTools: [WebSearch, WebFetch]
    model: sonnet
```

## Content Schema (Zod)

```typescript
const briefingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  tags: z.array(z.string()).default([]),
  type: z.enum(['weekly', 'breaking', 'research', 'digest']).default('weekly'),
  heroImage: z.string().url().optional(),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional(),
  draft: z.boolean().default(false)
});
```

## Newsletter-Struktur

Jeder AI Weekly Newsletter enthält:

1. **TL;DR** - 3 Bullet Points (30 Sekunden lesen)
2. **Story der Woche** - Tiefgehende Analyse mit Bild
3. **Weitere Top-Stories** - 2-3 Stories mit Bildern
4. **Quick Hits** - 5 Kurznachrichten
5. **Tool der Woche** - Relevantes AI-Tool
6. **Fail der Woche** - Was schief ging
7. **Zahl der Woche** - Statistik mit Kontext
8. **Leseliste** - 3 Artikel für's Wochenende
9. **Next Week** - Ausblick

## Development

```bash
# Lokaler Dev-Server
npm run dev

# Production Build
npm run build

# Preview Build
npm run preview
```

## Cron Schedule

| Task | Schedule | Cron Expression |
|------|----------|-----------------|
| AI Weekly Briefing | Montag 8:00 | `0 8 * * 1` |

## Fehlerbehandlung

| Fehler | Handling |
|--------|----------|
| Claude CLI Fehler | Loggen, nicht committen |
| Git push Konflikt | `git pull --rebase` zuerst |
| Leerer Output | Skip commit |
| Netzwerk-Fehler | Retry mit Backoff |
| Duplicate | Check if file exists (skip) |

## Aktivierung

Für Production-Betrieb:

1. In `tasks.yaml` output type von "file" auf "repo" ändern
2. Cron aktivieren: `~/.claude/skills/claude-scheduler/scripts/install-schedule.sh ai-weekly-briefing`
3. Test: `~/.claude/skills/claude-scheduler/scripts/run-task.sh "AI Weekly Briefing"`
