import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(4000),
  // Honeypot: debe venir vacio.
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof ContactSchema>;
