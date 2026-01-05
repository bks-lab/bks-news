---
title: "AI Craftsmanship - Januar 2026"
description: "Context Engineering ersetzt Prompt Engineering, Devin's Performance Review zeigt 67% PR-Merge-Rate, Microsoft plant Coding-Startup-Übernahme"
date: 2026-01-05
heroImage: "/images/briefings/2026/01/2026-01-05-hero.jpg"
heroImageAlt: "AI-generierte Illustration: Entwickler-Werkzeuge und Code-Strukturen"
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

Diese Woche in 30 Sekunden:
- **Context Engineering:** Anthropic definiert den neuen Skill - es geht nicht mehr um Prompts, sondern um Token-Konfiguration
- **Devin's Bilanz:** 67% PR-Merge-Rate, 4x schneller - aber nur 15% Erfolgsquote bei komplexen Tasks
- **Microsoft-Übernahme:** Copilot hat Marktanteile verloren - Akquisition eines Coding-Startups erwartet

---

## Audio-Version

<div class="audio-player-container" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; font-family: system-ui, -apple-system, sans-serif;">

  <!-- Main Player -->
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <button onclick="togglePlay('audio-player-de')" id="audio-player-de-btn" style="background: #4f46e5; border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
      <svg id="audio-player-de-icon" width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </button>
    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span id="audio-player-de-current" style="color: #a5b4fc; font-size: 0.875rem; min-width: 45px;">0:00</span>
        <input type="range" id="audio-player-de-progress" value="0" max="100" style="flex: 1; height: 6px; -webkit-appearance: none; background: #374151; border-radius: 3px; cursor: pointer;" oninput="seekAudio('audio-player-de', this.value)">
        <span id="audio-player-de-duration" style="color: #a5b4fc; font-size: 0.875rem; min-width: 45px;">0:00</span>
      </div>
    </div>
  </div>

  <!-- Controls Row -->
  <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; justify-content: space-between;">
    <!-- Speed Control -->
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="color: #9ca3af; font-size: 0.75rem;">Geschwindigkeit:</span>
      <select id="audio-player-de-speed" onchange="setSpeed('audio-player-de', this.value)" style="background: #374151; color: white; border: none; border-radius: 6px; padding: 0.25rem 0.5rem; font-size: 0.875rem; cursor: pointer;">
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1" selected>1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
    <!-- Download Button -->
    <a href="/bks-news/audio/briefings/2026/01/2026-01-05-ai-craftmanship-de.mp3" download style="display: inline-flex; align-items: center; gap: 0.5rem; background: #059669; color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; transition: background 0.2s;" onmouseover="this.style.background='#047857'" onmouseout="this.style.background='#059669'">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      Download MP3
    </a>
  </div>

  <!-- Chapters -->
  <details style="margin-top: 1rem;">
    <summary style="color: #a5b4fc; cursor: pointer; font-size: 0.875rem; padding: 0.5rem 0;">📑 Kapitel</summary>
    <div id="audio-player-de-chapters" style="display: grid; gap: 0.5rem; padding: 0.5rem 0; max-height: 200px; overflow-y: auto;">
      <button onclick="seekToTime('audio-player-de', 0)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">0:00</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">TL;DR</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 121)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">2:01</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">🔥 Top-Stories</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 256)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">4:16</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">⚡ Quick Hits</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 289)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">4:49</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">🛠️ Tool der Woche</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 353)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">5:53</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">💥 Fail der Woche</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 403)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">6:43</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📊 Zahl der Woche</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 445)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">7:25</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📚 Leseliste</span>
      </button>
      <button onclick="seekToTime('audio-player-de', 466)" style="display: flex; align-items: center; gap: 0.75rem; background: #1f2937; border: none; border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer; text-align: left; transition: background 0.2s;" onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#1f2937'">
        <span style="color: #4f46e5; font-size: 0.75rem; min-width: 40px;">7:46</span>
        <span style="color: #e5e7eb; font-size: 0.875rem;">📅 Next Week</span>
      </button>
    </div>
  </details>

  <!-- Hidden Audio Element -->
  <audio id="audio-player-de" preload="metadata">
    <source src="/bks-news/audio/briefings/2026/01/2026-01-05-ai-craftmanship-de.mp3" type="audio/mpeg">
  </audio>

  <p style="color: #6b7280; font-size: 0.75rem; margin-top: 1rem; margin-bottom: 0;">
    Vorgelesen mit <a href="https://github.com/rany2/edge-tts" style="color: #818cf8;">edge-tts</a> (Microsoft Azure Neural Voice: de-DE-ConradNeural)
  </p>
</div>

<script>
(function() {
  const id = 'audio-player-de';
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

## 🎯 Technik der Woche

![Context Engineering](/bks-news/images/briefings/2026/01/2026-01-05-mcp.jpg)
*Bild: AI-generiert mit [Pollinations.ai](https://pollinations.ai)*

### Context Engineering ersetzt Prompt Engineering

Anthropic hat einen neuen Guide veröffentlicht, der die Entwickler-Landschaft verändert [[1]](#source-1). Die zentrale These:

> "Building with language models is becoming less about finding the right words for your prompts, and more about answering: what configuration of context is most likely to generate our model's desired behavior?"

**Was ist Context Engineering?**

Gartner definiert es so [[6]](#source-6): "Designing and structuring the relevant data, workflows and environment so AI systems can understand intent, make better decisions and deliver contextual, enterprise-aligned outcomes."

**Warum das wichtig ist:**

| Prompt Engineering | Context Engineering |
|-------------------|---------------------|
| Fokus auf WIE fragen | Fokus auf WAS bereitstellen |
| Einzelne Interaktion | System-Design |
| Statisch | Dynamisch |

**Die drei Kernprinzipien von Anthropic:**

1. **Finite Attention Budget** - Jeder Token verbraucht Aufmerksamkeit. Bei n² Pairwise-Relationships sinkt die Präzision mit wachsendem Context [[1]](#source-1)

2. **Just-In-Time Retrieval** - Nicht alles vorladen, sondern Identifier speichern und dynamisch fetchen [[1]](#source-1)

3. **Goldilocks Zone** - System-Prompts spezifisch genug für Guidance, flexibel genug für Heuristiken [[1]](#source-1)

**Gartner's Empfehlung:** Unternehmen sollten einen "Context Engineering Lead" ernennen [[6]](#source-6).

**Bottom Line:** Wer 2026 mit AI-Agents arbeitet, muss Context Engineering beherrschen - nicht Prompt Engineering.

---

## 🔥 Top-Stories

### Devin's Performance Review: Die echten Zahlen

![Devin AI](/bks-news/images/briefings/2026/01/2026-01-05-claude-code.jpg)
*Bild: AI-generiert mit [Pollinations.ai](https://pollinations.ai)*

Cognition hat Devin's 2025-Bilanz veröffentlicht [[2]](#source-2). Die Zahlen sind beeindruckend - aber mit Nuancen:

**Die Verbesserungen:**
- **4x schneller** beim Problem-Solving
- **2x effizienter** beim Ressourcenverbrauch
- **67% PR-Merge-Rate** (vs. 34% im Vorjahr)
- **20x schneller** bei Security-Fixes (1.5 min vs. 30 min)

**Real-World Case Studies:**

| Kunde | Ergebnis |
|-------|----------|
| Große Bank | 5-10% Developer-Zeit gespart [[2]](#source-2) |
| Nubank | 8-12x schnellere Migration, 20x Kostenreduktion [[2]](#source-2) |
| Litera | 40% mehr Test-Coverage, 93% schnellere Regressions-Zyklen [[2]](#source-2) |
| EightSleep | 3x mehr Data-Features shipped [[2]](#source-2) |

**Die andere Seite:** Answer.AI testete Devin einen Monat lang - Ergebnis: **nur 15% Erfolgsrate** bei 20 Tasks [[10]](#source-10).

**Das Pattern:** Devin ist ein Spezialist, kein Generalist. Am besten bei repetitiven Tasks wie Migrationen und Refactoring - nicht bei kreativer Produktentwicklung [[2]](#source-2).

---

### Microsoft wird Coding-Startup kaufen

The Information prognostiziert [[3]](#source-3): Microsoft wird 2026 ein AI-Coding-Startup akquirieren.

**Der Grund:** GitHub Copilot hat massiv Marktanteile verloren. Die aktuelle Verteilung:

| Tool | Marktanteil |
|------|-------------|
| GitHub Copilot | ~25% |
| Cursor | ~25% |
| Claude Code | ~25% |
| Andere | ~25% |

**Warum Akquisition?**

- Microsoft's Inflection-Deal ($650M) zeigte, wie man Antitrust umgeht [[3]](#source-3)
- OpenAI hat bereits Windsurf (ex-Codeium) für $3 Mrd. gekauft [[3]](#source-3)
- Für Entwickler, die gewechselt haben, ist eine Übernahme der einzige Weg zurück [[3]](#source-3)

**Mögliche Targets:** Cursor, Replit, oder ein kleineres Startup mit starker Technology.

---

## ⚡ Quick Hits

- **"Show Me The Money":** Menlo Ventures nennt 2026 das Jahr der ROI-Nachweise [[9]](#source-9)
- **105.000 Software-Jobs:** Entgegen Befürchtungen steigen die Stellen - AI treibt Nachfrage [[7]](#source-7)
- **Stack Overflow Vertrauen sinkt:** Erstmals fallen positive AI-Sentiments signifikant [[5]](#source-5)
- **Super Agents:** IBM prognostiziert Multi-Agent-Dashboards als Standard [[4]](#source-4)
- **Vibe → OVP:** Software-Praxis evolviert von "Vibe Coding" zu "Objective-Validation Protocol" [[4]](#source-4)

---

## 🛠️ Tool der Woche

### Context Engineering Checkliste

Basierend auf Anthropic's Guide [[1]](#source-1) - die wichtigsten Techniken:

**1. System Prompt Design**
```
❌ Zu vage: "Sei hilfreich"
❌ Zu rigide: "Wenn X dann Y, sonst Z"
✅ Goldilocks: "Du bist ein Code-Reviewer.
   Fokussiere auf Security und Performance.
   Frage nach bei Unklarheiten."
```

**2. Tool Design**
- Minimal, fokussiert, klar benannt [[1]](#source-1)
- Faustregel: Wenn ein Mensch nicht sicher wüsste welches Tool, ist es zu komplex

**3. Memory Management**
- **Compaction:** Konversations-Historie zusammenfassen [[1]](#source-1)
- **Structured Notes:** Persistente Memory-Files außerhalb des Context Windows [[1]](#source-1)
- **Sub-Agents:** Spezialisierte Agents für fokussierte Tasks [[1]](#source-1)

**Das Mantra:** "The smallest set of high-signal tokens that maximize the likelihood of some desired outcome." [[1]](#source-1)

---

## 💥 Fail der Woche

### Die 19%-Langsamkeit kehrt zurück

Die METR-Studie aus 2025 wurde in neuen Analysen bestätigt [[5]](#source-5):

**Das Problem:** Erfahrene Entwickler sind mit AI-Tools **19% langsamer** auf ihrem eigenen Code - obwohl sie glauben, 20% schneller zu sein.

**2026-Update:** Stack Overflow's Survey zeigt erstmals sinkende positive AI-Sentiments. Der Hype-Backlash ist real [[5]](#source-5).

**Mögliche Gründe:**
- Context-Switching-Overhead
- Übermäßiges Vertrauen führt zu weniger Prüfung
- AI-Tools optimiert für Demos, nicht für echte Codebases

**Die Lektion:** "Show me the money" gilt auch für Developer Productivity - nicht nur Enterprise ROI [[9]](#source-9).

---

## 📊 Zahl der Woche

### 105.000

Offene Software-Engineering-Stellen weltweit im Januar 2026 [[7]](#source-7).

**Der Kontext:** Trotz AI-Ängsten und Layoffs bei Tech-Giants steigt die Nachfrage. Der Treiber: AI, ML und Cloud erfordern mehr Engineers, nicht weniger [[7]](#source-7).

**Die gefragtesten Skills:**
- AI/ML Integration
- Cloud-native Development
- Cybersecurity
- Context Engineering (neu!) [[6]](#source-6)

**Die Warnung:** Entry-Level-Positionen schrumpfen. AI übernimmt Junior-Tasks. Mid-Level mit AI-Skills ist der Sweet Spot [[7]](#source-7).

---

## 📚 Leseliste

1. **[Anthropic: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)** - Der definitive Guide (20 min) [[1]](#source-1)

2. **[Devin's 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025)** - Alle Metriken und Case Studies (15 min) [[2]](#source-2)

3. **[Gartner: Context Engineering](https://www.gartner.com/en/articles/context-engineering)** - Enterprise-Perspektive (10 min) [[6]](#source-6)

---

## 📅 Next Week

- **CES 2026 Nachbereitung:** Was die AI-Hardware-Announcements für Entwickler bedeuten
- **Context Engineering Deep Dive:** Praktische Implementierung
- **AI Craftsmanship Februar:** Fokus auf Agent-Orchestrierung

---

## 🤖 Behind the AI

**Generiert in:** ~45 Minuten
**Quellen gescannt:** 30+ Artikel
**Stories gefunden:** 12 → 6 ausgewählt
**Validation:** 4 Agents (Fact-Check, Devil's Advocate, Quality Editor, Legal)
**Model:** Claude Opus 4.5
**Bilder:** Pollinations.ai (3 generiert)

<details>
<summary>Vollständige Metriken</summary>

| Phase | Metrik | Wert |
|-------|--------|------|
| Quellensammlung | WebSearch Queries | 6 |
| Quellensammlung | WebFetch Calls | 8 |
| Selektion | Stories präsentiert | 12 |
| Selektion | Stories ausgewählt | 6 |
| Draft | Wörter | ~1200 |
| Draft | Quellen zitiert | 10 |
| Bilder | Verwendet | 3 |
| Audio | Generiert | Ja (DE + EN) |

</details>

---

*Dieser Newsletter wurde mit AI-Unterstützung erstellt. Alle Fakten wurden gegen Originalquellen verifiziert.*

*[Newsletter abonnieren](https://bks-lab.github.io/bks-news/) · [Feedback geben](mailto:hello@bks-lab.com)*
