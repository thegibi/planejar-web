import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaEye, FaInfoCircle, FaMapMarkedAlt, FaPencilAlt } from 'react-icons/fa';

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
              <TableHead>Fazenda</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Tanque de Pulverização (lt)</TableHead>
              <TableHead>Distribuidor de Adubo</TableHead>
              <TableHead>Localidade</TableHead>
              <TableHead>Talhões</TableHead>
              <TableHead>Mapa</TableHead>
              <TableHead>Detalhes</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <TableRow key={farm.id} className="even:bg-gray-50">
                <TableCell className='capitalize'>{farm.name.toLocaleLowerCase()}</TableCell>
                <TableCell className='capitalize'>{farm.owner.name.toLocaleLowerCase()}</TableCell>
                <TableCell>{farm.area}</TableCell>
                <TableCell>{farm.sprayTank}</TableCell>
                <TableCell>{farm.fertilizerSpreader || <span className="text-gray-500">N/A</span>}</TableCell>
                <TableCell className='capitalize'>{farm.location.toLocaleLowerCase()}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/farms/details/${farm.id}`}>
                        <Button variant="outline" size="icon">
                          <FaInfoCircle className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver Detalhes</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/farms/edit/${farm.id}`}>
                        <Button variant="outline" size="icon">
                          <FaPencilAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Fazenda</p>
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