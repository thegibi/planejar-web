import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try
  {
    const { id } = await params;
    const farmId = parseInt(id);

    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        plantings: {
          include: {
            plots: {
              select: {
                id: true,
                name: true,
                area: true,
              },
            },
          },
        },
      },
    });

    if (!farm)
    {
      return NextResponse.json(
        { error: 'Fazenda não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(farm);
  } catch (error)
  {
    console.error('Erro ao buscar detalhes da fazenda:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}