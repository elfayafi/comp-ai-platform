import { Metadata } from 'next';
import { PricingCards } from '@/components/sections/pricing-cards';
import { FAQ } from '@/components/sections/faq';
import { CTASection } from '@/components/sections/cta-section';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for businesses of all sizes. Start with a 14-day free trial.',
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Flexible Pricing</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Simple, transparent{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                pricing
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Choose the plan that's right for your organization.
              <br className="hidden sm:inline" />
              No hidden fees, no surprises. Start with a 14-day free trial.
            </p>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingCards />
      <FAQ />
      <CTASection variant="simple" />
    </>
  );
}
