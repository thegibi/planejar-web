'use server';

import prisma from "@/lib/prisma";
import { inputSchema } from "@/validations/input";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInput(formData: FormData) {
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


export async function updateInput(id: number, formData: FormData) {
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
    await prisma.input.update({
      where: { id: id },
      data: {
        class: validation.data.class,
        commercialBrand: validation.data.commercialBrand,
        activeIngredient: validation.data.activeIngredient,
        unitOfMeasure: validation.data.unitOfMeasure,
      },
    });
    console.log(`Insumo ${id} atualizado com sucesso!`);
  } catch (error)
  {
    console.error('Erro ao atualizar insumo:', error);
    return;
  }

  revalidatePath('/inputs/list');
  redirect('/inputs/list');
}