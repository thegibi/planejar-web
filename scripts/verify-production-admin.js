const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyProductionAdmin() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'rafael.maciel@planejar.app' },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true
      }
    });

    if (admin) {
      console.log('✅ Usuário admin encontrado em produção!');
      console.log('='.repeat(50));
      console.log('👤 Nome:', admin.name);
      console.log('📧 Email:', admin.email);
      console.log('🆔 ID:', admin.id);
      console.log('✉️  Email Verificado:', admin.emailVerified ? 'Sim' : 'Não');

      console.log('\n🔐 Credenciais para login:');
      console.log('   Email: rafael.maciel@planejar.app');
      console.log('   Senha: admin123');

      return true;
    } else {
      console.log('❌ Usuário admin NÃO encontrado em produção!');
      console.log('💡 Execute o script de criação: node scripts/seed-production-admin.js');
      return false;
    }

  } catch (error) {
    console.error('❌ Erro ao verificar usuário admin:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  verifyProductionAdmin();
}

module.exports = { verifyProductionAdmin };