"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShipLogItem } from "@/components/ship-log-item";
import type { LogFrontMatter } from "@/lib/mdx";

interface ShipLogListProps {
  logs: { frontMatter: LogFrontMatter; content?: string }[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showFilters?: boolean;
}

const filterTags = ["All", "AI", "Tooling", "Demo", "Experiment", "Update"];

export function ShipLogList({
  logs,
  title = "Ship Log",
  subtitle = "Recent builds, experiments, and updates from the lab.",
  maxItems = 5,
  showFilters = false,
}: ShipLogListProps) {
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  const filteredLogs = React.useMemo(() => {
    let filtered = logs;

    if (selectedFilter !== "All") {
      filtered = logs.filter((log) =>
        log.frontMatter.tags.includes(selectedFilter)
      );
    }

    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [logs, selectedFilter, maxItems]);

  return (
    <section className="bg-surface/50 py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title={title}
              subtitle={subtitle}
              badge="Latest Updates"
            />
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="flex flex-wrap items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {filterTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedFilter === tag ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedFilter === tag
                      ? "bg-accent-primary border-accent-primary text-white"
                      : "hover:border-accent-primary/50"
                  }`}
                  onClick={() => setSelectedFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}

          {/* Ship Log Items */}
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <ShipLogItem key={log.frontMatter.slug} log={log} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredLogs.length === 0 && (
            <motion.div
              className="py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-text-muted">
                No ship log entries found for &ldquo;{selectedFilter}&rdquo;.
                Try a different filter.
              </p>
            </motion.div>
          )}

          {/* Show more link */}
          {maxItems && logs.length > maxItems && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" asChild>
                <Link href="/log">View all ship log entries →</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
