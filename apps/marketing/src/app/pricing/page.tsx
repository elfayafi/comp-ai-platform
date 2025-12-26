import { Metadata } from 'next';
import { PricingCards } from '@/components/sections/pricing-cards';
import { FAQ } from '@/components/sections/faq';
import { CTASection } from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for businesses of all sizes.',
};

export default function PricingPage() {
  return (
    <>
      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that's right for your organization. No hidden fees.
          </p>
        </div>
      </section>
      <PricingCards />
      <FAQ />
      <CTASection variant="simple" />
    </>
  );
}
