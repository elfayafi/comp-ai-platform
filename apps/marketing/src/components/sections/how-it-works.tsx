'use client';

import { motion } from 'framer-motion';
import { Link2, Brain, FileStack, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    number: '01',
    title: 'Connect',
    subtitle: 'Your Tools',
    description: 'One-click integrations with GitHub, AWS, Google Workspace, and 50+ compliance tools. Secure OAuth connections in minutes.',
    time: '5 minutes',
    color: 'primary',
  },
  {
    icon: Brain,
    number: '02',
    title: 'AI Maps',
    subtitle: 'Controls',
    description: 'Our intelligent engine automatically maps your infrastructure to compliance controls with 99% accuracy.',
    time: 'Instant',
    color: 'gold',
  },
  {
    icon: FileStack,
    number: '03',
    title: 'Auto-collect',
    subtitle: 'Evidence',
    description: 'Continuous evidence collection runs 24/7 in the background. Never manually gather proof again.',
    time: 'Automated',
    color: 'primary',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Get',
    subtitle: 'Certified',
    description: 'Export audit-ready packages with complete documentation. Pass your audit with confidence.',
    time: 'Weeks not months',
    color: 'gold',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Editorial Background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(220 40% 15%) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(220 40% 15%) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Gold accent line */}
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="container relative">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="h-0.5 w-16 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The Process
            </span>
            <div className="h-0.5 w-16 bg-primary" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl">
            How it <span className="italic text-primary">Works</span>
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            From integration to certification in four meticulously designed steps.
            <br className="hidden sm:inline" />
            No complexity. Just results.
          </p>
        </motion.div>

        {/* Editorial Step Cards */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full overflow-hidden border-2 border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-2xl lg:p-10">
                {/* Decorative number background */}
                <div className="editorial-number absolute -right-4 -top-8 text-[12rem] leading-none text-navy/5">
                  {step.number}
                </div>

                <div className="relative">
                  {/* Icon + Number Badge */}
                  <div className="mb-6 flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className={`inline-flex h-16 w-16 items-center justify-center ${
                        step.color === 'gold' ? 'bg-gold/10 text-gold' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>

                    <div
                      className={`font-display text-sm font-bold uppercase tracking-widest ${
                        step.color === 'gold' ? 'text-gold' : 'text-primary'
                      }`}
                    >
                      {step.time}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl text-navy lg:text-4xl">
                    {step.title}
                    <br />
                    <span className={step.color === 'gold' ? 'italic text-gold' : 'italic text-primary'}>
                      {step.subtitle}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`mt-6 h-1 w-24 origin-left transition-all duration-500 group-hover:w-full ${
                      step.color === 'gold' ? 'bg-gold' : 'bg-primary'
                    }`}
                  />
                </div>
              </div>

              {/* Connection arrow for larger screens */}
              {index < steps.length - 2 && index % 2 === 0 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    className="h-24 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 border-t border-border pt-12 text-center"
        >
          <p className="font-display text-2xl italic text-navy sm:text-3xl">
            "Simplicity is the ultimate
            <br className="hidden sm:inline" />
            <span className="text-primary">sophistication</span>"
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">
            — Our Approach to Compliance
          </p>
        </motion.div>
      </div>
    </section>
  );
}
