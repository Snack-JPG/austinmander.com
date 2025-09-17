"use client";

import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Austin's AI strategy transformed how we approach project management. We've saved 8 hours per week and reduced project delays by 45%.",
    author: "Sarah Johnson",
    role: "VP of Operations",
    company: "TechCorp UK",
    rating: 5,
  },
  {
    quote: "Change Radar gave us predictive insights we never had before. It's like having a crystal ball for our transformation programs.",
    author: "Michael Chen",
    role: "Program Director",
    company: "Global Finance Ltd",
    rating: 5,
  },
  {
    quote: "Working with Austin was eye-opening. His pragmatic approach to AI implementation delivered ROI within 3 months.",
    author: "Emma Williams",
    role: "CTO",
    company: "Innovation Partners",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            Client Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real organisations transforming with AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-teal/20" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}