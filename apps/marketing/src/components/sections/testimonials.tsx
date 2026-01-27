'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Compiel reduced our compliance timeline from 6 months to just 3 weeks. The AI automation is revolutionary for fast-growing startups.',
    author: 'Sarah Chen',
    role: 'Chief Technology Officer',
    company: 'TechStart Inc.',
    rating: 5,
    featured: true,
  },
  {
    quote: 'The continuous monitoring gives us complete peace of mind. We always know our compliance status and can address issues before they become problems.',
    author: 'Michael Rodriguez',
    role: 'Chief Information Security Officer',
    company: 'SecureCloud',
    rating: 5,
  },
  {
    quote: 'Best investment we made this year. The team collaboration features and automated evidence collection make audits absolutely effortless.',
    author: 'Emily Watson',
    role: 'Head of Compliance',
    company: 'DataFlow Systems',
    rating: 5,
  },
  {
    quote: 'We achieved SOC 2 Type II in record time. The platform is incredibly intuitive and the support team is exceptionally responsive.',
    author: 'James Park',
    role: 'VP of Engineering',
    company: 'CloudNative Corp',
    rating: 5,
  },
  {
    quote: 'Finally, a compliance tool that actually saves time instead of creating more work. The AI does the heavy lifting while we focus on building.',
    author: 'Lisa Thompson',
    role: 'Head of Security',
    company: 'FinTech Solutions',
    rating: 5,
  },
  {
    quote: 'Compiel transformed how we approach compliance. From scattered spreadsheets to a unified, intelligent platform that just works.',
    author: 'David Kumar',
    role: 'Director of Operations',
    company: 'Healthcare Tech Co',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-secondary/20 to-white py-24 sm:py-32">
      {/* Editorial Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
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
            <div className="h-0.5 w-16 bg-gold" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Client Stories
            </span>
            <div className="h-0.5 w-16 bg-gold" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl">
            Trusted by the
            <br />
            <span className="italic text-primary">Best</span>
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Join hundreds of forward-thinking companies who've transformed
            <br className="hidden sm:inline" />
            their compliance process with Compiel.
          </p>
        </motion.div>

        {/* Testimonial Grid - Editorial Layout */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          {/* Featured Large Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 lg:row-span-2"
          >
            <div className="group relative h-full overflow-hidden border-2 border-navy bg-gradient-to-br from-navy via-navy to-navy-light p-10 shadow-2xl transition-all duration-500 hover:shadow-3xl lg:p-12">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative">
                {/* Featured badge */}
                <div className="mb-6 inline-flex items-center gap-2 bg-gold px-4 py-1.5">
                  <span className="text-sm font-bold uppercase tracking-wider text-navy">
                    Featured
                  </span>
                </div>

                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-2xl leading-relaxed text-white lg:text-3xl">
                  "{testimonials[0].quote}"
                </p>

                {/* Author */}
                <div className="mt-8 border-t border-gold/30 pt-8">
                  <div className="font-display text-xl font-bold text-white">
                    {testimonials[0].author}
                  </div>
                  <div className="mt-1 text-sm text-gold">{testimonials[0].role}</div>
                  <div className="mt-1 text-sm text-white/70">{testimonials[0].company}</div>
                </div>

                {/* Decorative number */}
                <div className="editorial-number absolute -right-4 bottom-0 text-[10rem] text-white/5">
                  01
                </div>
              </div>
            </div>
          </motion.div>

          {/* Standard Testimonials */}
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
              className="group lg:col-span-6"
            >
              <div className="relative h-full overflow-hidden border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-xl">
                {/* Decorative corner */}
                <div className="absolute left-0 top-0 h-1 w-20 bg-gradient-to-r from-primary to-transparent" />

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-navy">{testimonial.author}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>

                {/* Number decoration */}
                <div className="editorial-number absolute -right-2 -top-2 text-7xl text-primary/5">
                  {String(index + 2).padStart(2, '0')}
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 border-t border-border pt-12 text-center"
        >
          <div className="mx-auto inline-flex items-center gap-4 rounded-none border-2 border-navy bg-white px-8 py-6">
            <div className="flex -space-x-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-primary/10 font-display text-sm font-bold text-primary"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-left">
              <div className="font-display text-2xl font-bold text-navy">500+</div>
              <div className="text-sm text-muted-foreground">Companies Certified</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
