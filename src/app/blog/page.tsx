"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  TrendingUp,
  Filter
} from "lucide-react";
import { blogPosts, getCategories, getTags } from "@/lib/blog-posts";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = getCategories();
  const tags = getTags();

  // Filter posts based on search, category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
                Insights on AI & Transformation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Practical insights, proven strategies, and real-world lessons from the frontlines 
                of AI transformation.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !searchTerm && !selectedCategory && !selectedTag && (
          <section className="py-12 bg-white dark:bg-slate-900 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-teal" />
                  <span className="text-sm font-semibold text-teal uppercase tracking-wider">
                    Featured Article
                  </span>
                </div>
                
                <Card className="p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-GB', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readingTime} min read
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-3">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-teal transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="cursor-pointer hover:bg-teal/10"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8 bg-slate-50 dark:bg-slate-800 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by:
                </h3>
                {(selectedCategory || selectedTag) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedCategory === category ? 'bg-teal' : 'hover:bg-teal/10'
                        }`}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category ? null : category
                        )}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Popular Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 8).map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedTag === tag ? 'bg-teal' : 'hover:bg-teal/10'
                        }`}
                        onClick={() => setSelectedTag(
                          selectedTag === tag ? null : tag
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    No articles found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(null);
                      setSelectedTag(null);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readingTime} min
                          </span>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-teal transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="cursor-pointer hover:bg-teal/10"
                              onClick={() => setSelectedTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button asChild variant="ghost">
                          <Link href={`/blog/${post.slug}`}>
                            Read more
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-4">
                Get Weekly AI Insights
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join 5,000+ executives receiving practical AI transformation insights every Tuesday.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1"
                />
                <Button className="bg-teal hover:bg-teal/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam. Unsubscribe anytime. Read our <Link href="/privacy" className="underline">privacy policy</Link>.
              </p>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Apply These Insights?"
          description="Turn knowledge into action. Book a consultation to explore how these strategies can transform your organisation."
          primaryText="Book Consultation"
          primaryHref="/book"
          secondaryText="Download Resources"
          secondaryHref="/resources"
        />
      </main>
      <Footer />
    </>
  );
}