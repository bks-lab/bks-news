/**
 * Gemeinsame Teile für RSS- und Podcast-Feeds (DE und EN).
 *
 * Audio: Die Pipeline schreibt seit Mai 2026 kein `audioFile` mehr ins Frontmatter,
 * legt die MP3 aber weiter nach fester Konvention ab:
 *   public/audio/briefings/YYYY/MM/<datum>-<slug>-<lang>.mp3 (daneben .vtt)
 * Der Feed findet die Datei über diese Konvention, `audioFile` gilt nur noch, wenn
 * die Datei dort wirklich liegt. Größe und Dauer kommen aus den Dateien beim Build.
 */
import fs from 'node:fs';
import path from 'node:path';
import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { visit, SKIP } from 'unist-util-visit';

export type Lang = 'de' | 'en';
type Briefing = CollectionEntry<'briefings'> | CollectionEntry<'briefings-en'>;

export const SITE = 'https://bks-lab.github.io/bks-news';
const BASE = '/bks-news';
const PUBLIC = path.join(process.cwd(), 'public');

export const DISCLOSURE = {
  de: 'Inhalte werden automatisch mit KI erstellt.',
  en: 'Content is created automatically with AI.'
} as const;

const pagePath = (slug: string, lang: Lang) => `${lang === 'en' ? '/en' : ''}/briefings/${slug}/`;
export const pageUrl = (slug: string, lang: Lang) => `${SITE}${pagePath(slug, lang)}`;

export async function briefings(lang: Lang): Promise<Briefing[]> {
  const all = await getCollection(lang === 'en' ? 'briefings-en' : 'briefings');
  return all.filter((b) => !b.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// ---------------------------------------------------------------------------
// Audio
// ---------------------------------------------------------------------------

export type Audio = { url: string; bytes: number; seconds?: number };

const existing = (rel: string) => {
  const abs = path.join(PUBLIC, rel);
  return fs.existsSync(abs) && fs.statSync(abs).isFile() ? abs : null;
};

/** Dauer aus dem Ende des letzten Untertitel-Blocks (00:18:13,047 oder 00:18:13.047). */
function secondsFromVtt(file: string): number | undefined {
  if (!fs.existsSync(file)) return undefined;
  const ends = [...fs.readFileSync(file, 'utf8').matchAll(/-->\s*(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})/g)];
  const m = ends.at(-1);
  if (!m) return undefined;
  return Math.round(Number(m[1] || 0) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4]) / 1000);
}

export function audioFor(entry: Briefing, lang: Lang): Audio | null {
  const candidates = [entry.data.audioFile, `/audio/briefings/${entry.slug}-${lang}.mp3`].filter(Boolean) as string[];
  for (const rel of candidates) {
    const clean = rel.replace(/^\/bks-news(?=\/)/, '');
    const abs = existing(clean);
    if (!abs) continue;
    const seconds = entry.data.audioDuration ? Math.round(entry.data.audioDuration) : secondsFromVtt(abs.replace(/\.mp3$/, '.vtt'));
    return { url: `${SITE}${clean}`, bytes: fs.statSync(abs).size, seconds };
  }
  return null;
}

const hms = (s: number) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');

// ---------------------------------------------------------------------------
// Volltext für content:encoded
// ---------------------------------------------------------------------------

let container: AstroContainer | undefined;

/**
 * Rendert den Artikel und macht ihn feedtauglich: alle Pfade absolut, Zitatanker auf
 * die Seite, Skripte und Stile raus. Feedleser laden keine Seitenstile, deshalb fällt
 * die sichtbare Grafik weg (aria-hidden) und die Datentabelle bleibt stehen, statt
 * dass beides doppelt erscheint.
 */
export async function fullText(entry: Briefing, lang: Lang): Promise<string> {
  container ??= await AstroContainer.create();
  const { Content } = await entry.render();
  const html = await container.renderToString(Content);
  const tree = fromHtml(html, { fragment: true });
  const page = pageUrl(entry.slug, lang);
  const abs = (v: unknown) => {
    if (typeof v !== 'string') return v;
    if (v.startsWith('#')) return `${page}${v}`;
    if (v.startsWith(`${BASE}/`)) return `${SITE}${v.slice(BASE.length)}`;
    if (v.startsWith('/')) return `${SITE}${v}`;
    return v;
  };
  visit(tree, 'element', (node: any, index, parent: any) => {
    const p = node.properties || {};
    if (['script', 'style'].includes(node.tagName) || p.ariaHidden === 'true' || p.ariaHidden === true) {
      if (parent && index !== undefined) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    }
    for (const key of ['href', 'src', 'poster']) if (p[key] !== undefined) p[key] = abs(p[key]);
    if (Array.isArray(p.className)) {
      p.className = p.className.filter((c: string) => c !== 'ex-sr' && !c.startsWith('astro-'));
      if (!p.className.length) delete p.className;
    }
    for (const k of Object.keys(p)) if (k.startsWith('dataAstro')) delete p[k];
  });
  const note = `<p><em>${DISCLOSURE[lang]} <a href="${page}">${lang === 'en' ? 'Read on the website' : 'Auf der Website lesen'}</a></em></p>`;
  return toHtml(tree) + note;
}

// ---------------------------------------------------------------------------
// Feeds
// ---------------------------------------------------------------------------

const TEXT = {
  de: {
    rssTitle: 'BKS News: KI-Briefings',
    rssDescription: `Wöchentliche Briefings von BKS-Lab zu KI, Machine Learning und Tech. ${DISCLOSURE.de}`,
    podTitle: 'BKS KI-News Audio (Deutsch)',
    podDescription: `Die wöchentlichen KI-Briefings von BKS-Lab zum Hören, gelesen von einer synthetischen Stimme. ${DISCLOSURE.de} Volltext und Quellen: ${SITE}/`,
    language: 'de-DE'
  },
  en: {
    rssTitle: 'BKS News: AI Briefings',
    rssDescription: `Weekly briefings by BKS-Lab on AI, machine learning and tech. ${DISCLOSURE.en}`,
    podTitle: 'BKS AI News Audio (English)',
    podDescription: `The weekly AI briefings by BKS-Lab as audio, read by a synthetic voice. ${DISCLOSURE.en} Full text and sources: ${SITE}/en/`,
    language: 'en-US'
  }
} as const;

const FULLTEXT_ITEMS = 10;

export async function rssFeed(lang: Lang) {
  const t = TEXT[lang];
  const posts = await briefings(lang);
  const items = [];
  // Volltext für die jüngsten Ausgaben, ältere nur mit Kurztext: hält den Feed unter etwa 300 KB.
  for (const [i, post] of posts.entries()) {
    items.push({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '',
      link: pageUrl(post.slug, lang),
      categories: post.data.tags,
      content: i < FULLTEXT_ITEMS ? await fullText(post, lang) : undefined
    });
  }
  return rss({
    title: t.rssTitle,
    description: t.rssDescription,
    site: lang === 'en' ? `${SITE}/en/` : `${SITE}/`,
    xmlns: { content: 'http://purl.org/rss/1.0/modules/content/' },
    items,
    customData: `<language>${t.language}</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<generator>bks-news (Astro)</generator>`
  });
}

const COVER = `${SITE}/podcast-cover.png`;

export async function podcastFeed(lang: Lang) {
  const t = TEXT[lang];
  const posts = await briefings(lang);
  const episodes = posts.map((p) => ({ post: p, audio: audioFor(p, lang) })).filter((e) => e.audio) as { post: Briefing; audio: Audio }[];
  return rss({
    title: t.podTitle,
    description: t.podDescription,
    site: lang === 'en' ? `${SITE}/en/` : `${SITE}/`,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/'
    },
    items: episodes.map(({ post, audio }) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: `${post.data.description || ''} ${DISCLOSURE[lang]}`.trim(),
      link: pageUrl(post.slug, lang),
      categories: post.data.tags,
      enclosure: { url: audio.url, length: audio.bytes, type: 'audio/mpeg' },
      customData: `${audio.seconds ? `<itunes:duration>${hms(audio.seconds)}</itunes:duration>\n` : ''}<itunes:explicit>false</itunes:explicit>
<itunes:episodeType>full</itunes:episodeType>
<itunes:summary><![CDATA[${`${post.data.description || ''} ${DISCLOSURE[lang]}`.trim()}]]></itunes:summary>`
    })),
    customData: `<language>${t.language}</language>
<image><url>${COVER}</url><title>${t.podTitle}</title><link>${lang === 'en' ? `${SITE}/en/` : `${SITE}/`}</link></image>
<itunes:image href="${COVER}"/>
<itunes:author>Michael Boiman · BKS-Lab</itunes:author>
<itunes:summary><![CDATA[${t.podDescription}]]></itunes:summary>
<itunes:owner><itunes:name>BKS-Lab</itunes:name><itunes:email>ai@bks-lab.com</itunes:email></itunes:owner>
<itunes:category text="Technology"/>
<itunes:explicit>false</itunes:explicit>
<itunes:type>episodic</itunes:type>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<generator>bks-news (Astro)</generator>`
  });
}
