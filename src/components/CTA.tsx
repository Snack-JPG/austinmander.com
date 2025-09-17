import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  variant?: "default" | "dark" | "light";
}

export function CTA({
  title = "Ready to transform your organisation with AI?",
  description = "Book a discovery call to explore how AI can save your leaders time and deliver predictable change.",
  primaryText = "Book Discovery Call",
  primaryHref = "/book",
  secondaryText = "Download SOW",
  secondaryHref = "/resources",
  variant = "default",
}: CTAProps) {
  const bgClass = 
    variant === "dark" 
      ? "bg-navy dark:bg-slate-800" 
      : variant === "light"
      ? "bg-slate-50 dark:bg-slate-900"
      : "bg-gradient-to-r from-navy to-slate-800";

  return (
    <section className={`${bgClass} py-16`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-200 dark:text-slate-300 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryText && primaryHref && (
              <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                <Link href={primaryHref}>
                  {primaryText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            {secondaryText && secondaryHref && (
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                <Link href={secondaryHref}>{secondaryText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}