import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'O nome do cliente é obrigatório.'),
  phone: z.string().optional(),
  email: z.email('Email inválido.').optional(),
});
