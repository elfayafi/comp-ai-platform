'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { env } from '@/env.mjs';
import { contactSchema } from '@/lib/schemas';

const resend = new Resend(env.RESEND_API_KEY);

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  try {
    // Validate
    const validated = contactSchema.parse(data);

    // Send email
    await resend.emails.send({
      from: 'Contact Form <noreply@trycompiel.com>',
      to: 'sales@trycompiel.com',
      replyTo: validated.email,
      subject: `New Contact Form Submission from ${validated.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Company:</strong> ${validated.company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }
}
