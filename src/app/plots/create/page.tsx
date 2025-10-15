import { createPlot } from '@/actions/plot';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

export default async function CreatePlotPage() {
  const farms = await prisma.farm.findMany();

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Cadastrar Talhão</h1>

      <form action={createPlot} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome do Talhão</Label>
          <Input id="name" name="name" type="text" placeholder="Ex: Talhão do Milho" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="area">Área (ha)</Label>
          <Input id="area" name="area" type="number" step="0.01" placeholder="Ex: 50.3" required />
        </div>

        <div>
          <Label className='mb-2' htmlFor="farmId">Fazenda</Label>
          <select id="farmId" name="farmId" required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecione uma Fazenda</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className='flex justify-between'>
          <BackButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}