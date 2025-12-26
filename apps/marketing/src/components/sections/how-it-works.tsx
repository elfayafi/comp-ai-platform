'use client';

import { motion } from 'framer-motion';
import { Link2, Brain, FileStack, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    title: 'Connect your tools',
    description: 'Integrate with your existing stack in minutes',
  },
  {
    icon: Brain,
    title: 'AI maps controls',
    description: 'Our AI automatically maps your controls and requirements',
  },
  {
    icon: FileStack,
    title: 'Auto-collect evidence',
    description: 'Evidence is collected continuously in the background',
  },
  {
    icon: CheckCircle,
    title: 'Get certified',
    description: 'Complete your audit with confidence and speed',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary/30 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get compliant in 4 simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">
                  Step {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-full hidden h-px w-full bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
