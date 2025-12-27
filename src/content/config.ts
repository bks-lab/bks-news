import { defineCollection, z } from 'astro:content';

const briefingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    type: z.enum(['weekly', 'breaking', 'research', 'digest']).default('weekly'),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url()
    })).optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  briefings: briefingsCollection
};
