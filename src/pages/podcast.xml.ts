// Podcast-Feed (Apple/Spotify-tauglich), MP3 per Dateikonvention, Sprache de. Logik: src/lib/feeds.ts
import { podcastFeed } from '../lib/feeds';

export const GET = () => podcastFeed('de');
