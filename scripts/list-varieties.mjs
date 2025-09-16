// Script para listar todas as variedades
import { PrismaClient } from '../lib/generated/prisma-client/index.js';

const prisma = new PrismaClient();

async function listAllVarieties() {
  console.log('🔍 Listando todas as variedades no banco de dados:\n');
  
  try {
    const varieties = await prisma.variety.findMany({
      orderBy: { name: 'asc' }
    });
    
    if (varieties.length > 0) {
      console.log(`📋 Encontradas ${varieties.length} variedades:\n`);
      varieties.forEach((variety, index) => {
        console.log(`${index + 1}. ${variety.name} (${variety.cycle} dias) - ID: ${variety.id}`);
      });
    } else {
      console.log('❌ Nenhuma variedade encontrada no banco.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao buscar variedades:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listAllVarieties();