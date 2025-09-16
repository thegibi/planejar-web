import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

export default async function PlantingsPage() {
  const plantings = await prisma.planting.findMany({
    include: {
      farm: true,
      plots: true,
    },
    orderBy: {
      plantingDate: 'desc',
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tabela de Plantios</h1>
      <div className="flex justify-end mb-4">
        <Link href="/plantings/create">
          <Button>Cadastrar Plantio</Button>
        </Link>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/plantings/edit/${planting.id}`}>
                        <Button variant="outline" size="icon">
                          <FaPencilAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Plantio</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum plantio cadastrado ainda.</p>
      )}
    </div>
  );
}