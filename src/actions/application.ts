'use server';

import prisma from '@/lib/prisma';
import { ApplicationFormData, applicationSchema } from '@/validations/application';
import { revalidatePath } from 'next/cache';

export async function createApplication(formData: ApplicationFormData) {
  try
  {
    // Converter os dados do formulário para o formato correto
    const data = {
      farmId: parseInt(formData.plantingId), // Vamos buscar o farmId através do plantingId
      plantingId: parseInt(formData.plantingId),
      applicationDate: new Date(formData.applicationDate),
      plotIds: formData.plotIds.map(id => parseInt(id)),
      inputIds: formData.inputIds.map(id => parseInt(id)),
      flowRate: formData.flowRate ? parseFloat(formData.flowRate) : undefined,
      rowSpacing: formData.rowSpacing ? parseFloat(formData.rowSpacing) : undefined
    };

    // Buscar o farmId através do plantingId
    const planting = await prisma.planting.findUnique({
      where: { id: data.plantingId },
      select: { farmId: true }
    });

    if (!planting)
    {
      throw new Error('Plantio não encontrado');
    }

    data.farmId = planting.farmId;

    // Validar os dados
    const validatedData = applicationSchema.parse(data);

    // Criar a aplicação
    const application = await prisma.application.create({
      data: validatedData,
      include: {
        farm: {
          select: {
            name: true
          }
        },
        planting: {
          select: {
            crop: true,
            varieties: true
          }
        }
      }
    });

    revalidatePath('/farms');

    return {
      success: true,
      data: application,
      message: 'Aplicação cadastrada com sucesso!'
    };

  } catch (error)
  {
    console.error('Erro ao criar aplicação:', error);

    if (error instanceof Error)
    {
      return {
        success: false,
        message: error.message
      };
    }

    return {
      success: false,
      message: 'Erro interno do servidor'
    };
  }
}

export async function getAllInputs() {
  try
  {
    const inputs = await prisma.input.findMany({
      select: {
        id: true,
        class: true,
        commercialBrand: true,
        activeIngredient: true,
        unitOfMeasure: true
      },
      orderBy: [
        { class: 'asc' },
        { commercialBrand: 'asc' }
      ]
    });

    return inputs;
  } catch (error)
  {
    console.error('Erro ao buscar todos os insumos:', error);
    return [];
  }
}

export async function getFarmDetails(farmId: number) {
  try
  {
    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
      include: {
        owner: {
          select: {
            name: true
          }
        },
        plantings: {
          include: {
            plots: {
              select: {
                id: true,
                name: true,
                area: true
              }
            }
          }
        },
        plots: {
          select: {
            id: true,
            name: true,
            area: true
          }
        },
        inputs: {
          select: {
            id: true,
            class: true,
            commercialBrand: true,
            activeIngredient: true,
            unitOfMeasure: true
          }
        }
      }
    });

    return farm;
  } catch (error)
  {
    console.error('Erro ao buscar detalhes da fazenda:', error);
    return null;
  }
}

export async function getFarmApplications(farmId: number) {
  try
  {
    const applications = await prisma.application.findMany({
      where: { farmId },
      include: {
        planting: {
          select: {
            crop: true,
            varieties: true
          }
        }
      },
      orderBy: {
        applicationDate: 'desc'
      }
    });

    return applications;
  } catch (error)
  {
    console.error('Erro ao buscar aplicações da fazenda:', error);
    return [];
  }
}