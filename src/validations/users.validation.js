import { z } from 'zod';

export const userIdSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  role: z.enum(['user', 'admin']).optional(),
});
