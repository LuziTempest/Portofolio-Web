import { readEmailAddress } from './contact-message';

export function getContactSettings() {
  return {
    recipient: readEmailAddress(process.env.PORTFOLIO_CONTACT_EMAIL),
    sender: process.env.PORTFOLIO_CONTACT_FROM?.trim(),
    apiKey: process.env.RESEND_API_KEY?.trim(),
  };
}
