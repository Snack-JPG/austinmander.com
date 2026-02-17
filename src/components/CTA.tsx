import { FooterCTA } from "@/components/smart-cta";

interface CTAProps {
  title?: string;
  description?: string;
  variant?: "default" | "dark" | "light";
  page?: string;
}

export function CTA({
  title = "Stop Guessing About Risk. Start Steering Your Transformation.",
  description = "Get £10k QuickWin proof in 2 weeks. Surface hidden risks 3-8 weeks earlier and recover leadership hours with Change Radar.",
  variant = "default",
  page = "home",
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
          <FooterCTA page={page} className="flex flex-col sm:flex-row gap-4 justify-center" />
        </div>
      </div>
    </section>
  );
}