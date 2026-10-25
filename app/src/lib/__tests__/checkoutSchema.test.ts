import { describe, it, expect } from 'vitest';
import { checkoutSchema } from '../checkoutSchema';

const validOrder = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+8801712345678',
  address: 'House 12, Road 5, Gulshan',
  city: 'Dhaka',
  postalCode: '1212',
  paymentMethod: 'cod' as const,
};

describe('checkoutSchema', () => {
  it('accepts a valid order', () => {
    const result = checkoutSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it('rejects short first name', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, firstName: 'J' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('firstName');
    }
  });

  it('rejects short last name', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, lastName: 'D' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('rejects short phone number', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, phone: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });

  it('rejects short address', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, address: 'Home' });
    expect(result.success).toBe(false);
  });

  it('rejects short postal code', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, postalCode: '12' });
    expect(result.success).toBe(false);
  });

  it('rejects unknown payment method', () => {
    const result = checkoutSchema.safeParse({ ...validOrder, paymentMethod: 'bitcoin' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('paymentMethod');
    }
  });

  it('accepts cash on delivery only; bKash/Nagad are coming soon', () => {
    expect(checkoutSchema.safeParse({ ...validOrder, paymentMethod: 'cod' }).success).toBe(true);
    for (const method of ['bkash', 'nagad'] as const) {
      expect(checkoutSchema.safeParse({ ...validOrder, paymentMethod: method }).success).toBe(false);
    }
  });

  it('accepts Bangladeshi mobile formats and rejects others', () => {
    for (const phone of ['01712345678', '+8801712345678', '8801712345678', '017-1234-5678', '01912 345678']) {
      expect(checkoutSchema.safeParse({ ...validOrder, phone }).success).toBe(true);
    }
    for (const phone of ['0171234567', '01212345678', '+447700900123', '021234567890']) {
      expect(checkoutSchema.safeParse({ ...validOrder, phone }).success).toBe(false);
    }
  });

  it('allows guest checkout without email or postal code', () => {
    expect(checkoutSchema.safeParse({ ...validOrder, email: '', postalCode: '' }).success).toBe(true);
    const { email: _e, postalCode: _p, ...rest } = validOrder;
    void _e; void _p;
    expect(checkoutSchema.safeParse(rest).success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const { firstName: _omitted, ...withoutFirstName } = validOrder;
    void _omitted;
    const result = checkoutSchema.safeParse(withoutFirstName);
    expect(result.success).toBe(false);
  });
});
