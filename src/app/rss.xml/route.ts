import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const baseUrl = siteConfig.url;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} - Blog</title>
    <description>${siteConfig.description}</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${siteConfig.links.email} (${siteConfig.name})</managingEditor>
    <webMaster>${siteConfig.links.email} (${siteConfig.name})</webMaster>
    
    ${blogPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <author>${siteConfig.links.email} (${post.author.name})</author>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
