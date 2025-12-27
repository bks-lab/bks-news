# BKS-News: AI-generierte Briefings als Static Site

## Projektziel

Umbau des Claude Schedulers von Apple Notes Output zu einem Git-basierten Markdown-System mit automatischem Build und Deployment.

**Vorher:** Cron → Claude → Apple Notes (isoliert, nicht versioniert)
**Nachher:** Cron → Claude → Markdown → Git → GitHub Actions → Static Site

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

## Entscheidungen

| Aspekt | Entscheidung | Begründung |
|--------|--------------|------------|
| Framework | Astro | Konsistenz mit bks-web, Content Collections |
| Hosting | GitHub Pages | Kostenlos, zero-config |
| Visibility | Public | AI-Briefings als Showcase |
| Repo-Name | bks-news | Generisch, erweiterbar |

## Komponenten

### 1. Astro Site (dieses Repo)

```
bks-news/
├── src/
│   ├── content/
│   │   ├── config.ts              # Zod Schema für Briefings
│   │   └── briefings/
│   │       └── YYYY/MM/YYYY-MM-DD-title.md
│   ├── pages/
│   │   ├── index.astro            # Briefing-Liste
│   │   └── briefings/[...slug].astro  # Briefing-Detail
│   ├── layouts/
│   │   └── Base.astro             # Minimal Layout
│   └── styles/
│       └── global.css             # Minimales CSS
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages Deploy
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### 2. Scheduler Erweiterung (claude-scheduler)

**Neues Script:** `~/.claude/skills/claude-scheduler/scripts/output-repo.sh`

```bash
# Input: $1 = Task Name, $2 = Content, $3 = Repo Path
# Output: Markdown file committed and pushed
```

**Erweiterung run-task.sh:** Neuer case "repo" in Output-Routing

### 3. Task-Konfiguration

```yaml
- name: "AI Weekly Briefing"
  enabled: true
  prompt: |
    Führe ein AI-Briefing durch...

    WICHTIG: Beginne deine Antwort mit YAML-Frontmatter:
    ---
    title: "..."
    description: "..."
    tags: [ai, weekly]
    sources:
      - title: "..."
        url: "..."
    ---
  schedule: "0 8 * * 1"  # Montag 8:00
  output:
    type: repo
    destination: ~/Developer/bks/bks-news
    path_pattern: src/content/briefings/{{YYYY}}/{{MM}}/{{DATE}}-{{SLUG}}.md
  permissions:
    allowedTools: [WebSearch, WebFetch]
    maxBudget: 0.75
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
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional(),
  draft: z.boolean().default(false)
});
```

## Implementierungsphasen

### Phase 1: Repo Setup (5 min)
- [x] Lokalen Ordner erstellen
- [ ] GitHub Repo `bks-lab/bks-news` erstellen
- [ ] Git initialisieren und verknüpfen

### Phase 2: Astro Setup (30 min)
- [ ] Astro mit minimal Template initialisieren
- [ ] Content Collection für briefings konfigurieren
- [ ] Index-Seite (Liste aller Briefings)
- [ ] Detail-Seite (einzelnes Briefing)
- [ ] Minimales CSS

### Phase 3: GitHub Actions (15 min)
- [ ] deploy.yml für GitHub Pages
- [ ] Test: Push → Build → Deploy

### Phase 4: Scheduler Erweiterung (45 min)
- [ ] output-repo.sh Script
- [ ] run-task.sh case "repo" hinzufügen
- [ ] Frontmatter-Generierung

### Phase 5: Task-Config (10 min)
- [ ] AI Weekly Briefing auf repo umstellen
- [ ] Prompt für Frontmatter-Output anpassen

### Phase 6: Test & Aktivierung (15 min)
- [ ] Manueller Test-Run
- [ ] Verify: MD → Git → Actions → Deploy
- [ ] Cron aktivieren

## Fehlerbehandlung

| Fehler | Handling |
|--------|----------|
| Claude CLI Fehler | Loggen, nicht committen |
| Git push Konflikt | `git pull --rebase` zuerst |
| Leerer Output | Skip commit |
| Netzwerk-Fehler | Retry mit Backoff |
| Duplicate | Check if file exists (skip) |

## URLs

- **Repo:** https://github.com/bks-lab/bks-news
- **Site:** https://bks-lab.github.io/bks-news
- **Scheduler Skill:** ~/.claude/skills/claude-scheduler/

## Cron Schedule

| Task | Schedule | Cron Expression |
|------|----------|-----------------|
| AI Weekly Briefing | Montag 8:00 | `0 8 * * 1` |
| Breaking Radar | Alle 4 Stunden | `0 */4 * * *` |
| Research Digest | Freitag 16:00 | `0 16 * * 5` |

## Migration

Bestehende Apple Notes Briefings können migriert werden:
1. Export via apple-notes-manager (nur Text)
2. Frontmatter hinzufügen
3. In src/content/briefings/ committen

## Erweiterungsmöglichkeiten

- RSS Feed für Briefings
- Newsletter-Integration (Buttondown, Substack)
- Kategorien und Filterung
- Suchfunktion (Pagefind wie bks-web)
- Dark Mode Toggle
