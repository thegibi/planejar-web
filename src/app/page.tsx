'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaFlask, FaSeedling, FaSprayCan, FaTractor } from 'react-icons/fa';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Image src="/planejar-logo@512.png" alt="Planejar Logo" width={40} height={40} />
              <h1 className="text-2xl font-bold text-green-600">Planejar</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold text-green-600 sm:text-6xl">
            Planejar -
            <span className="text-amber-600"> Agricultura Inteligente</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Gerencie suas fazendas, talhões, plantios e insumos de forma eficiente e moderna. 
            Tenha controle total da sua produção agrícola.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link href="https://wa.me/+5566999083847" target='_blank' >
              <Button size="lg" className="px-8 py-3">
                Começar Agora
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Gerencie toda sua operação agrícola
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ferramentas completas para otimizar sua produtividade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center hover:border-green-600 hover:shadow-lg transition">
              <CardHeader>
                <FaTractor className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Gestão de Fazendas</CardTitle>
                <CardDescription>
                  Cadastre e gerencie múltiplas fazendas com informações detalhadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Área total e localização</li>
                  <li>• Equipamentos e maquinário</li>
                  <li>• Dados do proprietário</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-green-600 hover:shadow-lg transition">
              <CardHeader>
                <FaSeedling className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Controle de Plantios</CardTitle>
                <CardDescription>
                  Monitore plantios, variedades e cronogramas de produção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Variedades de sementes</li>
                  <li>• Cronograma de plantio</li>
                  <li>• Acompanhamento de safras</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-green-600 hover:shadow-lg transition">
              <CardHeader>
                <FaFlask className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Gestão de Insumos</CardTitle>
                <CardDescription>
                  Controle total de fertilizantes, defensivos e custos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Estoque de insumos</li>
                  <li>• Controle de custos</li>
                  <li>• Aplicações e dosagens</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-green-600 hover:shadow-lg transition">
              <CardHeader>
                <FaSprayCan className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Aplicações</CardTitle>
                <CardDescription>
                  Registre e monitore todas as aplicações de defensivos e fertilizantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Histórico de aplicações</li>
                  <li>• Controle de dosagens</li>
                  <li>• Relatórios detalhados</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <Image src="/planejar-logo@512.png" alt="Planejar Logo" width={40} height={40} />
            <span className="text-lg font-semibold text-green-600">Planejar - Agricultura Inteligente</span>
          </div>
          <p className="text-center text-gray-900 mt-4">
            ©2025 Planejar. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}