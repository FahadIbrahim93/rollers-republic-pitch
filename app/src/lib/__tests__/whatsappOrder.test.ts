import { describe, it, expect } from 'vitest';
import {
  buildOrderMessage, buildWhatsAppUrl, formatTaka, isValidBdPhone, normalizeBdPhone, orderTotal,
} from '../whatsappOrder';
import { siteConfig } from '../config';

const items = [
  { name: 'RAW Classic King Size', quantity: 2, price: 350 },
  { name: 'Elements & Co "Slim" #1', quantity: 1, price: 125000 },
];
const customer = { name: '  Rahim Uddin ', phone: '+880 1712-345678', address: 'House 12, Road 5, Dhanmondi, Dhaka' };

describe('formatTaka', () => {
  it('uses ৳ and Bangladeshi lakh grouping', () => {
    expect(formatTaka(0)).toBe('৳0');
    expect(formatTaka(350)).toBe('৳350');
    expect(formatTaka(1250)).toBe('৳1,250');
    expect(formatTaka(125000)).toBe('৳1,25,000');
    expect(formatTaka(12345678)).toBe('৳1,23,45,678');
    expect(formatTaka(99.6)).toBe('৳100');
  });
});

describe('BD phone', () => {
  it('normalizes to 01XXXXXXXXX', () => {
    expect(normalizeBdPhone('+880 1712-345678')).toBe('01712345678');
    expect(normalizeBdPhone('8801712345678')).toBe('01712345678');
    expect(normalizeBdPhone('01712345678')).toBe('01712345678');
  });
  it('rejects invalid numbers', () => {
    expect(isValidBdPhone('01212345678')).toBe(false);
    expect(isValidBdPhone('0171234567')).toBe(false);
    expect(isValidBdPhone('')).toBe(false);
  });
});

describe('buildOrderMessage', () => {
  const msg = buildOrderMessage(items, customer);
  it('lists each item with qty, unit price and line total', () => {
    expect(msg).toContain('1. RAW Classic King Size x 2 @ ৳350 = ৳700');
    expect(msg).toContain('2. Elements & Co "Slim" #1 x 1 @ ৳1,25,000 = ৳1,25,000');
  });
  it('includes grand total, customer details and COD', () => {
    expect(orderTotal(items)).toBe(125700);
    expect(msg).toContain('Total: ৳1,25,700');
    expect(msg).toContain('Name: Rahim Uddin');
    expect(msg).toContain('Phone: 01712345678');
    expect(msg).toContain('Address: House 12, Road 5, Dhanmondi, Dhaka');
    expect(msg).toContain('Payment: Cash on delivery');
  });
});

describe('buildWhatsAppUrl', () => {
  it('targets the order number and round-trips the encoded message', () => {
    const msg = buildOrderMessage(items, customer);
    const url = buildWhatsAppUrl(msg);
    expect(siteConfig.whatsappNumber).toBe('8801711626210');
    expect(url.startsWith('https://wa.me/8801711626210?text=')).toBe(true);
    // &, #, quotes, newlines and ৳ must all be percent-encoded
    const query = url.split('?text=')[1];
    expect(query).not.toMatch(/[&#\s"৳]/);
    expect(query).toContain('%E0%A7%B3'); // ৳
    expect(query).toContain('%0A'); // newline
    expect(new URL(url).searchParams.get('text')).toBe(msg);
  });
});
