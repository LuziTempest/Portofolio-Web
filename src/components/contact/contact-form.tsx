'use client';

import { useState, useTransition, type FormEvent } from 'react';

import { sendContact } from '@/app/actions/contact';
import actionStyles from '@/components/ui/action-link.module.css';
import {
  contactDraftUrl,
  contactLimits,
  readContactMessage,
  type ContactResult,
} from '@/lib/contact-message';

import styles from './contact-form.module.css';

export function ContactForm({ emailAppRecipient }: { emailAppRecipient?: string }) {
  const [feedback, setFeedback] = useState<ContactResult | null>(null);
  const [isSending, startSending] = useTransition();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const draft = readContactMessage(data);

    if (!draft) {
      setFeedback({ ok: false, message: 'Check your name, email address, and message.' });
      return;
    }

    if (emailAppRecipient) {
      window.location.href = contactDraftUrl(emailAppRecipient, draft);
      setFeedback({ ok: true, message: 'Send the draft from your email app to finish.' });
      return;
    }

    setFeedback(null);
    startSending(async () => {
      try {
        const result = await sendContact(data);
        if (result.ok) form.reset();
        setFeedback(result);
      } catch {
        setFeedback({ ok: false, message: 'The connection was interrupted. Please try again.' });
      }
    });
  }

  return (
    <form className={styles.form} method="post" onSubmit={submit} aria-busy={isSending}>
      <fieldset className={styles.fields} disabled={isSending}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span>Name</span>
            <input name="name" autoComplete="name" maxLength={contactLimits.name} required />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" maxLength={contactLimits.email} required />
          </label>
        </div>

        <label className={styles.field}>
          <span>Message</span>
          <textarea name="message" rows={5} maxLength={contactLimits.message} required />
        </label>

        <label hidden>Leave this field empty <input name="website" tabIndex={-1} autoComplete="off" /></label>

        <div className={styles.actions}>
          <button
            className={`${actionStyles.action} ${actionStyles.primary} ${styles.submit}`}
            type="submit"
            disabled={isSending}
          >
            {isSending ? 'Sending…' : emailAppRecipient ? 'Open email app' : 'Send message'}
          </button>
          {emailAppRecipient && <p className={styles.hint}>Opens a draft in your email app.</p>}
        </div>
      </fieldset>
      <p className={styles.feedback} data-error={feedback ? !feedback.ok : undefined} role="status">
        {feedback?.message}
      </p>
    </form>
  );
}
