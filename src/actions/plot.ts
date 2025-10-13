'use server';

import prisma from "@/lib/prisma";
import { plotSchema } from "@/validations/plot";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlot(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    area: formData.get('area'),
    farmId: formData.get('farmId'),
  };

  const validation = plotSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.plot.create({
      data: validation.data,
    });
    console.log('Talhão criado com sucesso!');
  } catch (error)
  {
    console.error('Erro ao criar talhão:', error);
  }

  revalidatePath('/plots/list');
  redirect('/plots/list');
}

export async function updatePlot(id: number, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    area: formData.get('area'),
    farmId: formData.get('farmId'),
  };

  const validation = plotSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.plot.update({
      where: { id: id },
      data: {
        name: validation.data.name,
        area: validation.data.area,
        farmId: validation.data.farmId,
      },
    });
    console.log(`Talhão ${id} atualizado com sucesso!`);
  } catch (error)
  {
    console.error('Erro ao atualizar talhão:', error);
    return;
  }

  revalidatePath('/plots');
  redirect('/plots');
}

export async function deletePlot(id: number) {
  try
  {
    await prisma.plot.delete({
      where: { id: id },
    });
    console.log(`Talhão ${id} deletado com sucesso!`);

    revalidatePath('/plots/list');

    return {
      success: true,
      message: 'Talhão excluído com sucesso!'
    };
  } catch (error)
  {
    console.error('Erro ao deletar talhão:', error);

    return {
      success: false,
      message: 'Erro ao excluir o talhão. Verifique se não há dados relacionados.'
    };
  }
}