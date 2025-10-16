'use server';

import prisma from '@/lib/prisma';
import { ownerSchema } from '@/validations/owner';
import { revalidatePath } from 'next/cache';

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
    return {
      success: false,
      message: 'Dados inválidos. Verifique os campos e tente novamente.',
      errors
    };
  }

  try
  {
    await prisma.owner.create({
      data: validation.data,
    });

    revalidatePath('/owners/list');

    return {
      success: true,
      message: 'Proprietário cadastrado com sucesso!'
    };
  } catch (error)
  {
    return {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    };
  }
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
    return {
      success: false,
      message: 'Dados inválidos. Verifique os campos e tente novamente.',
      errors
    };
  }

  try
  {
    await prisma.owner.update({
      where: {
        id: id,
      },
      data: validation.data,
    });

    revalidatePath('/owners/list');

    return {
      success: true,
      message: 'Proprietário atualizado com sucesso!'
    };
  } catch (error)
  {
    console.error('Erro ao atualizar proprietário:', error);
    return {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    };
  }
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