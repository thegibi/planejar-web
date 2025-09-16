import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Insumos"
      createButtonText="Cadastrar Insumo"
      createButtonHref="/inputs/create"
      columns={5}
      headers={["Classe", "Marca Comercial", "Ingrediente Ativo", "Unidade de Medida", "Ações"]}
      caption="Uma lista dos insumos cadastrados."
      rows={6}
    />
  );
}