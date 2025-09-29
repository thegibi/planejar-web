import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma';

async function createAdminUser() {
  try
  {
    const adminEmail = 'admin@planejar.com';
    const adminPassword = 'admin123';
    const adminName = 'Administrador';

    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser)
    {
      console.log('Usuário administrador já existe!');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
      }
    });

    console.log('Usuário administrador criado com sucesso!');
    console.log('Email:', adminEmail);
    console.log('Senha:', adminPassword);
    console.log('ID:', admin.id);
  } catch (error)
  {
    console.error('Erro ao criar usuário administrador:', error);
  } finally
  {
    await prisma.$disconnect();
  }
}

createAdminUser();