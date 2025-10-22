import { createVariety } from '@/actions/variety';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateVarietyPage() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Cadastrar Variedade</h1>

      <form action={createVariety} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome da Variedade</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Ex: M8344" 
            required 
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