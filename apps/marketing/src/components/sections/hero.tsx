'use client';

import { motion } from 'framer-motion';
import { Button } from '@compiel/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { env } from '@/env.mjs';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-primary/5">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Large decorative number in background */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -left-20 top-1/4 editorial-number text-[28rem] leading-none text-navy"
        >
          01
        </motion.div>

        {/* Elegant gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute right-1/4 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-gold/10 blur-3xl"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(hsl(220 40% 15%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(220 40% 15%) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container relative py-20 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            {/* Small Eyebrow with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2"
            >
              <div className="h-px w-12 bg-gold" />
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Compliance Redefined
              </span>
            </motion.div>

            {/* Dramatic Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-6xl leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              The New
              <br />
              <span className="italic text-primary">Standard</span>
              <br />
              in Compliance
            </motion.h1>

            {/* Elegant Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground sm:text-2xl"
            >
              Achieve SOC 2, ISO 27001, and GDPR certification with unprecedented speed and precision.
            </motion.p>

            {/* Editorial CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                className="group h-14 rounded-none border-2 border-navy bg-navy px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl"
                asChild
              >
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/signup`}>
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-none border-2 border-navy bg-transparent px-8 text-base font-semibold text-navy transition-all hover:bg-navy hover:text-white"
                asChild
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </motion.div>

            {/* Premium Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-12 flex items-center gap-8 border-t border-border pt-8"
            >
              <div>
                <div className="editorial-number text-4xl text-navy">500<span className="text-gold">+</span></div>
                <div className="mt-1 text-sm text-muted-foreground">Companies Trust Us</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="editorial-number text-4xl text-navy">90<span className="text-gold">%</span></div>
                <div className="mt-1 text-sm text-muted-foreground">Faster Compliance</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="editorial-number text-4xl text-navy">24<span className="text-gold">/7</span></div>
                <div className="mt-1 text-sm text-muted-foreground">Expert Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Floating Certification Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="relative space-y-4"
              >
                {/* SOC 2 Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: -8 }}
                  className="relative overflow-hidden border-2 border-navy bg-white p-6 shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Most Popular
                        </span>
                      </div>
                      <h3 className="font-display text-3xl text-navy">SOC 2 Type II</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Complete in 4-6 weeks with AI-powered automation
                      </p>
                    </div>
                    <div className="editorial-number text-6xl text-primary/10">S2</div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary to-gold" />
                </motion.div>

                {/* ISO 27001 Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: -8 }}
                  className="relative ml-8 overflow-hidden border-2 border-gold bg-gradient-to-br from-gold/5 to-white p-6 shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-navy">ISO 27001</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Enterprise-grade information security
                      </p>
                    </div>
                    <div className="text-5xl text-gold/20">🔒</div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gold" />
                </motion.div>

                {/* GDPR Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: -8 }}
                  className="relative overflow-hidden border-2 border-navy/20 bg-white p-6 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-navy">GDPR Ready</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        European data protection compliance
                      </p>
                    </div>
                    <div className="text-5xl text-navy/10">⚡</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -right-4 -top-4 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Editorial Divider */}
      <div className="container">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    </section>
  );
}
