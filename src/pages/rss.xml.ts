// RSS mit Volltext (content:encoded), Sprache de. Logik: src/lib/feeds.ts
import { rssFeed } from '../lib/feeds';

export const GET = () => rssFeed('de');
