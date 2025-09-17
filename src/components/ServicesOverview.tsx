import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Zap, Users, ArrowRight } from "lucide-react";
import { servicesContent } from "@/lib/config";

const serviceIcons = {
  "AI Strategy & Playbooks": Brain,
  "Change Radar Pilot": Zap,
  "AI Product Development": Users,
};

export function ServicesOverview() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            How I Can Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From strategy to implementation, I offer comprehensive AI consulting services tailored to your organisation&apos;s needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {servicesContent.services.map((service, index) => {
            const Icon = serviceIcons[service.title as keyof typeof serviceIcons] || Brain;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <p className="text-lg font-semibold text-navy dark:text-white">
                  {service.price}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/consulting">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}