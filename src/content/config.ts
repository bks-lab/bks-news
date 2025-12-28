import { defineCollection, z } from 'astro:content';

const briefingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  type: z.enum(['weekly', 'breaking', 'research', 'digest']).default('weekly'),
  heroImage: z.string().url().optional(),
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
