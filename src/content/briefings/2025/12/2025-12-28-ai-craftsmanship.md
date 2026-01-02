---
title: "AI Craftsmanship - Dezember 2025"
description: "Claude Code Thinking Modes, Skills als Open Standard, Agentic Coding Best Practices und MCP-Entwicklungen"
date: 2025-12-28
heroImage: "/images/briefings/2025/12/2025-12-28-craftsmanship-hero.jpg"
heroImageAlt: "AI-generierte Illustration: Developer Tools und Code Visualization"
tags: [ai, craftsmanship, claude-code, skills, mcp, agentic-coding]
type: craftsmanship
sources:
  - title: "GitHub: Claude Code CHANGELOG"
    url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
  - title: "ClaudeLog: What is Ultrathink"
    url: "https://claudelog.com/faqs/what-is-ultrathink/"
  - title: "Anthropic: Claude Code Best Practices"
    url: "https://www.anthropic.com/engineering/claude-code-best-practices"
  - title: "Armin Ronacher: Agentic Coding Recommendations"
    url: "https://lucumr.pocoo.org/2025/6/12/agentic-coding/"
  - title: "SiliconANGLE: MCP Security Risks"
    url: "https://siliconangle.com/2025/12/11/model-context-protocol-security-risks-grow-unsecured-servers-appear-across-internet/"
  - title: "TechCrunch: Google MCP Server Launch"
    url: "https://techcrunch.com/2025/12/10/google-is-going-all-in-on-mcp-servers-agent-ready-by-design/"
  - title: "SiliconANGLE: Skills Open Standard"
    url: "https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/"
draft: false
---

## TL;DR

- **Thinking Modes**: Claude Code hat abgestufte Budgets ("think" → "megathink" → "ultrathink")
- **Skills Open Standard**: Anthropic öffnet die Skill-Spezifikation ([18. Dezember 2025](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/))
- **Claude Code 2.0.74**: LSP-Integration und Terminal-Erweiterungen
- **MCP Security**: ~1.000 ungesicherte Server entdeckt – aber auch Fortschritte
- **Agentic Coding**: Ecosystem-Stabilität wichtiger als Sprachenwahl

---

## Technik der Woche: Thinking Modes in Claude Code

Claude Code hat **abgestufte Thinking-Budgets**. Je nach Komplexität der Aufgabe kannst du Claude mehr "Denkzeit" geben:

| Keyword | Budget | Wann nutzen |
|---------|--------|-------------|
| `"think"` | Standard | Einfache Tasks |
| `"think hard"` / `"megathink"` | Erhöht | Komplexere Probleme |
| `"ultrathink"` | Maximum | Architektur, Debugging |

**Hinweis**: Die exakten Token-Zahlen sind nicht offiziell dokumentiert. [ClaudeLog](https://claudelog.com/faqs/what-is-ultrathink/) nennt Schätzungen, aber Anthropic hat keine genauen Werte veröffentlicht.

**Wichtig**: Diese Keywords funktionieren **nur in Claude Code** (CLI), nicht in der Web-Oberfläche oder API.

**Einschränkung**: Forschung zeigt, dass mehr Thinking-Budget nicht immer bessere Ergebnisse liefert. Self-Consistency und iteratives Vorgehen können oft effektiver sein als maximale Rechenzeit.

---

## Claude Code Updates

### Version 2.0.74: Die tatsächlichen Neuerungen

Das [Dezember-Update](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) bringt:

**LSP Integration** – Language Server Protocol direkt im Terminal:
- Go-to-Definition
- Find References
- Hover Documentation

**Terminal-Erweiterungen** – Neue `/terminal-setup` Unterstützung für Kitty, Alacritty, Zed und Warp. Syntax-Highlighting Toggle mit `Ctrl+T`.

### Bereits verfügbare Features (nicht neu in 2.0.74)

**Checkpoints & Rewind** (seit v2.0) – Claude speichert automatisch Code-Snapshots:
```
Esc + Esc  oder  /rewind
```

**Plugin System** – Skills, Hooks und Commands als verteilbare Bundles:
```bash
/plugin install superpowers
/plugin marketplace
```

---

## Skills werden Open Standard

Am [**18. Dezember 2025**](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/) hat Anthropic die Skill-Spezifikation geöffnet – 9 Tage nach Gründung der [Agentic AI Foundation (AAIF)](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) bei der Linux Foundation.

**Was bedeutet das?**

- Skills sind jetzt ein offener Standard neben MCP
- Andere Plattformen können Skills implementieren
- Die Skill-Syntax ist dokumentiert und stabil

### Skills und MCP: Komplementär, nicht konkurrierend

| Aspekt | Skills | MCP |
|--------|--------|-----|
| Stärke | Domain-Wissen, Workflows | Daten-Integration, Tools |
| Setup | <1 Minute (Markdown) | 30-60 Min (Server) |
| Use Case | Prozesse, CLI-Tools | APIs, Streaming, Datenbanken |

**Wichtig**: Anthropic selbst sagt, dass Entwickler wahrscheinlich **beide** nutzen werden. Skills für Domain-Expertise, MCP für externe Datenquellen und Tools.

> **Vertiefung**: [Skills vs. MCP: Warum Markdown-Dateien Server-Protokolle schlagen](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp)

---

## Agentic Coding Best Practices

[Armin Ronacher](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) (Flask-Autor) hat seine Erfahrungen mit agentic coding geteilt.

### Kernerkenntnisse

**1. Ecosystem-Stabilität vor Sprache**

Ronacher bevorzugt Go – aber nicht weil Go "besser" ist, sondern wegen der Ecosystem-Stabilität. Python's dynamische Features (Pytest Fixtures, Async-Patterns) verwirren Agenten oft.

**Nuance**: "Basic Python" (Flask, einfache Scripts) funktioniert gut. Das Problem sind komplexe Frameworks, nicht die Sprache selbst.

**2. Alles kann ein Tool sein**

Von Shell-Scripts bis Log-Dateien. Entscheidend:
- **Geschwindigkeit** (Agent wartet)
- **Fehlerklarheit** (Agent muss verstehen was schief ging)
- **Schutz vor Missbrauch** (Agent macht Fehler)

**3. Der klassische Flow**

1. **Research**: Dateien lesen, verstehen
2. **Plan**: Lösung entwerfen (mit extended thinking)
3. **Code**: Implementieren
4. **Check**: Selbst-Review, Tests
5. **Commit**: Nur wenn alles grün

---

## MCP: Security-Warnung und Fortschritte

### Das Problem

[Bitsight Technologies](https://siliconangle.com/2025/12/11/model-context-protocol-security-risks-grow-unsecured-servers-appear-across-internet/) (Dezember 2025): Rund **1.000 MCP-Server** sind öffentlich ohne Authentifizierung erreichbar.

- MCP-Spezifikation empfiehlt OAuth 2.1
- Authentifizierung ist aber **optional**
- Viele DIY-Deployments überspringen Security

### Die Lösung: Managed MCP

[Google](https://techcrunch.com/2025/12/10/google-is-going-all-in-on-mcp-servers-agent-ready-by-design/) hat **managed MCP-Server** für seine Dienste gelauncht:
- Google Maps
- BigQuery
- Compute Engine
- Kubernetes Engine

**Vorteil**: Google übernimmt Security, Hosting und Updates. Das zeigt den Weg: MCP-Server sollten von Experten betrieben werden, nicht als DIY-Lösung.

### Balance

MCP hat echte Stärken:
- **Context Preservation** über Multi-Step-Workflows
- **Reduced Hallucinations** durch externe Datenquellen
- **Dynamic Capability Discovery**

Das Security-Problem betrifft primär schlecht konfigurierte Self-Hosted-Server, nicht das Protokoll selbst.

---

## Tool der Woche: Claude Code Checkpoints

Das Checkpoint-System (seit v2.0):

**Problem**: Bei experimentellen Änderungen Angst vor "kaputtem Code".

**Lösung**: Claude speichert automatisch vor jeder Änderung:

1. `Esc + Esc` – Schneller Rewind
2. `/rewind` – Checkpoint-Auswahl

Du kannst **Code** und **Konversation** separat wiederherstellen.

---

## Zahl der Woche

```
8x
```

Der Unterschied zwischen Standard-Thinking ("think") und Maximum-Thinking ("ultrathink") in Claude Code. Aber Achtung: Mehr ist nicht immer besser – iteratives Arbeiten kann effektiver sein als ein langer Thinking-Block.

---

## Leseliste

- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) – Offizieller Guide
- [Armin Ronacher: Agentic Coding](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) – Praxis-Erfahrungen
- [Skills vs. MCP](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp) – Wann welches Tool?
- [GitHub: Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) – Alle Updates

---

## Nächste Woche

- Deep Dive: Custom Agents in Claude Code
- Skill-Library Aufbau: Von 0 auf 10 Skills
- MCP Security: Best Practices für sichere Server

---

*Dieser Newsletter wurde mit AI-Unterstützung erstellt und durch 4 spezialisierte Validierungs-Agenten geprüft. Hero-Bild generiert mit [Pollinations.ai](https://pollinations.ai).*
