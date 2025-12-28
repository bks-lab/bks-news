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
  type: z.enum(['weekly', 'breaking', 'research', 'digest']).default('weekly'),
  // ACHTUNG: Nur eigene/lizenzfreie Bilder! Siehe Kommentar oben.
  heroImage: z.string().url().optional(),
  // Auto-generiertes AI-Bild via Pollinations.ai (kostenlos, rechtlich sicher)
  autoImage: z.boolean().default(false),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional(),
  draft: z.boolean().default(false),
  // i18n: link to translation
  translationSlug: z.string().optional()
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
