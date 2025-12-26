import { Metadata } from 'next';
import { CTASection } from '@/components/sections/cta-section';
import { Target, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Compiel and our mission to simplify compliance.',
};

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe compliance should be accessible to every organization, not just enterprises with unlimited budgets.',
  },
  {
    icon: Users,
    title: 'Customer-Focused',
    description: 'Our customers success is our success. We work closely with compliance teams to build what they actually need.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI and automation to solve problems that have plagued compliance teams for decades.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Simplifying compliance for modern teams
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Compiel was founded on a simple belief: achieving compliance shouldn't
              require an army of consultants or months of manual work.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            <div>
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="mt-4 text-muted-foreground">
                After spending years helping companies achieve SOC 2 and ISO 27001 certification,
                our founders saw the same problems everywhere: manual evidence collection,
                disconnected tools, and compliance processes that hadn't evolved in decades.
              </p>
              <p className="mt-4 text-muted-foreground">
                We built Compiel to solve these problems. By combining AI automation with
                continuous monitoring, we've created a platform that makes compliance faster,
                easier, and more reliable than ever before.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Our Values</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {values.map((value) => (
                  <div key={value.title} className="text-center">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border bg-secondary/30 p-8">
              <h2 className="text-2xl font-bold">Join Our Team</h2>
              <p className="mt-4 text-muted-foreground">
                We're always looking for talented people who share our mission.
                If you're passionate about solving hard problems and making compliance
                accessible to everyone, we'd love to hear from you.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:careers@trycompiel.com"
                  className="text-primary hover:underline"
                >
                  careers@trycompiel.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
