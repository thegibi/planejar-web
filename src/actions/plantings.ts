'use server';

import prisma from '@/lib/prisma';
import { plantingSchema } from "@/validations/plantings";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPlanting(formData: FormData) {

  const rawFormData = {
    crop: formData.get('crop'),
    variety: formData.get('variety'),
    population: formData.get('population'),
    plantingDate: formData.get('plantingDate'),
    farmId: formData.get('farmId'),
    plotId: formData.get('plotId'),
  };

  const validation = plantingSchema.safeParse(rawFormData);
  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.planting.create({
      data: {
        crop: validation.data.crop,
        variety: validation.data.variety,
        population: validation.data.population,
        plantingDate: new Date(validation.data.plantingDate),
        farmId: validation.data.farmId,
        plots: {
          connect: validation.data.plotIds.map((id) => ({ id })),
        },
      },
    });
  } catch (error)
  {
    console.error('Erro ao criar plantio:', error);
    return;
  }

  revalidatePath('/plantings/list');
  redirect('/plantings/list');
}

export async function getFarmsWithPlots() {
  return await prisma.farm.findMany({
    include: {
      plots: true,
    },
  });
}