'use client';

import { FarmDetailsSkeleton } from '@/components/farm-details-skeleton';
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
  varietiesWithCycles: {
    name: string;
    cycle: number | null;
  }[];
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
  fill: string;
  [key: string]: any;
}

interface PlotData {
  name: string;
  area: number;
  percentage: number;
  color: string;
  fill: string;
  [key: string]: any;
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
      color: COLORS[index % COLORS.length],
      fill: COLORS[index % COLORS.length]
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
      color: COLORS[index % COLORS.length],
      fill: COLORS[index % COLORS.length]
    }));

    setPlotData(data);
  };

  const varietyChartConfig = {
    area: {
      label: "Área",
    },
  };

  const plotChartConfig = {
    area: {
      label: "Área",
    },
  };

  if (loading) {
    return <FarmDetailsSkeleton />;
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
        <h1 className="text-3xl font-bold">Detalhes da Fazenda: <span className="capitalize">{farm.name.toLocaleLowerCase()}</span></h1>
        <div className="flex gap-2">
          <Link href={`/farms/spray-sheet/${farm.id}`}>
            <Button variant="outline">Planilha de Pulverização</Button>
          </Link>
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
              <strong>Proprietário:</strong> <span className="capitalize">{farm.owner.name.toLocaleLowerCase()}</span>
            </div>
            <div>
              <strong >Localização:</strong> <span className="capitalize">{farm.location.toLocaleLowerCase()}</span>
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
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => [
                      `${value} ha (${props.payload?.percentage}%)`,
                      props.payload?.name
                    ]}
                  />
                  <Pie data={varietyData} dataKey="area">
                    {varietyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend 
                    formatter={(value: any, entry: any) => entry.payload?.name}
                  />
                </PieChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => [
                      `${value} ha (${props.payload?.percentage}%)`,
                      props.payload?.name
                    ]}
                  />
                  <Pie data={plotData} dataKey="area">
                    {plotData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend 
                    formatter={(value: any, entry: any) => entry.payload?.name}
                  />
                </PieChart>
              </ResponsiveContainer>
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
                      <strong>Variedades:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {planting.varietiesWithCycles?.map((variety, index) => (
                          <span key={index} className="text-sm">
                            {variety.name.toLocaleUpperCase()}
                            {variety.cycle && (
                              <span className="text-gray-600"> ({variety.cycle} dias)</span>
                            )}
                            {index < planting.varietiesWithCycles.length - 1 && ', '}
                          </span>
                        )) || planting.varieties.join(', ').toLocaleUpperCase()}
                      </div>
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
                          {plot.name.toLocaleUpperCase()} ({plot.area} ha)
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