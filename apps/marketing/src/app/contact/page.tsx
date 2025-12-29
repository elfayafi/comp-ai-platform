'use client';

import { ContactForm } from '@/components/forms/contact-form';
import { Card } from '@compiel/ui/card';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
                <span className="text-sm font-medium text-primary">Contact Support</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Get in{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  touch
                </span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Have questions about Compiel? We'd love to hear from you.
                <br className="hidden sm:inline" />
                Our team typically responds within 2 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-2 p-8 transition-all duration-300 hover:border-primary/50">
                <h2 className="mb-2 text-2xl font-bold">Send us a message</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you within 2 hours.
                </p>
                <ContactForm />
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="p-6 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Sales</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interested in Compiel? Get in touch with our sales team.
                </p>
                <a
                  href="mailto:sales@trycompiel.com"
                  className="mt-4 block font-medium text-primary hover:underline"
                >
                  sales@trycompiel.com
                </a>
              </Card>

              <Card className="p-6 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Need help? Our support team is here for you.
                </p>
                <a
                  href="mailto:support@trycompiel.com"
                  className="mt-4 block font-medium text-primary hover:underline"
                >
                  support@trycompiel.com
                </a>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-background p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Office Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monday - Friday
                </p>
                <p className="text-sm font-medium">9:00 AM - 6:00 PM EST</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  We typically respond within 2 hours during business hours
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
