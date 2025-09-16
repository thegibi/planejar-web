'use server';

import prisma from '@/lib/prisma';
import { varietySchema } from '@/validations/variety';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createVariety(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    cycle: formData.get('cycle'),
  };

  const validation = varietySchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.variety.create({
      data: validation.data,
    });
    console.log('Variedade criada com sucesso!');
  } catch (error)
  {
    console.error('Erro ao criar variedade:', error);
    return;
  }

  revalidatePath('/varieties/list');
  redirect('/varieties/list');
}

export async function updateVariety(varietyId: number, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    cycle: formData.get('cycle'),
  };

  const validation = varietySchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.variety.update({
      where: { id: varietyId },
      data: validation.data,
    });
    console.log('Variedade atualizada com sucesso!');
  } catch (error)
  {
    console.error('Erro ao atualizar variedade:', error);
    return;
  }

  revalidatePath('/varieties/list');
  redirect('/varieties/list');
}

export async function deleteVariety(varietyId: number) {
  try
  {
    await prisma.variety.delete({
      where: { id: varietyId },
    });
    console.log('Variedade deletada com sucesso!');
  } catch (error)
  {
    console.error('Erro ao deletar variedade:', error);
    return;
  }

  revalidatePath('/varieties/list');
}