import z from "zod";

export const varietySchema = z.object({
  name: z.string().min(1, 'O nome da variedade é obrigatório.'),
  cycle: z.coerce.number().int().min(1, 'O ciclo deve ser um número maior que zero.'),
});

export type VarietyFormValues = z.infer<typeof varietySchema>;