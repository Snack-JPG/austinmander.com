import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://austinmander.com";

  // Get all projects and logs
  const projects = getAllPosts("projects");
  const logs = getAllPosts("logs");

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/log`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/work/${project.frontMatter.slug}`,
    lastModified: new Date(project.frontMatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Log pages
  const logPages = logs.map((log) => ({
    url: `${baseUrl}/log/${log.frontMatter.slug}`,
    lastModified: new Date(log.frontMatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...logPages];
}
