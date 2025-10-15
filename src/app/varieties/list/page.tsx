import { BackButton } from '@/components/back-button';
import { EditVarietyButton } from '@/components/edit-variety-button';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import VarietySearch from '@/components/variety-search';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

export default async function VarietiesPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const searchTerm = (await searchParams).search?.toString() || '';
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereCondition = searchTerm
    ? {
        name: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      }
    : {};

  const [varieties, totalCount] = await Promise.all([
    prisma.variety.findMany({
      where: whereCondition,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.variety.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-600">Tabela de Variedades</h1>
      <div className="flex items-center gap-6 my-6">
        <div className="flex-1">
          <VarietySearch />
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <BackButton />
          <Link href="/varieties/create">
            <Button>Cadastrar Variedade</Button>
          </Link>
        </div>
      </div>

      {varieties.length > 0 ? (
        <Table>
          <TableCaption>Uma lista das variedades cadastradas.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Nome da Variedade</TableHead>
              <TableHead>Ciclo (dias)</TableHead>
              <TableHead className="text-right">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {varieties.map((variety) => (
              <TableRow key={variety.id} className="even:bg-gray-50">
                <TableCell className="uppercase">{variety.name}</TableCell>
                <TableCell>{variety.cycle}</TableCell>
                <TableCell className="text-right">
                  <EditVarietyButton varietyId={variety.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhuma variedade cadastrada ainda.</p>
      )}
      
      <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}