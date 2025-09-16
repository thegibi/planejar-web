import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Talhões"
      createButtonText="Cadastrar Talhão"
      createButtonHref="/plots/create"
      columns={4}
      headers={["Nome", "Área (ha)", "Fazenda", "Ações"]}
      caption="Uma lista dos talhões cadastrados."
      rows={6}
    />
  );
}