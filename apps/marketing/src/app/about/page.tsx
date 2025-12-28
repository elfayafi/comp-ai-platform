'use client';

import { Metadata } from 'next';
import { CTASection } from '@/components/sections/cta-section';
import { Target, Users, Zap, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@compiel/ui/card';
import { Button } from '@compiel/ui/button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Compiel and our mission to make compliance accessible to every organization.',
};

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe compliance should be accessible to every organization, not just enterprises with unlimited budgets.',
  },
  {
    icon: Users,
    title: 'Customer-Focused',
    description: 'Our customers success is our success. We work closely with compliance teams to build what they actually need.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI and automation to solve problems that have plagued compliance teams for decades.',
  },
];

const stats = [
  { label: 'Founded', value: '2023' },
  { label: 'Team Members', value: '25+' },
  { label: 'Customers', value: '500+' },
  { label: 'Countries', value: '15+' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5">
                <span className="text-sm font-medium text-primary">About Compiel</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Simplifying compliance{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  for modern teams
                </span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Compiel was founded on a simple belief: achieving compliance shouldn't
                <br className="hidden sm:inline" />
                require an army of consultants or months of manual work.
              </p>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="rounded-lg border bg-background/80 p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <div className="mx-auto max-w-4xl space-y-20">
          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Our Story</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                After spending years helping companies achieve SOC 2 and ISO 27001 certification,
                our founders saw the same problems everywhere: manual evidence collection,
                disconnected tools, and compliance processes that hadn't evolved in decades.
              </p>
              <p>
                We built Compiel to solve these problems. By combining AI automation with
                continuous monitoring, we've created a platform that makes compliance faster,
                easier, and more reliable than ever before.
              </p>
              <p>
                Today, we're proud to help 500+ companies achieve and maintain compliance,
                from early-stage startups to enterprise organizations.
              </p>
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    >
                      <value.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Join Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-10">
              {/* Decorative blur */}
              <div className="absolute -top-24 right-1/4 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">We're Hiring</span>
                </div>

                <h2 className="text-3xl font-bold sm:text-4xl">Join Our Team</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  We're always looking for talented people who share our mission.
                  If you're passionate about solving hard problems and making compliance
                  accessible to everyone, we'd love to hear from you.
                </p>

                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <Button asChild>
                    <a href="mailto:careers@trycompiel.com">
                      View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <a
                    href="mailto:careers@trycompiel.com"
                    className="text-sm text-primary hover:underline"
                  >
                    careers@trycompiel.com
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
