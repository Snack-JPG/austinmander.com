import { blogPosts } from './blog-posts';
import { caseStudies } from './case-studies';

export interface ContentItem {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  type: 'blog' | 'case-study';
}

export function getAllContent(): ContentItem[] {
  const posts: ContentItem[] = blogPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    publishedAt: post.publishedAt,
    excerpt: post.excerpt,
    type: 'blog' as const
  }));

  const studies: ContentItem[] = caseStudies.map(study => ({
    slug: study.slug,
    title: study.title,
    publishedAt: study.publishedAt,
    excerpt: study.challenge, // Use challenge as excerpt for case studies
    type: 'case-study' as const
  }));

  return [...posts, ...studies].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLatestContent(limit: number = 10): ContentItem[] {
  return getAllContent().slice(0, limit);
}

export { blogPosts, caseStudies };