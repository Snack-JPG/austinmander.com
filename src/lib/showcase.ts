import { ProjectFrontMatter } from "./mdx";

/**
 * Showcase management utilities for easy portfolio maintenance
 */

export type ShowcaseCategory = "AI-built" | "Tooling" | "Infra" | "Experiment";
export type ShowcaseStatus = "live" | "wip";

export interface ShowcaseProject {
  frontMatter: ProjectFrontMatter;
  content?: string;
}

/**
 * Filter projects by category
 */
export function filterByCategory(
  projects: ShowcaseProject[],
  category: ShowcaseCategory | "All"
): ShowcaseProject[] {
  if (category === "All") return projects;
  return projects.filter((project) =>
    project.frontMatter.tags.includes(category)
  );
}

/**
 * Filter projects by status
 */
export function filterByStatus(
  projects: ShowcaseProject[],
  status: ShowcaseStatus
): ShowcaseProject[] {
  return projects.filter((project) => project.frontMatter.status === status);
}

/**
 * Get featured projects for homepage
 */
export function getFeaturedProjects(projects: ShowcaseProject[]): ShowcaseProject[] {
  return projects
    .filter((project) => project.frontMatter.featured === true)
    .sort((a, b) => {
      // Prioritize live projects
      if (a.frontMatter.status === "live" && b.frontMatter.status === "wip") return -1;
      if (a.frontMatter.status === "wip" && b.frontMatter.status === "live") return 1;
      
      // Then sort by date
      const dateA = new Date(a.frontMatter.publishedAt || a.frontMatter.date || "");
      const dateB = new Date(b.frontMatter.publishedAt || b.frontMatter.date || "");
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get projects sorted by recency and status
 */
export function getSortedProjects(projects: ShowcaseProject[]): ShowcaseProject[] {
  return [...projects].sort((a, b) => {
    // Live projects first
    if (a.frontMatter.status === "live" && b.frontMatter.status === "wip") return -1;
    if (a.frontMatter.status === "wip" && b.frontMatter.status === "live") return 1;
    
    // Then by date (newest first)
    const dateA = new Date(a.frontMatter.publishedAt || a.frontMatter.date || "");
    const dateB = new Date(b.frontMatter.publishedAt || b.frontMatter.date || "");
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Search projects by text
 */
export function searchProjects(
  projects: ShowcaseProject[],
  query: string
): ShowcaseProject[] {
  if (!query.trim()) return projects;
  
  const searchTerm = query.toLowerCase();
  return projects.filter((project) => {
    const searchableText = [
      project.frontMatter.title,
      project.frontMatter.summary,
      project.frontMatter.aiRole,
      ...project.frontMatter.tags,
    ].join(" ").toLowerCase();
    
    return searchableText.includes(searchTerm);
  });
}

/**
 * Get project statistics for dashboard
 */
export function getProjectStats(projects: ShowcaseProject[]) {
  const total = projects.length;
  const live = projects.filter(p => p.frontMatter.status === "live").length;
  const wip = projects.filter(p => p.frontMatter.status === "wip").length;
  const featured = projects.filter(p => p.frontMatter.featured).length;
  
  const categories = projects.reduce((acc, project) => {
    project.frontMatter.tags.forEach(tag => {
      if (["AI-built", "Tooling", "Infra", "Experiment"].includes(tag)) {
        acc[tag as ShowcaseCategory] = (acc[tag as ShowcaseCategory] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<ShowcaseCategory, number>);
  
  const totalUsers = projects.reduce((sum, project) => {
    const users = project.frontMatter.metrics?.users;
    if (users && users !== "N/A") {
      const numericUsers = parseInt(users.replace(/[^0-9]/g, ""), 10);
      return sum + (isNaN(numericUsers) ? 0 : numericUsers);
    }
    return sum;
  }, 0);
  
  return {
    total,
    live,
    wip,
    featured,
    categories,
    totalUsers: totalUsers > 0 ? totalUsers : null,
  };
}

/**
 * Validate project frontmatter
 */
export function validateProject(frontMatter: Partial<ProjectFrontMatter>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!frontMatter.title?.trim()) {
    errors.push("Title is required");
  }
  
  if (!frontMatter.summary?.trim()) {
    errors.push("Summary is required");
  }
  
  if (!frontMatter.aiRole?.trim()) {
    errors.push("AI Role is required");
  }
  
  if (!frontMatter.status || !["live", "wip"].includes(frontMatter.status)) {
    errors.push("Status must be 'live' or 'wip'");
  }
  
  if (!Array.isArray(frontMatter.tags) || frontMatter.tags.length === 0) {
    errors.push("At least one tag is required");
  }
  
  const validCategories = ["AI-built", "Tooling", "Infra", "Experiment"];
  const hasValidCategory = frontMatter.tags?.some(tag => validCategories.includes(tag));
  if (!hasValidCategory) {
    errors.push(`Must include at least one category: ${validCategories.join(", ")}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a URL-safe slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Format metrics for display
 */
export function formatMetrics(metrics: ProjectFrontMatter["metrics"]) {
  if (!metrics) return null;
  
  return {
    users: metrics.users && metrics.users !== "N/A" 
      ? parseInt(metrics.users.replace(/[^0-9]/g, "")).toLocaleString()
      : null,
    stars: metrics.stars ? metrics.stars.toLocaleString() : null,
    revenue: metrics.revenue && metrics.revenue !== "N/A" ? metrics.revenue : null,
  };
}