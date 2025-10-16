import { BackButton } from '@/components/back-button';
import { CreateButton } from '@/components/custom/create-button';
import { ClickableFarmRow, FarmSearch } from '@/components/farms';
import Pagination from '@/components/pagination';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 20;

export default async function FarmsPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const searchTerm = (await searchParams).search?.toString() || '';
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = searchTerm ? {
    OR: [
      {
        name: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      },
      {
        owner: {
          name: {
            contains: searchTerm,
            mode: 'insensitive' as const,
          },
        },
      },
    ],
  } : {};

  const [farms, totalCount] = await Promise.all([
    prisma.farm.findMany({
      where: whereClause,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { id: 'asc' },
      include: {
        owner: true,
        plots: true,
      },
    }),
    prisma.farm.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);


  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-green-600">Tabela de Fazendas</h1>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1">
          <FarmSearch />
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <BackButton />
          <CreateButton path='/farms/create'/>
        </div>
      </div>

      {farms.length > 0 ? (
        <Table>
          <TableCaption>Tabela das fazendas cadastradas.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Fazenda</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Tanque de Pulverização (lt)</TableHead>
              <TableHead>Distribuidor de Adubo</TableHead>
              <TableHead>Localidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <ClickableFarmRow key={farm.id} farm={farm} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhuma fazenda cadastrada ainda.</p>
      )}

       <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}