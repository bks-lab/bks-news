// Podcast-Feed EN unter dem kurzen Namen für Verzeichnisse. Gleicher Inhalt wie /en/podcast.xml,
// das als bisherige Adresse bestehen bleibt. Logik: src/lib/feeds.ts
import { podcastFeed } from '../lib/feeds';

export const GET = () => podcastFeed('en');
