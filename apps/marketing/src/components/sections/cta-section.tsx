'use client';

import { motion } from 'framer-motion';
import { Button } from '@compiel/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { env } from '@/env.mjs';

interface CTASectionProps {
  variant?: 'default' | 'simple';
}

export function CTASection({ variant = 'default' }: CTASectionProps) {
  if (variant === 'simple') {
    return (
      <section className="container py-16">
        <div className="rounded border bg-secondary/30 p-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to get started?</h2>
          <p className="mt-4 text-muted-foreground">
            Join hundreds of companies automating their compliance
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/signup`}>
                Start Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary/5 py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold sm:text-5xl">
            Start your compliance journey today
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Get certified 90% faster with AI-powered automation. No credit card required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/signup`}>
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
