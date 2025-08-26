import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const inputSchema = z.object({
  class: z.string().min(1, 'A classe é obrigatória.'),
  commercialBrand: z.string().min(1, 'A marca comercial é obrigatória.'),
  activeIngredient: z.string().min(1, 'O ingrediente ativo é obrigatório.'),
});


export async function createInput(formData: FormData) {
  'use server';

  const rawFormData = {
    class: formData.get('class'),
    commercialBrand: formData.get('commercialBrand'),
    activeIngredient: formData.get('activeIngredient'),
  };

  const validation = inputSchema.safeParse(rawFormData);

  if (!validation.success) {
    const errors = validation.error.issues;
    console.error('Erros de validação:', errors);
    return;
  }

  try {
    await prisma.input.create({
      data: validation.data,
    });
    console.log('Insumo criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar insumo:', error);
  }

  revalidatePath('/inputs/list');
  redirect('/inputs/list');
}

export default function CreateInputPage() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-10">Cadastrar Insumos</h1>

      <form action={createInput} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="class">Classe</Label>
          <Input id="class" name="class" type="text" placeholder="Ex: Herbicida, Fungicida" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="commercialBrand">Marca Comercial</Label>
          <Input id="commercialBrand" name="commercialBrand" type="text" placeholder="Ex: Roundup, Opera" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="activeIngredient">Ingrediente Ativo</Label>
          <Input id="activeIngredient" name="activeIngredient" type="text" placeholder="Ex: Glifosato, Azoxistrobina" required />
        </div>
        
        <SubmitButton />
      </form>
    </div>
  );
}
