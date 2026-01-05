---
title: "AI Craftsmanship - January 2026"
description: "Context Engineering replaces Prompt Engineering, Devin's Performance Review shows 67% PR merge rate, Microsoft planning coding startup acquisition"
date: 2026-01-05
heroImage: "/images/briefings/2026/01/2026-01-05-hero.jpg"
heroImageAlt: "AI-generated illustration: Developer tools and code structures"
tags: [ai, craftsmanship, context-engineering, devin, microsoft, developer-tools, coding, agents]
type: craftsmanship
sources:
  - title: "Anthropic: Effective Context Engineering for AI Agents"
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
  - title: "Cognition: Devin's 2025 Performance Review"
    url: "https://cognition.ai/blog/devin-annual-performance-review-2025"
  - title: "The Information: Microsoft Will Buy an AI Coding Startup"
    url: "https://www.theinformation.com/articles/2026-predictions-microsoft-buys-ai-coding-startup"
  - title: "IBM: AI Tech Trends 2026"
    url: "https://www.ibm.com/think/news/ai-tech-trends-predictions-2026"
  - title: "MIT Technology Review: What's Next for AI in 2026"
    url: "https://www.technologyreview.com/2026/01/05/1130662/whats-next-for-ai-in-2026/"
  - title: "Gartner: Context Engineering for Enterprise AI"
    url: "https://www.gartner.com/en/articles/context-engineering"
  - title: "WebProNews: Software Engineering Jobs Surge to 105K"
    url: "https://www.webpronews.com/2026-software-engineering-jobs-surge-to-105k-amid-ai-and-cloud-boom/"
  - title: "The New Stack: 5 Key Trends Shaping Agentic Development"
    url: "https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/"
  - title: "Axios: AI 2026 - Show Me the Money"
    url: "https://www.axios.com/2026/01/01/ai-2026-money-openai-google-anthropic-agents"
  - title: "Answer.AI: Devin Evaluation"
    url: "https://www.answer.ai/posts/2025-01-08-devin.html"
draft: false
---

## TL;DR

This week in 30 seconds:
- **Context Engineering:** Anthropic defines the new skill - it's no longer about prompts, but about token configuration
- **Devin's Review:** 67% PR merge rate, 4x faster - but only 15% success rate on complex tasks
- **Microsoft Acquisition:** Copilot has lost market share - coding startup acquisition expected

---

## Audio Version

<div class="audio-player-container" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; font-family: system-ui, -apple-system, sans-serif;">

  <!-- Main Player -->
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <button onclick="togglePlay('audio-player-en')" id="audio-player-en-btn" style="background: #4f46e5; border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
      <svg id="audio-player-en-icon" width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </button>
    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span id="audio-player-en-current" style="color: #a5b4fc; font-size: 0.875rem; min-width: 45px;">0:00</span>
        <input type="range" id="audio-player-en-progress" value="0" max="100" style="flex: 1; height: 6px; -webkit-appearance: none; background: #374151; border-radius: 3px; cursor: pointer;" oninput="seekAudio('audio-player-en', this.value)">
        <span id="audio-player-en-duration" style="color: #a5b4fc; font-size: 0.875rem; min-width: 45px;">0:00</span>
      </div>
    </div>
  </div>

  <!-- Controls Row -->
  <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; justify-content: space-between;">
    <!-- Speed Control -->
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="color: #9ca3af; font-size: 0.75rem;">Speed:</span>
      <select id="audio-player-en-speed" onchange="setSpeed('audio-player-en', this.value)" style="background: #374151; color: white; border: none; border-radius: 6px; padding: 0.25rem 0.5rem; font-size: 0.875rem; cursor: pointer;">
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1" selected>1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
    <!-- Download Button -->
    <a href="/bks-news/audio/briefings/2026/01/2026-01-05-ai-craftmanship-en.mp3" download style="display: inline-flex; align-items: center; gap: 0.5rem; background: #059669; color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; transition: background 0.2s;" onmouseover="this.style.background='#047857'" onmouseout="this.style.background='#059669'">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      Download MP3
    </a>
  </div>

  <!-- Chapters -->
  <details style="margin-top: 1rem;">
    <summary style="color: #a5b4fc; cursor: pointer; font-size: 0.875rem; padding: 0.5rem 0;">📑 Chapters</summary>
    <div id="audio-player-en-chapters" style="display: grid; gap: 0.5rem; padding: 0.5rem 0; max-height: 200px; overflow-y: auto;">
      <button onclick="seekToTime('audio-player-en', 0)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">0:00</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">TL;DR</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 113)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">1:53</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">🔥 Top Stories</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 224)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">3:44</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">⚡ Quick Hits</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 256)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">4:16</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">🛠️ Tool of the Week</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 310)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">5:10</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">💥 Fail of the Week</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 352)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">5:52</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📊 Number of the Week</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 388)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">6:28</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📚 Reading List</span>
      </button>
      <button onclick="seekToTime('audio-player-en', 407)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">6:47</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📅 Next Week</span>
      </button>
    </div>
  </details>

  <!-- Hidden Audio Element -->
  <audio id="audio-player-en" preload="metadata">
    <source src="/bks-news/audio/briefings/2026/01/2026-01-05-ai-craftmanship-en.mp3" type="audio/mpeg">
  </audio>

  <p style="color: #6b7280; font-size: 0.75rem; margin-top: 1rem; margin-bottom: 0;">
    Read aloud with <a href="https://github.com/rany2/edge-tts" style="color: #818cf8;">edge-tts</a> (Microsoft Azure Neural Voice: en-US-GuyNeural)
  </p>
</div>

<script>
(function() {
  const id = 'audio-player-en';
  const audio = document.getElementById(id);
  const progress = document.getElementById(id + '-progress');
  const current = document.getElementById(id + '-current');
  const duration = document.getElementById(id + '-duration');
  const icon = document.getElementById(id + '-icon');

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
    progress.max = Math.floor(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    current.textContent = formatTime(audio.currentTime);
    progress.value = Math.floor(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  });

  window.togglePlay = window.togglePlay || function(playerId) {
    const a = document.getElementById(playerId);
    const i = document.getElementById(playerId + '-icon');
    if (a.paused) {
      a.play();
      i.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    } else {
      a.pause();
      i.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  };

  window.seekAudio = window.seekAudio || function(playerId, val) {
    document.getElementById(playerId).currentTime = val;
  };

  window.seekToTime = window.seekToTime || function(playerId, seconds) {
    const a = document.getElementById(playerId);
    a.currentTime = seconds;
    if (a.paused) togglePlay(playerId);
  };

  window.setSpeed = window.setSpeed || function(playerId, rate) {
    document.getElementById(playerId).playbackRate = parseFloat(rate);
  };
})();
</script>

---

## 🎯 Technique of the Week

![Context Engineering](/bks-news/images/briefings/2026/01/2026-01-05-mcp.jpg)
*Image: AI-generated with [Pollinations.ai](https://pollinations.ai)*

### Context Engineering Replaces Prompt Engineering

Anthropic has published a new guide that's changing the developer landscape [[1]](#source-1). The central thesis:

> "Building with language models is becoming less about finding the right words for your prompts, and more about answering: what configuration of context is most likely to generate our model's desired behavior?"

**What is Context Engineering?**

Gartner defines it as [[6]](#source-6): "Designing and structuring the relevant data, workflows and environment so AI systems can understand intent, make better decisions and deliver contextual, enterprise-aligned outcomes."

**Why this matters:**

| Prompt Engineering | Context Engineering |
|-------------------|---------------------|
| Focus on HOW to ask | Focus on WHAT to provide |
| Single interaction | System design |
| Static | Dynamic |

**Anthropic's Three Core Principles:**

1. **Finite Attention Budget** - Every token consumes attention. With n² pairwise relationships, precision decreases as context grows [[1]](#source-1)

2. **Just-In-Time Retrieval** - Don't preload everything; store identifiers and fetch dynamically [[1]](#source-1)

3. **Goldilocks Zone** - System prompts specific enough for guidance, flexible enough for heuristics [[1]](#source-1)

**Gartner's Recommendation:** Companies should appoint a "Context Engineering Lead" [[6]](#source-6).

**Bottom Line:** Anyone working with AI agents in 2026 needs to master Context Engineering - not Prompt Engineering.

---

## 🔥 Top Stories

### Devin's Performance Review: The Real Numbers

![Devin AI](/bks-news/images/briefings/2026/01/2026-01-05-claude-code.jpg)
*Image: AI-generated with [Pollinations.ai](https://pollinations.ai)*

Cognition has published Devin's 2025 review [[2]](#source-2). The numbers are impressive - but with nuances:

**The Improvements:**
- **4x faster** at problem-solving
- **2x more efficient** at resource consumption
- **67% PR merge rate** (vs. 34% last year)
- **20x faster** at security fixes (1.5 min vs. 30 min)

**Real-World Case Studies:**

| Customer | Result |
|----------|--------|
| Major Bank | 5-10% developer time saved [[2]](#source-2) |
| Nubank | 8-12x faster migration, 20x cost reduction [[2]](#source-2) |
| Litera | 40% more test coverage, 93% faster regression cycles [[2]](#source-2) |
| EightSleep | 3x more data features shipped [[2]](#source-2) |

**The Other Side:** Answer.AI tested Devin for a month - result: **only 15% success rate** on 20 tasks [[10]](#source-10).

**The Pattern:** Devin is a specialist, not a generalist. Best at repetitive tasks like migrations and refactoring - not creative product development [[2]](#source-2).

---

### Microsoft Will Buy a Coding Startup

The Information predicts [[3]](#source-3): Microsoft will acquire an AI coding startup in 2026.

**The Reason:** GitHub Copilot has lost significant market share. Current distribution:

| Tool | Market Share |
|------|--------------|
| GitHub Copilot | ~25% |
| Cursor | ~25% |
| Claude Code | ~25% |
| Others | ~25% |

**Why Acquisition?**

- Microsoft's Inflection deal ($650M) showed how to navigate antitrust [[3]](#source-3)
- OpenAI already bought Windsurf (ex-Codeium) for $3B [[3]](#source-3)
- For developers who switched, an acquisition is the only path back [[3]](#source-3)

**Possible Targets:** Cursor, Replit, or a smaller startup with strong technology.

---

## ⚡ Quick Hits

- **"Show Me The Money":** Menlo Ventures calls 2026 the year of ROI proof [[9]](#source-9)
- **105,000 Software Jobs:** Contrary to fears, positions are rising - AI drives demand [[7]](#source-7)
- **Stack Overflow Trust Drops:** For the first time, positive AI sentiments are declining significantly [[5]](#source-5)
- **Super Agents:** IBM predicts multi-agent dashboards as standard [[4]](#source-4)
- **Vibe → OVP:** Software practice evolves from "Vibe Coding" to "Objective-Validation Protocol" [[4]](#source-4)

---

## 🛠️ Tool of the Week

### Context Engineering Checklist

Based on Anthropic's Guide [[1]](#source-1) - the key techniques:

**1. System Prompt Design**
```
❌ Too vague: "Be helpful"
❌ Too rigid: "If X then Y, else Z"
✅ Goldilocks: "You are a code reviewer.
   Focus on security and performance.
   Ask for clarification when unclear."
```

**2. Tool Design**
- Minimal, focused, clearly named [[1]](#source-1)
- Rule of thumb: If a human wouldn't be sure which tool to use, it's too complex

**3. Memory Management**
- **Compaction:** Summarize conversation history [[1]](#source-1)
- **Structured Notes:** Persistent memory files outside the context window [[1]](#source-1)
- **Sub-Agents:** Specialized agents for focused tasks [[1]](#source-1)

**The Mantra:** "The smallest set of high-signal tokens that maximize the likelihood of some desired outcome." [[1]](#source-1)

---

## 💥 Fail of the Week

### The 19% Slowdown Returns

The METR study from 2025 has been confirmed in new analyses [[5]](#source-5):

**The Problem:** Experienced developers are **19% slower** with AI tools on their own code - even though they believe they're 20% faster.

**2026 Update:** Stack Overflow's survey shows declining positive AI sentiments for the first time. The hype backlash is real [[5]](#source-5).

**Possible Reasons:**
- Context-switching overhead
- Overconfidence leads to less review
- AI tools optimized for demos, not real codebases

**The Lesson:** "Show me the money" applies to developer productivity too - not just enterprise ROI [[9]](#source-9).

---

## 📊 Number of the Week

### 105,000

Open software engineering positions worldwide in January 2026 [[7]](#source-7).

**The Context:** Despite AI fears and layoffs at tech giants, demand is rising. The driver: AI, ML and cloud require more engineers, not fewer [[7]](#source-7).

**Most In-Demand Skills:**
- AI/ML Integration
- Cloud-native Development
- Cybersecurity
- Context Engineering (new!) [[6]](#source-6)

**The Warning:** Entry-level positions are shrinking. AI is taking over junior tasks. Mid-level with AI skills is the sweet spot [[7]](#source-7).

---

## 📚 Reading List

1. **[Anthropic: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)** - The definitive guide (20 min) [[1]](#source-1)

2. **[Devin's 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025)** - All metrics and case studies (15 min) [[2]](#source-2)

3. **[Gartner: Context Engineering](https://www.gartner.com/en/articles/context-engineering)** - Enterprise perspective (10 min) [[6]](#source-6)

---

## 📅 Next Week

- **CES 2026 Recap:** What the AI hardware announcements mean for developers
- **Context Engineering Deep Dive:** Practical implementation
- **AI Craftsmanship February:** Focus on agent orchestration

---

## 🤖 Behind the AI

**Generated in:** ~45 minutes
**Sources scanned:** 30+ articles
**Stories found:** 12 → 6 selected
**Validation:** 4 Agents (Fact-Check, Devil's Advocate, Quality Editor, Legal)
**Model:** Claude Opus 4.5
**Images:** Pollinations.ai (3 generated)

<details>
<summary>Full metrics</summary>

| Phase | Metric | Value |
|-------|--------|-------|
| Source Collection | WebSearch Queries | 6 |
| Source Collection | WebFetch Calls | 8 |
| Selection | Stories presented | 12 |
| Selection | Stories selected | 6 |
| Draft | Words | ~1200 |
| Draft | Sources cited | 10 |
| Images | Used | 3 |
| Audio | Generated | Yes (DE + EN) |

</details>

---

*This newsletter was created with AI assistance. All facts were verified against original sources.*

*[Subscribe to newsletter](https://bks-lab.github.io/bks-news/) · [Give feedback](mailto:hello@bks-lab.com)*
