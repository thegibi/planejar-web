const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createProductionAdmin() {
  try {
    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'rafael.maciel@planejar.app' }
    });

    if (existingAdmin) {
      console.log('✅ Usuário admin já existe em produção!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Nome:', existingAdmin.name);
      return;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'rafael.maciel@planejar.app',
        password: hashedPassword,
      },
    });

    console.log('✅ Usuário admin criado com sucesso em produção!');
    console.log('👤 Nome:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('🆔 ID:', admin.id);

    console.log('\n🔐 Credenciais de acesso:');
    console.log('   Email: rafael.maciel@planejar.app');
    console.log('   Senha: admin123');

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);

    if (error.code === 'P2002') {
      console.log('⚠️  Usuário com este email já existe!');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  createProductionAdmin();
}

module.exports = { createProductionAdmin };