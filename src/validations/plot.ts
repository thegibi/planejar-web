import z from "zod";

export const plotSchema = z.object({
  name: z.string().min(1, 'O nome do talhão é obrigatório.'),
  area: z.coerce.number().min(0.01, 'A área deve ser um número maior que zero.'),
  farmId: z.coerce.number().int('Selecione uma fazenda válida.'),
});
