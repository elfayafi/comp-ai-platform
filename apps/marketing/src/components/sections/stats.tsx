'use client';

import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingUp, Users, Zap, Clock } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 90,
    suffix: '%',
    label: 'Faster compliance',
    description: 'Average time reduction',
  },
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Companies trust us',
    description: 'From startups to enterprises',
  },
  {
    icon: Zap,
    value: 99.9,
    suffix: '%',
    label: 'Uptime SLA',
    description: 'Enterprise reliability',
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Always here to help',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = suffix === '%' && value < 100
          ? latest.toFixed(1)
          : Math.floor(latest).toString();
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, value]);

  return <div ref={ref} className="text-5xl font-bold text-primary lg:text-6xl">0{suffix}</div>;
}

export function Stats() {
  return (
    <section className="relative border-y bg-gradient-to-b from-secondary/30 to-background py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20"
                >
                  <stat.icon className="h-6 w-6" />
                </motion.div>

                {/* Animated Counter */}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                {/* Label */}
                <div className="mt-3 text-base font-semibold">{stat.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
              </div>

              {/* Separator line (hidden on last item on mobile) */}
              {index < stats.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
