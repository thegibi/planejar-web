import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';


export default async function PlotsPage() {
  const plots = await prisma.plot.findMany({
    include: {
      farm: true,
    },
  });

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">Tabela de Talhões</h1>
      <div className="flex justify-end mb-6">
        <Link href="/plots/create">
          <Button>Cadastrar Talhão</Button>
        </Link>
      </div>

      {plots.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos talhões cadastrados.</TableCaption>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/plots/edit/${plot.id}`}>
                        <Button variant="outline" size="icon">
                          <FaPencilAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Talhão</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum talhão cadastrado ainda.</p>
      )}
    </div>
  );
}