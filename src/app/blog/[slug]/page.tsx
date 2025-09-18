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
  Calendar,
  User,
  Share2,
  Bookmark,
  Linkedin,
  Twitter,
  Link as LinkIcon
} from "lucide-react";
import { getBlogPost, blogPosts } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatContent(content: string) {
  // Simple markdown-like formatting
  const lines = content.trim().split('\n');
  const formatted = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Headers
    if (line.startsWith('# ')) {
      formatted.push(
        <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      formatted.push(
        <h2 key={i} className="text-2xl font-bold mt-6 mb-3">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      formatted.push(
        <h3 key={i} className="text-xl font-semibold mt-4 mb-2">
          {line.substring(4)}
        </h3>
      );
    }
    // Bold text (simple)
    else if (line.includes('**')) {
      const parts = line.split('**');
      const elements = [];
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 1) {
          elements.push(<strong key={`${i}-${j}`}>{parts[j]}</strong>);
        } else {
          elements.push(parts[j]);
        }
      }
      formatted.push(<p key={i} className="mb-4 text-muted-foreground">{elements}</p>);
    }
    // Lists
    else if (line.startsWith('- ')) {
      const listItems = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith('- ')) {
        listItems.push(
          <li key={j} className="ml-6 mb-2">
            {lines[j].substring(2)}
          </li>
        );
        j++;
      }
      formatted.push(
        <ul key={i} className="list-disc mb-4 text-muted-foreground">
          {listItems}
        </ul>
      );
      i = j - 1;
    }
    else if (line.match(/^\d+\. /)) {
      const listItems = [];
      let j = i;
      while (j < lines.length && lines[j].match(/^\d+\. /)) {
        listItems.push(
          <li key={j} className="ml-6 mb-2">
            {lines[j].replace(/^\d+\. /, '')}
          </li>
        );
        j++;
      }
      formatted.push(
        <ol key={i} className="list-decimal mb-4 text-muted-foreground">
          {listItems}
        </ol>
      );
      i = j - 1;
    }
    // Checkboxes
    else if (line.includes('☐') || line.includes('✓')) {
      formatted.push(
        <p key={i} className="mb-2 text-muted-foreground">
          {line}
        </p>
      );
    }
    // Regular paragraphs
    else if (line.trim()) {
      formatted.push(
        <p key={i} className="mb-4 text-muted-foreground">
          {line}
        </p>
      );
    }
  }
  
  return formatted;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Article Header */}
        <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-muted-foreground hover:text-teal mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pb-6 border-b">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{post.author.name}</strong>
                      <span className="text-muted-foreground"> • {post.author.role}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min read
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {formatContent(post.content)}
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-4">Tagged with:</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="font-semibold mb-4">Share this article:</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              {/* Author Bio */}
              <Card className="mt-8 p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-teal/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-teal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{post.author.role}</p>
                    <p className="text-sm text-muted-foreground">
                      Austin helps organisations use AI to save leaders time, reduce risk, and deliver 
                      predictable change. Founder of Change Radar — predictive intelligence for transformation.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Button asChild size="sm">
                        <Link href="/book">Book Consultation</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-slate-50 dark:bg-slate-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-teal transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {relatedPost.readingTime} min read
                        </span>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/blog/${relatedPost.slug}`}>
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
        )}

        {/* Newsletter CTA */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8 bg-teal/5 border-teal/20">
                <h2 className="text-2xl font-bold mb-4">
                  Get More Insights Like This
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join 5,000+ executives receiving weekly AI transformation insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <Button className="bg-teal hover:bg-teal/90">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Apply These Insights?"
          description="Turn knowledge into action with expert guidance."
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