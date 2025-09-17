"use client";

import * as React from "react";
import Link from "next/link";
import { Filter, Grid, List, Search, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { 
  filterByCategory, 
  searchProjects, 
  getSortedProjects,
  type ShowcaseProject,
  type ShowcaseCategory 
} from "@/lib/showcase";
import type { ProjectFrontMatter } from "@/lib/mdx";

interface ProjectGridProps {
  projects: ShowcaseProject[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  maxItems?: number;
}

const filterCategories = [
  { label: "All", value: "All" as const },
  { label: "AI-built", value: "AI-built" as ShowcaseCategory },
  { label: "Tooling", value: "Tooling" as ShowcaseCategory },
  { label: "Infrastructure", value: "Infra" as ShowcaseCategory },
  { label: "Experiments", value: "Experiment" as ShowcaseCategory },
];

export function ProjectGrid({
  projects,
  title = "Featured Work",
  subtitle = "Projects built with AI systems, modern stack, and speed.",
  showFilters = true,
  maxItems,
}: ProjectGridProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<ShowcaseCategory | "All">("All");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = React.useMemo(() => {
    // Start with sorted projects (live first, then by date)
    let filtered = getSortedProjects(projects);

    // Apply category filter using utility
    filtered = filterByCategory(filtered, selectedFilter);

    // Apply search filter using utility
    filtered = searchProjects(filtered, searchQuery);

    // Apply max items limit (but not when searching)
    if (maxItems && !searchQuery.trim()) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [projects, selectedFilter, searchQuery, maxItems]);

  return (
    <section id="work" className="py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Header */}
          <div>
            <SectionHeader title={title} subtitle={subtitle} />
          </div>

          {/* Search and Filters */}
          {showFilters && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 glass-card"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                {/* Enhanced Filter Categories */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <Filter className="h-4 w-4" />
                    <span>Filter by:</span>
                  </div>
                  {filterCategories.map((category) => (
                    <Badge
                      key={category.value}
                      variant={selectedFilter === category.value ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover-lift ${
                        selectedFilter === category.value
                          ? "bg-accent-primary border-accent-primary text-white"
                          : "hover:border-accent-primary/50 hover:bg-accent-primary/5"
                      }`}
                      onClick={() => setSelectedFilter(category.value)}
                    >
                      {category.label}
                    </Badge>
                  ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center rounded-lg border p-1 glass-card">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0 hover-lift"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0 hover-lift"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results count */}
              {(searchQuery || selectedFilter !== "All") && (
                <div className="text-center">
                  <p className="text-text-muted text-sm">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedFilter !== "All" && ` in ${filterCategories.find(c => c.value === selectedFilter)?.label}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Projects Grid - Simple and Clean */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.frontMatter.slug}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No projects found for &ldquo;{selectedFilter}&rdquo;. Try a
                different filter.
              </p>
            </div>
          )}

          {/* Show more link */}
          {maxItems && projects.length > maxItems && (
            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/work">View all projects →</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}