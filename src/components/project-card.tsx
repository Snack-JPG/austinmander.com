"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import type { ProjectFrontMatter } from "@/lib/mdx";

interface ProjectCardProps {
  project: { frontMatter: ProjectFrontMatter; content?: string };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const statusColors = {
    live: "bg-green-500/10 text-green-500 border-green-500/20",
    wip: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  const statusLabels = {
    live: "Live",
    wip: "WIP",
  };

  const isPriority = index === 0 || project.frontMatter.status === 'live';

  return (
    <div className="group">
      <Card className={`border h-full p-6 transition-all duration-300 hover-lift ${
        isPriority ? 'glass-card gradient-border' : 'hover:shadow-lg'
      }`}>
        {/* Enhanced header with status and metrics preview */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className={`${statusColors[project.frontMatter.status]} ${
                project.frontMatter.status === 'live' ? 'pulse-glow' : ''
              }`}
            >
              {statusLabels[project.frontMatter.status]}
            </Badge>
            {project.frontMatter.metrics?.users && (
              <div className="text-xs text-text-muted">
                {project.frontMatter.metrics.users} users
              </div>
            )}
          </div>

          {/* Quick action icons */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.frontMatter.links?.github && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a
                  href={project.frontMatter.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3" />
                </a>
              </Button>
            )}
            {project.frontMatter.links?.demo && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a
                  href={project.frontMatter.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Title and Summary with better hierarchy */}
          <div className="space-y-3">
            <h3 className={`group-hover:text-accent-primary font-semibold transition-colors ${
              isPriority ? 'text-xl gradient-text' : 'text-lg text-foreground'
            }`}>
              {project.frontMatter.title}
            </h3>
            <p className="text-text-weak line-clamp-2 text-sm leading-relaxed">
              {project.frontMatter.summary}
            </p>
          </div>

          {/* Enhanced Tags with better visual separation */}
          <div className="flex flex-wrap gap-2">
            {project.frontMatter.tags.slice(0, 3).map((tag, tagIndex) => (
              <Pill 
                key={tag} 
                variant={tagIndex === 0 ? "accent" : "outline"} 
                className="text-xs hover-lift"
              >
                {tag}
              </Pill>
            ))}
            {project.frontMatter.tags.length > 3 && (
              <Pill variant="outline" className="text-xs opacity-60">
                +{project.frontMatter.tags.length - 3}
              </Pill>
            )}
          </div>

          {/* AI Role with enhanced styling */}
          <div className="glass-card p-3 rounded-md border border-accent-primary/10">
            <p className="text-text-muted text-xs">
              <span className="font-medium text-accent-primary">AI Role:</span>{" "}
              <span className="text-foreground">{project.frontMatter.aiRole}</span>
            </p>
          </div>

          {/* Enhanced Metrics */}
          {project.frontMatter.metrics && (
            <div className="flex items-center gap-4 text-xs border-t border-border/30 pt-3">
              {project.frontMatter.metrics.stars && (
                <div className="flex items-center gap-1 text-text-muted">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{project.frontMatter.metrics.stars}</span>
                </div>
              )}
              {project.frontMatter.metrics.revenue && (
                <span className="text-accent-primary font-medium">
                  {project.frontMatter.metrics.revenue} revenue
                </span>
              )}
            </div>
          )}

          {/* Enhanced Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/20">
            <Button 
              variant={isPriority ? "default" : "ghost"} 
              size="sm" 
              className={`${isPriority ? 'bg-accent-primary text-white' : ''} hover-lift`}
              asChild
            >
              <Link href={`/work/${project.frontMatter.slug}`}>
                {isPriority ? 'Featured Case Study' : 'Read case study'} →
              </Link>
            </Button>

            {/* Status indicator */}
            <div className="text-xs text-text-muted">
              {project.frontMatter.status === 'live' ? '🚀 Live' : '🚧 In Progress'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
