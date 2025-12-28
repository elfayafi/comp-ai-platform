'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@compiel/ui/card';
import { Shield, Zap, Eye, FileCheck, Users, Lock, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Automate evidence collection and policy generation with AI that learns your infrastructure',
    highlight: 'Save 40+ hours per week',
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Real-time compliance monitoring with instant alerts when controls drift',
    highlight: '24/7 automated checks',
  },
  {
    icon: Shield,
    title: 'Multi-Framework Support',
    description: 'SOC 2, ISO 27001, GDPR, HIPAA, and more frameworks in one platform',
    highlight: '15+ frameworks',
  },
  {
    icon: FileCheck,
    title: 'Smart Documentation',
    description: 'Auto-generate policies, procedures, and audit-ready documentation',
    highlight: '100+ templates',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks, track progress, and collaborate with your entire team',
    highlight: 'Unlimited users',
  },
  {
    icon: Lock,
    title: 'Security First',
    description: 'Bank-level encryption, SOC 2 certified infrastructure, zero-trust architecture',
    highlight: 'Enterprise-grade',
  },
];

export function FeaturesGrid() {
  return (
    <section className="container py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5">
          <span className="text-sm font-medium text-primary">Platform Features</span>
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Everything you need for compliance
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Built for modern compliance teams who need to move fast without compromising security
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
              {/* Hover gradient effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardHeader className="relative">
                {/* Icon with animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20"
                >
                  <feature.icon className="h-7 w-7" />
                </motion.div>

                {/* Highlight badge */}
                <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <ArrowRight className="h-3 w-3" />
                  {feature.highlight}
                </div>

                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
