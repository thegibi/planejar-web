import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

export default async function VarietiesPage() {
  const varieties = await prisma.variety.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6">Tabela de Variedades</h1>
      <div className="flex justify-end mb-6">
        <Link href="/varieties/create">
          <Button>Cadastrar Variedade</Button>
        </Link>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/varieties/edit/${variety.id}`}>
                        <Button variant="outline" size="icon">
                          <FaPencilAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Variedade</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhuma variedade cadastrada ainda.</p>
      )}
    </div>
  );
}