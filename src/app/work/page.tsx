import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectGrid } from "@/features/project-grid";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Austin Mander",
  description:
    "A collection of projects built with AI systems, modern stack, and speed.",
};

export default function WorkPage() {
  const projects = getAllPosts("projects");

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="container px-4 py-12">
          <ProjectGrid
            projects={projects}
            title="All Projects"
            subtitle="Every experiment, tool, and ambitious build. Filtered by AI involvement, tech stack, and impact."
            showFilters={true}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
