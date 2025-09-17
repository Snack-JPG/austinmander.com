import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const baseUrl = "https://austinmander.com";
  const logs = getAllPosts("logs");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Austin Mander - Ship Log</title>
    <description>Building at unfair speed with AI. Recent builds, experiments, and updates.</description>
    <link>${baseUrl}/log</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@austinmander.com (Austin Mander)</managingEditor>
    <webMaster>hello@austinmander.com (Austin Mander)</webMaster>
    
    ${logs
      .map(
        (log) => `
    <item>
      <title><![CDATA[${log.frontMatter.title}]]></title>
      <description><![CDATA[${log.frontMatter.summary || "Austin Mander's development log"}]]></description>
      <link>${baseUrl}/log/${log.frontMatter.slug}</link>
      <guid isPermaLink="true">${baseUrl}/log/${log.frontMatter.slug}</guid>
      <pubDate>${new Date(log.frontMatter.date).toUTCString()}</pubDate>
      <category>Development</category>
      <author>hello@austinmander.com (Austin Mander)</author>
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
