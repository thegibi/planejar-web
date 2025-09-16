import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Variedades"
      createButtonText="Cadastrar Variedade"
      createButtonHref="/varieties/create"
      columns={3}
      headers={["Nome da Variedade", "Ciclo (dias)", "Editar"]}
      caption="Uma lista das variedades cadastradas."
      rows={6}
    />
  );
}