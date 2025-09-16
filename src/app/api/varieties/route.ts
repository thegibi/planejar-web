import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try
  {
    const varieties = await prisma.variety.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(varieties);
  } catch (error)
  {
    console.error('Erro ao buscar variedades:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}