import { z } from 'zod';

export const ownerSchema = z.object({
  name: z.string().min(1, 'O nome do proprietário é obrigatório.'),
  phone: z.string().optional(),
  email: z.string().email('Email inválido.').optional().or(z.literal('')),
});