import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try
  {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Construir filtro de busca
    const whereClause = search ? {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          owner: {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        },
        {
          location: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
      ],
    } : {};

    // Buscar fazendas e total de registros em paralelo
    const [farms, totalCount] = await Promise.all([
      prisma.farm.findMany({
        where: whereClause,
        skip,
        take: limit,
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
      prisma.farm.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    // Calcular área total de cada fazenda baseada nos plots
    const farmsWithCalculatedArea = farms.map(farm => {
      const calculatedArea = farm.plots.reduce((total, plot) => total + plot.area, 0);

      return {
        id: farm.id,
        name: farm.name,
        location: farm.location,
        area: farm.area,
        calculatedArea, // Área calculada baseada nos plots
        sprayTank: farm.sprayTank,
        fertilizerSpreader: farm.fertilizerSpreader,
        owner: {
          id: farm.owner.id,
          name: farm.owner.name,
          phone: farm.owner.phone,
          email: farm.owner.email,
        },
        plots: farm.plots.map(plot => ({
          id: plot.id,
          name: plot.name,
          area: plot.area,
        })),
        stats: {
          totalPlots: farm._count.plots,
          totalPlantings: farm._count.plantings,
        },
      };
    });

    const response = {
      success: true,
      data: farmsWithCalculatedArea,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(response);
  } catch (error)
  {
    console.error('Erro ao buscar fazendas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar as fazendas'
      },
      { status: 500 }
    );
  }
}