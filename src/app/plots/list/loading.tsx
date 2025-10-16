import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Talhões"
      createButtonText="Cadastrar"
      createButtonHref="/plots/create"
      columns={4}
      headers={["Nome", "Área (ha)", "Fazenda", "Ações"]}
      caption="Tabela dos talhões cadastrados."
      rows={12}
    />
  );
}