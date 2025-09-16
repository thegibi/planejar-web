import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Clientes"
      createButtonText="Cadastrar Cliente"
      createButtonHref="/clients/create"
      columns={4}
      headers={["Nome", "Email", "Telefone", "Ações"]}
      caption="Uma tabela dos clientes cadastrados."
      rows={6}
    />
  );
}