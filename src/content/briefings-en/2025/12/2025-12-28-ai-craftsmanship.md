---
title: "AI Craftsmanship - December 2025"
description: "Claude Code Ultrathink, Skills as Open Standard, Agentic Coding Best Practices, and MCP Security Warning"
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
translationSlug: "2025/12/2025-12-28-ai-craftsmanship"
---

## TL;DR

- **Ultrathink Mode**: Claude Code has tiered thinking budgets ("think" → "ultrathink" = 4k → 32k tokens)
- **Skills Open Standard**: Anthropic opens the Skill specification on December 18, 2025
- **Claude Code 2.0.74**: LSP integration, Plugin system, Checkpoints for code rewind
- **MCP Security Alert**: ~1,000 unsecured MCP servers discovered on the internet
- **Agentic Coding**: Armin Ronacher recommends Go, clear tool boundaries, parallelization

---

## Technique of the Week: Ultrathink Mode

Claude Code has a feature many don't know about: **tiered thinking budgets**. Depending on task complexity, you can give Claude more "thinking time":

| Keyword | Token Budget | When to Use |
|---------|--------------|-------------|
| `"think"` | ~4,000 | Standard tasks |
| `"think hard"` | ~10,000 | More complex problems |
| `"ultrathink"` | ~32,000 | Architecture, debugging |

**Important**: These keywords work **only in Claude Code** (CLI), not in the web interface or API. Claude Code has a preprocessing layer that intercepts these terms.

**Pro Tip**: Combine Ultrathink with Skills for maximum quality:

```
"ultrathink" and analyze this architecture with the code-review Skill
```

The Skill provides structure, Ultrathink delivers depth.

---

## Claude Code 2.0.74: The New Features

The December update brings four major improvements:

### 1. LSP Integration

Language Server Protocol directly in the terminal:
- Go-to-Definition
- Find References
- Hover Documentation

IDE-level code intelligence without an IDE.

### 2. Plugin System

Skills, Hooks, Commands, and MCP servers as distributable bundles:

```bash
/plugin install superpowers
/plugin marketplace
/plugin enable/disable
```

Share team setup in seconds. Onboarding becomes trivial.

### 3. Checkpoints & Rewind

Claude automatically saves code snapshots before each change:

```
Esc + Esc  or  /rewind
```

Code and conversation can be restored separately. Bolder experiments without fear of breaking things.

### 4. Terminal Extensions

New `/terminal-setup` support for Kitty, Alacritty, Zed, and Warp. Syntax highlighting toggle with `Ctrl+T`.

---

## Skills Become Open Standard

On **December 18, 2025**, Anthropic opened the Skill specification – just 9 days after founding the Agentic AI Foundation (AAIF) at the Linux Foundation.

**What does this mean?**

- Skills are now an open standard alongside MCP
- Other platforms can implement Skills
- The Skill syntax is documented and stable

**Skills vs. MCP at a Glance:**

| Aspect | Skills | MCP |
|--------|--------|-----|
| Setup | <1 minute (Markdown file) | 30-60 min (server) |
| Tokens | ~100 (metadata) | 10,000+ (tool definitions) |
| Use Case | Workflows, knowledge, CLI tools | WebSocket streaming |

For most tasks, you don't need an MCP server – just a Markdown file.

> **Deep Dive**: [Skills vs. MCP: Why Markdown Files Beat Server Protocols](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp)

---

## Agentic Coding Best Practices

Armin Ronacher (Flask author) shared his experiences with agentic coding. Key takeaways:

### 1. Language: Go Over Python

Go's explicit context systems help AI agents understand code flow. Python's "magic" (Pytest fixtures, async loops) often leads to faulty generated code.

### 2. Everything Can Be a Tool

From shell scripts to log files. What matters:
- **Speed** (agent waits)
- **Error clarity** (agent must understand what went wrong)
- **Protection against misuse** (agents make mistakes)

### 3. Simplicity Beats Complexity

Functions with clear, descriptive names over classes with complex inheritance. The agent needs less context to understand what's happening.

### 4. The Classic Flow

1. **Research**: Read files, understand
2. **Plan**: Design solution with "ultrathink"
3. **Code**: Implement
4. **Check**: Self-review, tests
5. **Commit**: Only when everything is green

---

## Warning: MCP Security Concerns

**Bitsight Technologies (December 2025)**: Approximately **1,000 MCP servers** are publicly accessible on the internet without authentication.

The problem:
- MCP specification recommends OAuth 2.1
- But authentication is **optional**
- Many deployments skip security

**Risk**: Unprotected MCP servers can be exploited by attackers to manipulate AI agents.

**Lesson Learned**: Skills don't have this problem – no servers = no attack surface.

---

## Google Goes All-In on MCP

Parallel to the security warning: Google launched **managed MCP servers** for its services:

- Google Maps
- BigQuery
- Compute Engine
- Kubernetes Engine

The difference from DIY MCP servers: Google handles hosting, security, and updates. This solves many security issues – but only for Google services.

---

## Tool of the Week: Claude Code Checkpoints

The new checkpoint system deserves special mention:

**Problem**: Fear of "broken code" during experimental changes.

**Solution**: Claude automatically saves before each change. Two options to rewind:

1. `Esc + Esc` – Quick rewind
2. `/rewind` – Checkpoint selection

You can restore **code** and **conversation** separately. This enables:
- "What if" experiments
- Testing parallel approaches
- Making mistakes without consequences

---

## Number of the Week

```
~32,000 Tokens
```

The maximum thinking budget with "ultrathink" in Claude Code. For comparison: The standard budget with "think" is ~4,000 tokens – 8x less compute time for complex problems.

---

## Reading List

- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) – Official guide for agentic coding
- [Armin Ronacher: Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) – Experience report from Flask author
- [Skills vs. MCP](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp) – When to use which tool?
- [GitHub: Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) – All updates in detail

---

## Next Week

- Deep Dive: Custom Agents in Claude Code
- Building a Skill Library: From 0 to 10 Skills
- MCP Security: How to Properly Secure Servers

---

*This newsletter was created with AI assistance and reviewed by 4 specialized validation agents (Fact-Check, Devil's Advocate, Quality Editor, Legal Compliance).*
