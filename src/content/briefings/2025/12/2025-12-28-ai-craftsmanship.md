---
title: "AI Craftsmanship - Dezember 2025"
description: "Claude Code Ultrathink, Skills als Open Standard, Agentic Coding Best Practices und MCP-Sicherheitswarnung"
date: 2025-12-28
tags: [ai, craftsmanship, claude-code, skills, mcp, agentic-coding]
type: craftsmanship
autoImage: true
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
draft: false
---

## TL;DR

- **Ultrathink Mode**: Claude Code hat abgestufte Thinking-Budgets ("think" → "ultrathink" = 4k → 32k Tokens)
- **Skills Open Standard**: Anthropic öffnet die Skill-Spezifikation am 18. Dezember 2025
- **Claude Code 2.0.74**: LSP-Integration, Plugin-System, Checkpoints für Code-Rewind
- **MCP Security Alert**: ~1.000 ungesicherte MCP-Server im Internet entdeckt
- **Agentic Coding**: Armin Ronacher empfiehlt Go, klare Tool-Grenzen, Parallelisierung

---

## Technik der Woche: Ultrathink Mode

Claude Code hat ein Feature, das viele nicht kennen: **abgestufte Thinking-Budgets**. Je nach Komplexität der Aufgabe kannst du Claude mehr "Denkzeit" geben:

| Keyword | Token-Budget | Wann nutzen |
|---------|--------------|-------------|
| `"think"` | ~4.000 | Standard-Tasks |
| `"think hard"` | ~10.000 | Komplexere Probleme |
| `"ultrathink"` | ~32.000 | Architektur, Debugging |

**Wichtig**: Diese Keywords funktionieren **nur in Claude Code** (CLI), nicht in der Web-Oberfläche oder API. Claude Code hat eine Preprocessing-Schicht, die diese Begriffe abfängt.

**Praxis-Tipp**: Kombiniere Ultrathink mit Skills für maximale Qualität:

```
"ultrathink" und analysiere diese Architektur mit dem code-review Skill
```

Der Skill gibt die Struktur vor, Ultrathink liefert die Tiefe.

---

## Claude Code 2.0.74: Die neuen Features

Das Dezember-Update bringt vier wichtige Neuerungen:

### 1. LSP Integration

Language Server Protocol direkt im Terminal:
- Go-to-Definition
- Find References
- Hover Documentation

IDE-Level Code-Intelligence ohne IDE.

### 2. Plugin System

Skills, Hooks, Commands und MCP-Server als verteilbare Bundles:

```bash
/plugin install superpowers
/plugin marketplace
/plugin enable/disable
```

Team-Setup in Sekunden teilbar. Onboarding wird trivial.

### 3. Checkpoints & Rewind

Claude speichert automatisch Code-Snapshots vor jeder Änderung:

```
Esc + Esc  oder  /rewind
```

Code und Konversation separat wiederherstellbar. Mutigere Experimente ohne Angst vor Fehlern.

### 4. Terminal-Erweiterungen

Neue `/terminal-setup` Unterstützung für Kitty, Alacritty, Zed und Warp. Syntax-Highlighting Toggle mit `Ctrl+T`.

---

## Skills werden Open Standard

Am **18. Dezember 2025** hat Anthropic die Skill-Spezifikation geöffnet – nur 9 Tage nach Gründung der Agentic AI Foundation (AAIF) bei der Linux Foundation.

**Was bedeutet das?**

- Skills sind jetzt ein offener Standard neben MCP
- Andere Plattformen können Skills implementieren
- Die Skill-Syntax ist dokumentiert und stabil

**Skills vs. MCP in Kürze:**

| Aspekt | Skills | MCP |
|--------|--------|-----|
| Setup | <1 Minute (Markdown-Datei) | 30-60 Min (Server) |
| Tokens | ~100 (Metadata) | 10.000+ (Tool-Definitionen) |
| Use Case | Workflows, Wissen, CLI-Tools | WebSocket-Streaming |

Für die allermeisten Aufgaben braucht man keinen MCP-Server – nur eine Markdown-Datei.

> **Vertiefung**: [Skills vs. MCP: Warum Markdown-Dateien Server-Protokolle schlagen](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp)

---

## Agentic Coding Best Practices

Armin Ronacher (Flask-Autor) hat seine Erfahrungen mit agentic coding geteilt. Die wichtigsten Erkenntnisse:

### 1. Sprache: Go vor Python

Go's explizite Kontextsysteme helfen KI-Agenten beim Verstehen des Code-Flows. Python's "Magic" (Pytest Fixtures, Async-Loops) führt oft zu fehlerhaftem generierten Code.

### 2. Alles kann ein Tool sein

Von Shell-Scripts bis Log-Dateien. Entscheidend:
- **Geschwindigkeit** (Agent wartet)
- **Fehlerklarheit** (Agent muss verstehen was schief ging)
- **Schutz vor Missbrauch** (Agent macht Fehler)

### 3. Einfachheit schlägt Komplexität

Funktionen mit klaren, beschreibenden Namen statt Klassen mit komplexer Vererbung. Der Agent braucht weniger Kontext um zu verstehen was passiert.

### 4. Der klassische Flow

1. **Research**: Dateien lesen, verstehen
2. **Plan**: Mit "ultrathink" Lösung entwerfen
3. **Code**: Implementieren
4. **Check**: Selbst-Review, Tests
5. **Commit**: Nur wenn alles grün

---

## Warnung: MCP Security Concerns

**Bitsight Technologies (Dezember 2025)**: Rund **1.000 MCP-Server** sind öffentlich im Internet ohne Authentifizierung erreichbar.

Das Problem:
- MCP-Spezifikation empfiehlt OAuth 2.1
- Authentifizierung ist aber **optional**
- Viele Deployments überspringen Security

**Risiko**: Ungeschützte MCP-Server können von Angreifern missbraucht werden, um KI-Agenten zu manipulieren.

**Lesson Learned**: Skills haben dieses Problem nicht – keine Server = keine Angriffsfläche.

---

## Google geht All-In auf MCP

Parallel zur Security-Warnung: Google hat **managed MCP-Server** für seine Dienste gelauncht:

- Google Maps
- BigQuery
- Compute Engine
- Kubernetes Engine

Der Unterschied zu DIY-MCP-Servern: Google übernimmt Hosting, Security und Updates. Das löst viele der Sicherheitsprobleme – aber nur für Google-Dienste.

---

## Tool der Woche: Claude Code Checkpoints

Das neue Checkpoint-System verdient besondere Erwähnung:

**Problem**: Bei experimentellen Änderungen Angst vor "kaputtem Code".

**Lösung**: Claude speichert automatisch vor jeder Änderung. Zwei Optionen zum Zurückspulen:

1. `Esc + Esc` – Schneller Rewind
2. `/rewind` – Checkpoint-Auswahl

Du kannst **Code** und **Konversation** separat wiederherstellen. Das ermöglicht:
- "Was wäre wenn"-Experimente
- Parallele Ansätze testen
- Fehler ohne Konsequenzen machen

---

## Zahl der Woche

```
~32.000 Tokens
```

Das maximale Thinking-Budget mit "ultrathink" in Claude Code. Zum Vergleich: Das Standard-Budget mit "think" ist ~4.000 Tokens – also 8x weniger Rechenzeit für komplexe Probleme.

---

## Leseliste

- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) – Offizieller Guide für agentic coding
- [Armin Ronacher: Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) – Erfahrungsbericht vom Flask-Autor
- [Skills vs. MCP](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp) – Wann welches Tool?
- [GitHub: Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) – Alle Updates im Detail

---

## Nächste Woche

- Deep Dive: Custom Agents in Claude Code
- Skill-Library Aufbau: Von 0 auf 10 Skills
- MCP Security: Wie man Server richtig absichert

---

*Dieser Newsletter wurde mit AI-Unterstützung erstellt und durch 4 spezialisierte Validierungs-Agenten geprüft (Fact-Check, Devil's Advocate, Quality Editor, Legal Compliance).*
