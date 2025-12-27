# BKS News

AI-generierte News-Briefings als Static Site.

## Features

- Automatisch generierte AI-Briefings via [Claude Scheduler](https://github.com/bks-lab/wiki)
- Astro-basierte Static Site
- GitHub Pages Deployment
- Markdown Content mit YAML Frontmatter

## Architektur

```
Cron/launchd → Claude CLI → Markdown → Git commit → GitHub Actions → Static Site
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Neues Briefing erstellen

Briefings werden automatisch via Claude Scheduler erstellt. Manuell:

```bash
# Neue Datei in src/content/briefings/YYYY/MM/
touch src/content/briefings/2025/12/2025-12-27-title.md
```

Frontmatter-Schema:

```yaml
---
title: "Briefing Title"
description: "Kurze Beschreibung"
date: 2025-12-27
tags: [ai, weekly]
type: weekly  # weekly | breaking | research | digest
sources:
  - title: "Source Name"
    url: "https://..."
draft: false
---
```

## Deployment

Push zu `main` triggert automatisches Build und Deploy zu GitHub Pages.

**URL:** https://bks-lab.github.io/bks-news

## Links

- [Plan & Dokumentation](./PLAN.md)
- [BKS-Lab](https://bks-lab.de)
