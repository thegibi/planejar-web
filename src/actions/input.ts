import prisma from "@/lib/prisma";
import { inputSchema } from "@/validations/input";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInput(formData: FormData) {
  'use server';

  const rawFormData = {
    class: formData.get('class'),
    commercialBrand: formData.get('commercialBrand'),
    activeIngredient: formData.get('activeIngredient'),
    unitOfMeasure: formData.get('unitOfMeasure'),
  };

  const validation = inputSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.input.create({
      data: validation.data,
    });
    console.log('Insumo criado com sucesso!');
  } catch (error)
  {
    console.error('Erro ao criar insumo:', error);
  }

  revalidatePath('/inputs/list');
  redirect('/inputs/list');
}