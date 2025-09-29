import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaDna, FaFlask, FaMapMarkerAlt, FaSeedling, FaTractor, FaUser } from 'react-icons/fa';

export default async function DashboardPage() {
  const [clientCount, farmCount, plotCount, inputCount, plantingCount, varietyCount] = await Promise.all([
    prisma.client.count(),
    prisma.farm.count(),
    prisma.plot.count(),
    prisma.input.count(),
    prisma.planting.count(),
    prisma.variety.count(),
  ]);

  const cardData = [
    { title: "Clientes", count: clientCount, icon: <FaUser className="h-6 w-6 text-gray-500" />, href: "/clients/list" },
    { title: "Fazendas", count: farmCount, icon: <FaTractor className="h-6 w-6 text-gray-500" />, href: "/farms/list" },
    { title: "Talhões", count: plotCount, icon: <FaMapMarkerAlt className="h-6 w-6 text-gray-500" />, href: "/plots/list" },
    { title: "Insumos", count: inputCount, icon: <FaFlask className="h-6 w-6 text-gray-500" />, href: "/inputs/list" },
    { title: "Variedades", count: varietyCount, icon: <FaDna className="h-6 w-6 text-gray-500" />, href: "/varieties/list" },
    { title: "Plantios", count: plantingCount, icon: <FaSeedling className="h-6 w-6 text-gray-500" />, href: "/plantings/list" },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}