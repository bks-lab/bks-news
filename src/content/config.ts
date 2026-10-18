import { defineCollection, z } from 'astro:content';

/**
 * Briefing Schema
 *
 * WICHTIG - BILDRECHTE:
 * heroImage darf NUR verwendet werden mit:
 * - KI-generierten Bildern (DALL-E, Midjourney)
 * - Lizenzfreien Bildern (Unsplash, Pexels - CC0)
 * - Eigenen Bildern aus /public/images/
 *
 * NIEMALS externe URLs von News-Seiten verwenden!
 * (TechCrunch, Fortune, OpenAI Blog etc. = Urheberrechtsverletzung)
 */
const briefingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  type: z.enum(['weekly', 'breaking', 'research', 'digest', 'craftsmanship']).default('weekly'),
  // Titelbild: KI-generiert über die Codex-CLI (gpt-image-2), Rückfall ist ein Symbolfoto
  // Pfad: /images/briefings/YYYY/MM/YYYY-MM-DD-hero.jpg
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional(),
  draft: z.boolean().default(false),
  // i18n: link to translation
  translationSlug: z.string().optional(),
  // Audio-Ausgabe: Sprachsynthese mit edge-tts (de-DE-ConradNeural, en-US-AndrewNeural)
  audioFile: z.string().optional(),
  audioDuration: z.number().optional(),
  audioLang: z.enum(['de', 'en']).optional(),
  audioModel: z.string().optional(),
  audioGeneratedAt: z.string().optional(),
  // Zahl der Woche (optional): große Kennzahl, die beim Sichtbarwerden hochzählt.
  // source ist der 1-basierte Index in sources und wird zum Link auf #source-N.
  keyFigure: z.object({
    value: z.number(),
    prefix: z.string().default(''),
    suffix: z.string().default(''),
    label: z.string(),
    source: z.number().int().positive().optional()
  }).optional()
});

const briefingsCollection = defineCollection({
  type: 'content',
  schema: briefingSchema
});

const briefingsEnCollection = defineCollection({
  type: 'content',
  schema: briefingSchema
});

export const collections = {
  briefings: briefingsCollection,
  'briefings-en': briefingsEnCollection
};
