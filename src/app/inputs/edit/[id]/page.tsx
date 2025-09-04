import { updateInput } from '@/actions/input';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';

export default async function EditClientPage(
  props: PageProps<'/inputs/edit/[id]'>
) {
  const { id } = await props.params;
  const inputId = parseInt(id);

  const input = await prisma.input.findUnique({
    where: { id: inputId },
  });

  if (!input) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Insumo não encontrado.</p>
      </div>
    );
  }

  const updateInputWithId = updateInput.bind(null, inputId);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Insumo: {input.class}</h1>

      <form action={updateInputWithId} className="space-y-5">
       <div>
          <Label className='mb-2' htmlFor="class">Classe</Label>
          <Input id="class" name="class" type="text" placeholder="Ex: Herbicida, Fungicida" required defaultValue={input.class} />
        </div>
        <div>
          <Label className='mb-2' htmlFor="commercialBrand">Marca Comercial</Label>
          <Input id="commercialBrand" name="commercialBrand" type="text" placeholder="Ex: Roundup, Opera" required defaultValue={input.commercialBrand ?? ''} />
        </div>
        <div>
          <Label className='mb-2' htmlFor="activeIngredient">Ingrediente Ativo</Label>
          <Input id="activeIngredient" name="activeIngredient" type="text" placeholder="Ex: Glifosato, Azoxistrobina" required defaultValue={input.activeIngredient ?? ''} />
        </div>
        <div>
          <Label className='mb-2' htmlFor="unitOfMeasure">Unidade de Medida (kg/Lt)</Label>
          <Input id="unitOfMeasure" name="unitOfMeasure" type="text" placeholder="Ex: 1kg, 50Lt" required defaultValue={input.unitOfMeasure ?? ''} />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}