import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/features/hero";
import { ProjectGrid } from "@/features/project-grid";
import { AIWorkflow } from "@/features/ai-workflow";
import { ShipLogList } from "@/features/ship-log-list";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const projects = getAllPosts("projects");
  const logs = getAllPosts("logs");

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProjectGrid
          projects={projects}
          maxItems={6}
          title="Featured Work"
          subtitle="Projects built with AI systems, modern stack, and speed."
        />
        <AIWorkflow />
        <ShipLogList logs={logs} maxItems={5} />
      </main>
      <Footer />
    </>
  );
}
