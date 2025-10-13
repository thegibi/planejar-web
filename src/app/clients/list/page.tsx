import { BackButton } from '@/components/back-button';
import ClientSearch from '@/components/client-search';
import { EditClientButton } from '@/components/edit-client-button';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/utils/format-phone';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

export default async function ClientsPage({ searchParams }: {
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

  const [clients, totalCount] = await Promise.all([
    prisma.client.findMany({
      where: whereClause,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { id: 'asc' },
    }),
    prisma.client.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-green-600">Tabela de Clientes</h1>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1">
          <ClientSearch />
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <BackButton />
          <Link href="/clients/create">
            <Button variant="default">Cadastrar Cliente</Button>
          </Link>
        </div>
      </div>
      
      {clients.length > 0 ? (
        <Table>
          <TableCaption>Uma tabela dos clientes cadastrados.</TableCaption>
          <TableHeader>
            <TableRow className="first:bg-gray-200">
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="even:bg-gray-50">
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{formatPhoneNumber(client.phone)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <EditClientButton clientId={client.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum cliente cadastrado ainda.</p>
      )}

       <div className="mt-8">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}