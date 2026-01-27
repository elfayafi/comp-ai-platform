'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Eye, FileCheck, Users, Lock, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Transform weeks of manual work into hours with intelligent evidence collection and policy generation that adapts to your infrastructure.',
    highlight: 'Save 40+ hours per week',
    featured: true,
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Real-time compliance monitoring with instant alerts when controls drift from established standards.',
    highlight: '24/7 automated checks',
  },
  {
    icon: Shield,
    title: 'Multi-Framework Support',
    description: 'One platform for SOC 2, ISO 27001, GDPR, HIPAA and 15+ additional compliance frameworks.',
    highlight: '15+ frameworks',
  },
  {
    icon: FileCheck,
    title: 'Smart Documentation',
    description: 'Generate audit-ready policies, procedures and evidence documentation automatically.',
    highlight: '100+ templates',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Coordinate compliance efforts across your entire organization with role-based access and workflows.',
    highlight: 'Unlimited users',
  },
  {
    icon: Lock,
    title: 'Security First',
    description: 'Bank-level encryption, SOC 2 certified infrastructure, and zero-trust architecture by default.',
    highlight: 'Enterprise-grade',
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-secondary/30 to-white py-24 sm:py-32">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container relative">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Platform Capabilities
              </span>
            </div>

            <h2 className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Everything you need.
              <br />
              <span className="italic text-primary">Nothing you don't.</span>
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              A comprehensive platform designed for modern compliance teams who refuse to compromise between speed and security.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Magazine-Style Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Featured Large Card - Spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative lg:col-span-7 lg:row-span-2"
          >
            <div className="relative h-full overflow-hidden border-2 border-navy bg-gradient-to-br from-navy via-navy-light to-navy p-10 shadow-2xl transition-all duration-500 hover:shadow-3xl lg:p-12">
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative">
                {/* Featured Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5">
                  <Sparkles className="h-4 w-4 text-navy" />
                  <span className="text-sm font-bold uppercase tracking-wider text-navy">
                    Most Powerful
                  </span>
                </div>

                {/* Large Icon */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-none border-2 border-gold bg-gold/10 text-gold"
                >
                  <Zap className="h-10 w-10" />
                </motion.div>

                <h3 className="font-display text-4xl text-white lg:text-5xl">
                  AI-Powered Automation
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-white/80 lg:text-xl">
                  Transform weeks of manual work into hours with intelligent evidence collection and policy generation that adapts to your infrastructure.
                </p>

                {/* Highlight */}
                <div className="mt-8 inline-flex items-center gap-2 border-t border-gold/30 pt-6">
                  <ArrowRight className="h-5 w-5 text-gold" />
                  <span className="text-base font-semibold text-gold lg:text-lg">
                    Save 40+ hours per week
                  </span>
                </div>

                {/* Decorative Number */}
                <div className="editorial-number absolute -right-4 bottom-0 text-[12rem] text-white/5 lg:text-[16rem]">
                  01
                </div>
              </div>
            </div>
          </motion.div>

          {/* Standard Cards - Asymmetric Layout */}
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
              className={`group relative ${
                index === 0 || index === 3 ? 'lg:col-span-5' : 'lg:col-span-5'
              }`}
            >
              <div className="relative h-full overflow-hidden border border-border bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl">
                {/* Decorative Corner */}
                <div className="absolute left-0 top-0 h-1 w-16 bg-gradient-to-r from-primary to-transparent" />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20"
                >
                  <feature.icon className="h-7 w-7" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-2xl text-navy lg:text-3xl">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Highlight */}
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  {feature.highlight}
                </div>

                {/* Number Decoration */}
                <div className="editorial-number absolute -right-2 -top-2 text-8xl text-primary/5">
                  {String(index + 2).padStart(2, '0')}
                </div>

                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-none border-2 border-navy bg-gradient-to-br from-navy/5 to-primary/5 p-12">
            <div className="font-display text-3xl text-navy sm:text-4xl">
              Ready to transform your
              <br />
              <span className="italic text-primary">compliance process?</span>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              Join 500+ companies who have already made the switch.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 border-2 border-navy bg-navy px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
