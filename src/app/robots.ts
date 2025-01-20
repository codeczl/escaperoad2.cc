import type { MetadataRoute } from "next";

const BASE_URL = 'https://escaperoad2.cc';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/category/*", 
        "/article/*", 
        "/changelog",
        "/games/*",
        "/guides/*"
      ],
      disallow: [
        "/api/*", 
        "/admin/*",
        "/_next/*",
        "/private/*"
      ]
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
