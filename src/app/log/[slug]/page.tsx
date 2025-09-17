import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Prose } from "@/components/ui/prose";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import type { LogFrontMatter } from "@/lib/mdx";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface LogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("logs");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug("logs", slug);
    const log = post.frontMatter as LogFrontMatter;

    return {
      title: `${log.title} - Ship Log`,
      description: log.summary || "Austin Mander's development log",
      openGraph: {
        title: log.title,
        description: log.summary || "Austin Mander's development log",
        images: log.coverImage ? [log.coverImage] : [],
      },
    };
  } catch {
    return {
      title: "Log Entry Not Found - Austin Mander",
    };
  }
}

export default async function LogPage({ params }: LogPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug("logs", slug);
  } catch {
    notFound();
  }

  const log = post.frontMatter as LogFrontMatter;
  const formattedDate = new Date(log.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="container px-4 py-12">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button variant="ghost" asChild className="mb-8 -ml-4">
              <Link href="/log" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to ship log
              </Link>
            </Button>

            {/* Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                  {log.title}
                </h1>

                {log.summary && (
                  <p className="text-text-weak text-xl leading-relaxed">
                    {log.summary}
                  </p>
                )}
              </div>

              {/* Meta info */}
              <div className="text-text-muted border-border/30 flex flex-wrap items-center gap-6 border-t border-b py-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime.text}
                </div>

                {/* Links */}
                <div className="ml-auto flex items-center gap-2">
                  {log.links?.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={log.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {log.links?.demo && (
                    <Button
                      size="sm"
                      asChild
                      className="bg-accent-primary hover:bg-accent-primary/90 text-white"
                    >
                      <a
                        href={log.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Tags */}
              {log.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-foreground text-sm font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <Pill key={tag} variant="accent">
                        {tag}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {log.coverImage && (
              <div className="my-8">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={log.coverImage}
                    alt={log.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mt-12">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </Prose>
            </div>

            {/* Navigation */}
            <div className="border-border/30 mt-12 border-t pt-8">
              <div className="flex items-center justify-between">
                <Button variant="outline" asChild>
                  <Link href="/log">← All ship log entries</Link>
                </Button>

                {log.links?.twitterThread && (
                  <Button variant="outline" asChild>
                    <a
                      href={log.links.twitterThread}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discuss on Twitter →
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
