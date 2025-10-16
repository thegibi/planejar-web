'use client';

import { SpraySheet } from '@/components/spray-sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FarmSpraySheetProps {
  params: Promise<{ id: string }>;
}

export default function FarmSpraySheetPage({ params }: FarmSpraySheetProps) {
  const [farmId, setFarmId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [farmData, setFarmData] = useState<any>(null);

  useEffect(() => {
    async function initializePage() {
      const resolvedParams = await params;
      setFarmId(resolvedParams.id);
    }
    initializePage();
  }, [params]);

  useEffect(() => {
    if (!farmId) return;
    
    async function fetchFarmData() {
      try {
        const response = await fetch(`/api/farms/${farmId}/details`);
        if (!response.ok) throw new Error('Farm not found');
        
        const farm = await response.json();
        setFarmData(farm);
      } catch (error) {
        console.error('Error fetching farm data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFarmData();
  }, [farmId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Carregando dados da fazenda...</div>
      </div>
    );
  }

  if (!farmData) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Fazenda não encontrada.</div>
        <div className="text-center mt-4">
          <Link href="/farms/list">
            <Button variant="outline">Voltar à Lista de Fazendas</Button>
          </Link>
        </div>
      </div>
    );
  }

  const spraySheetData = {
    owner: farmData.owner?.name || 'Proprietário não informado',
    farm: farmData.name || 'Fazenda',
    culture: farmData.plantings?.[0]?.crop?.toUpperCase() || 'CULTURA',
    tankCapacity: parseInt(farmData.sprayTank) || 2500,
    flowRate: 150,
    hectarePerTank: 16.7, 
    date: new Date().toLocaleDateString('pt-BR'),
    plots: farmData.plantings?.[0]?.plots?.map((plot: any) => 
      `${plot.name.toUpperCase()} - ${plot.area}ha`
    ).join(' ') || 'TH01',
    plotsData: farmData.plantings?.[0]?.plots?.map((plot: any) => ({
      name: plot.name.toUpperCase(),
      area: parseFloat(plot.area) || 0
    })) || [],
    application: "APLICAÇÃO - DESSECAÇÃO PRÉ PLANTIO",
    products: [
      { name: "Bravonil", dosePerHa: 0.100, dosePerTank: 1.7, unit: "L" },
      { name: "Alade", dosePerHa: 1.000, dosePerTank: 16.7, unit: "L" },
      { name: "Aproach Power", dosePerHa: 0.250, dosePerTank: 4.2, unit: "L" },
      { name: "Armero", dosePerHa: 0.200, dosePerTank: 3.3, unit: "L" },
      { name: "Aumentax", dosePerHa: 1.300, dosePerTank: 21.7, unit: "L" },
      { name: "Azimut", dosePerHa: 0.100, dosePerTank: 1.7, unit: "L" },
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 print:hidden">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Planilha de Pulverização - {farmData.name}
            </h1>
            <p className="text-gray-600">
              Planilha gerada para controle de aplicação de produtos
            </p>
          </div>
          <Link href={`/farms/details/${farmId}`}>
            <Button variant="outline">
              ← Voltar aos Detalhes
            </Button>
          </Link>
        </div>
      </div>

      <SpraySheet data={spraySheetData} />
    </div>
  );
}