'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@compiel/ui/card';
import { Shield, Zap, Eye, FileCheck, Users, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Automate evidence collection and policy generation with AI',
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Real-time compliance monitoring and alerting',
  },
  {
    icon: Shield,
    title: 'Multi-Framework Support',
    description: 'SOC 2, ISO 27001, GDPR, and more',
  },
  {
    icon: FileCheck,
    title: 'Smart Documentation',
    description: 'Auto-generate policies and procedures',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks and track progress together',
  },
  {
    icon: Lock,
    title: 'Security First',
    description: 'Bank-level encryption and security',
  },
];

export function FeaturesGrid() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Everything you need for compliance
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Powerful features to streamline your compliance journey
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
