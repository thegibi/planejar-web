'use server';

import prisma from '@/lib/prisma';
import { farmSchema } from '@/validations/farm';
import { revalidatePath } from 'next/cache';

export async function createFarm(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    area: formData.get('area'),
    location: formData.get('location'),
    sprayTank: formData.get('sprayTank'),
    fertilizerSpreader: formData.get('fertilizerSpreader'),
    ownerId: formData.get('ownerId'),
  };

  const validation = farmSchema.safeParse(rawFormData);

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
    await prisma.farm.create({
      data: validation.data,
    });

    revalidatePath('/farms/list');

    return {
      success: true,
      message: 'Fazenda cadastrada com sucesso!'
    };

  } catch (error)
  {
    return {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    };
  }
}

export async function updateFarm(farmId: number, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    area: formData.get('area'),
    location: formData.get('location'),
    sprayTank: formData.get('sprayTank'),
    fertilizerSpreader: formData.get('fertilizerSpreader'),
    ownerId: formData.get('ownerId'),
  };

  const validation = farmSchema.safeParse(rawFormData);

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
    await prisma.farm.update({
      where: { id: farmId },
      data: validation.data,
    });

    revalidatePath('/farms/list');

    return {
      success: true,
      message: 'Fazenda atualizada com sucesso!'
    };
  } catch (error)
  {
    return {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    };
  }
}

export async function getFarmById(id: number) {
  return await prisma.farm.findUnique({
    where: { id },
    include: {
      plots: true
    }
  });
}

export async function deleteFarm(id: number) {
  try
  {
    await prisma.farm.delete({
      where: { id: id },
    });

    revalidatePath('/farms/list');

    return {
      success: true,
      message: `Fazenda ${id} deletada com sucesso!`
    };
  } catch (error)
  {
    return {
      success: false,
      message: 'Erro ao excluir a fazenda. Verifique se não há dados relacionados.'
    };
  }
}
