import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Prose } from "@/components/ui/prose";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import type { ProjectFrontMatter } from "@/lib/mdx";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug("projects", slug);
    const project = post.frontMatter as ProjectFrontMatter;

    return {
      title: `${project.title} - Austin Mander`,
      description: project.summary,
      openGraph: {
        title: project.title,
        description: project.summary,
        images: project.coverImage ? [project.coverImage] : [],
      },
    };
  } catch {
    return {
      title: "Project Not Found - Austin Mander",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug("projects", slug);
  } catch {
    notFound();
  }

  const project = post.frontMatter as ProjectFrontMatter;
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusColors = {
    live: "bg-green-500/10 text-green-500 border-green-500/20",
    wip: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  const statusLabels = {
    live: "Live",
    wip: "Work in Progress",
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <div className="container px-4 py-12">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button variant="ghost" asChild className="mb-8 -ml-4">
              <Link href="/work" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to work
              </Link>
            </Button>

            {/* Project header */}
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={statusColors[project.status]}
                    >
                      {statusLabels[project.status]}
                    </Badge>
                    {project.accent && (
                      <Pill variant="accent">{project.accent}</Pill>
                    )}
                  </div>

                  <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                    {project.title}
                  </h1>

                  <p className="text-text-weak text-xl leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  {project.links?.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.links?.demo && (
                    <Button
                      size="sm"
                      asChild
                      className="bg-accent-primary hover:bg-accent-primary/90 text-white"
                    >
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
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
                {project.metrics?.stars && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {project.metrics.stars} stars
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium">AI Role:</span>
                  {project.aiRole}
                </div>
              </div>

              {/* Tags and Tech */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-foreground text-sm font-medium">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Pill key={tech} variant="accent">
                        {tech}
                      </Pill>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-foreground text-sm font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Pill key={tag} variant="outline">
                        {tag}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="container mb-12 px-4">
            <div className="mx-auto max-w-6xl">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container px-4 pb-12">
          <div className="mx-auto max-w-4xl">
            <Prose>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Prose>

            {/* Metrics */}
            {project.metrics && (
              <div className="bg-accent-primary/5 border-accent-primary/20 mt-12 rounded-lg border p-6">
                <h3 className="text-foreground mb-4 text-lg font-semibold">
                  Impact
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {project.metrics.users && (
                    <div className="text-center">
                      <div className="text-accent-primary text-2xl font-bold">
                        {project.metrics.users}
                      </div>
                      <div className="text-text-muted text-sm">Users</div>
                    </div>
                  )}
                  {project.metrics.stars && (
                    <div className="text-center">
                      <div className="text-accent-primary text-2xl font-bold">
                        {project.metrics.stars}
                      </div>
                      <div className="text-text-muted text-sm">
                        GitHub Stars
                      </div>
                    </div>
                  )}
                  {project.metrics.revenue && (
                    <div className="text-center">
                      <div className="text-accent-primary text-2xl font-bold">
                        {project.metrics.revenue}
                      </div>
                      <div className="text-text-muted text-sm">Revenue</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
