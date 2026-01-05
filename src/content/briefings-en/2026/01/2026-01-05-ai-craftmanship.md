---
title: "AI Craftmanship - January 2026"
description: "MCP becomes global standard, Claude Code 2.0 features, why AI code has 1.7x more bugs"
date: 2026-01-05
heroImage: "/images/briefings/2026/01/2026-01-05-hero.jpg"
heroImageAlt: "AI-generated illustration: Developer tools and code structures"
tags: [ai, craftmanship, mcp, claude-code, developer-tools, coding, agents]
type: craftmanship
sources:
  - title: "Anthropic donates MCP to Linux Foundation"
    url: "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation"
  - title: "Claude Code Changelog"
    url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
  - title: "AI Code is Bug-filled - Futurism"
    url: "https://futurism.com/artificial-intelligence/ai-code-bug-filled-mess"
  - title: "METR Study: AI makes developers slower"
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
  - title: "AI Coding Assistants 2026 - JavaCodeGeeks"
    url: "https://www.javacodegeeks.com/2025/12/ai-assisted-coding-in-2026-how-github-copilot-cursor-and-amazon-q-are-reshaping-developer-workflows.html"
  - title: "Best AI Agents - DataCamp"
    url: "https://www.datacamp.com/blog/best-ai-agents"
  - title: "Prompt Engineering 2026 - Promptitude"
    url: "https://www.promptitude.io/post/the-complete-guide-to-prompt-engineering-in-2026-trends-tools-and-best-practices"
  - title: "SmolAgents - Hugging Face"
    url: "https://huggingface.co/docs/smolagents"
  - title: "AI Developer Tools - DEV.to"
    url: "https://dev.to/devin-rosario/ai-developer-tools-for-productivity-the-2026-guide-2j78"
  - title: "MIT Tech Review - AI Coding"
    url: "https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/"
draft: false
---

## TL;DR

This week in 30 seconds:
- **MCP Revolution:** Anthropic donates the Model Context Protocol to the Linux Foundation - OpenAI, Google and Microsoft are on board
- **Claude Code 2.0:** Background Agents, LSP support and Chrome integration make it the most powerful CLI tool
- **Reality Check:** AI code produces 1.7x more bugs and makes experienced developers 19% slower

---

## Story of the Week

![MCP Standard](/bks-news/images/briefings/2026/01/2026-01-05-mcp.jpg)
*Image: AI-generated with [Pollinations.ai](https://pollinations.ai)*

### MCP becomes the global standard for AI agents

On December 9, 2025, Anthropic took a historic step: The Model Context Protocol (MCP) was donated to the Linux Foundation [[1]](#source-1). This transforms an Anthropic project into a true industry standard.

**The new Agentic AI Foundation (AAIF)** unites the biggest names:
- **Founding members:** Anthropic, Block, OpenAI
- **Supporters:** Google, Microsoft, AWS, Cloudflare, Bloomberg

The numbers speak for themselves:
- **10,000+** active public MCP servers
- **97 million** monthly SDK downloads (Python + TypeScript)
- **75+** official connectors in Claude's Directory

> "Since its introduction, we have been committed to keeping MCP open-source, community-driven and vendor-neutral."

**What does this mean for developers?**

MCP is now the "USB-C for AI" - a universal standard that allows AI agents to access external tools and data. ChatGPT, Cursor, Gemini, Microsoft Copilot and VS Code already support it [[1]](#source-1).

**Next milestone:** In April 2026, W3C begins formal discussions on "MCP-Identity" - digital passports for AI agents.

**Bottom Line:** Anyone building MCP servers today is building for the entire AI ecosystem. The fragmentation of the tool landscape is over.

---

## Top Stories

### Claude Code 2.0: The most important new features

![Claude Code](/bks-news/images/briefings/2026/01/2026-01-05-claude-code.jpg)
*Image: AI-generated with [Pollinations.ai](https://pollinations.ai)*

Claude Code has received massive updates in recent weeks [[2]](#source-2). The highlights:

**Background Agents (v2.0.60)**
Agents now run in the background while you continue working. No more blocking on long tasks.

**LSP Support (v2.0.74)**
Real code intelligence: Go-to-Definition, Find References, Hover documentation. Claude now understands your code at compiler level.

**Chrome Integration (v2.0.72)**
Browser automation directly from Claude Code. Install the Chrome Extension and let Claude analyze web pages, fill out forms or take screenshots.

**Named Sessions**
```bash
/rename my-feature
claude --resume my-feature
```
Session management like tmux - finally!

**MCP Wildcards**
```
mcp__server__*  # Allow all tools from a server
```
Granular permissions without individual listing.

**Opus 4.5 for Pro**
Pro users now have access to Opus 4.5 with Extended Thinking - the strongest model for complex coding tasks.

---

### Cursor 2.0 vs. Copilot: The IDE war escalates

The two biggest AI coding assistants have upgraded [[5]](#source-5):

**Cursor 2.0:**
- Parallel agent execution with up to 8 agents simultaneously
- New Plan mode for complex refactorings
- AI Code Review directly in the editor
- Multi-model support (OpenAI, Anthropic, Gemini, xAI)

**GitHub Copilot:**
- Agent Mode for multi-file changes
- Next Edit Suggestions - AI predicts what you'll edit next
- Project Padawan: Assign issues directly to Copilot

**The verdict:** Copilot is lower friction (install and go), Cursor has the higher ceiling for productivity. For large projects, some teams report significant time savings - actual productivity depends heavily on the use case [[5]](#source-5).

---

## Quick Hits

- **SmolAgents:** Hugging Face's minimalist agent framework uses a CodeAgent approach - the model writes Python instead of JSON [[8]](#source-8)
- **Vibe Coding Trend:** Describe UI/UX in natural language, the IDE generates scaffolding, styling and state management [[5]](#source-5)
- **84% Adoption:** According to Stack Overflow, 84% of developers already use AI tools, 46% of code is AI-generated [[9]](#source-9)
- **Tabby:** Self-hosted AI coding assistant for teams who don't want to send their code to the cloud [[9]](#source-9)
- **LangGraph Dominance:** With 22,900+ GitHub Stars and 4.2M monthly downloads, LangGraph is the most-used agent framework [[6]](#source-6)

---

## Tool of the Week

### SmolAgents: Less is more

Hugging Face has taken a radically different approach with SmolAgents [[8]](#source-8):

**The problem:** Most agent frameworks force LLMs to output complex JSON structures. This is error-prone and hard to debug.

**The solution:** SmolAgents uses a "CodeAgent" architecture. The model writes and executes standard Python code. No JSON schemas, no tool definitions - just code.

**Why this is clever:**
- LLMs are better at code than structured JSON
- Python errors are easier to debug than JSON parsing errors
- Seamless integration with existing Python code

**Installation:**
```bash
pip install smolagents
```

**For whom:** Developers who prefer a "code-first" approach and don't need enterprise features.

---

## Fail of the Week

### AI code produces 1.7x more bugs

A new study from CodeRabbit delivered sobering numbers [[3]](#source-3):

| Metric | AI Code | Human Code |
|--------|---------|------------|
| Issues per PR | 10.83 | 6.45 |
| Ratio | 1.7x more | Baseline |

**Analyzed:** 470 Pull Requests

**Main problems:**
- Logic and correctness errors (most common category)
- Code quality and readability (leads to technical debt)
- Security risks (insecure password handling)

**The only bright spot:** AI makes fewer typos than humans.

**The lesson:** AI code needs more review, not less. Treat AI like a junior developer who is fast but unreliable.

---

## Number of the Week

### 19% slower with AI

The METR study tested 16 experienced open-source developers [[4]](#source-4) (small sample size, but methodologically sound):

**Setup:**
- 246 issues from real projects (averaging 22,000+ GitHub Stars)
- Randomized: With or without AI (Cursor Pro + Claude 3.5/3.7)
- Average task duration: 2 hours

**Result:**
> "When developers are allowed to use AI tools, they take 19% longer to complete issues."

**The twist:** The developers still believed AI made them 20% faster.

**Possible explanations:**
- AI tools have a learning curve (teams need ~11 weeks for full productivity)
- Benchmark tasks ≠ real-world complexity
- Experienced developers benefit less than beginners

**The warning:** Critically question productivity claims from AI tool vendors.

---

## Reading List

1. **[Prompt Engineering in 2026](https://www.promptitude.io/post/the-complete-guide-to-prompt-engineering-in-2026-trends-tools-and-best-practices)** - From prompts to context engineering: The evolution of the field (15 min) [[7]](#source-7)

2. **[METR Study: Full Report](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)** - Methodology and all data from the controversial productivity study (25 min) [[4]](#source-4)

3. **[Claude Code Changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)** - All features from recent releases in detail (10 min) [[2]](#source-2)

---

## Next Week

- **W3C Meeting:** First discussions on MCP-Identity (agent authentication)
- **Cursor 2.1:** Expected release with improved Plan mode
- **AI Craftmanship February:** Focus on practical MCP server development

---

## Behind the AI

**Generated in:** ~35 minutes
**Sources scanned:** 25+ articles from 15 feeds
**Stories found:** 15 -> 7 selected
**Validation:** 4 Agents (Fact-Check, Devil's Advocate, Quality Editor, Legal)
**Model:** Claude Opus 4.5
**Images:** Pollinations.ai (5 generated)

<details>
<summary>Full metrics</summary>

| Phase | Metric | Value |
|-------|--------|-------|
| Source Collection | WebSearch Queries | 7 |
| Source Collection | WebFetch Calls | 7 |
| Selection | Stories presented | 15 |
| Selection | Stories selected | 7 |
| Draft | Words | ~1400 |
| Draft | Sources cited | 10 |
| Images | Generated | 5 |
| Audio | Generated | Yes (DE + EN) |

</details>

---

*This newsletter was created with AI assistance. All facts were verified against original sources.*

*[Subscribe to newsletter](https://bks-lab.github.io/bks-news/) · [Give feedback](mailto:hello@bks-lab.com)*
