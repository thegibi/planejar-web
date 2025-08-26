import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


// Esquema de validação com Zod
const clientSchema = z.object({
  name: z.string().min(1, 'O nome do cliente é obrigatório.'),
  phone: z.string().optional(),
  email: z.email('Email inválido.').optional(),
});


// --- Server Action ---
export async function createClient(formData: FormData) {
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
    await prisma.client.create({
      data: validation.data,
    });
    console.log('Cliente criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
  }

  revalidatePath('/clients/list');
  redirect('/clients/list');
}

// --- Componente do Formulário (Server Component) ---
export default function CreateClientPage() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-10">Cadastrar Cliente</h1>
      <form action={createClient} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome</Label>
          <Input id="name" name="name" type="text" placeholder="Nome Completo" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" />
        </div>
        <div>
          <Label className='mb-2' htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="email@exemplo.com" />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

