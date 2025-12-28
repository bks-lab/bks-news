export const languages = {
  de: 'Deutsch',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'de';

export const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.tags': 'Themen',
    'nav.allTags': 'Alle Themen',

    // Article
    'article.readingTime': 'Min. Lesezeit',
    'article.aiDisclosure': 'Dieser Artikel wurde mit KI recherchiert und erstellt',
    'article.sources': 'Quellen',
    'article.relatedArticles': 'Verwandte Artikel',
    'article.prevArticle': 'Vorher',
    'article.nextArticle': 'Neuer',

    // Types
    'type.weekly': 'Weekly Briefing',
    'type.breaking': 'Breaking News',
    'type.research': 'Research',
    'type.digest': 'Digest',

    // Index
    'index.title': 'BKS News',
    'index.subtitle': 'AI-generierte Briefings zu Technologie, KI und digitaler Transformation',
    'index.latestBriefings': 'Aktuelle Briefings',
    'index.topTags': 'Top Themen',
    'index.noBriefings': 'Noch keine Briefings verfügbar.',

    // Tags
    'tags.title': 'Alle Themen',
    'tags.description': 'Entdecke Briefings nach Themengebiet',
    'tags.articlesWithTag': 'Artikel mit Tag',
    'tags.backToTags': 'Alle Themen',

    // Footer
    'footer.brand': 'BKS News',
    'footer.tagline': 'AI-generierte Briefings von BKS-Lab',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.rss': 'RSS Feed',
    'footer.note': 'Alle Inhalte werden von KI recherchiert und geschrieben - als Demonstration von AI-Recherche-Capabilities.',

    // Table of Contents
    'toc.title': 'Inhalt',

    // Dates
    'date.locale': 'de-DE',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tags': 'Topics',
    'nav.allTags': 'All Topics',

    // Article
    'article.readingTime': 'min read',
    'article.aiDisclosure': 'This article was researched and written with AI',
    'article.sources': 'Sources',
    'article.relatedArticles': 'Related Articles',
    'article.prevArticle': 'Previous',
    'article.nextArticle': 'Newer',

    // Types
    'type.weekly': 'Weekly Briefing',
    'type.breaking': 'Breaking News',
    'type.research': 'Research',
    'type.digest': 'Digest',

    // Index
    'index.title': 'BKS News',
    'index.subtitle': 'AI-generated briefings on technology, AI, and digital transformation',
    'index.latestBriefings': 'Latest Briefings',
    'index.topTags': 'Top Topics',
    'index.noBriefings': 'No briefings available yet.',

    // Tags
    'tags.title': 'All Topics',
    'tags.description': 'Discover briefings by topic',
    'tags.articlesWithTag': 'Articles tagged with',
    'tags.backToTags': 'All Topics',

    // Footer
    'footer.brand': 'BKS News',
    'footer.tagline': 'AI-generated briefings by BKS-Lab',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy Policy',
    'footer.rss': 'RSS Feed',
    'footer.note': 'All content is researched and written by AI - demonstrating AI research capabilities.',

    // Table of Contents
    'toc.title': 'Contents',

    // Dates
    'date.locale': 'en-US',
  },
} as const;

export function t(key: keyof typeof translations.de, lang: Language = defaultLang): string {
  return translations[lang][key] || translations.de[key] || key;
}

export function getLanguageFromUrl(url: URL): Language {
  const pathname = url.pathname;
  if (pathname.startsWith('/bks-news/en/') || pathname === '/bks-news/en') {
    return 'en';
  }
  return 'de';
}

// Page name mappings for different languages
const pageNameMappings: Record<string, Record<Language, string>> = {
  'datenschutz': { de: 'datenschutz', en: 'privacy' },
  'privacy': { de: 'datenschutz', en: 'privacy' },
  'impressum': { de: 'impressum', en: 'imprint' },
  'imprint': { de: 'impressum', en: 'imprint' },
};

export function getLocalizedPath(path: string, lang: Language): string {
  // Normalize path - ensure trailing slash and handle edge cases
  let normalizedPath = path;

  // Handle root paths
  if (normalizedPath === '/bks-news' || normalizedPath === '/bks-news/') {
    return lang === 'en' ? '/bks-news/en/' : '/bks-news/';
  }

  // Handle /bks-news/en or /bks-news/en/
  if (normalizedPath === '/bks-news/en' || normalizedPath === '/bks-news/en/') {
    return lang === 'en' ? '/bks-news/en/' : '/bks-news/';
  }

  // Remove existing language prefix
  let cleanPath = normalizedPath.replace(/^\/bks-news\/en\//, '/bks-news/');

  // Check for page name mappings (e.g., datenschutz <-> privacy)
  for (const [key, mapping] of Object.entries(pageNameMappings)) {
    const dePattern = new RegExp(`/bks-news/${mapping.de}/?$`);
    const enPattern = new RegExp(`/bks-news/${mapping.en}/?$`);

    if (dePattern.test(cleanPath) || enPattern.test(cleanPath)) {
      const targetName = mapping[lang];
      if (lang === 'en') {
        return `/bks-news/en/${targetName}/`;
      }
      return `/bks-news/${targetName}/`;
    }
  }

  // Ensure trailing slash
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : cleanPath + '/';

  if (lang === 'en') {
    return pathWithSlash.replace('/bks-news/', '/bks-news/en/');
  }
  return pathWithSlash;
}

export function getAlternateLanguagePath(currentPath: string, currentLang: Language): string {
  const targetLang = currentLang === 'de' ? 'en' : 'de';
  return getLocalizedPath(currentPath, targetLang);
}
