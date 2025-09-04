import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function PlotsByFarmPage(props: PageProps<'/farms/[id]/plots'>) {
  const { id } = await props.params;
  const farmId = parseInt(id);

  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
    select: {
      name: true,
      plots: {
        select: {
          id: true,
          name: true,
          area: true,
        },
      },
    },
  });

  if (!farm) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-red-500">Fazenda não encontrada.</p>
      </div>
    );
  }

  const plots = await prisma.plot.findMany({
    where: { farmId: farmId },
    include: { farm: true },
  });

  const totalArea = plots.reduce((sum, plot) => sum + plot.area, 0) || 0;

  return (
    <div className="container mx-auto py-10">
        <h1 className="text-2xl">Talhões da Fazenda: <strong className='font-bold'>{farm.name}</strong></h1>
        <p className="text-xl mb-4">Área Total dos Talhões: <strong className='font-bold'>{totalArea.toFixed(2)} (ha)</strong></p>
      <div className="flex justify-end mb-4">
        <Link href="/plots/create">
          <Button>Cadastrar Talhão</Button>
        </Link>
      </div>
      
      {plots.length > 0 ? (
        <Table>
          <TableCaption>Uma lista dos talhões cadastrados para esta fazenda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Área (ha)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plots.map((plot) => (
              <TableRow key={plot.id}>
                <TableCell className='uppercase'>{plot.name.toLocaleUpperCase()}</TableCell>
                <TableCell>{plot.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum talhão cadastrado para esta fazenda ainda.</p>
      )}
    </div>
  );
}