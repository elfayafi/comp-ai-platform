import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import { Card } from '@compiel/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team.',
};

export default function ContactPage() {
  return (
    <>
      <section className="container py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Sales</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interested in Compiel? Get in touch with our sales team.
                </p>
                <a
                  href="mailto:sales@trycompiel.com"
                  className="mt-4 block text-sm text-primary hover:underline"
                >
                  sales@trycompiel.com
                </a>
              </Card>

              <Card className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Need help? Our support team is here for you.
                </p>
                <a
                  href="mailto:support@trycompiel.com"
                  className="mt-4 block text-sm text-primary hover:underline"
                >
                  support@trycompiel.com
                </a>
              </Card>

              <div className="rounded border bg-secondary/30 p-6">
                <h3 className="font-semibold">Office Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monday - Friday
                </p>
                <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
