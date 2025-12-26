'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@compiel/ui/accordion';

const faqs = [
  {
    question: 'How long does certification take?',
    answer: 'With Compiel, most companies achieve SOC 2 Type I certification in 3-6 weeks, compared to the traditional 6-12 months. The timeline depends on your existing security posture and responsiveness.',
  },
  {
    question: 'What frameworks do you support?',
    answer: 'We support SOC 2 (Type I & II), ISO 27001, GDPR, HIPAA, PCI DSS, and custom frameworks. Our AI can map controls across multiple frameworks simultaneously.',
  },
  {
    question: 'Do you integrate with our existing tools?',
    answer: 'Yes! We integrate with 100+ tools including AWS, GCP, Azure, GitHub, Jira, Slack, and more. Our AI automatically collects evidence from your connected tools.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption (AES-256), are SOC 2 Type II certified ourselves, and never share your data. All evidence is stored in your own secure vault.',
  },
  {
    question: 'What if we need custom controls?',
    answer: 'Our Professional and Enterprise plans include custom control creation. You can define your own controls and our AI will help map evidence and automate monitoring.',
  },
  {
    question: 'Can we export our documentation?',
    answer: 'Yes, you can export all policies, procedures, and evidence in PDF, Word, or Excel formats at any time. You own your data completely.',
  },
  {
    question: 'Do you offer training?',
    answer: 'Yes! All plans include access to our training resources. Professional and Enterprise plans include live onboarding sessions with our compliance experts.',
  },
  {
    question: 'What\'s your support policy?',
    answer: 'Starter plans get email support within 24 hours. Professional plans get priority email and chat support. Enterprise plans get dedicated account managers with SLA guarantees.',
  },
];

export function FAQ() {
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about Compiel
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a href="/contact" className="text-primary hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
