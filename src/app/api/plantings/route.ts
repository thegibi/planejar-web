import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Handler para requisições OPTIONS (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const farmId = searchParams.get('farmId');

    const skip = (page - 1) * limit;

    // Construir filtro de busca
    const whereClause: any = {};

    // Filtrar por fazenda específica se fornecido
    if (farmId) {
      whereClause.farmId = parseInt(farmId);
    }

    // Filtro de busca por texto
    if (search) {
      whereClause.OR = [
        {
          crop: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          varieties: {
            hasSome: [search],
          },
        },
        {
          farm: {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        },
      ];
    }

    // Buscar plantings e total de registros em paralelo
    const [plantings, totalCount] = await Promise.all([
      prisma.planting.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { plantingDate: 'desc' },
        include: {
          farm: {
            select: {
              id: true,
              name: true,
              location: true,
              owner: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          plots: {
            select: {
              id: true,
              name: true,
              area: true,
            },
          },
          applications: {
            select: {
              id: true,
              applicationDate: true,
              flowRate: true,
              rowSpacing: true,
            },
            orderBy: {
              applicationDate: 'desc',
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),
      prisma.planting.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    // Formatar dados de resposta
    const formattedPlantings = plantings.map(planting => {
      // Calcular área total dos plots
      const totalArea = planting.plots.reduce((sum, plot) => sum + plot.area, 0);

      return {
        id: planting.id,
        crop: planting.crop,
        varieties: planting.varieties,
        population: planting.population,
        plantingDate: planting.plantingDate.toISOString(),
        totalArea,
        farm: {
          id: planting.farm.id,
          name: planting.farm.name,
          location: planting.farm.location,
          owner: planting.farm.owner,
        },
        plots: planting.plots.map(plot => ({
          id: plot.id,
          name: plot.name,
          area: plot.area,
        })),
        applications: planting.applications.map(app => ({
          id: app.id,
          applicationDate: app.applicationDate.toISOString(),
          flowRate: app.flowRate,
          rowSpacing: app.rowSpacing,
        })),
        stats: {
          totalApplications: planting._count.applications,
          lastApplicationDate: planting.applications[0]?.applicationDate?.toISOString() || null,
        },
      };
    });

    const response = {
      success: true,
      data: formattedPlantings,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Erro ao buscar plantings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar os plantings',
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