import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

export default async function InputsPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [inputs, totalCount] = await Promise.all([
    prisma.input.findMany({
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { id: 'asc' },
    }),
    prisma.input.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
            <TableRow className="first:bg-gray-200">
              <TableHead>Classe</TableHead>
              <TableHead>Marca Comercial</TableHead>
              <TableHead>Ingrediente Ativo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inputs.map((input) => (
              <TableRow key={input.id} className="even:bg-gray-100">
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

       <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}