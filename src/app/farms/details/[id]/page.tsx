'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface FarmDetailsProps {
  params: Promise<{ id: string }>;
}

interface PlantingData {
  id: number;
  crop: string;
  varieties: string[];
  population: number;
  plantingDate: string;
  plots: {
    id: number;
    name: string;
    area: number;
  }[];
}

interface Farm {
  id: number;
  name: string;
  location: string;
  area: number;
  sprayTank: string | null;
  fertilizerSpreader: string | null;
  owner: {
    name: string;
  };
  plantings: PlantingData[];
}

interface VarietyData {
  name: string;
  area: number;
  percentage: number;
  color: string;
}

interface PlotData {
  name: string;
  area: number;
  percentage: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

export default function FarmDetailsPage({ params }: FarmDetailsProps) {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [varietyData, setVarietyData] = useState<VarietyData[]>([]);
  const [plotData, setPlotData] = useState<PlotData[]>([]);
  const [farmId, setFarmId] = useState<string>('');

  useEffect(() => {
    async function initializePage() {
      const resolvedParams = await params;
      setFarmId(resolvedParams.id);
    }
    initializePage();
  }, [params]);

  useEffect(() => {
    if (!farmId) return;
    
    async function fetchFarmDetails() {
      try {
        const response = await fetch(`/api/farms/${farmId}/details`);
        if (!response.ok) throw new Error('Farm not found');
        
        const farmData: Farm = await response.json();
        setFarm(farmData);
        
        processVarietyData(farmData.plantings);
        processPlotData(farmData.plantings);
      } catch (error) {
        console.error('Error fetching farm details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFarmDetails();
  }, [farmId]);

  const processVarietyData = (plantings: PlantingData[]) => {
    const varietyMap = new Map<string, number>();
    
    plantings.forEach(planting => {
      const totalPlantingArea = planting.plots.reduce((sum, plot) => sum + plot.area, 0);
      const areaPerVariety = totalPlantingArea / planting.varieties.length;
      
      planting.varieties.forEach(variety => {
        varietyMap.set(variety, (varietyMap.get(variety) || 0) + areaPerVariety);
      });
    });

    const totalArea = Array.from(varietyMap.values()).reduce((sum, area) => sum + area, 0);
    
    const data: VarietyData[] = Array.from(varietyMap.entries()).map(([name, area], index) => ({
      name: name.toLocaleUpperCase(),
      area: Number(area.toFixed(2)),
      percentage: Number(((area / totalArea) * 100).toFixed(1)),
      color: COLORS[index % COLORS.length]
    }));

    setVarietyData(data);
  };

  const processPlotData = (plantings: PlantingData[]) => {
    const plotMap = new Map<string, number>();
    
    plantings.forEach(planting => {
      planting.plots.forEach(plot => {
        plotMap.set(plot.name, plot.area);
      });
    });

    const totalArea = Array.from(plotMap.values()).reduce((sum, area) => sum + area, 0);
    
    const data: PlotData[] = Array.from(plotMap.entries()).map(([name, area], index) => ({
      name: name.toUpperCase(),
      area: Number(area.toFixed(2)),
      percentage: Number(((area / totalArea) * 100).toFixed(1)),
      color: COLORS[index % COLORS.length]
    }));

    setPlotData(data);
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="text-center">Carregando detalhes da fazenda...</div>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="text-center text-red-500">Fazenda não encontrada.</div>
      </div>
    );
  }

  const totalPlantedArea = plotData.reduce((sum, plot) => sum + plot.area, 0);

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalhes da Fazenda: {farm.name}</h1>
        <div className="flex gap-2">
          <Link href={`/farms/edit/${farm.id}`}>
            <Button variant="outline">Editar Fazenda</Button>
          </Link>
          <Link href="/farms/list">
            <Button variant="outline">Voltar à Lista</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <strong>Proprietário:</strong> {farm.owner.name}
            </div>
            <div>
              <strong>Localização:</strong> {farm.location}
            </div>
            <div>
              <strong>Área Total:</strong> {farm.area} ha
            </div>
            <div>
              <strong>Área Plantada:</strong> {totalPlantedArea} ha
            </div>
            <div>
              <strong>Tanque de Pulverização:</strong> {farm.sprayTank || 'N/A'}
            </div>
            <div>
              <strong>Distribuidor de Adubo:</strong> {farm.fertilizerSpreader || 'N/A'}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Variedades</CardTitle>
            <CardDescription>
              Área plantada por variedade ({totalPlantedArea} ha total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {varietyData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={varietyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.name} (${props.payload.percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="area"
                    >
                      {varietyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} ha`, 'Área']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Detalhes das Variedades:</h4>
                  {varietyData.map((variety, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: variety.color }}
                      ></div>
                      <span className="text-sm">
                        {variety.name}: {variety.area} ha ({variety.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Nenhum plantio encontrado para esta fazenda.
              </div>
            )}
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Talhões</CardTitle>
            <CardDescription>
              Área utilizada por talhão ({totalPlantedArea} ha total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {plotData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={plotData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.name} (${props.payload.percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="area"
                    >
                      {plotData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} ha`, 'Área']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Detalhes dos Talhões:</h4>
                  {plotData.map((plot, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: plot.color }}
                      ></div>
                      <span className="text-sm">
                        {plot.name}: {plot.area} ha ({plot.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Nenhum talhão plantado encontrado para esta fazenda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Plantios</CardTitle>
          <CardDescription>
            Todos os plantios realizados nesta fazenda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {farm.plantings.length > 0 ? (
            <div className="space-y-4">
              {farm.plantings.map((planting) => (
                <div key={planting.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <strong>Cultura:</strong> {planting.crop.toLocaleUpperCase()}
                    </div>
                    <div>
                      <strong>Variedades:</strong> {planting.varieties.join(', ').toLocaleUpperCase()}
                    </div>
                    <div>
                      <strong>População:</strong> {planting.population.toLocaleString()}
                    </div>
                    <div>
                      <strong>Data do Plantio:</strong> {new Date(planting.plantingDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Talhões utilizados:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {planting.plots.map((plot) => (
                        <span key={plot.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {plot.name} ({plot.area} ha)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Nenhum plantio encontrado para esta fazenda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}