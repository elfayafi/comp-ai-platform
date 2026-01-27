'use client';

import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Companies',
    description: 'Trust Compiel for their compliance journey',
    color: 'primary',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Time Saved',
    description: 'Average reduction in compliance preparation',
    color: 'gold',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Frameworks',
    description: 'Supported compliance and security standards',
    color: 'primary',
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime',
    description: 'Enterprise-grade reliability and availability',
    color: 'navy',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted =
          suffix === '%' && value < 100 ? latest.toFixed(1) : Math.floor(latest).toString();
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, value]);

  return <div ref={ref} className="editorial-number text-7xl text-navy lg:text-8xl">0{suffix}</div>;
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(38 95% 58%) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-gradient-to-bl from-gold/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-gradient-to-tr from-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="h-px w-16 bg-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              By The Numbers
            </span>
            <div className="h-px w-16 bg-gold" />
          </div>
          <h2 className="font-display text-5xl text-white sm:text-6xl lg:text-7xl">
            Industry-Leading
            <br />
            <span className="italic text-gold">Performance</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
              className="group relative"
            >
              {/* Editorial Number Display */}
              <div className="relative">
                {/* Large decorative background number */}
                <div className="editorial-number absolute -left-2 -top-4 text-9xl text-white/5 lg:text-[10rem]">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Main Content */}
                <div className="relative">
                  {/* Top Gold Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                    className="mb-6 h-1 w-16 bg-gold origin-left"
                  />

                  {/* Animated Counter */}
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                  {/* Label */}
                  <div className="mt-4 font-display text-2xl font-semibold text-white">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-base leading-relaxed text-white/70">
                    {stat.description}
                  </p>
                </div>

                {/* Separator Line (hidden on mobile last item and desktop last item) */}
                {index < stats.length - 1 && (
                  <div className="absolute -right-6 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
                )}
              </div>

              {/* Hover Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 -z-10 rounded-none border-2 border-gold/0 transition-all duration-300 group-hover:border-gold/20"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 border-t border-white/10 pt-12 text-center"
        >
          <p className="font-display text-2xl italic leading-relaxed text-white/90 sm:text-3xl lg:text-4xl">
            "The benchmark for modern
            <br className="hidden sm:inline" />
            compliance automation"
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest text-gold">
            — Industry Analysts
          </p>
        </motion.div>
      </div>
    </section>
  );
}
