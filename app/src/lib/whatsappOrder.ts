/**
 * WhatsApp guest checkout: builds the prefilled order message and wa.me URL.
 * Pure functions so they can be unit-tested without a browser.
 */
import { siteConfig } from './config';

export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  price: number; // unit price in BDT
}

export interface WhatsAppOrderCustomer {
  name: string;
  phone: string;
  address: string;
}

/** Bangladeshi digit grouping (lakh/crore): 123456 -> "৳1,23,456". */
export function formatTaka(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? '-' : '';
  const digits = String(Math.abs(rounded));
  let grouped = digits;
  if (digits.length > 3) {
    const last3 = digits.slice(-3);
    const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    grouped = `${rest},${last3}`;
  }
  return `${sign}৳${grouped}`;
}

/** Strips spaces/dashes/brackets; returns local 11-digit form (01XXXXXXXXX) or null if invalid. */
export function normalizeBdPhone(input: string): string | null {
  const cleaned = input.replace(/[\s\-().]/g, '');
  const m = cleaned.match(/^(?:\+?88)?(01[3-9]\d{8})$/);
  return m ? m[1] : null;
}

export function isValidBdPhone(input: string): boolean {
  return normalizeBdPhone(input) !== null;
}

export function orderTotal(items: WhatsAppOrderItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function buildOrderMessage(items: WhatsAppOrderItem[], customer: WhatsAppOrderCustomer): string {
  const lines: string[] = ['New order from rollers-republic-pitch.vercel.app', ''];
  items.forEach((item, idx) => {
    lines.push(
      `${idx + 1}. ${item.name} x ${item.quantity} @ ${formatTaka(item.price)} = ${formatTaka(item.price * item.quantity)}`,
    );
  });
  lines.push('', `Total: ${formatTaka(orderTotal(items))}`, '');
  lines.push(`Name: ${customer.name.trim()}`);
  lines.push(`Phone: ${normalizeBdPhone(customer.phone) ?? customer.phone.trim()}`);
  lines.push(`Address: ${customer.address.trim()}`);
  lines.push('Payment: Cash on delivery');
  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, number: string = siteConfig.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function guestCustomerId(): string {
  return `guest-${Date.now()}`;
}

/**
 * Opens WhatsApp. Must be called synchronously from a user tap/submit handler so
 * browsers don't popup-block it. On mobile, wa.me hands off to the WhatsApp app.
 * If a new tab is blocked, falls back to navigating the current tab.
 */
export function openWhatsApp(url: string): void {
  const win = window.open(url, '_blank');
  if (win) {
    try { win.opener = null; } catch { /* ignore */ }
  } else {
    window.location.href = url;
  }
}
