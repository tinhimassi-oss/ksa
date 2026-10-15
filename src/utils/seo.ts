/**
 * Updates document title and SEO meta tags dynamically for client-side routing
 */
export function updateSEO({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}): void {
  // Update Title
  const formattedTitle = title.includes('المدرسة السعودية')
    ? title
    : `${title} | إختبارات المدرسة السعودية`;
  
  document.title = formattedTitle;

  // Helper to set or create meta tags
  const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Description
  setMetaTag('meta[name="description"]', 'name', 'description', description);

  // Open Graph
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  if (url) {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  // Twitter Card
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', formattedTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
}
