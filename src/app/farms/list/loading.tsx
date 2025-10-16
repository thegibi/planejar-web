import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Fazendas"
      createButtonText="Cadastrar"
      createButtonHref="/farms/create"
      columns={7}
      headers={[
        "Fazenda", 
        "Proprietário", 
        "Área (ha)", 
        "Tanque de Pulverização (lt)", 
        "Distribuidor de Adubo", 
        "Localidade", 
        "Ações"
      ]}
      caption="Tabela das fazendas cadastradas."
      rows={12}
    />
  );
}