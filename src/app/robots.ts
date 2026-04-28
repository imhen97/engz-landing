import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Yeti', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://www.eng-z.com/sitemap.xml',
  };
}
