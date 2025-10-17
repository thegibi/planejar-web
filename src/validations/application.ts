import { z } from 'zod';

export const applicationSchema = z.object({
  farmId: z.number().int().positive({
    message: "ID da fazenda é obrigatório"
  }),
  plantingId: z.number().int().positive({
    message: "Plantio é obrigatório"
  }),
  applicationDate: z.date({
    message: "Data da aplicação é obrigatória"
  }),
  plotIds: z.array(z.number().int().positive()).min(1, {
    message: "Pelo menos um talhão deve ser selecionado"
  }),
  inputIds: z.array(z.number().int().positive()).min(1, {
    message: "Pelo menos um insumo deve ser selecionado"
  }),
  flowRate: z.number().positive().optional(),
  rowSpacing: z.number().positive().optional()
});

export const applicationFormSchema = z.object({
  plantingId: z.string().min(1, {
    message: "Plantio é obrigatório"
  }),
  applicationDate: z.string().min(1, {
    message: "Data da aplicação é obrigatória"
  }),
  plotIds: z.array(z.string()).min(1, {
    message: "Pelo menos um talhão deve ser selecionado"
  }),
  inputIds: z.array(z.string()).min(1, {
    message: "Pelo menos um insumo deve ser selecionado"
  }),
  flowRate: z.string().optional(),
  rowSpacing: z.string().optional()
});

export type ApplicationData = z.infer<typeof applicationSchema>;
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;