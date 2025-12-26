import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { FeaturesGrid } from '@/components/sections/features-grid';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Testimonials } from '@/components/sections/testimonials';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
