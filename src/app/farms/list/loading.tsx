import { ListPageSkeleton } from '@/components/ui/list-page-skeleton';

export default function Loading() {
  return (
    <ListPageSkeleton
      title="Tabela de Fazendas"
      createButtonText="Cadastrar Fazenda"
      createButtonHref="/farms/create"
      columns={10}
      headers={[
        "Fazenda", 
        "Proprietário", 
        "Área (ha)", 
        "Tanque de Pulverização (lt)", 
        "Distribuidor de Adubo", 
        "Localidade", 
        "Talhões", 
        "Mapa", 
        "Detalhes", 
        "Ações"
      ]}
      caption="Uma lista das fazendas cadastradas."
      rows={5}
    />
  );
}