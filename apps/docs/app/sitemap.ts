import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hellokookie.com';

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/docs/getting-started`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/docs/theming`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/playground`, lastModified: new Date(), priority: 0.7 },
  ];
}
