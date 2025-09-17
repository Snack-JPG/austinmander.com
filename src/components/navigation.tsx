"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Log", href: "/log" },
  { name: "About", href: "/about", highlight: true },
  { name: "Contact", href: "/contact", highlight: true },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-card border-b backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground hover:text-accent-primary text-lg font-bold transition-colors hover-lift"
          >
            Austin Mander
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.highlight ? (
                  <Button
                    variant={pathname === item.href ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "hover-lift",
                      pathname === item.href
                        ? "bg-accent-primary text-white"
                        : "border-accent-primary/20 text-accent-primary hover:bg-accent-primary/10"
                    )}
                    asChild
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover-lift",
                      pathname === item.href
                        ? "text-accent-primary"
                        : "text-text-weak hover:text-foreground"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <div className="bg-accent-primary absolute right-0 -bottom-6 left-0 h-0.5 rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* CTA Badge */}
            <Badge variant="outline" className="hidden sm:flex text-xs border-accent-primary/20 text-accent-primary">
              Available for hire
            </Badge>
            
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover-lift"
              onClick={() => {
                // TODO: Implement mobile menu
                console.log("Mobile menu clicked");
              }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
