'use client';

import { Metadata } from 'next';
import { CTASection } from '@/components/sections/cta-section';
import { Zap, Eye, Brain, Shield, FileStack, Users, Cloud, Bell, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover how Compiel helps you achieve compliance 90% faster with AI-powered automation.',
};

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Our AI engine automatically collects evidence, generates policies, and maps controls across multiple frameworks. Reduce manual work by 90% and focus on what matters.',
    points: [
      'Automatic evidence collection from 100+ integrations',
      'AI-generated policies and procedures',
      'Smart control mapping across frameworks',
      'Continuous background monitoring',
    ],
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Stay compliant 24/7 with real-time monitoring of your security posture. Get instant alerts when controls drift out of compliance.',
    points: [
      'Real-time security posture dashboard',
      'Automated compliance scoring',
      'Instant drift detection and alerts',
      'Historical compliance tracking',
    ],
  },
  {
    icon: Shield,
    title: 'Multi-Framework Support',
    description: 'Achieve multiple certifications simultaneously. Our platform supports SOC 2, ISO 27001, GDPR, HIPAA, and more.',
    points: [
      'SOC 2 Type I & II',
      'ISO 27001 & ISO 27017',
      'GDPR & CCPA compliance',
      'HIPAA & PCI DSS support',
    ],
  },
  {
    icon: Brain,
    title: 'Smart Documentation',
    description: 'Generate comprehensive policies and procedures with AI. Our system understands your business and creates tailored documentation.',
    points: [
      'AI-generated policy templates',
      'Customizable procedures',
      'Version control and approval workflows',
      'Export to PDF, Word, or Markdown',
    ],
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks, track progress, and collaborate with your team. Keep everyone aligned on compliance initiatives.',
    points: [
      'Task assignment and tracking',
      'Role-based access control',
      'Comments and discussions',
      'Email and Slack notifications',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud Security Testing',
    description: 'Automatically test your cloud infrastructure for security vulnerabilities and compliance issues.',
    points: [
      'AWS, GCP, and Azure scanning',
      'CIS benchmark compliance',
      'Automated remediation suggestions',
      'Infrastructure as Code scanning',
    ],
  },
  {
    icon: FileStack,
    title: 'Evidence Management',
    description: 'Centralized evidence vault with automatic collection and organization. Never lose track of compliance artifacts.',
    points: [
      'Automatic evidence collection',
      'Secure encrypted storage',
      'Easy search and filtering',
      'Audit-ready exports',
    ],
  },
  {
    icon: Bell,
    title: 'Audit Preparation',
    description: 'Get audit-ready in minutes with our comprehensive audit preparation tools and expert guidance.',
    points: [
      'Pre-audit readiness assessments',
      'Gap analysis and recommendations',
      'Auditor collaboration tools',
      'Historical evidence access',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Platform Capabilities</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                for compliance
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Powerful features designed to automate compliance workflows
              <br className="hidden sm:inline" />
              and reduce manual work by 90%
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container pb-24 sm:pb-32">
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`grid gap-12 lg:grid-cols-2 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                {/* Icon with animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <feature.icon className="h-8 w-8" />
                </motion.div>

                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <ArrowRight className="h-3 w-3" />
                  Feature #{index + 1}
                </div>

                <h2 className="text-3xl font-bold sm:text-4xl">{feature.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {feature.points.map((point, pointIndex) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pointIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={`flex items-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative w-full overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-12 transition-all duration-300 hover:border-primary/40"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary opacity-20 transition-opacity group-hover:opacity-30">
                    <feature.icon className="h-6 w-6" />
                  </div>

                  <div className="relative space-y-4 text-center">
                    <div className="text-sm font-medium text-primary">Feature Preview</div>
                    <div className="mx-auto h-32 w-32 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-16 w-16 text-primary/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Visual demonstration of {feature.title.toLowerCase()}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
