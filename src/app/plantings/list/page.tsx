import { BackButton } from '@/components/back-button';
import { EditPlantingButton } from '@/components/edit-planting-button';
import Pagination from '@/components/pagination';
import PlantingSearch from '@/components/planting-search';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

export default async function PlantingsPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const searchTerm = (await searchParams).search?.toString() || '';
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereCondition = searchTerm
    ? {
        OR: [
          {
            crop: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            varieties: {
              hasSome: [searchTerm],
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
          {
            plots: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive' as const,
                },
              },
            },
          },
        ],
      }
    : {};

  const [plantings, totalCount] = await Promise.all([
    prisma.planting.findMany({
      where: whereCondition,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        farm: true,
        plots: true,
      },
      orderBy: {
        plantingDate: 'desc',
      },
    }),
    prisma.planting.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-600">Tabela de Plantios</h1>
      <div className="flex items-center gap-6 my-6">
        <div className="flex-1">
          <PlantingSearch />
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <BackButton />
          <Link href="/plantings/create">
            <Button>Cadastrar Plantio</Button>
          </Link>
        </div>
      </div>

      {plantings.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos plantios registrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cultura</TableHead>
              <TableHead>Variedade</TableHead>
              <TableHead>População</TableHead>
              <TableHead>Fazenda</TableHead>
              <TableHead>Talhão</TableHead>
              <TableHead>Data do Plantio</TableHead>
              <TableHead className="text-right">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plantings.map((planting) => (
              <TableRow key={planting.id} className="even:bg-gray-100">
                <TableCell>{planting.crop.toLocaleUpperCase()}</TableCell>
                <TableCell>{planting.varieties.join(', ').toLocaleUpperCase()}</TableCell>
                <TableCell>{planting.population.toLocaleString()}</TableCell>
                <TableCell>{planting.farm.name}</TableCell>
                <TableCell>{planting.plots.map(plot => plot.name).join(', ').toLocaleUpperCase()}</TableCell>
                <TableCell>{new Date(planting.plantingDate).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-right">
                  <EditPlantingButton plantingId={planting.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum plantio cadastrado ainda.</p>
      )}
      
      <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}