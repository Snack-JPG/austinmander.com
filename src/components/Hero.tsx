"use client";

import { CheckCircle } from "lucide-react";
import { heroContent } from "@/lib/config";
import { motion } from "framer-motion";
import { HeroCTA } from "@/components/smart-cta";
import { ChangeRadar } from "@/components/3d/ChangeRadar";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10 z-0" />

      {/* 3D Change Radar */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ChangeRadar
          theme={{
            primary: "#0b2545",
            secondary: "#00bfa6",
            accent: "#ffffff",
            alert: "#f9a826",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
              {heroContent.headline}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {heroContent.subheadline}
            </p>
          </motion.div>

          {/* Smart CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <HeroCTA
              page="home"
              className="flex flex-col sm:flex-row gap-4 justify-center"
              showAlternatives={true}
            />
          </motion.div>

          {/* Value bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto"
          >
            {heroContent.valueBullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-start text-left bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{bullet}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <span className="font-semibold text-2xl text-navy dark:text-white mr-2">
                15+
              </span>
              <span>Years Experience</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex items-center">
              <span className="font-semibold text-2xl text-navy dark:text-white mr-2">
                £2M+
              </span>
              <span>Value Delivered</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex items-center">
              <span className="font-semibold text-2xl text-navy dark:text-white mr-2">
                50+
              </span>
              <span>Projects</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}