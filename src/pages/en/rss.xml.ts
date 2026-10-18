// RSS mit Volltext (content:encoded), Sprache en. Logik: src/lib/feeds.ts
import { rssFeed } from '../../lib/feeds';

export const GET = () => rssFeed('en');
