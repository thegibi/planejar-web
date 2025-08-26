import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const clientSchema = z.object({
  name: z.string().min(1, 'O nome do cliente é obrigatório.'),
  phone: z.string().optional(),
  email: z.string().email('Email inválido.').optional(),
});

export async function updateClient(id: number, formData: FormData) {
  'use server';

  const rawFormData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  const validation = clientSchema.safeParse(rawFormData);

  if (!validation.success) {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try {
    await prisma.client.update({
      where: { id: id },
      data: {
        name: validation.data.name,
        phone: validation.data.phone,
        email: validation.data.email,
      },
    });
    console.log(`Cliente ${id} atualizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return;
  }

  revalidatePath('/clients/list');
  redirect('/clients/list');
}

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const clientId = parseInt(params.id);

  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Cliente não encontrado.</p>
      </div>
    );
  }

  // Bind a Server Action com o ID do cliente
  const updateClientWithId = updateClient.bind(null, clientId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente: {client.name}</h1>

      <form action={updateClientWithId} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome do Cliente</Label>
          <Input id="name" name="name" type="text" placeholder="Ex: João da Silva" required defaultValue={client.name} />
        </div>
        <div>
          <Label className='mb-2' htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="text" placeholder="Ex: (00) 00000-0000" defaultValue={client.phone ?? ''} />
        </div>
        <div>
          <Label className='mb-2' htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Ex: joao@example.com" defaultValue={client.email ?? ''} />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}