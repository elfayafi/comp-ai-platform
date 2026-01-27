'use client';

import { motion } from 'framer-motion';
import { Button } from '@compiel/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { env } from '@/env.mjs';

interface CTASectionProps {
  variant?: 'default' | 'simple';
}

export function CTASection({ variant = 'default' }: CTASectionProps) {
  if (variant === 'simple') {
    return (
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border-2 border-navy bg-gradient-to-br from-navy/5 to-primary/5 p-12 text-center"
        >
          <div className="relative">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Ready to transform your
              <br />
              <span className="italic text-primary">compliance process?</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join 500+ companies who have already made the switch.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button size="lg" className="h-14 rounded-none border-2 border-navy bg-navy px-8 text-base font-semibold" asChild>
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/signup`}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-navy py-32 sm:py-40">
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <div className="h-0.5 w-16 bg-gold" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Start Today
            </span>
            <div className="h-0.5 w-16 bg-gold" />
          </motion.div>

          {/* Dramatic Headline */}
          <h2 className="font-display text-5xl leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Begin your compliance
            <br />
            journey with
            <br />
            <span className="italic text-gold">confidence</span>
          </h2>

          <p className="mt-8 text-xl leading-relaxed text-white/80 sm:text-2xl">
            Get SOC 2, ISO 27001, and GDPR certified 90% faster.
            <br className="hidden sm:inline" />
            Start your free 14-day trial, no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              className="group h-16 rounded-none border-2 border-gold bg-gold px-10 text-base font-bold text-navy shadow-2xl transition-all hover:bg-gold/90 hover:shadow-3xl"
              asChild
            >
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/signup`}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 rounded-none border-2 border-white bg-transparent px-10 text-base font-bold text-white transition-all hover:bg-white hover:text-navy"
              asChild
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-white/80 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <span>14-day free trial</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <span>No credit card required</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 inline-flex items-center gap-4 border-2 border-gold bg-white/5 px-8 py-6 backdrop-blur-sm"
          >
            <div className="flex -space-x-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy bg-gold font-display text-sm font-bold text-navy"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="h-12 w-px bg-gold/30" />
            <div className="text-left">
              <div className="font-display text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gold">Companies Certified</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-1 w-full origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
