import { BackButton } from '@/components/back-button';
import { DeleteInputButton, EditInputButton, InputClassFilter, InputSearch } from '@/components/inputs';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

interface Input {
  id: number;
  class: string;
  commercialBrand: string;
  activeIngredient: string;
  unitOfMeasure: string;
}

export default async function InputsPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  
  const searchTerm = Array.isArray(resolvedParams.search) 
    ? resolvedParams.search[0] || '' 
    : resolvedParams.search || '';
  
  const classFilter = Array.isArray(resolvedParams.class) 
    ? resolvedParams.class[0] || '' 
    : resolvedParams.class || '';
    
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const availableClasses = await (prisma as any).input.findMany({
      select: { class: true },
      distinct: ['class'],
      orderBy: { class: 'asc' }
    });

    const whereCondition: any = {};
    const conditions: any[] = [];

    if (classFilter) {
      conditions.push({
        class: {
          equals: classFilter,
          mode: 'insensitive' as const,
        }
      });
    }

    if (searchTerm) {
      conditions.push({
        OR: [
          {
            commercialBrand: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            activeIngredient: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
        ]
      });
    }

    if (conditions.length > 0) {
      whereCondition.AND = conditions;
    }

    const [inputs, totalCount] = await Promise.all([
      (prisma as any).input.findMany({
        where: whereCondition,
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: { id: 'asc' },
      }),
      (prisma as any).input.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
      <div className="py-10">
        <h1 className="text-2xl font-bold text-green-600">Tabela de Insumos</h1>
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 flex gap-4">
            <InputClassFilter availableClasses={availableClasses} />
            <div className="flex-1">
              <InputSearch placeholder="Buscar por marca comercial ou ingrediente ativo..." />
            </div>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <BackButton />
            <Link href="/inputs/create">
              <Button variant="default">Cadastrar</Button>
            </Link>
          </div>
        </div>

        {inputs.length > 0 ? (
          <Table>
            <TableCaption>Uma lista dos insumos cadastrados.</TableCaption>
            <TableHeader>
              <TableRow className="first:bg-gray-200">
                <TableHead>Classe</TableHead>
                <TableHead>Marca Comercial</TableHead>
                <TableHead>Ingrediente Ativo</TableHead>
                <TableHead>Unidade de Medida (kg/lt)</TableHead>
                <TableHead className='text-right'>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inputs.map((input: Input) => (
                <TableRow key={input.id} className="even:bg-gray-50">
                  <TableCell className='capitalize'>{input.class.toLowerCase()}</TableCell>
                  <TableCell className='uppercase'>{input.commercialBrand.toUpperCase()}</TableCell>
                  <TableCell className='capitalize'>{input.activeIngredient.toLowerCase()}</TableCell>
                  <TableCell className='capitalize'>{input.unitOfMeasure.toLowerCase()}</TableCell>
                  <TableCell className='text-right'>
                    <div className="flex gap-2 justify-end">
                      <EditInputButton inputId={input.id} />
                      <DeleteInputButton inputId={input.id} inputName={input.commercialBrand} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500">Nenhum insumo cadastrado ainda.</p>
        )}

         <div className="mt-8">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
    return (
      <div className="py-10">
        <h1 className="text-2xl font-bold text-green-600">Tabela de Insumos</h1>
        <p className="text-center text-red-500">Erro ao carregar insumos. Tente novamente.</p>
      </div>
    );
  }
}