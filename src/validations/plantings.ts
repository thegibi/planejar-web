import z from "zod";
export const plantingSchema = z.object({
  crop: z.string().min(1, 'A cultura é obrigatória.'),
  varieties: z.array(z.string().min(1, 'Variedade não pode estar vazia.')).min(1, 'Selecione pelo menos uma variedade.'),
  population: z.coerce.number().min(1, 'A população deve ser um número maior que zero.'),
  plantingDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "A data de plantio é inválida.",
  }),
  farmId: z.coerce.number().int().min(1, 'Selecione uma fazenda.'),
  plotIds: z.array(z.coerce.number().int()).min(1, 'Selecione pelo menos um talhão.'),
});

export type PlantingFormValues = z.infer<typeof plantingSchema>;