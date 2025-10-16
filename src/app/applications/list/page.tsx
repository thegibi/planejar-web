import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Tractor } from 'lucide-react';

// Dados mockados - depois substituir pelos dados do banco
const mockApplications = [
  {
    id: 1,
    farm: "Fazenda Santa Maria",
    applicationDate: "2024-03-15",
    plots: ["Talhão A1", "Talhão A2", "Talhão B1"],
    products: ["Herbicida Glifosato", "Inseticida Lambda"],
    status: "Concluída"
  },
  {
    id: 2,
    farm: "Fazenda Esperança",
    applicationDate: "2024-03-12", 
    plots: ["Talhão C1", "Talhão D2"],
    products: ["Fungicida Tebuconazol"],
    status: "Em andamento"
  },
  {
    id: 3,
    farm: "Fazenda Nova Vista",
    applicationDate: "2024-03-10",
    plots: ["Talhão X1", "Talhão X2", "Talhão Y1", "Talhão Y2"],
    products: ["Herbicida 2,4-D", "Adubo NPK"],
    status: "Planejada"
  },
  {
    id: 4,
    farm: "Fazenda Progresso",
    applicationDate: "2024-03-08",
    plots: ["Talhão Norte", "Talhão Sul"],
    products: ["Inseticida Clorpirifós", "Fungicida Azoxistrobina"],
    status: "Concluída"
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Concluída':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Em andamento':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Planejada':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export default async function ApplicationsPage() {
  return (
    <div className="py-10 px-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Aplicações</h1>
        <p className="text-gray-600">Gerenciar aplicações de defensivos e fertilizantes</p>
      </div>

      <div className="grid gap-4">
        {mockApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tractor className="h-5 w-5 text-green-600" />
                    {application.farm}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(application.applicationDate).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-3">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-sm text-gray-700 mb-2">
                    <MapPin className="h-4 w-4" />
                    Talhões
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {application.plots.map((plot, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {plot}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Produtos Aplicados
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {application.products.map((product, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockApplications.length === 0 && (
        <div className="text-center py-12">
          <Tractor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Nenhuma aplicação encontrada
          </h3>
          <p className="text-gray-500">
            Cadastre uma nova aplicação para começar
          </p>
        </div>
      )}
    </div>
  );
}