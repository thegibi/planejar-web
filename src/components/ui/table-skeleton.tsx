import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
  /**
   * Número de colunas da tabela
   */
  columns: number;
  /**
   * Número de linhas a serem exibidas no skeleton
   */
  rows?: number;
  /**
   * Texto da caption da tabela
   */
  caption?: string;
  /**
   * Cabeçalhos das colunas (opcional, se não fornecido, mostra skeleton)
   */
  headers?: string[];
  /**
   * Se deve mostrar skeleton no header também
   */
  skeletonHeaders?: boolean;
}

export function TableSkeleton({ 
  columns, 
  rows = 5, 
  caption,
  headers,
  skeletonHeaders = false 
}: TableSkeletonProps) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow className="first:bg-gray-200">
          {Array.from({ length: columns }).map((_, index) => (
            <TableHead key={index} className={index === columns - 1 ? "text-right" : ""}>
              {skeletonHeaders ? (
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              ) : (
                headers?.[index] || (
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                )
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="even:bg-gray-50">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className={colIndex === columns - 1 ? "text-right" : ""}>
                {colIndex === columns - 1 ? (
                  // Última coluna (ações) - skeleton do botão
                  <div className="flex justify-end">
                    <div className="h-9 w-9 bg-gray-200 rounded border animate-pulse"></div>
                  </div>
                ) : (
                  // Outras colunas - skeleton de texto
                  <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                    colIndex === 0 ? 'w-32' : 
                    colIndex === 1 ? 'w-24' : 
                    'w-20'
                  }`}></div>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}