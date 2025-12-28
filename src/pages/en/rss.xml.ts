import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const briefings = await getCollection('briefings-en');
  const sortedBriefings = briefings
    .filter(b => !b.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'BKS News - AI Briefings',
    description: 'AI-generated news briefings by BKS-Lab. Weekly updates on AI, Machine Learning, and Tech.',
    site: context.site || 'https://bks-lab.github.io/bks-news',
    items: sortedBriefings.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '',
      link: `/bks-news/en/briefings/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-US</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<generator>BKS-Lab AI Scheduler</generator>`,
  });
}
