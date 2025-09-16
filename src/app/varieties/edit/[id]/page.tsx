import { updateVariety } from '@/actions/variety';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

export default async function EditVarietyPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const varietyId = parseInt(params.id);

  const variety = await prisma.variety.findUnique({
    where: { id: varietyId },
  });

  if (!variety) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Variedade não encontrada.</p>
      </div>
    );
  }

  const updateVarietyWithId = updateVariety.bind(null, varietyId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Variedade: {variety.name}</h1>

      <form action={updateVarietyWithId} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome da Variedade</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Ex: M8344" 
            required 
            defaultValue={variety.name}
          />
        </div>
        
        <div>
          <Label className='mb-2' htmlFor="cycle">Ciclo (dias)</Label>
          <Input 
            id="cycle" 
            name="cycle" 
            type="number" 
            min="1"
            placeholder="Ex: 120" 
            required 
            defaultValue={variety.cycle.toString()}
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}