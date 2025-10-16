import { updateOwner } from '@/actions/owner';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOwnerPage(props: PageProps) {
  const { id } = await props.params;
  const ownerId = parseInt(id);

  const owner = await prisma.owner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Proprietário não encontrado.</p>
      </div>
    );
  }

  const updateOwnerWithId = updateOwner.bind(null, ownerId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Editar Proprietário: {owner.name}</h1>
      <form action={updateOwnerWithId} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Nome Completo" 
            defaultValue={owner.name}
            required 
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="phone">Telefone</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="(00) 00000-0000" 
            defaultValue={owner.phone || ''} 
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="email@exemplo.com" 
            defaultValue={owner.email || ''} 
          />
        </div>
        <div className='flex justify-between'>
          <BackButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}