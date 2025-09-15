import { updateFarm } from '@/actions/farm';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

export default async function EditFarmPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const farmId = parseInt(params.id);

  const [farm, clients] = await Promise.all([
    prisma.farm.findUnique({
      where: { id: farmId },
      include: { owner: true },
    }),
    prisma.client.findMany(),
  ]);

  if (!farm) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Fazenda não encontrada.</p>
      </div>
    );
  }

  const updateFarmWithId = updateFarm.bind(null, farmId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Fazenda: {farm.name}</h1>

      <form action={updateFarmWithId} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome da Fazenda</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Ex: Fazenda Esperança" 
            required 
            defaultValue={farm.name}
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="location">Localidade</Label>
          <Input 
            id="location" 
            name="location" 
            type="text" 
            placeholder="Ex: Alta Floresta" 
            required 
            defaultValue={farm.location}
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="area">Área (ha)</Label>
          <Input 
            id="area" 
            name="area" 
            type="number" 
            step="0.01" 
            placeholder="Ex: 150.75" 
            required 
            defaultValue={farm.area.toString()}
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="sprayTank">Tanque de Pulverização</Label>
          <Input 
            id="sprayTank" 
            name="sprayTank" 
            type="text" 
            placeholder="Ex: 1000L" 
            defaultValue={farm.sprayTank || ''}
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="fertilizerSpreader">Distribuidor de Adubo</Label>
          <Input 
            id="fertilizerSpreader" 
            name="fertilizerSpreader" 
            type="text" 
            placeholder="Ex: Modelo ABC" 
            defaultValue={farm.fertilizerSpreader || ''}
          />
        </div>

        <div>
          <Label className='mb-2' htmlFor="ownerId">Proprietário</Label>
          <select 
            id="ownerId" 
            name="ownerId" 
            required
            defaultValue={farm.ownerId}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione um Proprietário</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}