'use client';

import { Button } from '@compiel/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@compiel/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { env } from '@/env.mjs';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/month',
    description: 'Perfect for early-stage startups getting their first certification',
    features: [
      'SOC 2 Type I support',
      'Up to 50 controls',
      'AI-powered evidence collection',
      'Policy templates library',
      'Email support (24hr response)',
      '1 user included',
      'Basic integrations (10+)',
      'Compliance dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$999',
    period: '/month',
    description: 'For growing companies managing multiple frameworks and audits',
    features: [
      'SOC 2 Type I & II',
      'ISO 27001 + GDPR support',
      'Unlimited controls',
      'Advanced AI automation',
      'Priority support (4hr response)',
      'Custom integrations (50+)',
      'Up to 10 users',
      'Audit assistance included',
      'Risk assessment tools',
      'Vendor management',
      'Custom policy generation',
    ],
    popular: true,
    cta: 'Start Free Trial',
    savings: 'Save $200/mo on annual',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with complex compliance requirements',
    features: [
      'All compliance frameworks',
      'Dedicated account manager',
      'Custom workflows & automations',
      '99.9% uptime SLA',
      'On-premise deployment option',
      'White-label capabilities',
      'Unlimited users',
      'Priority onboarding & training',
      'Advanced security controls',
      'Custom SLA agreements',
      'API access',
      'SSO & SAML support',
    ],
    cta: 'Contact Sales',
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
            className="group relative"
          >
            <Card className={`relative h-full overflow-hidden transition-all duration-300 ${
              plan.popular
                ? 'border-2 border-primary shadow-lg shadow-primary/10 scale-105'
                : 'hover:border-primary/50'
            }`}>
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-primary to-primary/80 px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
                    <Sparkles className="h-4 w-4" />
                    Most Popular - Best Value
                  </div>
                </div>
              )}

              {/* Gradient background effect */}
              {plan.popular && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent" />
              )}

              <CardHeader className={plan.popular ? 'pt-14' : 'pt-6'}>
                <div className="mb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2 min-h-[3rem]">{plan.description}</CardDescription>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                {plan.savings && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <ArrowRight className="h-3 w-3" />
                    {plan.savings}
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-3 text-sm font-semibold text-muted-foreground">Everything included:</div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className={`w-full h-12 ${plan.popular ? '' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={plan.price === 'Custom' ? '/contact' : `${env.NEXT_PUBLIC_APP_URL}/signup`}>
                    {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center text-sm text-muted-foreground"
      >
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p className="mt-2">Need a custom plan? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> for pricing.</p>
      </motion.div>
    </section>
  );
}
