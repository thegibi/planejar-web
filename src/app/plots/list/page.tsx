import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';


export default async function PlotsPage() {
  const plots = await prisma.plot.findMany({
    include: {
      farm: true,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tabela de Talhões</h1>
      <div className="flex justify-end mb-4">
        <Link href="/plots/create">
          <Button>Cadastrar Talhão</Button>
        </Link>
      </div>

      {plots.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos talhões cadastrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Área (ha)</TableHead>
              <TableHead>Fazenda</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plots.map((plot) => (
              <TableRow key={plot.id}>
                <TableCell className="font-medium">{plot.name}</TableCell>
                <TableCell>{plot.area} HA</TableCell>
                <TableCell>{plot.farm.name}</TableCell>
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