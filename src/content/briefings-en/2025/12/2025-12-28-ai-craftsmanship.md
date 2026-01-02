---
title: "AI Craftsmanship - December 2025"
description: "Claude Code Thinking Modes, Skills as Open Standard, Agentic Coding Best Practices, and MCP Developments"
date: 2025-12-28
heroImage: "/images/briefings/2025/12/2025-12-28-craftsmanship-hero.jpg"
heroImageAlt: "AI-generated illustration: Developer Tools and Code Visualization"
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
translationSlug: "2025/12/2025-12-28-ai-craftsmanship"
---

## TL;DR

- **Thinking Modes**: Claude Code has tiered budgets ("think" → "megathink" → "ultrathink")
- **Skills Open Standard**: Anthropic opens the Skill specification ([December 18, 2025](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/))
- **Claude Code 2.0.74**: LSP integration and terminal extensions
- **MCP Security**: Hundreds of unsecured servers found – but also progress
- **Agentic Coding**: Ecosystem stability matters more than language choice

---

## Technique of the Week: Thinking Modes in Claude Code

Claude Code has **tiered thinking budgets**. Depending on task complexity, you can give Claude more "thinking time":

| Keyword | Budget | When to Use |
|---------|--------|-------------|
| `"think"` | Standard | Simple tasks |
| `"think hard"` / `"megathink"` | Increased | More complex problems |
| `"ultrathink"` | Maximum | Architecture, debugging |

**Note**: Exact token counts are not officially documented. [ClaudeLog](https://claudelog.com/faqs/what-is-ultrathink/) provides estimates, but Anthropic hasn't published precise values.

**Important**: These keywords work **only in Claude Code** (CLI), not in the web interface or API.

**Limitation**: Research shows that more thinking budget doesn't always yield better results. Self-consistency and iterative approaches can often be more effective than maximum compute time.

---

## Claude Code Updates

### Version 2.0.74: The Actual New Features

The [December update](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) brings:

**LSP Integration** – Language Server Protocol directly in terminal:
- Go-to-Definition
- Find References
- Hover Documentation

**Terminal Extensions** – New `/terminal-setup` support for Kitty, Alacritty, Zed, and Warp. Syntax highlighting toggle with `Ctrl+T`.

### Already Available Features (not new in 2.0.74)

**Checkpoints & Rewind** (since v2.0) – Claude automatically saves code snapshots:
```
Esc + Esc  or  /rewind
```

**Plugin System** – Skills, hooks, and commands as distributable bundles:
```bash
/plugin install superpowers
/plugin marketplace
```

---

## Skills Become Open Standard

On [**December 18, 2025**](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/), Anthropic opened the Skill specification – 9 days after founding the [Agentic AI Foundation (AAIF)](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) at the Linux Foundation.

**What does this mean?**

- Skills are now an open standard alongside MCP
- Other platforms can implement Skills
- The Skill syntax is documented and stable

### Skills and MCP: Complementary, Not Competing

| Aspect | Skills | MCP |
|--------|--------|-----|
| Strength | Domain knowledge, workflows | Data integration, tools |
| Setup | <1 minute (Markdown) | 30-60 min (server) |
| Use Case | Processes, CLI tools | APIs, streaming, databases |

**Important**: Anthropic itself says developers will likely use **both**. Skills for domain expertise, MCP for external data sources and tools.

> **Deep Dive**: [Skills vs. MCP: Why Markdown Files Beat Server Protocols](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp)

---

## Agentic Coding Best Practices

[Armin Ronacher](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) (Flask author) shared his experiences with agentic coding.

### Key Insights

**1. Ecosystem Stability Over Language**

Ronacher prefers Go – but not because Go is "better," but because of ecosystem stability. Python's dynamic features (Pytest fixtures, async patterns) often confuse agents.

**Nuance**: "Basic Python" (Flask, simple scripts) works fine. The problem is complex frameworks, not the language itself.

**2. Everything Can Be a Tool**

From shell scripts to log files. What matters:
- **Speed** (agent waits)
- **Error clarity** (agent must understand what went wrong)
- **Protection against misuse** (agents make mistakes)

**3. The Classic Flow**

1. **Research**: Read files, understand
2. **Plan**: Design solution (with extended thinking)
3. **Code**: Implement
4. **Check**: Self-review, tests
5. **Commit**: Only when everything is green

---

## MCP: Security Warning and Progress

### The Problem

[Bitsight Technologies](https://siliconangle.com/2025/12/11/model-context-protocol-security-risks-grow-unsecured-servers-appear-across-internet/) (December 2025): Around **1,000 MCP servers** are publicly accessible without authentication.

- MCP specification recommends OAuth 2.1
- But authentication is **optional**
- Many DIY deployments skip security

### The Solution: Managed MCP

[Google](https://techcrunch.com/2025/12/10/google-is-going-all-in-on-mcp-servers-agent-ready-by-design/) launched **managed MCP servers** for its services:
- Google Maps
- BigQuery
- Compute Engine
- Kubernetes Engine

**Advantage**: Google handles security, hosting, and updates. This shows the way: MCP servers should be operated by experts, not as DIY solutions.

### Balance

MCP has real strengths:
- **Context Preservation** across multi-step workflows
- **Reduced Hallucinations** through external data sources
- **Dynamic Capability Discovery**

The security problem primarily affects poorly configured self-hosted servers, not the protocol itself.

---

## Tool of the Week: Claude Code Checkpoints

The checkpoint system (since v2.0):

**Problem**: Fear of "broken code" during experimental changes.

**Solution**: Claude automatically saves before each change:

1. `Esc + Esc` – Quick rewind
2. `/rewind` – Checkpoint selection

You can restore **code** and **conversation** separately.

---

## Number of the Week

```
8x
```

The difference between standard thinking ("think") and maximum thinking ("ultrathink") in Claude Code. But note: More isn't always better – iterative work can be more effective than one long thinking block.

---

## Reading List

- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) – Official guide
- [Armin Ronacher: Agentic Coding](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) – Practical experiences
- [Skills vs. MCP](https://bks-lab.github.io/bks-lab-page/blog/skills-vs-mcp) – When to use which tool?
- [GitHub: Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) – All updates

---

## Next Week

- Deep Dive: Custom Agents in Claude Code
- Building a Skill Library: From 0 to 10 Skills
- MCP Security: Best Practices for Secure Servers

---

*This newsletter was created with AI assistance and reviewed by 4 specialized validation agents. Hero image generated with [Pollinations.ai](https://pollinations.ai).*
