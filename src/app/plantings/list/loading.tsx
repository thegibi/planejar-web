import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Plantios"
      createButtonText="Cadastrar Plantio"
      createButtonHref="/plantings/create"
      columns={7}
      headers={["Cultura", "Variedade", "População", "Fazenda", "Talhão", "Data do Plantio", "Editar"]}
      caption="Uma lista dos plantios registrados."
      rows={6}
    />
  );
}