import { PrismaClient } from '../lib/generated/prisma-client/index.js';

const prisma = new PrismaClient();

async function deleteSpecificVarieties() {
  const varietiesToDelete = ['M459', 'MB334', 'NM55'];

  console.log('Iniciando deleção das variedades:', varietiesToDelete);

  try {
    for (const varietyName of varietiesToDelete) {
      const result = await prisma.variety.deleteMany({
        where: {
          name: varietyName
        }
      });

      if (result.count > 0) {
        console.log(`✅ Variedade ${varietyName} deletada com sucesso! (${result.count} registro(s))`);
      } else {
        console.log(`⚠️ Variedade ${varietyName} não encontrada no banco.`);
      }
    }

    console.log('\n🎉 Processo de deleção finalizado!');
  } catch (error) {
    console.error('❌ Erro ao deletar variedades:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSpecificVarieties();