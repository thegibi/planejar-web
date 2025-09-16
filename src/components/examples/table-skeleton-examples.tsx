import { TableSkeleton } from '@/components/ui/table-skeleton';

// Exemplo de uso simples do TableSkeleton
export function ExampleTableSkeleton() {
  return (
    <div className="py-10">
      <h2 className="text-xl font-bold mb-4">Exemplo: Skeleton de Tabela Simples</h2>
      
      {/* Skeleton básico - 3 colunas, 5 linhas */}
      <TableSkeleton 
        columns={3}
        rows={5}
        caption="Carregando dados..."
      />
      
      <h2 className="text-xl font-bold mb-4 mt-8">Exemplo: Skeleton com Headers</h2>
      
      {/* Skeleton com headers definidos */}
      <TableSkeleton 
        columns={4}
        rows={6}
        headers={["Nome", "Email", "Telefone", "Ações"]}
        caption="Uma tabela dos clientes cadastrados."
      />
      
      <h2 className="text-xl font-bold mb-4 mt-8">Exemplo: Skeleton com Headers Animados</h2>
      
      {/* Skeleton com headers também em loading */}
      <TableSkeleton 
        columns={3}
        rows={4}
        skeletonHeaders={true}
        caption="Carregando estrutura da tabela..."
      />
    </div>
  );
}