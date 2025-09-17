import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/og"],
    },
    sitemap: "https://austinmander.com/sitemap.xml",
  };
}
