import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTime } from "reading-time-estimator";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ProjectFrontMatter {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  status: "live" | "wip";
  tags: string[];
  aiRole: string;
  featured?: boolean;
  accent?: "emerald" | "navy" | "pink";
  metrics?: {
    users?: string;
    stars?: number;
    revenue?: string;
  };
  links?: {
    github?: string;
    demo?: string;
    twitterThread?: string;
  };
  // Legacy fields for backward compatibility
  date?: string;
  coverImage?: string;
  tech?: string[];
}

export interface LogFrontMatter {
  title: string;
  slug: string;
  date: string;
  summary?: string;
  coverImage?: string;
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
    twitterThread?: string;
  };
}

export interface MDXPost {
  frontMatter: ProjectFrontMatter | LogFrontMatter;
  content: string;
  readingTime: { text: string; minutes: number; words: number };
}

export interface ProjectPost extends Omit<MDXPost, "frontMatter"> {
  frontMatter: ProjectFrontMatter;
}

export interface LogPost extends Omit<MDXPost, "frontMatter"> {
  frontMatter: LogFrontMatter;
}

export function getPostBySlug(
  type: "projects" | "logs",
  slug: string
): MDXPost {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontMatter: data as ProjectFrontMatter | LogFrontMatter,
    content,
    readingTime: readingTime(content, 200),
  };
}

export function getAllPosts(type: "projects"): ProjectPost[];
export function getAllPosts(type: "logs"): LogPost[];
export function getAllPosts(
  type: "projects" | "logs"
): (ProjectPost | LogPost)[] {
  const postsDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      return getPostBySlug(type, slug);
    })
    .sort((a, b) => {
      if (new Date(a.frontMatter.date) < new Date(b.frontMatter.date)) {
        return 1;
      } else {
        return -1;
      }
    });

  return allPostsData;
}

export function getPostSlugs(type: "projects" | "logs"): string[] {
  const postsDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
