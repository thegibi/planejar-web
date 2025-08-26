import prisma from '@/lib/prisma';
import { farmSchema } from '@/validations/farm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createFarm(formData: FormData) {
  'use server';

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
    return;
  }

  try
  {
    await prisma.farm.create({
      data: validation.data,
    });
    console.log('Fazenda criada com sucesso!');
  } catch (error)
  {
    console.error('Erro ao criar fazenda:', error);
  }

  revalidatePath('/farms/list');
  redirect('/farms/list');
}