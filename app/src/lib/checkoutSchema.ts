import * as z from 'zod';
import { isValidBdPhone } from './whatsappOrder';

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, 'First name is too short'),
  lastName: z.string().trim().min(2, 'Last name is too short'),
  // Guest checkout: email and postal code are optional.
  email: z.union([z.literal(''), z.string().email('Invalid email address')]).optional(),
  phone: z.string().refine(isValidBdPhone, 'Enter a valid Bangladeshi mobile number (01XXXXXXXXX)'),
  address: z.string().trim().min(5, 'Address must be fully specified'),
  city: z.string().trim().min(2, 'City is required'),
  postalCode: z.union([z.literal(''), z.string().min(4, 'Postal code is required')]).optional(),
  // Only Cash on Delivery is live; bKash/Nagad are shown as "Coming soon".
  paymentMethod: z.enum(['cod', 'bkash', 'nagad']).refine((v): boolean => v === 'cod', 'Only Cash on Delivery is available right now'),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;
