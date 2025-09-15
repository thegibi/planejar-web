import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/utils/format-phone';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

export default async function ClientsPage() {
  const clients = await prisma.client.findMany();

  return (
    <div className="py-10">
        <h1 className="text-2xl font-bold">Tabela de Clientes</h1>
      <div className="flex justify-end mb-6">
        <Link href="/clients/create">
          <Button>Cadastrar Cliente</Button>
        </Link>
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
                <TableCell className="text-right space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/clients/edit/${client.id}`}>
                        <Button variant="outline" size="icon">
                          <FaPencilAlt className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Cliente</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Nenhum cliente cadastrado ainda.</p>
      )}
    </div>
  );
}