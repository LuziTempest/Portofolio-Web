'use server';

import { formatContactMessage, readContactMessage, type ContactResult } from '@/lib/contact-message';
import { getContactSettings } from '@/lib/contact-settings';

export async function sendContact(data: FormData): Promise<ContactResult> {
  const draft = readContactMessage(data);
  if (!draft) {
    return { ok: false, message: 'Check your name, email address, and message.' };
  }

  const { recipient, sender, apiKey } = getContactSettings();
  if (!recipient || !sender || !apiKey) {
    return { ok: false, message: 'Direct email is unavailable right now. You can reach me on LinkedIn.' };
  }

  const { subject, text } = formatContactMessage(draft);
  const failed = { ok: false, message: 'Your message couldn’t be sent. Please try again or reach me on LinkedIn.' };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: draft.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    return response.ok ? { ok: true, message: 'Thanks! Your message was sent.' } : failed;
  } catch {
    return failed;
  }
}
