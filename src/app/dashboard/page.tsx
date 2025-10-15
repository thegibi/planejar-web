import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FaFlask, FaTractor, FaUser } from 'react-icons/fa';

export default async function DashboardPage() {
  const [clientCount, farmCount, inputCount] = await Promise.all([
    prisma.client.count(),
    prisma.farm.count(),
    prisma.input.count(),
  ]);

  const cardData = [
    { title: "Clientes", count: clientCount, icon: FaUser, href: "/clients/list" },
    { title: "Fazendas", count: farmCount, icon: FaTractor, href: "/farms/list" },
    { title: "Insumos", count: inputCount, icon: FaFlask, href: "/inputs/list" },
  ];

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-600">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link href={card.href} key={card.title}>
              <Card className="hover:shadow-lg hover:border-green-600 transition-all duration-200 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors">{card.title}</CardTitle>
                  <IconComponent className="h-6 w-6 text-gray-500 group-hover:text-green-600 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold group-hover:text-green-600 transition-colors">{card.count}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}