import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function InputsPage() {
  const inputs = await prisma.input.findMany();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tabela de Insumos</h1>
        <Link href="/inputs/create">
          <Button>Cadastrar Insumo</Button>
        </Link>
      </div>

      {inputs.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos insumos cadastrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Classe</TableHead>
              <TableHead>Marca Comercial</TableHead>
              <TableHead>Ingrediente Ativo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inputs.map((input) => (
              <TableRow key={input.id}>
                <TableCell className='capitalize'>{input.class}</TableCell>
                <TableCell className='uppercase'>{input.commercialBrand}</TableCell>
                <TableCell className='capitalize'>{input.activeIngredient}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum insumo cadastrado ainda.</p>
      )}
    </div>
  );
}