'use server';

import prisma from '@/lib/prisma';
import { plantingSchema } from "@/validations/plantings";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPlanting(formData: FormData) {

  const plotIds = formData.getAll('plotIds').map(id => parseInt(id.toString()));
  const varieties = formData.getAll('varieties').map(variety => variety.toString());

  const rawFormData = {
    crop: formData.get('crop'),
    varieties: varieties,
    population: formData.get('population'),
    plantingDate: formData.get('plantingDate'),
    farmId: formData.get('farmId'),
    plotIds: plotIds,
  };

  console.log('Raw form data:', rawFormData);

  const validation = plantingSchema.safeParse(rawFormData);
  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  console.log('Validated data:', validation.data);

  // Verificar se a fazenda existe
  const farmExists = await prisma.farm.findUnique({
    where: { id: validation.data.farmId }
  });

  if (!farmExists)
  {
    console.error('Fazenda não encontrada:', validation.data.farmId);
    return;
  }

  const plotsExist = await prisma.plot.findMany({
    where: {
      id: { in: validation.data.plotIds },
      farmId: validation.data.farmId
    }
  });

  if (plotsExist.length !== validation.data.plotIds.length)
  {
    console.error('Alguns talhões não existem ou não pertencem à fazenda:', {
      expected: validation.data.plotIds,
      found: plotsExist.map(p => p.id)
    });
    return;
  }

  try
  {
    await prisma.planting.create({
      data: {
        crop: validation.data.crop,
        varieties: validation.data.varieties,
        population: validation.data.population,
        plantingDate: new Date(validation.data.plantingDate),
        farmId: validation.data.farmId,
        plots: {
          connect: validation.data.plotIds.map((id) => ({ id })),
        },
      },
    });
    console.log('Plantio criado com sucesso!');
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

export async function getPlantingById(id: number) {
  return await prisma.planting.findUnique({
    where: { id },
    include: {
      farm: true,
      plots: true,
    },
  });
}

export async function updatePlanting(id: number, formData: FormData) {
  const plotIds = formData.getAll('plotIds').map(id => parseInt(id.toString()));
  const varieties = formData.getAll('varieties').map(variety => variety.toString());

  const rawFormData = {
    crop: formData.get('crop'),
    varieties: varieties,
    population: formData.get('population'),
    plantingDate: formData.get('plantingDate'),
    farmId: formData.get('farmId'),
    plotIds: plotIds,
  };

  console.log('Raw form data:', rawFormData);

  const validation = plantingSchema.safeParse(rawFormData);
  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  console.log('Validated data:', validation.data);

  // Verificar se a fazenda existe
  const farmExists = await prisma.farm.findUnique({
    where: { id: validation.data.farmId }
  });

  if (!farmExists)
  {
    console.error('Fazenda não encontrada:', validation.data.farmId);
    return;
  }

  const plotsExist = await prisma.plot.findMany({
    where: {
      id: { in: validation.data.plotIds },
      farmId: validation.data.farmId
    }
  });

  if (plotsExist.length !== validation.data.plotIds.length)
  {
    console.error('Alguns talhões não existem ou não pertencem à fazenda:', {
      expected: validation.data.plotIds,
      found: plotsExist.map(p => p.id)
    });
    return;
  }

  try
  {
    await prisma.planting.update({
      where: { id },
      data: {
        plots: {
          set: [],
        },
      },
    });

    await prisma.planting.update({
      where: { id },
      data: {
        crop: validation.data.crop,
        varieties: validation.data.varieties,
        population: validation.data.population,
        plantingDate: new Date(validation.data.plantingDate),
        farmId: validation.data.farmId,
        plots: {
          connect: validation.data.plotIds.map((id) => ({ id })),
        },
      },
    });
    console.log('Plantio atualizado com sucesso!');
  } catch (error)
  {
    console.error('Erro ao atualizar plantio:', error);
    return;
  }

  revalidatePath('/plantings/list');
  redirect('/plantings/list');
}