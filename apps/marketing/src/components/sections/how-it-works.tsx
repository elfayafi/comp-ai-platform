'use client';

import { motion } from 'framer-motion';
import { Link2, Brain, FileStack, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '@compiel/ui/card';

const steps = [
  {
    icon: Link2,
    title: 'Connect your tools',
    description: 'One-click integrations with GitHub, AWS, Google Workspace, and 50+ tools',
    time: '5 minutes',
  },
  {
    icon: Brain,
    title: 'AI maps controls',
    description: 'Our AI engine automatically maps your infrastructure to compliance controls',
    time: 'Instant',
  },
  {
    icon: FileStack,
    title: 'Auto-collect evidence',
    description: 'Continuous evidence collection runs 24/7 in the background',
    time: 'Automated',
  },
  {
    icon: CheckCircle,
    title: 'Get certified',
    description: 'Export audit-ready packages and complete your certification with confidence',
    time: 'Weeks not months',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5">
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From integration to certification in 4 simple steps
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Connection line (desktop only) */}
          <div className="absolute top-16 left-0 right-0 hidden lg:block">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-16">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                  className="h-px w-full origin-left bg-gradient-to-r from-primary/50 to-primary/20"
                  style={{ transformOrigin: 'left' }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <Card className="group relative h-full overflow-hidden border-2 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                  {/* Step number badge */}
                  <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>

                  <div className="flex flex-col">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20"
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>

                    {/* Time badge */}
                    <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <ArrowRight className="h-3 w-3" />
                      {step.time}
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>

                {/* Mobile connector arrow */}
                {index < steps.length - 1 && (
                  <div className="my-4 flex justify-center lg:hidden">
                    <ArrowRight className="h-6 w-6 text-primary/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
