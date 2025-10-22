import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try
  {
    const { id } = await params;
    const varietyId = parseInt(id);

    if (isNaN(varietyId))
    {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar se a variedade existe
    const variety = await prisma.variety.findUnique({
      where: { id: varietyId }
    });

    if (!variety)
    {
      return NextResponse.json(
        { error: 'Variedade não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se há plantios usando esta variedade
    const plantingsUsingVariety = await prisma.planting.findMany({
      where: {
        varieties: {
          has: variety.name
        }
      }
    });

    if (plantingsUsingVariety.length > 0)
    {
      return NextResponse.json(
        {
          error: `Esta variedade está sendo utilizada em ${plantingsUsingVariety.length} plantio(s). Remova-a dos plantios antes de excluir.`
        },
        { status: 400 }
      );
    }

    // Excluir a variedade
    await prisma.variety.delete({
      where: { id: varietyId }
    });

    revalidatePath('/varieties/list');

    return NextResponse.json(
      { message: 'Variedade excluída com sucesso' },
      { status: 200 }
    );

  } catch (error)
  {
    console.error('Erro ao excluir variedade:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir variedade' },
      { status: 500 }
    );
  }
}
