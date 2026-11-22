export const contactLimits = {
  name: 100,
  email: 254,
  message: 2000,
};

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = { ok: boolean; message: string };

export function readEmailAddress(value: string | undefined) {
  const email = value?.trim();
  return email && email.length <= contactLimits.email && /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/.test(email)
    ? email
    : '';
}

function readText(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export function readContactMessage(data: FormData): ContactMessage | null {
  if (readText(data, 'website')) return null;

  const name = readText(data, 'name').replace(/\s+/g, ' ');
  const email = readEmailAddress(readText(data, 'email'));
  const message = readText(data, 'message');

  if (!name || name.length > contactLimits.name || !email || !message || message.length > contactLimits.message) {
    return null;
  }

  return { name, email, message };
}

export function formatContactMessage({ name, email, message }: ContactMessage) {
  return {
    subject: `Portfolio inquiry from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  };
}
