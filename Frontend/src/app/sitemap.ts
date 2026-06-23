import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = [
    '', '/news', '/about', '/governor', '/ministries', '/projects',
    '/services', '/media', '/notices', '/events', '/feedback', '/contact',
    '/privacy', '/accessibility',
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/news' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
