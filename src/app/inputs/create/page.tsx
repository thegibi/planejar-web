import { createInput } from '@/actions/input';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
