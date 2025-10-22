'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronLeft, ChevronRight, Loader2, MapPin, Printer, Search, Tractor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Interfaces para tipagem
interface ApplicationData {
  id: number;
  applicationDate: string;
  plotIds: number[];
  inputIds: number[];
  flowRate?: number;
  rowSpacing?: number;
  farmId: number;
  plantingId: number;
  createdAt: string;
  updatedAt: string;
  farm: {
    id: number;
    name: string;
    location: string;
    owner: {
      name: string;
    };
  };
  planting: {
    id: number;
    crop: string;
    varieties: string[];
    plantingDate: string;
    population: number;
  };
  plots: {
    id: number;
    name: string;
    area: number;
  }[];
  inputs: {
    id: number;
    class: string;
    commercialBrand: string;
    activeIngredient: string;
    unitOfMeasure: string;
  }[];
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface ApiResponse {
  applications: ApplicationData[];
  pagination: PaginationData;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar aplicações
  const fetchApplications = async (page: number = 1, searchQuery: string = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`/api/applications?${params}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar aplicações');
      }

      const data: ApiResponse = await response.json();
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Erro ao buscar aplicações:', error);
      toast.error('Erro ao carregar aplicações');
    } finally {
      setLoading(false);
    }
  };

  // Carregar aplicações na inicialização
  useEffect(() => {
    fetchApplications(1, searchTerm);
  }, [searchTerm]);

  // Função para buscar
  const handleSearch = () => {
    setSearchTerm(search);
  };

  // Função para mudança de página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchApplications(newPage, searchTerm);
    }
  };


  const handlePrintApplication = (application: ApplicationData) => {
    const totalArea = application.plots.reduce((sum, plot) => sum + plot.area, 0);
    const hectarePerTank = application.flowRate ? (2000 / application.flowRate).toFixed(2) : 'N/A';
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Planilha de Aplicação</title>
          <style>
            @media print {
              @page {
                margin: 0.5in;
                size: A4;
              }
              body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                print-color-adjust: exact;
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
            }
            
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              background-color: white;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              overflow: hidden;
            }
            
            .header {
              border-bottom: 2px solid #3c7736;
              padding: 30px;
              text-center;
              background-color: white;
            }
            
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #3c7736;
              margin-bottom: 20px;
            }
            
            .title {
              font-size: 20px;
              font-weight: 600;
              color: #2f5d2a;
              margin-top: 20px;
              text-align: center;
            }
            
            .grid-3 {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
            }
            
            .grid-4 {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }
            
            .header-cell {
              background-color: #3c7736;
              color: white;
              padding: 12px;
              text-align: center;
              font-weight: 500;
              border-right: 1px solid #d1d5db;
              font-size: 14px;
            }
            
            .header-cell:last-child {
              border-right: none;
            }
            
            .data-cell {
              padding: 12px;
              text-align: center;
              font-weight: 500;
              color: #111827;
              border-right: 1px solid #d1d5db;
              border-bottom: 1px solid #d1d5db;
            }
            
            .data-cell:last-child {
              border-right: none;
            }
            
            .plots-header {
              background-color: #3c7736;
              color: white;
              padding: 12px;
              text-align: center;
              font-weight: 500;
              border-right: 1px solid #d1d5db;
            }
            
            .plots-header:last-child {
              border-right: none;
            }
            
            .plots-content {
              background-color: white;
              padding: 20px;
              text-align: center;
            }
            
            .plot-badge {
              background-color: #3c7736;
              color: white;
              padding: 8px 12px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 500;
              display: inline-block;
              margin: 4px;
            }
            
            .application-header {
              background-color: #223e1f;
              color: white;
              text-align: center;
              padding: 12px;
              font-weight: 500;
            }
            
            .products-header {
              background-color: #274b23;
              color: white;
            }
            
            .product-row {
              border-bottom: 1px solid #e5e7eb;
            }
            
            .product-row:nth-child(even) {
              background-color: #f0f9f0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header com logo -->
            <div class="header">
              <img src="/print-header-image.png" alt="Planejar Consultoria Agrícola" style="max-width: 100%; height: auto; margin-bottom: 20px;" />
              <div class="title">PLANILHA DE APLICAÇÃO</div>
            </div>

            <!-- Informações principais -->
            <div class="grid-3">
              <div class="header-cell">Proprietário</div>
              <div class="header-cell">Fazenda</div>
              <div class="header-cell">Cultura</div>
            </div>
            <div class="grid-3">
              <div class="data-cell">${application.farm.owner.name.toLocaleUpperCase()}</div>
              <div class="data-cell">${application.farm.name.toLocaleUpperCase()}</div>
              <div class="data-cell">${application.planting.crop.toLocaleUpperCase()}</div>
            </div>

            <!-- Informações do tanque -->
            <div class="grid-2">
              <div class="header-cell">Tanque de Pulverização (Lt)</div>
              <div class="header-cell">Vazão (Lt/Ha)</div>
            </div>
            <div class="grid-2">
              <div class="data-cell">2000</div>
              <div class="data-cell">${application.flowRate || 'N/A'}</div>
            </div>
            
            <div class="grid-2">
              <div class="header-cell">Hectares por Tanque</div>
              <div class="header-cell">Data</div>
            </div>
            <div class="grid-2">
              <div class="data-cell">${hectarePerTank}</div>
              <div class="data-cell">${new Date(application.applicationDate).toLocaleDateString('pt-BR')}</div>
            </div>

            <!-- Talhões -->
            <div>
              <div class="plots-header">
                TALHÕES - ÁREA TOTAL de ${totalArea.toFixed(1)} (ha)
              </div>
              <div class="plots-content">
                ${application.plots.map(plot => 
                  `<span class="plot-badge">${plot.name} - ${plot.area}(ha)</span>`
                ).join('')}
              </div>
            </div>

            <!-- Tipo de aplicação -->
            <div class="application-header">
              APLICAÇÃO DE ${application.inputs.map(input => input.class.toUpperCase()).join(' + ')}
            </div>

            <!-- Tabela de produtos -->
            <div>
              <div class="grid-4 products-header">
                <div class="header-cell">PRODUTOS</div>
                <div class="header-cell">DOSE/HÁ</div>
                <div class="header-cell">DOSE POR TANQUE</div>
                <div class="header-cell">UN</div>
              </div>
              ${application.inputs.map((input, index) => `
                <div class="grid-4 product-row">
                  <div class="data-cell">${input.commercialBrand}</div>
                  <div class="data-cell">-</div>
                  <div class="data-cell">-</div>
                  <div class="data-cell">${input.unitOfMeasure}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
      </html>
    `;

    // Criar elemento para impressão direta
    const printElement = document.createElement('div');
    printElement.innerHTML = printContent;
    printElement.style.display = 'none';
    document.body.appendChild(printElement);

    // Criar iframe oculto para impressão
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.write(printContent);
      iframeDoc.close();
      
      // Aguardar carregamento e imprimir
      setTimeout(() => {
        iframe.contentWindow?.print();
        
        // Remover elementos após impressão
        setTimeout(() => {
          document.body.removeChild(printElement);
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  return (
    <div className="py-10 px-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Aplicações</h1>
        <p className="text-gray-600">Gerenciar aplicações de defensivos e fertilizantes</p>
        
        {/* Busca */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por fazenda ou cultura..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Carregando aplicações...
          </h3>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {applications.map((application: ApplicationData) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Tractor className="h-5 w-5 text-green-600" />
                        {application.farm.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(application.applicationDate).toLocaleDateString('pt-BR')}
                      </CardDescription>
                      <CardDescription className="text-sm text-gray-500 mt-1">
                        {application.planting.crop} - {application.planting.varieties.join(', ')}
                      </CardDescription>
                    </div>
                    
                    {/* Informações do proprietário e vazão */}
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {application.farm.owner.name.toLocaleUpperCase()}
                      </Badge>
                      {application.flowRate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Vazão: {application.flowRate} L/ha
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-3">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-sm text-gray-700 mb-2">
                        <MapPin className="h-4 w-4" />
                        Talhões ({application.plots.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {application.plots.map((plot) => (
                          <Badge key={plot.id} variant="outline" className="text-xs">
                            {plot.name} ({plot.area} ha)
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Insumos Aplicados ({application.inputs.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {application.inputs.map((input) => (
                          <Badge key={input.id} variant="secondary" className="text-xs">
                            {input.commercialBrand} ({input.class})
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Botões de ação no bottom direito */}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrintApplication(application)}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Printer className="h-3 w-3" />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Mostrando {applications.length} de {pagination.total} aplicações
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrev || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <span className="text-sm">
                  Página {pagination.page} de {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext || loading}
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {applications.length === 0 && !loading && (
            <div className="text-center py-12">
              <Tractor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nenhuma aplicação encontrada
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Tente buscar por outros termos' : 'Cadastre uma nova aplicação para começar'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}