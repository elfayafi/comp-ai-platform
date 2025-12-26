'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@compiel/ui/card';

const testimonials = [
  {
    quote: 'Compiel reduced our compliance timeline from 6 months to just 3 weeks. The AI automation is a game changer.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStart Inc.',
  },
  {
    quote: 'The continuous monitoring gives us peace of mind. We always know our compliance status in real-time.',
    author: 'Michael Rodriguez',
    role: 'CISO',
    company: 'SecureCloud',
  },
  {
    quote: 'Best investment we made. The team collaboration features make audits so much easier to manage.',
    author: 'Emily Watson',
    role: 'Compliance Officer',
    company: 'DataFlow Systems',
  },
];

export function Testimonials() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Trusted by teams worldwide</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          See what our customers have to say
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <p className="text-sm italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 border-t pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
