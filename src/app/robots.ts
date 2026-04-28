import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      { userAgent: "*", allow: "/" },
      // Google
      { userAgent: "Googlebot", allow: "/" },
      // Naver
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "naverbot", allow: "/" },
    ],
    sitemap: "https://www.eng-z.com/sitemap.xml",
    host: "https://www.eng-z.com",
  };
}
