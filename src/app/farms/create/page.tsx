import { createFarm } from '@/actions/farm';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';




export default async function CreateFarmPage() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Cadastrar Fazenda</h1>

      <form action={createFarm} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome da Fazenda</Label>
          <Input id="name" name="name" type="text" placeholder="Ex: Fazenda Esperança" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="location">Localidade</Label>
          <Input id="location" name="location" type="text" placeholder="Ex: Alta Floresta" required />
        </div>
                <div>
          <Label className='mb-2' htmlFor="area">Área (ha)</Label>
          <Input id="area" name="area" type="number" step="0.01" placeholder="Ex: 150.75" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="sprayTank">Tanque de Pulverização</Label>
          <Input id="sprayTank" name="sprayTank" type="text" placeholder="Ex: 1000L" />
        </div>
        <div>
          <Label className='mb-2' htmlFor="fertilizerSpreader">Distribuidor de Adubo</Label>
          <Input id="fertilizerSpreader" name="fertilizerSpreader" type="text" placeholder="Ex: Modelo ABC" />
        </div>

        <div>
          <Label className='mb-2' htmlFor="ownerId">Proprietário</Label>
          <select id="ownerId" name="ownerId" required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecione um Proprietário</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex gap-2 justify-between mt-6'>
          <SubmitButton />
          <BackButton />
        </div>
      </form>
    </div>
  );
}
