import { updateClient } from '@/actions/client';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

export default async function EditClientPage(
  props: PageProps<'/clients/edit/[id]'>
) {
  const { id } = await props.params;
  const clientId = parseInt(id);

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

  const updateClientWithId = updateClient.bind(null, clientId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Editar Cliente: {client.name}</h1>

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
       <div className='flex justify-between'>
         <BackButton />
         <SubmitButton />
       </div>
      </form>
    </div>
  );
}