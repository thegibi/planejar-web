'use server';

import prisma from '@/lib/prisma';
import { clientSchema } from '@/validations/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createClient(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  const validation = clientSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.client.create({
      data: validation.data,
    });
  } catch (error)
  {
    console.error('Erro ao criar cliente:', error);
  }

  revalidatePath('/clients/list');
  redirect('/clients/list');
}


export async function updateClient(id: number, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  const validation = clientSchema.safeParse(rawFormData);

  if (!validation.success)
  {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try
  {
    await prisma.client.update({
      where: { id: id },
      data: {
        name: validation.data.name,
        phone: validation.data.phone,
        email: validation.data.email,
      },
    });
    console.log(`Cliente ${id} atualizado com sucesso!`);
  } catch (error)
  {
    console.error('Erro ao atualizar cliente:', error);
    return;
  }

  revalidatePath('/clients/list');
  redirect('/clients/list');
}

export async function deleteClient(id: number) {
  try
  {
    await prisma.client.delete({
      where: { id: id },
    });
    console.log(`Cliente ${id} deletado com sucesso!`);

    revalidatePath('/clients/list');

    return {
      success: true,
      message: 'Cliente excluído com sucesso!'
    };
  } catch (error)
  {
    console.error('Erro ao deletar cliente:', error);

    return {
      success: false,
      message: 'Erro ao excluir o cliente. Verifique se não há dados relacionados.'
    };
  }
}
