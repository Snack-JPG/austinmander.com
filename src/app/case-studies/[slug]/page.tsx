import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Target,
  CheckCircle,
  Download,
  Share2
} from "lucide-react";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  
  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: study.title,
    description: study.challenge,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  
  if (!study) {
    notFound();
  }

  const otherStudies = caseStudies.filter(s => s.slug !== study.slug).slice(0, 2);

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/case-studies" 
                className="inline-flex items-center text-muted-foreground hover:text-teal mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Link>
              
              <Badge variant="secondary" className="mb-4">
                {study.industry}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">
                {study.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {study.client}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-2" />
                  {study.duration}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Target className="h-5 w-5 mr-2" />
                  {study.services.length} Services Delivered
                </div>
                <div className="flex items-center text-muted-foreground">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Published {new Date(study.publishedAt).toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
              </div>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {study.results.map((result, index) => (
                  <Card key={index} className="p-4 text-center">
                    <p className="text-3xl font-bold text-teal">{result.value}</p>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Background */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Background</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {study.fullContent.background}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <div className="text-muted-foreground whitespace-pre-line">
                  {study.fullContent.challenge}
                </div>
              </div>

              {/* Approach */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
                <div className="text-muted-foreground whitespace-pre-line">
                  {study.fullContent.approach}
                </div>
              </div>

              {/* Implementation */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Implementation</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {study.fullContent.implementation}
                </p>
              </div>

              {/* Results */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                <div className="text-muted-foreground whitespace-pre-line">
                  {study.fullContent.results}
                </div>
              </div>

              {/* Key Learnings */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Key Learnings</h2>
                <ul className="space-y-3">
                  {study.fullContent.keyLearnings.map((learning, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <Card className="p-8 bg-teal/5 border-teal/20 mb-12">
                <blockquote className="text-lg italic mb-4">
                  "{study.testimonial.quote}"
                </blockquote>
                <footer>
                  <strong>{study.testimonial.author}</strong>
                  <span className="text-muted-foreground"> — {study.testimonial.role}</span>
                </footer>
              </Card>

              {/* Services Used */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Services Delivered</h3>
                <div className="flex flex-wrap gap-3">
                  {study.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2 text-base">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                  <Link href="/book">
                    Discuss Your Transformation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/resources">
                    <Download className="mr-2 h-5 w-5" />
                    Download Case Study PDF
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Case Study
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">More Success Stories</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {otherStudies.map((otherStudy) => (
                  <Card key={otherStudy.id} className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {otherStudy.industry}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">
                      {otherStudy.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {otherStudy.challenge}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        {otherStudy.results.slice(0, 2).map((result, index) => (
                          <div key={index}>
                            <p className="text-lg font-bold text-teal">{result.value}</p>
                            <p className="text-xs text-muted-foreground">{result.description}</p>
                          </div>
                        ))}
                      </div>
                      <Button asChild variant="ghost">
                        <Link href={`/case-studies/${otherStudy.slug}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Create Your Success Story?"
          description="Learn how we can help transform your organisation with AI."
          primaryText="Book Consultation"
          primaryHref="/book"
          secondaryText="Explore Services"
          secondaryHref="/consulting"
        />
      </main>
      <Footer />
    </>
  );
}