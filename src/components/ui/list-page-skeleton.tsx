import { Button } from '@/components/ui/button';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import Link from 'next/link';

interface ListPageSkeletonProps {
  /**
   * Título da página
   */
  title: string;
  /**
   * Texto do botão de cadastro
   */
  createButtonText: string;
  /**
   * Link para a página de cadastro
   */
  createButtonHref: string;
  /**
   * Número de colunas da tabela
   */
  columns: number;
  /**
   * Cabeçalhos das colunas
   */
  headers?: string[];
  /**
   * Caption da tabela
   */
  caption?: string;
  /**
   * Número de linhas do skeleton
   */
  rows?: number;
}

export function ListPageSkeleton({ 
  title, 
  createButtonText, 
  createButtonHref, 
  columns,
  headers,
  caption,
  rows = 5
}: ListPageSkeletonProps) {
  return (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="flex justify-end mb-6">
        <Link href={createButtonHref}>
          <Button>{createButtonText}</Button>
        </Link>
      </div>
      
      <TableSkeleton 
        columns={columns}
        rows={rows}
        headers={headers}
        caption={caption}
      />
    </div>
  );
}