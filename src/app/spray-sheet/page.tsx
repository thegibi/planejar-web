import { SpraySheet } from '@/components/spray-sheet';

export default function SpraySheetPage() {
  // Dados de exemplo baseados no modelo fornecido
  const exampleData = {
    client: "DANIEL SERAFIN",
    farm: "VENTO SUL",
    culture: "SOJA",
    tankCapacity: 2500,
    flowRate: 150,
    hectarePerTank: 16.7,
    date: "9/17/25",
    plots: "TH01 - 60(ha) TH10 - 80(ha)",
    application: "APLICAÇÃO - DESSECAÇÃO PRÉ PLANTIO",
    products: [
      { name: "Bravonil", dosePerHa: 0.100, dosePerTank: 1.7, unit: "L" },
      { name: "Alade", dosePerHa: 1.000, dosePerTank: 16.7, unit: "L" },
      { name: "Aproach Power", dosePerHa: 0.250, dosePerTank: 4.2, unit: "L" },
      { name: "Armero", dosePerHa: 0.200, dosePerTank: 3.3, unit: "L" },
      { name: "Aumentax", dosePerHa: 1.300, dosePerTank: 21.7, unit: "L" },
      { name: "Azimut", dosePerHa: 0.100, dosePerTank: 1.7, unit: "L" },
      { name: "Belyan", dosePerHa: 2.000, dosePerTank: 33.3, unit: "L" },
      { name: "Belyan", dosePerHa: 1.000, dosePerTank: 16.7, unit: "kg" },
      { name: "Bravonil", dosePerHa: 2.000, dosePerTank: 33.3, unit: "L" },
      { name: "Controller NT", dosePerHa: 3.000, dosePerTank: 50.0, unit: "L" },
      { name: "Controller NT WG", dosePerHa: 4.000, dosePerTank: 66.7, unit: "L" },
      { name: "Cypress", dosePerHa: 5.000, dosePerTank: 83.3, unit: "L" },
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Planilha de Pulverização
        </h1>
        <p className="text-gray-600">
          Gere e imprima planilhas para controle de aplicação de produtos na fazenda
        </p>
      </div>

      <SpraySheet data={exampleData} />
    </div>
  );
}