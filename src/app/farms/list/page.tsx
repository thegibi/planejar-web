import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaEye, FaMapMarkedAlt } from 'react-icons/fa';

export default async function FarmsPage() {
  const farms = await prisma.farm.findMany({
    include: {
      owner: true,
      plots: true,
    },
  });


  return (
    <div className="py-10">
        <h1 className="text-2xl font-bold">Tabela de Fazendas</h1>
      <div className="flex justify-end mb-6">
        <Link href="/farms/create">
          <Button>Cadastrar Fazenda</Button>
        </Link>
      </div>

      {farms.length > 0 ? (
        <Table>
          <TableCaption>Uma lista das fazendas cadastradas.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Nome da Fazenda</TableHead>
              <TableHead>Nome do Proprietário</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Tanque de Pulverização (lt)</TableHead>
              <TableHead>Distribuidor de Adubo</TableHead>
              <TableHead>Localidade</TableHead>
              <TableHead>Talhões</TableHead>
              <TableHead>Mapa</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <TableRow key={farm.id} className="even:bg-gray-50">
                <TableCell>{farm.name}</TableCell>
                <TableCell>{farm.owner.name}</TableCell>
                <TableCell>{farm.area}</TableCell>
                <TableCell>{farm.sprayTank}</TableCell>
                <TableCell>{farm.fertilizerSpreader}</TableCell>
                <TableCell>{farm.location}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link  href={`/farms/${farm.id}/plots`}>
                        <Button  className='cursor-pointer'variant="outline" size="icon">
                          <FaEye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver Talhões</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/farms/map/${farm.id}`}>
                        <Button variant="outline" size="icon">
                          <FaMapMarkedAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver no Mapa</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhuma fazenda cadastrada ainda.</p>
      )}
    </div>
  );
}