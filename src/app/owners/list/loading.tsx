import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Proprietários"
      createButtonText="Cadastrar"
      createButtonHref="/owners/create"
      columns={4}
      headers={["Nome", "Email", "Telefone", "Ações"]}
      caption="Uma tabela dos proprietários cadastrados."
      rows={6}
    />
  );
}