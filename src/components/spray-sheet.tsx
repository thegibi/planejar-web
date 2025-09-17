'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface SpraySheetData {
  client: string;
  farm: string;
  culture: string;
  tankCapacity: number;
  flowRate: number;
  hectarePerTank: number;
  date: string;
  plots: string;
  plotsData?: { name: string; area: number }[];
  application: string;
  products: {
    name: string;
    dosePerHa: number;
    dosePerTank: number;
    unit: string;
  }[];
}

interface SpraySheetProps {
  data: SpraySheetData;
}

export function SpraySheet({ data }: SpraySheetProps) {
  const handlePrint = () => {
    window.print();
  };

  // Calcular área total dos talhões
  const totalArea = data.plotsData?.reduce((total, plot) => total + plot.area, 0) || 0;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white spray-sheet-container">
      {/* Botão de impressão - escondido na impressão */}
      <div className="print:hidden mb-6 flex justify-end">
        <Button onClick={handlePrint} variant="outline">
          Imprimir Planilha
        </Button>
      </div>

      {/* Container da planilha */}
      <div className="border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header com logo */}
        <div className="border-b-2 border-green-600 p-6 text-center bg-white">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/planejar-logo.png"
                alt="Planejar Consultoria Agrícola"
                width={300}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center text-green-700 mt-6">
            PLANILHA DE PULVERIZAÇÃO
          </h2>
        </div>

        {/* Informações principais */}
        <div className="grid grid-cols-3">
          <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium">
            Cliente
          </div>
          <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium">
            Fazenda
          </div>
          <div className="bg-green-600 text-white text-center py-3 font-medium">
            Cultura
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-gray-300">
          <div className="border-r border-gray-300 p-3 text-center font-medium text-gray-900">
            {data.client}
          </div>
          <div className="border-r border-gray-300 p-3 text-center font-medium text-gray-900">
            {data.farm}
          </div>
          <div className="p-3 text-center font-medium text-gray-900">
            {data.culture}
          </div>
        </div>

        {/* Informações do tanque */}
        <div className="grid grid-cols-4">
          <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium text-sm">
            Tanque de Pulverização (Lt)
          </div>
          <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium text-sm">
            Vazão (Lt/Ha)
          </div>
          <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium text-sm">
            Hectares por Tanque
          </div>
          <div className="bg-green-600 text-white text-center py-3 font-medium text-sm">
            Data
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-gray-300">
          <div className="border-r border-gray-300 p-3 text-center font-medium text-gray-900">
            {data.tankCapacity}
          </div>
          <div className="border-r border-gray-300 p-3 text-center font-medium text-gray-900">
            {data.flowRate}
          </div>
          <div className="border-r border-gray-300 p-3 text-center font-medium text-gray-900">
            {data.hectarePerTank}
          </div>
          <div className="p-3 text-center font-medium text-gray-900">
            {data.date}
          </div>
        </div>

        {/* Talhões */}
        <div className="border-b border-gray-300">
          {/* Header dos Talhões */}
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-300 bg-green-600 text-white text-center py-3 font-medium">
              TALHÕES
            </div>
            <div className="bg-green-600 text-white text-center py-3 font-medium">
              ÁREA TOTAL: {totalArea.toFixed(1)} ha
            </div>
          </div>
          
          {/* Valores dos Talhões */}
          <div className="bg-white p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {data.plotsData && data.plotsData.length > 0 ? (
                data.plotsData.map((plot, index) => (
                  <div 
                    key={index}
                    className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium"
                  >
                    {plot.name} - {plot.area}ha
                  </div>
                ))
              ) : (
                <div className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium">
                  {data.plots}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tipo de aplicação */}
        <div className="border-b border-gray-300">
          <div className="bg-green-900 text-white text-center py-3 font-medium">
            {data.application}
          </div>
        </div>

        {/* Tabela de produtos */}
        <div>
          {/* Header da tabela */}
          <div className="grid grid-cols-4 bg-green-800 text-white">
            <div className="border-r border-gray-300 text-center py-3 font-medium">
              Produtos
            </div>
            <div className="border-r border-gray-300 text-center py-3 font-medium">
              Dose/Ha
            </div>
            <div className="border-r border-gray-300 text-center py-3 font-medium">
              Dose por Tanque
            </div>
            <div className="text-center py-3 font-medium">
              Un
            </div>
          </div>

          {/* Linhas de produtos */}
          {data.products.map((product, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-4 border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-amber-50'
              } hover:bg-amber-100 transition-colors`}
            >
              <div className="border-r border-gray-200 p-3 text-center text-gray-900">
                {product.name}
              </div>
              <div className="border-r border-gray-200 p-3 text-center text-gray-900">
                {product.dosePerHa.toFixed(3)}
              </div>
              <div className="border-r border-gray-200 p-3 text-center text-gray-900">
                {product.dosePerTank.toFixed(1)}
              </div>
              <div className="p-3 text-center text-gray-900">
                {product.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos para impressão */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          
          /* Ocultar todos os elementos da página exceto a planilha */
          body > * {
            visibility: hidden;
          }
          
          /* Mostrar apenas o container da planilha */
          .spray-sheet-container,
          .spray-sheet-container * {
            visibility: visible;
          }
          
          /* Posicionar a planilha no topo da página */
          .spray-sheet-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Remover bordas e sombras na impressão */
          .spray-sheet-container > div {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          /* Paleta Verde Planejar */
          .bg-green-50 {
            background-color: #f0f9f0 !important;
          }
          
          .bg-green-600 {
            background-color: #3c7736 !important;
            color: white !important;
          }
          
          .bg-green-700 {
            background-color: #2f5d2a !important;
            color: white !important;
          }
          
          .bg-green-800 {
            background-color: #274b23 !important;
            color: white !important;
          }
          
          .bg-green-900 {
            background-color: #223e1f !important;
            color: white !important;
          }
          
          .text-green-600 {
            color: #3c7736 !important;
          }
          
          .text-green-700 {
            color: #2f5d2a !important;
          }
          
          .border-green-600 {
            border-color: #3c7736 !important;
          }
          
          .bg-white {
            background-color: #ffffff !important;
          }
          
          .text-white {
            color: white !important;
          }
          
          .rounded {
            border-radius: 0.25rem !important;
          }
          
          /* Paleta Dourada Secundária */
          .bg-amber-50 {
            background-color: #fefbf3 !important;
          }
          
          .bg-amber-100 {
            background-color: #fdf5e1 !important;
          }
          
          .hover\\:bg-amber-100:hover {
            background-color: transparent !important;
          }
          
          .border-gray-300, .border-gray-200 {
            border-color: #d1d5db !important;
          }
          
          .text-white {
            color: white !important;
          }
          
          .text-gray-900 {
            color: #111827 !important;
          }
        }
      `}</style>
    </div>
  );
}