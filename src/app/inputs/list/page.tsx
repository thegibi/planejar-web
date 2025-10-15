import { BackButton } from '@/components/back-button';
import { DeleteInputButton } from '@/components/delete-input-button';
import { EditInputButton } from '@/components/edit-input-button';
import InputSearch from '@/components/input-search';
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
  const searchTerm = (await searchParams).search?.toString() || '';
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereCondition = searchTerm
    ? {
        OR: [
          {
            class: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            commercialBrand: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
        ],
      }
    : {};

  const [inputs, totalCount] = await Promise.all([
    prisma.input.findMany({
      where: whereCondition,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { id: 'asc' },
    }),
    prisma.input.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-green-600">Tabela de Insumos</h1>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1">
          <InputSearch />
        </div>
        <div className="flex-shrink-0 flex gap-2">
          <BackButton />
          <Link href="/inputs/create">
            <Button variant="default">Cadastrar Insumo</Button>
          </Link>
        </div>
      </div>

      {inputs.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos insumos cadastrados.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Classe</TableHead>
              <TableHead>Marca Comercial</TableHead>
              <TableHead>Ingrediente Ativo</TableHead>
              <TableHead>Unidade de Medida (kg/lt)</TableHead>
              <TableHead className='text-right'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inputs.map((input) => (
              <TableRow key={input.id} className="even:bg-gray-50">
                <TableCell className='capitalize'>{input.class.toLowerCase()}</TableCell>
                <TableCell className='uppercase'>{input.commercialBrand.toUpperCase()}</TableCell>
                <TableCell className='capitalize'>{input.activeIngredient.toLowerCase()}</TableCell>
                <TableCell className='capitalize'>{input.unitOfMeasure.toLowerCase()}</TableCell>
                <TableCell className='text-right'>
                  <div className="flex gap-2 justify-end">
                    <EditInputButton inputId={input.id} />
                    <DeleteInputButton inputId={input.id} inputName={input.commercialBrand} />
                  </div>
                </TableCell>
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