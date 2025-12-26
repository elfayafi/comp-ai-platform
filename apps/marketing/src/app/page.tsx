import { Button } from '@compiel/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern grid-fade-mask opacity-50" />

      <div className="container relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Compliance automation,{' '}
            <span className="text-primary">powered by AI</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Achieve SOC 2, ISO 27001, and GDPR certification 90% faster with
            intelligent automation and continuous monitoring.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>SOC 2 Certified</div>
            <div>ISO 27001</div>
            <div>GDPR Compliant</div>
          </div>
        </div>
      </div>
    </section>
  );
}
