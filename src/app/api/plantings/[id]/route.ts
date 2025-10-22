import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try
  {
    const { id } = await params;
    const plantingId = parseInt(id);

    if (isNaN(plantingId))
    {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar se o plantio existe
    const planting = await prisma.planting.findUnique({
      where: { id: plantingId },
      include: {
        _count: {
          select: {
            applications: true
          }
        }
      }
    });

    if (!planting)
    {
      return NextResponse.json(
        { error: 'Plantio não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se há aplicações vinculadas
    if (planting._count.applications > 0)
    {
      return NextResponse.json(
        { error: `Este plantio possui ${planting._count.applications} aplicação(ões) vinculada(s). Exclua as aplicações antes de excluir o plantio.` },
        { status: 400 }
      );
    }

    // Excluir o plantio
    await prisma.planting.delete({
      where: { id: plantingId }
    });

    return NextResponse.json(
      { message: 'Plantio excluído com sucesso' },
      { status: 200 }
    );

  } catch (error)
  {
    console.error('Erro ao excluir plantio:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir plantio' },
      { status: 500 }
    );
  }
}
