import { PrismaClient } from '../lib/generated/prisma-client'

const prisma = new PrismaClient()

async function main() { }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })