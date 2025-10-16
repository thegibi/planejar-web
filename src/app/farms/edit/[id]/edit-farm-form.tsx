'use client';

import { updateFarm } from '@/actions/farm';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Owner {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
}

interface Farm {
  id: number;
  name: string;
  location: string;
  area: number;
  sprayTank: string | null;
  fertilizerSpreader: string | null;
  ownerId: number;
  owner: Owner;
}

interface EditFarmFormProps {
  farm: Farm;
  owners: Owner[];
}

export default function EditFarmForm({ farm, owners }: EditFarmFormProps) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await updateFarm(farm.id, formData);
    
    if (result?.success) {
      toast.success(result.message);
      router.push('/farms/list');
    } else {
      toast.error(result?.message || 'Erro ao atualizar fazenda');
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Editar Fazenda: {farm.name}</h1>

      <form action={handleSubmit} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome da Fazenda</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Ex: Fazenda Esperança" 
            defaultValue={farm.name}
            required 
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor="location">Localidade</Label>
          <Input 
            id="location" 
            name="location" 
            type="text" 
            placeholder="Ex: Alta Floresta" 
            defaultValue={farm.location}
            required 
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
            defaultValue={farm.area.toString()}
            required 
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
            defaultValue={farm.ownerId}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione um Proprietário</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className='flex gap-2 justify-between mt-6'>
          <BackButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}