const { PrismaClient } = require('./lib/generated/prisma-client');
const { withAccelerate } = require('@prisma/extension-accelerate');

const prisma = new PrismaClient().$extends(withAccelerate());

async function checkAndRenameClientToOwner() {
  try {
    console.log('Verificando estado do banco de dados...');

    // Primeiro, vamos verificar se a tabela Owner já existe
    try {
      const ownerCheck = await prisma.$queryRaw`SELECT 1 FROM "Owner" LIMIT 1`;
      console.log('✅ A tabela Owner já existe. Migração já foi aplicada.');
      return;
    } catch (ownerError) {
      console.log('⚠️  A tabela Owner não existe. Tentando renomear Client para Owner...');
    }

    // Tentar renomear diretamente
    try {
      await prisma.$executeRaw`ALTER TABLE "Client" RENAME TO "Owner"`;
      console.log('✅ Migração concluída com sucesso! Tabela Client renomeada para Owner.');
    } catch (renameError) {
      console.log('❌ Erro ao renomear tabela:', renameError.message);

      // Se não conseguir renomear, vamos tentar criar uma nova tabela e migrar os dados
      console.log('Tentando abordagem alternativa: criar nova tabela e migrar dados...');

      try {
        // Criar tabela Owner com a mesma estrutura de Client
        await prisma.$executeRaw`
          CREATE TABLE "Owner" (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT,
            email TEXT UNIQUE
          )
        `;

        // Migrar dados de Client para Owner
        await prisma.$executeRaw`
          INSERT INTO "Owner" (id, name, phone, email)
          SELECT id, name, phone, email FROM "Client"
        `;

        // Atualizar referências na tabela Farm
        await prisma.$executeRaw`
          ALTER TABLE "Farm" DROP CONSTRAINT "Farm_ownerId_fkey"
        `;

        await prisma.$executeRaw`
          ALTER TABLE "Farm" ADD CONSTRAINT "Farm_ownerId_fkey" 
          FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        `;

        // Remover tabela Client
        await prisma.$executeRaw`DROP TABLE "Client"`;

        console.log('✅ Migração alternativa concluída! Dados migrados de Client para Owner.');

      } catch (alternativeError) {
        console.error('❌ Erro na migração alternativa:', alternativeError.message);
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndRenameClientToOwner();