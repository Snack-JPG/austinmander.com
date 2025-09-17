"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Twitter, Mail, MessageCircle } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@austinmander.com",
    href: "mailto:hello@austinmander.com",
    description: "Best for detailed project discussions",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@austinmander",
    href: "https://twitter.com/austinmander",
    description: "Quick questions and public conversations",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "austinmander",
    href: "https://github.com/austinmander",
    description: "Code collaboration and open source",
  },
];

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error("Form submission error:", errorData.error);
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Contact Form */}
      <Card className="border-border/50 bg-card/30">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="text-accent-primary h-5 w-5" />
              <h2 className="text-foreground text-xl font-semibold">
                Send a message
              </h2>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project, challenge, or idea..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-accent-primary hover:bg-accent-primary/90 w-full text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground text-lg font-semibold">
                  Message sent!
                </h3>
                <p className="text-text-weak">
                  Thanks for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <div className="space-y-8">
        <h2 className="text-foreground text-xl font-semibold">
          Other ways to connect
        </h2>

        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/30 hover:border-accent-primary/30 transition-colors"
            >
              <CardContent className="p-6">
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                >
                  <div className="bg-accent-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                    <method.icon className="text-accent-primary h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground group-hover:text-accent-primary font-medium transition-colors">
                        {method.label}
                      </span>
                      <span className="text-text-weak text-sm">
                        {method.value}
                      </span>
                    </div>
                    <p className="text-text-weak text-sm">
                      {method.description}
                    </p>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Response Time */}
        <Card className="border-accent-primary/20 bg-accent-primary/5">
          <CardContent className="p-6">
            <h3 className="text-foreground mb-2 font-semibold">
              Response time
            </h3>
            <p className="text-text-weak text-sm">
              I typically respond within 24 hours. For urgent matters, Twitter
              DMs are fastest. For detailed technical discussions, email works
              best.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
