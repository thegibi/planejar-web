import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function FarmsPage() {
  const farms = await prisma.farm.findMany({
    include: {
      owner: true,
      plots: true,
    },
  });


  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tabela de Fazendas</h1>
        <Link href="/farms/create">
          <Button>Cadastrar Fazenda</Button>
        </Link>
      </div>

      {farms.length > 0 ? (
        <Table>
          <TableCaption>Uma lista das fazendas cadastradas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Fazenda</TableHead>
              <TableHead>Nome do Proprietário</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Tanque de Pulverização (lt)</TableHead>
              <TableHead>Distribuidor de Adubo</TableHead>
              <TableHead>Talhões</TableHead>
              <TableHead>Localidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <TableRow key={farm.id}>
                <TableCell>{farm.name}</TableCell>
                <TableCell>{farm.owner.name}</TableCell>
                <TableCell>{farm.area} (ha)</TableCell>
                <TableCell>{farm.sprayTank} (lt)</TableCell>
                <TableCell>{farm.fertilizerSpreader}</TableCell>
                <TableCell>
                  <Link href={`/farms/${farm.id}/plots`}>
                    <Button variant="link" className='cursor-pointer'>Ver Talhões</Button>
                  </Link>
                </TableCell>
                <TableCell>{farm.location}</TableCell>
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