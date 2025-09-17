// Placeholder image URLs using Unsplash for demo purposes
export const placeholderImages = {
  projects: {
    "change-radar":
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&crop=top",
    "smokerunner-ai":
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center",
    "zero-friction-vpn":
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&crop=center",
    "minecraft-smartmods":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center",
  },
  logs: {
    "ai-code-review-loop":
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&h=300&fit=crop&crop=center",
    "cursor-vs-claude-code":
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=300&fit=crop&crop=center",
    "supabase-edge-functions-tips":
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop&crop=center",
    "building-this-portfolio":
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=center",
  },
};

export function getPlaceholderImage(
  type: "projects" | "logs",
  slug: string
): string {
  return (
    placeholderImages[type][
      slug as keyof (typeof placeholderImages)[typeof type]
    ] ||
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop&crop=center"
  );
}
