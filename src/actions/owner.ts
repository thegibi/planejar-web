'use server';

import prisma from '@/lib/prisma';
import { ownerSchema } from '@/validations/owner';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOwner(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  const validation = ownerSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.owner.create({
      data: validation.data,
    });
  } catch (error)
  {
    console.error('Erro ao criar proprietário:', error);
    return;
  }

  revalidatePath('/owners/list');
  redirect('/owners/list');
}

export async function updateOwner(id: number, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  const validation = ownerSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.owner.update({
      where: {
        id: id,
      },
      data: validation.data,
    });

    console.log(`Proprietário ${id} atualizado com sucesso!`);
  } catch (error)
  {
    console.error('Erro ao atualizar proprietário:', error);
    return;
  }

  revalidatePath('/owners/list');
  redirect('/owners/list');
}

export async function deleteOwner(id: number) {
  try
  {
    await prisma.owner.delete({
      where: { id }
    });
    console.log(`Proprietário ${id} deletado com sucesso!`);

    revalidatePath('/owners/list');

    return {
      success: true,
      message: 'Proprietário excluído com sucesso!'
    };

  } catch (error)
  {
    console.error('Erro ao deletar proprietário:', error);

    return {
      success: false,
      message: 'Erro ao excluir o proprietário. Verifique se não há dados relacionados.'
    };
  }
}