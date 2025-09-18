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
  Clock,
  Target,
  Brain,
  Copy,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  TrendingUp,
  BookOpen,
  Download
} from "lucide-react";
import { getPromptBySlug, aiPrompts } from "@/lib/ai-prompts";

export async function generateStaticParams() {
  return aiPrompts.map((prompt) => ({
    slug: prompt.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const prompt = getPromptBySlug(params.slug);
  
  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: `${prompt.title} - AI Prompt`,
    description: prompt.description,
  };
}

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  const prompt = getPromptBySlug(params.slug);
  
  if (!prompt) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/ai-toolkit" 
                className="inline-flex items-center text-muted-foreground hover:text-purple-600 mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to AI Toolkit
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="px-3 py-1">
                  {prompt.category}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {prompt.difficulty}
                </Badge>
                {!prompt.isFree && (
                  <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
                    Pro Prompt
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">
                {prompt.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {prompt.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Time to Value:</span>
                  <span className="text-muted-foreground">{prompt.timeToValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Difficulty:</span>
                  <span className="text-muted-foreground">{prompt.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Best With:</span>
                  <span className="text-muted-foreground">{prompt.tools.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* The Problem */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold">The Problem</h2>
                </div>
                <p className="text-muted-foreground">
                  {prompt.problem}
                </p>
              </Card>

              {/* Business Value */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Business Value</h2>
                </div>
                <ul className="space-y-2">
                  {prompt.businessValue.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* The Prompts */}
              {prompt.isFree ? (
                <>
                  {/* System Prompt */}
                  <Card className="p-8 bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold">System Prompt</h2>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(prompt.systemPrompt)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
                      {prompt.systemPrompt}
                    </div>
                  </Card>

                  {/* User Prompt Template */}
                  <Card className="p-8 bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold">User Prompt Template</h2>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(prompt.userPromptTemplate)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
                      {prompt.userPromptTemplate}
                    </div>
                  </Card>

                  {/* Example */}
                  {prompt.exampleInput && (
                    <Card className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold">Example</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Example Input:</h3>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-sm">
                            {prompt.exampleInput}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Expected Output:</h3>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-sm">
                            {prompt.expectedOutput}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                      <Download className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                      This is a Pro Prompt
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Get access to this prompt plus 40+ others in the complete AI Playbook. 
                      Includes implementation guides, ROI calculators, and weekly updates.
                    </p>
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                      <Download className="mr-2 h-5 w-5" />
                      Download Full Playbook (Free)
                    </Button>
                  </div>
                </Card>
              )}

              {/* Implementation Tips */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Implementation Tips</h2>
                </div>
                <ul className="space-y-2">
                  {prompt.implementationTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Common Mistakes */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>
                </div>
                <ul className="space-y-2">
                  {prompt.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Tags & Tools */}
              <Card className="p-8">
                <div className="mb-4">
                  <h3 className="font-semibold mb-3">Best AI Tools for This Prompt:</h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Related Topics:</h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Prompts */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Related Prompts</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {aiPrompts
                  .filter(p => p.category === prompt.category && p.id !== prompt.id)
                  .slice(0, 2)
                  .map((relatedPrompt) => (
                    <Card key={relatedPrompt.id} className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {relatedPrompt.category}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">
                        {relatedPrompt.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {relatedPrompt.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {relatedPrompt.timeToValue}
                        </span>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/ai-toolkit/prompts/${relatedPrompt.id}`}>
                            View Prompt →
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
          title="Ready to Deploy These Prompts at Scale?"
          description="I help organizations implement AI prompts company-wide with training, customization, and ROI tracking."
          primaryText="Book Implementation Call"
          primaryHref="/book"
          secondaryText="Download Full Playbook"
          secondaryHref="/ai-toolkit"
        />
      </main>
      <Footer />
    </>
  );
}