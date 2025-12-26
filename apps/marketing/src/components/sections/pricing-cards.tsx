'use client';

import { Button } from '@compiel/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@compiel/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { env } from '@/env.mjs';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    description: 'Perfect for startups',
    features: [
      'SOC 2 Type I support',
      'Up to 50 controls',
      'Basic automation',
      'Email support',
      '1 user included',
    ],
  },
  {
    name: 'Professional',
    price: '$999',
    description: 'For growing businesses',
    features: [
      'SOC 2 Type I & II',
      'ISO 27001 support',
      'Unlimited controls',
      'Advanced automation',
      'Priority support',
      'Custom integrations',
      'Up to 10 users',
      'Audit assistance',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'All frameworks',
      'Dedicated account manager',
      'Custom workflows',
      'SLA guarantee',
      'On-premise deployment',
      'White-label options',
      'Unlimited users',
      'Priority onboarding',
    ],
  },
];

export function PricingCards() {
  return (
    <section className="container py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={plan.popular ? 'border-primary' : ''}>
              {plan.popular && (
                <div className="bg-primary px-3 py-1 text-center text-sm text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 text-4xl font-bold">{plan.price}</div>
                {plan.price !== 'Custom' && (
                  <p className="text-sm text-muted-foreground">/month</p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                  <Link href={plan.price === 'Custom' ? '/contact' : `${env.NEXT_PUBLIC_APP_URL}/signup`}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
