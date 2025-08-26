import { z } from 'zod';

export const farmSchema = z.object({
  name: z.string().min(1, 'O nome da fazenda é obrigatório.'),
  area: z.coerce.number().min(0.01, 'A área deve ser um número maior que zero.'),
  location: z.string().min(1, 'A localidade é obrigatória.'),
  sprayTank: z.string().optional(),
  fertilizerSpreader: z.string().optional(),
  ownerId: z.coerce.number().int('Selecione um proprietário válido.'),
});
