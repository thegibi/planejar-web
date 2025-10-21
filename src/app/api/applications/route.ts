import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try
  {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const farmId = searchParams.get('farmId');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};

    if (search)
    {
      where.OR = [
        {
          farm: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          planting: {
            crop: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    if (farmId)
    {
      where.farmId = parseInt(farmId);
    }

    // Buscar aplicações com paginação
    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take: limit,
        include: {
          farm: {
            select: {
              id: true,
              name: true,
              location: true,
              owner: {
                select: {
                  name: true
                }
              }
            }
          },
          planting: {
            select: {
              id: true,
              crop: true,
              varieties: true,
              plantingDate: true,
              population: true
            }
          }
        },
        orderBy: {
          applicationDate: 'desc'
        }
      }),
      prisma.application.count({ where })
    ]);

    // Buscar plots e inputs separadamente usando os IDs
    const applicationsWithDetails = await Promise.all(
      applications.map(async (app) => {
        const [plots, inputs] = await Promise.all([
          // Buscar plots pelos IDs
          prisma.plot.findMany({
            where: {
              id: {
                in: app.plotIds
              }
            },
            select: {
              id: true,
              name: true,
              area: true
            }
          }),
          // Buscar inputs pelos IDs
          prisma.input.findMany({
            where: {
              id: {
                in: app.inputIds
              }
            },
            select: {
              id: true,
              class: true,
              commercialBrand: true,
              activeIngredient: true,
              unitOfMeasure: true
            }
          })
        ]);

        return {
          ...app,
          plots,
          inputs
        };
      })
    );

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      applications: applicationsWithDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });

  } catch (error)
  {
    console.error('Erro ao buscar aplicações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

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