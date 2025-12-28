'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@compiel/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Compiel reduced our compliance timeline from 6 months to just 3 weeks. The AI automation is a game changer for fast-growing startups.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStart Inc.',
    rating: 5,
    avatar: 'SC',
  },
  {
    quote: 'The continuous monitoring gives us peace of mind. We always know our compliance status in real-time and can address issues immediately.',
    author: 'Michael Rodriguez',
    role: 'CISO',
    company: 'SecureCloud',
    rating: 5,
    avatar: 'MR',
  },
  {
    quote: 'Best investment we made this year. The team collaboration features and automated evidence collection make audits effortless.',
    author: 'Emily Watson',
    role: 'Compliance Officer',
    company: 'DataFlow Systems',
    rating: 5,
    avatar: 'EW',
  },
  {
    quote: 'We achieved SOC 2 Type II in record time. The platform is intuitive and the support team is incredibly responsive.',
    author: 'James Park',
    role: 'VP of Engineering',
    company: 'CloudNative Corp',
    rating: 5,
    avatar: 'JP',
  },
  {
    quote: 'Finally, a compliance tool that actually saves time instead of creating more work. The AI does the heavy lifting.',
    author: 'Lisa Thompson',
    role: 'Head of Security',
    company: 'FinTech Solutions',
    rating: 5,
    avatar: 'LT',
  },
];

export function Testimonials() {
  return (
    <section className="container py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5">
          <span className="text-sm font-medium text-primary">Customer Stories</span>
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Trusted by teams worldwide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join hundreds of companies who've transformed their compliance process
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
              {/* Quote icon decoration */}
              <div className="absolute top-6 right-6 opacity-10 transition-opacity group-hover:opacity-20">
                <Quote className="h-12 w-12 text-primary" />
              </div>

              <CardContent className="relative p-6">
                {/* Star rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 border-t pt-4">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="truncate text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-semibold text-primary"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>Join 500+ companies already certified</span>
        </div>
      </motion.div>
    </section>
  );
}
