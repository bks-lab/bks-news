/**
 * Erklär-Grafiken und Bildherkunft für die Ausgaben.
 *
 * Alles hier erzeugt fertiges HTML im ENDZUSTAND: ohne JavaScript, bei
 * prefers-reduced-motion und für Screenreader steht sofort das Ergebnis da.
 * Die Bewegung kommt erst im Browser dazu (src/components/Explain.astro).
 *
 * Genutzt von drei Stellen, damit Markup und Texte nur einmal existieren:
 * - remarkExplain: ```animation-Blöcke und die Karte "Zahl der Woche" im Text
 * - rehypeImageProvenance: Herkunft der Inline-Bilder aus images[]
 * - die Ausgabeseiten: Titelbild und Karte, wenn die Überschrift fehlt
 */
import yaml from 'js-yaml';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
// Eine Quelle der Wahrheit für das, was die Site darstellen kann. Die Pipeline liest
// dieselbe Datei aus dem bks-news-Checkout und schreibt nur, was hier steht.
import capabilities from './capabilities.json';

const TEXT = {
  de: {
    locale: 'de-DE',
    keyFigure: 'Zahl der Woche',
    source: 'Quelle',
    value: 'Wert',
    change: 'Veränderung',
    step: 'Schritt',
    aiBadge: 'KI-generiert',
    aiWith: 'mit',
    how: 'Wie entstanden?',
    prompt: 'Prompt',
    model: 'Modell',
    tool: 'Werkzeug',
    host: 'Ort',
    createdAt: 'Zeitpunkt',
    stock: 'Symbolfoto',
    rest: 'Rest'
  },
  en: {
    locale: 'en-US',
    keyFigure: 'Number of the Week',
    source: 'Source',
    value: 'Value',
    change: 'Change',
    step: 'Step',
    aiBadge: 'AI-generated',
    aiWith: 'with',
    how: 'How was it made?',
    prompt: 'Prompt',
    model: 'Model',
    tool: 'Tool',
    host: 'Location',
    createdAt: 'Created',
    stock: 'Stock photo',
    rest: 'Other'
  }
};

export const KEY_FIGURE_HEADING = /^(Zahl der Woche|Number of the Week)$/i;
const KEY_FIGURE_HEADING_MD = /^##\s+(Zahl der Woche|Number of the Week)\s*$/im;

/** Ob die Ausgabe eine Sektion "Zahl der Woche" hat (dann steht die Karte dort, sonst oben). */
export const hasKeyFigureHeading = (body = '') => KEY_FIGURE_HEADING_MD.test(body);

export const langOf = (path = '') => (/[\\/]briefings-en[\\/]/.test(path) ? 'en' : 'de');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const decimalsOf = (...values) =>
  Math.min(3, Math.max(0, ...values.map((v) => (String(v).split('.')[1] || '').length)));

const formatter = (lang, decimals) =>
  new Intl.NumberFormat(TEXT[lang].locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const sourceLink = (source, sourceCount, lang) =>
  Number.isInteger(source) && source >= 1 && source <= sourceCount
    ? `<a class="ex-source-link" href="#source-${source}">${TEXT[lang].source} [${source}]</a>`
    : '';

/* Zahl, deren Breite feststeht: ein unsichtbarer Platzhalter mit dem Endwert und
   die Live-Zahl liegen in derselben Gitterzelle, Tabellenziffern halten sie still. */
const liveNumber = (value, decimals, lang, cls = '') => {
  const text = formatter(lang, decimals).format(value);
  return `<span class="ex-num ${cls}"><span class="ex-sizer">${text}</span><span class="ex-live" data-to="${value}">${text}</span></span>`;
};

// ---------------------------------------------------------------------------
// Zahl der Woche
// ---------------------------------------------------------------------------

export function keyFigureHtml(kf, { lang = 'de', sourceCount = 0 } = {}) {
  const t = TEXT[lang];
  const prefix = kf.prefix ?? '';
  const suffix = kf.suffix ?? '';
  const decimals = decimalsOf(kf.value);
  const formatted = formatter(lang, decimals).format(kf.value);
  // Kurze Einheiten ("B", "%") stehen in voller Größe, lange ("Mrd. USD") kleiner.
  const suffixCls = suffix.trim().length <= 2 ? 'kf-affix' : 'kf-affix kf-suffix';
  const link = sourceLink(kf.source, sourceCount, lang);
  return `<aside class="ex key-figure" data-explain="keyfigure" data-locale="${t.locale}" data-decimals="${decimals}" aria-label="${esc(t.keyFigure)}">
<p class="kf-heading">${esc(t.keyFigure)}</p>
<p class="kf-figure"><span class="ex-sr">${esc(prefix)}${formatted}${esc(suffix)}</span><span class="kf-visual" aria-hidden="true">${prefix ? `<span class="kf-affix">${esc(prefix)}</span>` : ''}${liveNumber(kf.value, decimals, lang)}${suffix ? `<span class="${suffixCls}">${esc(suffix)}</span>` : ''}</span></p>
<p class="kf-label">${esc(kf.label)}${link ? ` ${link}` : ''}</p>
</aside>`;
}

// ---------------------------------------------------------------------------
// ```animation-Blöcke
// ---------------------------------------------------------------------------
//
// Auswahl der Typen nach Aussage (recherche-grafik.md):
//   bars     Werte vergleichen (gleiche Einheit), Reihenfolge wie geschrieben
//   rank     Rangfolge, vom Skript absteigend sortiert, Platz vorne, highlight optional
//   share    Anteile in Prozent an einem 100-%-Balken (keine Torte)
//   growth   genau zwei Zeitpunkte, Anstieg oder Rückgang
//   trend    Verlauf über 3 bis 12 Zeitpunkte, Linie statisch, Basis 0
//   timeline Ereignisse in Reihenfolge (nicht maßstäblich)
//   flow     Schritte eines linearen Ablaufs
// Zahlen stehen von Anfang an fest, nur Balken und Linie bewegen sich: Zwischenwerte
// eines Zählers sind keine Daten. Gezählt wird allein bei der Zahl der Woche.

const TYPES = capabilities.animationTypes;
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
const isText = (v) => (typeof v === 'string' && v.trim() !== '') || isNum(v);
const valueItems = (it, min, max, what) => {
  if (!Array.isArray(it) || it.length < min || it.length > max) return `${what} braucht ${min} bis ${max} items`;
  if (!it.every((x) => x && isText(x.label) && isNum(x.value) && x.value >= 0)) return `${what}: jedes item braucht label und value >= 0`;
  return null;
};

/** Prüft einen Block. Rückgabe: Fehlertext oder null. */
export function validateAnimation(spec, sourceCount) {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) return 'kein YAML-Objekt';
  if (!TYPES.includes(spec.type)) return `type muss einer von ${TYPES.join(', ')} sein`;
  if (!isText(spec.title)) return 'title fehlt';
  if (!Number.isInteger(spec.source)) return 'source fehlt (1-basierter Index in sources)';
  if (spec.source < 1 || spec.source > sourceCount) return `source ${spec.source} gibt es nicht (sources hat ${sourceCount})`;
  if (spec.unit !== undefined && typeof spec.unit !== 'string') return 'unit muss Text sein';
  const it = spec.items;
  switch (spec.type) {
    case 'bars':
    case 'rank': {
      const err = valueItems(it, 1, spec.type === 'rank' ? 10 : 12, spec.type);
      if (err) return err;
      if (!it.some((x) => x.value > 0)) return `${spec.type}: alle Werte sind 0`;
      if (spec.highlight !== undefined && !it.some((x) => String(x.label) === String(spec.highlight))) return `highlight "${spec.highlight}" ist kein label`;
      return null;
    }
    case 'share': {
      const err = valueItems(it, 1, 5, 'share');
      if (err) return err;
      const sum = it.reduce((a, x) => a + x.value, 0);
      if (sum > 100.5) return `share: Summe ${sum} liegt über 100`;
      if (sum <= 0) return 'share: Summe ist 0';
      if (spec.rest !== undefined && !isText(spec.rest)) return 'rest muss Text sein';
      return null;
    }
    case 'growth':
      if (!it || !it.from || !it.to) return 'growth braucht items.from und items.to';
      if (![it.from, it.to].every((x) => isText(x.label) && isNum(x.value) && x.value >= 0)) return 'growth: from und to brauchen label und value >= 0';
      if (Math.max(it.from.value, it.to.value) === 0) return 'growth: beide Werte sind 0';
      if (it.unit !== undefined && typeof it.unit !== 'string') return 'unit muss Text sein';
      return null;
    case 'trend': {
      const err = valueItems(it, 3, 12, 'trend');
      if (err) return err;
      if (!it.some((x) => x.value > 0)) return 'trend: alle Werte sind 0';
      return null;
    }
    case 'timeline':
      if (!Array.isArray(it) || it.length < 2 || it.length > 12) return 'timeline braucht 2 bis 12 items';
      if (!it.every((x) => x && isText(x.date) && isText(x.label))) return 'timeline: jedes item braucht date und label';
      return null;
    case 'flow':
      if (!Array.isArray(it) || it.length < 2 || it.length > 8) return 'flow braucht 2 bis 8 items';
      if (!it.every((x) => x && isText(x.label) && (x.text === undefined || isText(x.text)))) return 'flow: jedes item braucht label, text ist optional';
      return null;
  }
  return 'unbekannt';
}

const head = (spec, unit) =>
  `<figcaption class="ex-title">${esc(spec.title)}${unit ? ` <span class="ex-unit">(${esc(unit)})</span>` : ''}</figcaption>`;

const foot = (spec, sourceCount, lang) => `<p class="ex-source">${sourceLink(spec.source, sourceCount, lang)}</p>`;

const withUnit = (text, unit) => `${text}${unit ? ` ${esc(unit)}` : ''}`;

const srTable = (lang, rows) =>
  `<table class="ex-sr"><thead><tr><th scope="col"></th><th scope="col">${esc(TEXT[lang].value)}</th></tr></thead><tbody>${rows
    .map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`)
    .join('')}</tbody></table>`;

/* bars und rank: eine Zeile je Wert, Balken ab 0, Zahl steht fest. */
function barsHtml(spec, lang, sourceCount) {
  const t = TEXT[lang];
  const unit = spec.unit || '';
  const isRank = spec.type === 'rank';
  const items = isRank ? [...spec.items].sort((a, b) => b.value - a.value) : spec.items;
  const max = Math.max(...items.map((x) => x.value));
  const fmt = formatter(lang, decimalsOf(...items.map((x) => x.value)));
  const hl = spec.highlight !== undefined ? String(spec.highlight) : null;
  const rows = items
    .map((x, i) => {
      const cls = hl !== null && String(x.label) === hl ? ' ex-hl' : '';
      return `<div class="ex-row${cls}">${isRank ? `<span class="ex-place">${i + 1}.</span>` : ''}<span class="ex-label">${esc(x.label)}</span><span class="ex-track"><span class="ex-bar" style="--w:${((x.value / max) * 100).toFixed(2)}%"></span></span><span class="ex-num">${fmt.format(x.value)}</span></div>`;
    })
    .join('');
  const table = srTable(lang, items.map((x, i) => [`${isRank ? `${i + 1}. ` : ''}${x.label}`, withUnit(fmt.format(x.value), unit)]));
  return `<figure class="ex ex-bars${isRank ? ' ex-rank' : ''}" data-explain="bars">
${head(spec, unit)}
<div class="ex-visual ex-grid" aria-hidden="true">${rows}</div>
${table}
${foot(spec, sourceCount, lang)}
</figure>`;
}

/* share: ein Balken von 0 bis 100 %, Segmente direkt beschriftet, Rest grau. */
function shareHtml(spec, lang, sourceCount) {
  const t = TEXT[lang];
  const items = spec.items.map((x) => ({ label: String(x.label), value: x.value }));
  const sum = items.reduce((a, x) => a + x.value, 0);
  const parts = [...items];
  if (sum < 99.5) parts.push({ label: spec.rest !== undefined ? String(spec.rest) : t.rest, value: 100 - sum, rest: true });
  const fmt = formatter(lang, decimalsOf(...parts.map((x) => x.value)));
  const pct = (v) => `${fmt.format(v)}${lang === 'de' ? ' %' : '%'}`;
  let start = 0;
  const segs = parts
    .map((x, i) => {
      const s = `<span class="ex-seg${x.rest ? ' ex-seg-rest' : ''}" data-i="${i}" style="--x:${start.toFixed(2)}%;--w:${x.value.toFixed(2)}%"></span>`;
      start += x.value;
      return s;
    })
    .join('');
  const legend = parts
    .map((x, i) => `<li class="${x.rest ? 'ex-seg-rest' : ''}" data-i="${i}"><span class="ex-swatch"></span><span class="ex-num">${pct(x.value)}</span> ${esc(x.label)}</li>`)
    .join('');
  return `<figure class="ex ex-share" data-explain="share">
${head(spec)}
<div class="ex-visual" aria-hidden="true"><div class="ex-share-bar">${segs}</div><ul class="ex-legend">${legend}</ul></div>
${srTable(lang, parts.map((x) => [x.label, pct(x.value)]))}
${foot(spec, sourceCount, lang)}
</figure>`;
}

function growthHtml(spec, lang, sourceCount) {
  const t = TEXT[lang];
  const { from, to } = spec.items;
  const unit = spec.unit || spec.items.unit || '';
  const max = Math.max(from.value, to.value);
  const fmt = formatter(lang, decimalsOf(from.value, to.value));
  // Ab Faktor 3 liest sich Prozent schlecht (+250 %), dann "3,5-fach".
  let delta = '';
  if (from.value > 0) {
    const ratio = to.value / from.value;
    delta =
      ratio >= 3
        ? lang === 'de'
          ? `${new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(ratio)}-fach`
          : `${new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(ratio)}×`
        : new Intl.NumberFormat(t.locale, { style: 'percent', maximumFractionDigits: 0, signDisplay: 'exceptZero' }).format(ratio - 1);
  }
  const down = to.value < from.value;
  const row = (x, key) =>
    `<div class="ex-row ex-${key}"><span class="ex-label">${esc(x.label)}</span><span class="ex-track"><span class="ex-bar" style="--w:${((x.value / max) * 100).toFixed(2)}%"></span></span><span class="ex-num">${fmt.format(x.value)}</span></div>`;
  const rows = [
    [from.label, withUnit(fmt.format(from.value), unit)],
    [to.label, withUnit(fmt.format(to.value), unit)]
  ];
  if (delta) rows.push([t.change, esc(delta)]);
  return `<figure class="ex ex-growth${down ? ' ex-down' : ''}" data-explain="growth" data-from="${from.value}" data-to="${to.value}">
${head(spec, unit)}
<div class="ex-visual" aria-hidden="true"><div class="ex-grid">${row(from, 'from')}${row(to, 'to')}</div>${delta ? `<p class="ex-delta">${esc(delta)}</p>` : ''}</div>
${srTable(lang, rows)}
${foot(spec, sourceCount, lang)}
</figure>`;
}

/* trend: Linie über gleich verteilte Zeitpunkte, y ab 0. Linie im SVG (gestreckt,
   Strichstärke fest), Punkte und Beschriftung als HTML, damit Schrift nicht verzerrt. */
function trendHtml(spec, lang, sourceCount) {
  const unit = spec.unit || '';
  const items = spec.items;
  const n = items.length;
  const max = Math.max(...items.map((x) => x.value));
  const fmt = formatter(lang, decimalsOf(...items.map((x) => x.value)));
  const pts = items.map((x, i) => ({ x: (i / (n - 1)) * 100, y: 100 - (x.value / max) * 100, ...x }));
  const peak = items.reduce((m, x, i) => (x.value > items[m].value ? i : m), 0);
  const labelled = new Set([peak, n - 1]);
  const poly = pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const dots = pts
    .map(
      (p, i) =>
        `<span class="ex-dot${labelled.has(i) ? ' ex-dot-key' : ''}" style="left:${p.x.toFixed(2)}%;top:${p.y.toFixed(2)}%">${labelled.has(i) ? `<span class="ex-dot-val">${fmt.format(p.value)}</span>` : ''}</span>`
    )
    .join('');
  return `<figure class="ex ex-trend" data-explain="trend">
${head(spec, unit)}
<div class="ex-visual" aria-hidden="true"><div class="ex-plot"><svg class="ex-line" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="0" y1="100" x2="100" y2="100" class="ex-axis" vector-effect="non-scaling-stroke"/><polyline points="${poly}" vector-effect="non-scaling-stroke"/></svg>${dots}</div><div class="ex-xlabels"><span>${esc(items[0].label)}</span><span>${esc(items[n - 1].label)}</span></div></div>
${srTable(lang, items.map((x) => [x.label, withUnit(fmt.format(x.value), unit)]))}
${foot(spec, sourceCount, lang)}
</figure>`;
}

function timelineHtml(spec, lang, sourceCount) {
  const items = spec.items.map((x, i) => `<li data-i="${i}"><span class="ex-date">${esc(x.date)}</span><span class="ex-text">${esc(x.label)}</span></li>`).join('');
  return `<figure class="ex ex-timeline" data-explain="timeline">
${head(spec)}
<ol class="ex-tl">${items}</ol>
${foot(spec, sourceCount, lang)}
</figure>`;
}

function flowHtml(spec, lang, sourceCount) {
  const items = spec.items
    .map(
      (x, i) =>
        `<li data-i="${i}"><span class="ex-step">${i + 1}</span><span class="ex-flow-label">${esc(x.label)}</span>${x.text !== undefined ? `<span class="ex-flow-text">${esc(x.text)}</span>` : ''}</li>`
    )
    .join('');
  return `<figure class="ex ex-flow" data-explain="flow">
${head(spec)}
<ol class="ex-flow-list">${items}</ol>
${foot(spec, sourceCount, lang)}
</figure>`;
}

const RENDERERS = {
  bars: barsHtml,
  rank: barsHtml,
  share: shareHtml,
  growth: growthHtml,
  trend: trendHtml,
  timeline: timelineHtml,
  flow: flowHtml
};

/**
 * Build-Check: capabilities.json und Renderer müssen übereinstimmen. Ein Unterschied ist
 * ein Codefehler, kein Inhaltsfehler, deshalb bricht er den Build ab (anders als ein
 * ungültiger Block, der nur warnt).
 */
export function checkCapabilities() {
  const declared = [...capabilities.animationTypes].sort();
  const rendered = Object.keys(RENDERERS).sort();
  const problems = [];
  if (capabilities.version !== 1) problems.push(`version ${capabilities.version} unbekannt`);
  const missing = declared.filter((t) => !rendered.includes(t));
  const undeclared = rendered.filter((t) => !declared.includes(t));
  if (missing.length) problems.push(`in capabilities.json, aber ohne Renderer: ${missing.join(', ')}`);
  if (undeclared.length) problems.push(`Renderer ohne Eintrag in capabilities.json: ${undeclared.join(', ')}`);
  for (const key of ['keyFigure', 'images', 'kiHinweis']) if (typeof capabilities[key] !== 'boolean') problems.push(`${key} muss true oder false sein`);
  if (problems.length) throw new Error(`[bks-news] src/lib/capabilities.json passt nicht zum Renderer: ${problems.join('; ')}`);
}

// Läuft beim Laden des Moduls, also schon beim Einlesen von astro.config.mjs.
checkCapabilities();

export function animationHtml(spec, { lang = 'de', sourceCount = 0 } = {}) {
  const render = RENDERERS[spec.type];
  return render ? render(spec, lang, sourceCount) : '';
}

const warn = (file, msg) => console.warn(`[bks-news] ${file.path ? file.path.replace(/^.*\/src\//, 'src/') : '?'}: ${msg}`);

/**
 * remark: ersetzt gültige ```animation-Blöcke durch fertiges HTML und setzt die
 * Karte "Zahl der Woche" direkt unter die gleichnamige Überschrift. Ein ungültiger
 * Block bleibt als Codeblock stehen und meldet eine Warnung; der Build bricht nie ab.
 */
export function remarkExplain() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter || {};
    const lang = langOf(file.path);
    const sourceCount = Array.isArray(fm.sources) ? fm.sources.length : 0;

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'animation' || !parent || index === undefined) return;
      let spec;
      try {
        spec = yaml.load(node.value, { schema: yaml.CORE_SCHEMA });
      } catch (e) {
        warn(file, `animation-Block ungültig (YAML: ${e.reason || e.message}), bleibt als Codeblock`);
        return;
      }
      const err = validateAnimation(spec, sourceCount);
      if (err) {
        warn(file, `animation-Block ungültig (${err}), bleibt als Codeblock`);
        return;
      }
      parent.children[index] = { type: 'html', value: animationHtml(spec, { lang, sourceCount }) };
    });

    const kf = fm.keyFigure;
    if (!kf) return;
    if (kf.source !== undefined && !(Number.isInteger(kf.source) && kf.source >= 1 && kf.source <= sourceCount)) {
      warn(file, `keyFigure.source ${kf.source} gibt es nicht (sources hat ${sourceCount}), Karte ohne Quellverweis`);
    }
    let placed = false;
    visit(tree, 'heading', (node, index, parent) => {
      if (placed || node.depth !== 2 || !parent || index === undefined) return;
      if (!KEY_FIGURE_HEADING.test(toString(node).trim())) return;
      parent.children.splice(index + 1, 0, { type: 'html', value: keyFigureHtml(kf, { lang, sourceCount }) });
      placed = true;
    });
  };
}

// ---------------------------------------------------------------------------
// Bildherkunft
// ---------------------------------------------------------------------------

const baseName = (p = '') => String(p).split(/[?#]/)[0].split('/').pop();

/** images[]-Eintrag zu einem Bildpfad, über den Dateinamen. */
export const findImage = (images, src) => (Array.isArray(images) ? images.find((x) => baseName(x.file) === baseName(src)) : undefined);

const formatWhen = (value, lang) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return esc(value);
  const text = new Intl.DateTimeFormat(TEXT[lang].locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Berlin', timeZoneName: 'short' }).format(d);
  return `<time datetime="${esc(value)}">${esc(text)}</time>`;
};

/** Bildunterschrift aus dem images[]-Eintrag. Ohne Eintrag: leer, keine Herkunftsbehauptung. */
export function provenanceCaption(entry, lang = 'de') {
  if (!entry) return '';
  const t = TEXT[lang];
  if (entry.generated) {
    const rows = [
      [t.prompt, entry.prompt && `<pre class="img-prov-prompt">${esc(entry.prompt)}</pre>`],
      [t.model, entry.model && esc(entry.model)],
      [t.tool, entry.tool && esc(entry.tool)],
      [t.host, entry.host && esc(entry.host)],
      [t.createdAt, entry.createdAt && formatWhen(entry.createdAt, lang)]
    ].filter(([, v]) => v);
    const how = rows.length
      ? ` <details class="img-prov-how"><summary>${esc(t.how)}</summary><dl>${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl></details>`
      : '';
    return `<figcaption class="img-prov-caption"><span class="img-prov-badge">${esc(t.aiBadge)}</span>${entry.model ? ` ${esc(t.aiWith)} ${esc(entry.model)}` : ''}${how}</figcaption>`;
  }
  const credit = entry.credit ? esc(entry.credit) : '';
  const linked = credit && entry.sourceUrl ? `<a href="${esc(entry.sourceUrl)}" target="_blank" rel="noopener">${credit}</a>` : credit;
  return `<figcaption class="img-prov-caption"><span class="img-prov-badge img-prov-badge-stock">${esc(t.stock)}</span>${linked ? ` ${linked}` : ''}</figcaption>`;
}

export function imageFigureHtml({ src, alt, entry, lang = 'de', role = 'inline' }) {
  return `<figure class="img-prov img-prov-${role}"><img src="${esc(src)}" alt="${esc(alt)}" loading="${role === 'hero' ? 'eager' : 'lazy'}" decoding="async">${provenanceCaption(entry, lang)}</figure>`;
}

const isWhitespace = (n) => n.type === 'text' && !n.value.trim();

/**
 * rehype: ein Absatz, der nur aus einem Bild besteht, wird zur Figur mit Herkunft
 * aus images[]. Bild ohne Eintrag bleibt wie es ist und meldet eine Build-Warnung.
 */
export function rehypeImageProvenance() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter || {};
    const lang = langOf(file.path);
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;
      const kids = node.children.filter((c) => !isWhitespace(c));
      if (kids.length !== 1 || kids[0].type !== 'element' || kids[0].tagName !== 'img') return;
      const img = kids[0];
      const src = img.properties?.src;
      const entry = findImage(fm.images, src);
      if (!entry) {
        warn(file, `Bild ohne images[]-Eintrag, Herkunft unbekannt: ${src}`);
        return;
      }
      parent.children[index] = {
        type: 'raw',
        value: imageFigureHtml({ src, alt: img.properties?.alt || entry.alt || '', entry, lang, role: 'inline' })
      };
    });
  };
}
