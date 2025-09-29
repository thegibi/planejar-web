const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function diagnoseProduction() {
  console.log('🔍 DIAGNÓSTICO DE PRODUÇÃO - PLANEJAR.APP');
  console.log('='.repeat(60));

  // 1. Verificar variáveis de ambiente
  console.log('\n1️⃣ VARIÁVEIS DE AMBIENTE:');
  console.log('NODE_ENV:', process.env.NODE_ENV || '❌ NÃO DEFINIDO');
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '❌ NÃO DEFINIDO');
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ DEFINIDO' : '❌ NÃO DEFINIDO');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ DEFINIDO' : '❌ NÃO DEFINIDO');

  // 2. Verificar conexão com banco
  console.log('\n2️⃣ CONEXÃO COM BANCO DE DADOS:');
  try {
    await prisma.$connect();
    console.log('✅ Conexão com banco: OK');

    // Contar usuários
    const userCount = await prisma.user.count();
    console.log(`📊 Total de usuários: ${userCount}`);

  } catch (error) {
    console.log('❌ Erro na conexão:', error.message);
  }

  // 3. Verificar usuário admin
  console.log('\n3️⃣ USUÁRIO ADMINISTRADOR:');
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'rafael.maciel@planejar.app' },
      select: { id: true, name: true, email: true }
    });

    if (admin) {
      console.log('✅ Usuário admin encontrado');
      console.log('👤 Nome:', admin.name);
      console.log('📧 Email:', admin.email);
      console.log('🆔 ID:', admin.id);
    } else {
      console.log('❌ Usuário admin NÃO encontrado');
      console.log('💡 Execute: npm run seed:admin');
    }
  } catch (error) {
    console.log('❌ Erro ao verificar admin:', error.message);
  }

  // 4. Verificar configurações críticas
  console.log('\n4️⃣ CONFIGURAÇÕES CRÍTICAS:');

  // NextAuth Secret
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.log('❌ NEXTAUTH_SECRET não definido');
  } else if (secret.length < 32) {
    console.log('⚠️  NEXTAUTH_SECRET muito curto (mínimo 32 caracteres)');
  } else {
    console.log('✅ NEXTAUTH_SECRET: OK');
  }

  // NextAuth URL
  const authUrl = process.env.NEXTAUTH_URL;
  if (authUrl === 'https://www.planejar.app') {
    console.log('✅ NEXTAUTH_URL: OK');
  } else {
    console.log('❌ NEXTAUTH_URL incorreto ou não definido');
    console.log('💡 Deve ser: https://www.planejar.app');
  }

  // 5. Recomendações
  console.log('\n5️⃣ RECOMENDAÇÕES:');

  if (process.env.NODE_ENV !== 'production') {
    console.log('⚠️  Definir NODE_ENV=production');
  }

  if (!process.env.NEXTAUTH_URL) {
    console.log('⚠️  Definir NEXTAUTH_URL=https://www.planejar.app');
  }

  if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
    console.log('⚠️  Gerar NEXTAUTH_SECRET forte (32+ caracteres)');
  }

  console.log('\n' + '='.repeat(60));
  console.log('🔗 Documentação completa: PRODUCTION.md');

  await prisma.$disconnect();
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  diagnoseProduction().catch(console.error);
}

module.exports = { diagnoseProduction };