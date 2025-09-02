import z from "zod";

export const inputSchema = z.object({
  class: z.string().min(1, 'A classe é obrigatória.'),
  commercialBrand: z.string().min(1, 'A marca comercial é obrigatória.'),
  activeIngredient: z.string().min(1, 'O ingrediente ativo é obrigatório.'),
  unitOfMeasure: z.string().min(1, 'A unidade de medida é obrigatória.'),
});


