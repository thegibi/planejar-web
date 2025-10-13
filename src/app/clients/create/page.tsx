import { createClient } from '@/actions/client';
import { BackButton } from '@/components/back-button';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateClientPage() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-10">Cadastrar Cliente</h1>
      <form action={createClient} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="name">Nome</Label>
          <Input id="name" name="name" type="text" placeholder="Nome Completo" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" />
        </div>
        <div>
          <Label className='mb-2' htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="email@exemplo.com" />
        </div>
        <div className='flex justify-between'>
          <BackButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

