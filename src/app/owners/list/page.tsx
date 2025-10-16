import { BackButton } from '@/components/back-button';
import { DeleteOwnerButton, EditOwnerButton, OwnerSearch } from '@/components/owners';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/utils/format-phone';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

interface Owner {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
}

export default async function OwnersPage({ searchParams }: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const searchTerm = (await searchParams).search?.toString() || '';
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = searchTerm ? {
    OR: [
      {
        name: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      },
      {
        email: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      },
    ],
  } : {};

  const [owners, totalCount] = await Promise.all([
    prisma.owner.findMany({
      where: whereClause,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { name: 'asc' },
    }),
    prisma.owner.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-12 px-5">
      <h1 className="text-2xl font-bold text-green-600">Tabela de Proprietários</h1>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1">
          <OwnerSearch />
        </div>
        <div className="flex-shrink-0 flex gap-2">
          <BackButton />
          <Link href="/owners/create">
            <Button variant="default">Cadastrar</Button>
          </Link>
        </div>
      </div>

      {owners.length > 0 ? (
        <Table>
          <TableCaption>Tabela dos proprietários cadastrados</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className='text-right'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {owners.map((owner: Owner) => (
              <TableRow key={owner.id} className="even:bg-gray-50">
                <TableCell className='capitalize'>{owner.name.toLowerCase()}</TableCell>
                <TableCell>{owner.phone ? formatPhoneNumber(owner.phone) : 'N/A'}</TableCell>
                <TableCell>{owner.email || 'N/A'}</TableCell>
                <TableCell className='text-right'>
                  <div className="flex gap-2 justify-end">
                    <EditOwnerButton ownerId={owner.id} />
                    <DeleteOwnerButton ownerId={owner.id} ownerName={owner.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum proprietário cadastrado ainda.</p>
      )}

       <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}