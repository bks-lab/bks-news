// Podcast RSS feed (EN) — iTunes/Apple Podcasts compatible.
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') || 'https://bks-lab.github.io/bks-news';
  const briefings = await getCollection('briefings-en');
  const episodes = briefings
    .filter(b => !b.data.draft && b.data.audioFile)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'BKS AI News (English) — Audio Edition',
    description: 'Weekly AI news briefings from BKS-Lab, narrated with the AI-cloned voice of Michael Boiman (Chatterbox Multilingual, PerthNet watermark). Full text always at bks-lab.github.io/bks-news.',
    site,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    items: episodes.map((post) => {
      const audioUrl = `${site}${post.data.audioFile}`;
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || '',
        link: `/bks-news/en/briefings/${post.slug}/`,
        categories: post.data.tags,
        enclosure: {
          url: audioUrl,
          length: 0,
          type: 'audio/mp4',
        },
        customData: `<itunes:duration>${post.data.audioDuration ?? 0}</itunes:duration>
<itunes:explicit>false</itunes:explicit>
<itunes:episodeType>full</itunes:episodeType>
<itunes:summary><![CDATA[${post.data.description || ''}]]></itunes:summary>`,
      };
    }),
    customData: `<language>en</language>
<itunes:author>Michael Boiman · BKS-Lab</itunes:author>
<itunes:owner><itunes:name>BKS-Lab</itunes:name><itunes:email>ai@bks-lab.com</itunes:email></itunes:owner>
<itunes:category text="Technology"/>
<itunes:explicit>false</itunes:explicit>
<itunes:type>episodic</itunes:type>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<generator>BKS-Lab voice-news on macminim4 (Chatterbox Multilingual)</generator>`,
  });
}
