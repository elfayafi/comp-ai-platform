import { Metadata } from 'next';
import { CTASection } from '@/components/sections/cta-section';
import { Zap, Eye, Brain, Shield, FileStack, Users, Cloud, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover how Compiel helps you achieve compliance faster.',
};

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Our AI engine automatically collects evidence, generates policies, and maps controls across multiple frameworks. Reduce manual work by 90% and focus on what matters.',
    points: [
      'Automatic evidence collection from 100+ integrations',
      'AI-generated policies and procedures',
      'Smart control mapping across frameworks',
      'Continuous background monitoring',
    ],
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Stay compliant 24/7 with real-time monitoring of your security posture. Get instant alerts when controls drift out of compliance.',
    points: [
      'Real-time security posture dashboard',
      'Automated compliance scoring',
      'Instant drift detection and alerts',
      'Historical compliance tracking',
    ],
  },
  {
    icon: Shield,
    title: 'Multi-Framework Support',
    description: 'Achieve multiple certifications simultaneously. Our platform supports SOC 2, ISO 27001, GDPR, HIPAA, and more.',
    points: [
      'SOC 2 Type I & II',
      'ISO 27001 & ISO 27017',
      'GDPR & CCPA compliance',
      'HIPAA & PCI DSS support',
    ],
  },
  {
    icon: Brain,
    title: 'Smart Documentation',
    description: 'Generate comprehensive policies and procedures with AI. Our system understands your business and creates tailored documentation.',
    points: [
      'AI-generated policy templates',
      'Customizable procedures',
      'Version control and approval workflows',
      'Export to PDF, Word, or Markdown',
    ],
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks, track progress, and collaborate with your team. Keep everyone aligned on compliance initiatives.',
    points: [
      'Task assignment and tracking',
      'Role-based access control',
      'Comments and discussions',
      'Email and Slack notifications',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud Security Testing',
    description: 'Automatically test your cloud infrastructure for security vulnerabilities and compliance issues.',
    points: [
      'AWS, GCP, and Azure scanning',
      'CIS benchmark compliance',
      'Automated remediation suggestions',
      'Infrastructure as Code scanning',
    ],
  },
  {
    icon: FileStack,
    title: 'Evidence Management',
    description: 'Centralized evidence vault with automatic collection and organization. Never lose track of compliance artifacts.',
    points: [
      'Automatic evidence collection',
      'Secure encrypted storage',
      'Easy search and filtering',
      'Audit-ready exports',
    ],
  },
  {
    icon: Bell,
    title: 'Audit Preparation',
    description: 'Get audit-ready in minutes with our comprehensive audit preparation tools and expert guidance.',
    points: [
      'Pre-audit readiness assessments',
      'Gap analysis and recommendations',
      'Auditor collaboration tools',
      'Historical evidence access',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need for compliance
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to make compliance effortless
          </p>
        </div>
      </section>

      <section className="container pb-24">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-primary/10 text-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">{feature.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-primary"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`flex items-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="w-full rounded border bg-secondary/30 p-12 text-center">
                  <p className="text-sm text-muted-foreground">Feature visualization</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
