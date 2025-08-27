import { PrismaClient } from '../lib/generated/prisma-client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding de insumos...');

  await prisma.input.deleteMany();

  const insumosData = [
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D + Picloram CAC',
      activeIngredient: '2,4-D-trietanolamina (ácido ariloxialcanóico) (402 g/L) + picloram-trietanolamina (ácido piridinocarboxílico) (103,6 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D 806 RN',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D 806 SL AGNON',
      activeIngredient: '2,4-D-amina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D 806 SL Álamos; 2,4-D 806 SL Crotect; ',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D 806 SL Perterra',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D 806 SL ZHC',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Acid 866 SL',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (867 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Agroimport',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (867 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Amina CCAB 806 SL',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D C 806 SL Perterra',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D CHDS',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D CROP 806 SL',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Copallience',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (867 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D DMA 806 SL CAC',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Nortox',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (806 g/kg)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Nortox 970 WG',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (970 g/kg)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D R 806 SL Perterra',
      activeIngredient: '2,4-D amina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D SNB',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Super Amine SG',
      activeIngredient: '2,4-D (ácido ariloxialcanóico) (975 g/kg)',
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Tecnomy',
      activeIngredient: '2,4-D-dimetilamina (ácido ariloxialcanóico) (806 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'ADA FH 0108/17',
      activeIngredient: 'clomazona (isoazolidinona) (280 g/L) + diurom (ureia) (250 g/L) + hexazinona (triazinona) (70 g/L)',
    },
    {
      class: 'Inseticida',
      commercialBrand: 'ADA FI 0021/15',
      activeIngredient: 'acefato (organofosforado) (970 g/kg)',
    },
    {
      class: 'Fungicida',
      commercialBrand: 'ADOBE 450 FS',
      activeIngredient: 'ipconazol (triazol) (450 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'AUG 103',
      activeIngredient: 'clorimuron-etílico (sulfonilureia) (150 g/kg) + imazetapir (imidazolinona) (450 g/kg)',
    },
    {
      class: 'Inseticida',
      commercialBrand: 'AUG 106',
      activeIngredient: 'imidacloprido (neonicotinóide) (500 g/L)',
    },
    {
      class: 'Fungicida',
      commercialBrand: 'AUG 117',
      activeIngredient: 'propiconazol (triazol) (300 g/L) + tebuconazol (triazol) (200 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'AUG 122',
      activeIngredient: 'nicosulfurom (sulfonilureia) (40 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'AUG 126',
      activeIngredient: 'quizalofope-P-etílico (ácido ariloxifenoxipropiônico) (125 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'AUG 126 EC',
      activeIngredient: 'quizalofope-P-etílico (ácido ariloxifenoxipropiônico) (125 g/L)',
    },
    {
      class: 'Herbicida',
      commercialBrand: 'AUG 126 EC BR',
      activeIngredient: 'quizalofope-P-etílico (ácido ariloxifenoxipropiônico) (125 g/L)',
    },
    {
      class: 'Inseticida',
      commercialBrand: 'AUG 134',
      activeIngredient: 'imidacloprido (neonicotinóide) (500 g/L)',
    },
    {
      class: 'Fungicida',
      commercialBrand: 'AUG 137',
      activeIngredient: 'tebuconazol (triazol) (250 g/L)',
    },
  ];

  await prisma.input.createMany({
    data: insumosData,
    skipDuplicates: true,
  });

  console.log(`Foram criados ${insumosData.length} insumos com sucesso!`);
  console.log('Processo de seeding finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });