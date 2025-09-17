import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ShipLogList } from "@/features/ship-log-list";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ship Log - Austin Mander",
  description: "Recent builds, experiments, and updates from the lab.",
};

export default function LogPage() {
  const logs = getAllPosts("logs");

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="container px-4 py-12">
          <ShipLogList
            logs={logs}
            title="Ship Log"
            subtitle="A real-time feed of experiments, builds, and discoveries. The messy, iterative process behind the polished projects."
            showFilters={true}
            maxItems={undefined}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
