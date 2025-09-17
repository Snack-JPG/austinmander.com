"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Mail, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  product: [
    { name: "Work", href: "/work" },
    { name: "Ship Log", href: "/log" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/austinmander", icon: Github },
    {
      name: "Twitter",
      href: "https://twitter.com/austinmander",
      icon: Twitter,
    },
    { name: "Email", href: "mailto:hello@austinmander.com", icon: Mail },
    { name: "RSS", href: "/rss.xml", icon: Rss },
  ],
};

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        const errorData = await response.json();
        console.error("Newsletter subscription error:", errorData.error);
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-surface border-border/50 border-t">
      <div className="container px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-foreground text-lg font-bold">
                Austin Mander
              </h3>
              <p className="text-text-weak text-sm leading-relaxed">
                Building ambitious software with AI systems. Shipping fast,
                scaling smart.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {footerLinks.social.map((link) => (
                  <Button key={link.name} variant="ghost" size="sm" asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-primary p-2"
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-foreground font-medium">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-weak hover:text-accent-primary text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4 lg:col-span-2">
              <h4 className="text-foreground font-medium">Stay Updated</h4>
              <p className="text-text-weak text-sm">
                Get notified when I ship new projects and experiments.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent-primary hover:bg-accent-primary/90 text-white"
                  >
                    {isSubmitting ? "..." : "Subscribe"}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-green-500/20 bg-green-500/10 p-3"
                >
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✓ You&apos;re subscribed! Check your email for confirmation.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-border/30 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} Austin Mander. Built with Next.js,
              crafted with Claude.
            </p>

            <div className="text-text-muted flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="hover:text-accent-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-accent-primary transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
