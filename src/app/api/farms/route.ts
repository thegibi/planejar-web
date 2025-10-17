import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try
  {

    const farms = await Promise.all([
      prisma.farm.findMany({
        orderBy: { id: 'asc' },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
            },
          },
          plots: {
            select: {
              id: true,
              name: true,
              area: true,
            },
          },
          _count: {
            select: {
              plots: true,
              plantings: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json(farms, { status: 200 });
  } catch (error)
  {
    console.error('Erro ao buscar fazendas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar as fazendas'
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}