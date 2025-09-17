"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import type { LogFrontMatter } from "@/lib/mdx";

interface ShipLogItemProps {
  log: { frontMatter: LogFrontMatter; content?: string };
  index: number;
}

export function ShipLogItem({ log, index }: ShipLogItemProps) {
  const formattedDate = new Date(log.frontMatter.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      <Card className="group border-border/50 bg-card/30 hover:border-accent-primary/30 hover:bg-card/50 backdrop-blur-sm transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            {log.frontMatter.coverImage && (
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={log.frontMatter.coverImage}
                  alt={log.frontMatter.title}
                  width={64}
                  height={64}
                  sizes="64px"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-foreground group-hover:text-accent-primary line-clamp-1 font-semibold transition-colors">
                    {log.frontMatter.title}
                  </h3>
                  {log.frontMatter.summary && (
                    <p className="text-text-weak line-clamp-2 text-sm">
                      {log.frontMatter.summary}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {log.frontMatter.links?.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={log.frontMatter.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {log.frontMatter.links?.demo && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={log.frontMatter.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-text-muted flex items-center gap-1.5 text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    {formattedDate}
                  </div>

                  {/* Tags */}
                  {log.frontMatter.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      {log.frontMatter.tags.slice(0, 2).map((tag) => (
                        <Pill key={tag} variant="accent" className="text-xs">
                          {tag}
                        </Pill>
                      ))}
                      {log.frontMatter.tags.length > 2 && (
                        <Pill variant="outline" className="text-xs">
                          +{log.frontMatter.tags.length - 2}
                        </Pill>
                      )}
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`/log/${log.frontMatter.slug}`}
                    className="text-xs"
                  >
                    Read more →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
