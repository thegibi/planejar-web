import { BackButton } from '@/components/back-button';
import { CreateButton } from '@/components/custom/create-button';
import Pagination from '@/components/pagination';
import { DeletePlotButton, EditPlotButton, PlotSearch } from '@/components/plots';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 20;

export default async function PlotsPage({ searchParams }: {
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
        farm: {
          name: {
            contains: searchTerm,
            mode: 'insensitive' as const,
          },
        },
      },
    ],
  } : {};

  const [plots, totalCount] = await Promise.all([
    prisma.plot.findMany({
      where: whereClause,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { id: 'asc' },
      include: {
        farm: true,
      },
    }),
    prisma.plot.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold text-green-600">Tabela de Talhões</h1>
      <div className="flex items-center gap-6 my-6">
        <div className="flex-1">
          <PlotSearch />
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <BackButton />
          <CreateButton path='/plots/create'/>
        </div>
      </div>

      {plots.length > 0 ? (
        <Table>
          <TableCaption>Tabela dos talhões cadastrados.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Nome</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Fazenda</TableHead>
               <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plots.map((plot) => (
              <TableRow key={plot.id} className="even:bg-gray-50">
                <TableCell className="font-medium uppercase">{plot.name.toLocaleUpperCase()}</TableCell>
                <TableCell>{plot.area}</TableCell>
                <TableCell className='capitalize'>{plot.farm.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <EditPlotButton plotId={plot.id} />
                    <DeletePlotButton plotId={plot.id} plotName={plot.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum talhão cadastrado ainda.</p>
      )}

       <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}