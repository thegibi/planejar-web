import { PrismaClient } from '../lib/generated/prisma-client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed da base de dados...')

  const fungicides = [
    {
      class: 'Fungicida',
      commercialBrand: 'Absoluto',
      activeIngredient: 'Clorotalonil (500 g/l)',
      unitOfMeasure: '1,5 a 2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Across',
      activeIngredient: 'Azoxistrobina (40 g/L) + difenoconazol (40 g/L) + Clorotalonil (500 g/l)',
      unitOfMeasure: '1,5 a 2,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Alade',
      activeIngredient: 'Benzovindiflupyr (60 g/L) + ciproconazol (90 g/L) + difenoconazol (150 g/L)',
      unitOfMeasure: '0,35 a 0,75 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Aproach Power',
      activeIngredient: 'Picoxistrobina (90 g/L) + ciproconazol (40 g/L)',
      unitOfMeasure: '0,6 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Armero',
      activeIngredient: 'Protioconazol (40 g/L) + mancozebe (500 g/L)',
      unitOfMeasure: '2 a 2,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Aumenax',
      activeIngredient: 'fluxapiroxade (50 g/L) + oxicloreto de cobre (420 g/L)',
      unitOfMeasure: '0,8 a 1,2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Azimut',
      activeIngredient: 'Azoxistrobina (120 g/L) + tebuconazol (200 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Azimut Supra',
      activeIngredient: 'Azoxistrobina (40 g/Kg) + tebuconazol (40 g/Kg) + mancozebe (600 g/Kg)',
      unitOfMeasure: '2 a 2,5 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Belyan',
      activeIngredient: 'mefentrifluconazol (133,3g/L) + piraclostrobina (177,8g/L) + fluxapiroxade (88,9g/L)',
      unitOfMeasure: '0,5 a 0,7 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Blavity',
      activeIngredient: 'fluxapiroxade (200 g/L) + Protioconazol (280 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Bravengis',
      activeIngredient: 'tebuconazol (50 g/L) + clorotalonil (450 g/L)',
      unitOfMeasure: '2 a 2,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Bravonil',
      activeIngredient: 'clorotalonil (720 g/L)',
      unitOfMeasure: '1 a 2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Carbendazim Nortox',
      activeIngredient: 'carbendazim (500 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Certeza N',
      activeIngredient: 'tiofanato-metílico (350 g/L) + fluazinam (52,5 g/L)',
      unitOfMeasure: '0,18 a 0,2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Clorotalonil 720',
      activeIngredient: 'clorotalonil (720 g/L)',
      unitOfMeasure: '1,4 a 1,8 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Controller NT',
      activeIngredient: 'mancozebe (800 g/Kg)',
      unitOfMeasure: '1,5 a 3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Controller NT WG',
      activeIngredient: 'mancozebe (750 g/Kg)',
      unitOfMeasure: '1,5 a 3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Cronnos',
      activeIngredient: 'Picoxistrobina (26,6 g/L) + tebuconazo (33,33g/L) + mancozebe (400g/L)',
      unitOfMeasure: '2 a 2,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Cypress',
      activeIngredient: 'difenoconazol (250 g/L) + ciproconazol (150 g/L)',
      unitOfMeasure: '0,3 a 0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Dart',
      activeIngredient: 'tebuconazol (200 g/L) + Picoxistrobina (120 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Difenoconazole',
      activeIngredient: 'difenoconazol (250 g/L)',
      unitOfMeasure: '0,15 a 0,3 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Elatus',
      activeIngredient: 'Azoxistrobina (300 g/Kg) + Benzovindiflupyr (150 g/Kg)',
      unitOfMeasure: '0,2 a 0,3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Emzeb Platina',
      activeIngredient: 'mancozebe (750 g/Kg)',
      unitOfMeasure: '1,5 a 3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Evolution',
      activeIngredient: 'Azoxistrobina (37,5 g/Kg) + mancozebe (525g/Kg) + Protioconazol (37,5g/Kg)',
      unitOfMeasure: '2 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Evos',
      activeIngredient: 'flutriafol (250 g/L) + Azoxistrobina (250 g/L)',
      unitOfMeasure: '0,25 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Fezan Gold',
      activeIngredient: 'clorotalonil (450 g/L) + tebuconazol (50 g/L)',
      unitOfMeasure: '1,75 a 2,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Fox Supra',
      activeIngredient: 'impirfluxam (120 g/L) + Protioconazol (240 g/L)',
      unitOfMeasure: '0,35 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Fox Xpro',
      activeIngredient: 'Bixafem (125 g/L) + Protioconazol (175 g/L) + trifloxistrobina (150 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Funginil',
      activeIngredient: 'clorotalonil (500 g/L)',
      unitOfMeasure: '2 a 3 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Fusão',
      activeIngredient: 'metominostrobin (110 g/L) + tebuconazol (165 g/L)',
      unitOfMeasure: '0,58 a 0,72 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Mancozeb 800',
      activeIngredient: 'mancozebe (800 g/Kg)',
      unitOfMeasure: '1,4 a 2,8 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Manfil',
      activeIngredient: 'mancozebe (800 g/Kg)',
      unitOfMeasure: '1,4 a 2,8 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Maxim',
      activeIngredient: 'fludioxonil (25 g/L) + metalaxil-M (10 g/L)',
      unitOfMeasure: '0,1 kg/100kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Mitrion',
      activeIngredient: 'Benzovindiflupyr (75 g/L) + Protioconazol (150 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Orkestra',
      activeIngredient: 'piraclostrobina (333 g/L) + fluxapiroxade (167 g/L)',
      unitOfMeasure: '0,25 a 0,30 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Previnil',
      activeIngredient: 'clorotalonil (720 g/L)',
      unitOfMeasure: '1,5 a 2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Priori Xtra',
      activeIngredient: 'Azoxistrobina (200 g/L) + ciproconazol (80 g/L)',
      unitOfMeasure: '0,3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Prisma',
      activeIngredient: 'difenoconazol (250 g/L)',
      unitOfMeasure: '0,2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Protreat',
      activeIngredient: 'carbendazim (150 g/L) + tiram (350 g/L)',
      unitOfMeasure: '0,15 a 0,2 lt/100kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Rancona T',
      activeIngredient: 'tiram (350 g/L) + ipconazol (10 g/L)',
      unitOfMeasure: '0,15 a 0,2 lt/100kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Score',
      activeIngredient: 'difenoconazol (250 g/L)',
      unitOfMeasure: '0,3 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Score Flexi',
      activeIngredient: 'propiconazol (250 g/L) + difenoconazol (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Spectro',
      activeIngredient: 'difenoconazol (150 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Standak Top',
      activeIngredient: 'piraclostrobina (25g/L) + fipronil (250g/L) + tiofanato-metílico (225g/L)',
      unitOfMeasure: '0,2 lt/100kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Sugoy',
      activeIngredient: 'Metominostrobina (34,3g/L) + Impirfluxan (17,1 g/L) + clorotalonil (571,4g/L)',
      unitOfMeasure: '2 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Teburaz',
      activeIngredient: 'Azoxistrobina (120 g/L) + tebuconazol (200 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Unizeb Gold',
      activeIngredient: 'mancozebe (750 g/Kg)',
      unitOfMeasure: '1,5 a 3 kg'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Versatilis',
      activeIngredient: 'fenpropimorfe (750 g/L)',
      unitOfMeasure: '0,3 a 0,5 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Vessarya',
      activeIngredient: 'Picoxistrobina (100 g/L) + Benzovindiflupyr (50 g/L)',
      unitOfMeasure: '0,6 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Viovan',
      activeIngredient: 'Picoxistrobina (100 g/L) + Protioconazol (116,7 g/L)',
      unitOfMeasure: '0,6 lt'
    },
    {
      class: 'Fungicida',
      commercialBrand: 'Vitavax-Thiram',
      activeIngredient: 'carboxina (375 g/Kg) + tiram (375 g/Kg)',
      unitOfMeasure: '0,25 kg/100kg'
    }
  ]

  const herbicides = [
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D',
      activeIngredient: '2,4-D-dimetilamina (867 g/L)',
      unitOfMeasure: '1,5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: '2,4-D Nortox 970 WG',
      activeIngredient: '2,4-D (970 g/Kg)',
      unitOfMeasure: '1,5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Aminol 806',
      activeIngredient: '2,4-D-dimetilamina (806 g/L)',
      unitOfMeasure: '1,5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Atrazina Fersol 500',
      activeIngredient: 'Atrazina (500 g/L)',
      unitOfMeasure: '4 a 5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Aurora',
      activeIngredient: 'carfentrazona-etílica (400 g/L)',
      unitOfMeasure: '0,05 a 0,07'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Blowout',
      activeIngredient: 'Dibrometo de diquate (200 g/L)',
      unitOfMeasure: '1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Cletodim',
      activeIngredient: 'cletodim (240 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Click',
      activeIngredient: 'terbutilazina (500 g/L)',
      unitOfMeasure: '1 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Climur',
      activeIngredient: 'clorimurom-etílico (250 g/Kg)',
      unitOfMeasure: '0,06 a 0,08 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Clorimuron max',
      activeIngredient: 'clorimurom-etílico (750 g/Kg)',
      unitOfMeasure: '0,02 a 0,04 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Clorimuron 750',
      activeIngredient: 'clorimurom-etílico (750 g/Kg)',
      unitOfMeasure: '0,02 a 0,04 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Clorimuron 250',
      activeIngredient: 'clorimurom-etílico (250 g/Kg)',
      unitOfMeasure: '0,06 a 0,08 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Dessicash',
      activeIngredient: 'Dibrometo de diquate (200 g/L)',
      unitOfMeasure: '1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Diquat',
      activeIngredient: 'Dibrometo de diquate (373,62 g/L)',
      unitOfMeasure: '2 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Dual Gold',
      activeIngredient: 'metolacloro (960 g/L)',
      unitOfMeasure: '1,7 a 2 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Eliminate',
      activeIngredient: 'Glufosinato - sal de amônio (200 g/L)',
      unitOfMeasure: '2 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Finale',
      activeIngredient: 'Glufosinato - sal de amônio (200 g/L)',
      unitOfMeasure: '3 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Flumi 500',
      activeIngredient: 'flumioxazina (500 g/Kg)',
      unitOfMeasure: '0,05 a 0,1'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Flumioxazin 500',
      activeIngredient: 'flumioxazina (500 g/L)',
      unitOfMeasure: '0,05 a 0,2'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Flumioxazin',
      activeIngredient: 'flumioxazina (500 g/L)',
      unitOfMeasure: '0,05 a 0,3'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Flumyzin',
      activeIngredient: 'flumioxazina (500 g/Kg)',
      unitOfMeasure: '0,05 a 0,4'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Freno',
      activeIngredient: 'cletodim (240 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Glifosato',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/Kg)',
      unitOfMeasure: '1 a 3 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Glint Full',
      activeIngredient: 'haloxifope-P-metílico (540 g/L)',
      unitOfMeasure: '0,07 a 0,15 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Gli-Up 720 WG',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/Kg)',
      unitOfMeasure: '1 a 3 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Glifosato WG',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/Kg)',
      unitOfMeasure: '1 a 3 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Glufosinato',
      activeIngredient: 'Glufosinato - sal de amônio (200 g/L)',
      unitOfMeasure: '2 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Haloxifope 540',
      activeIngredient: 'haloxifope-P-metílico (540 g/L)',
      unitOfMeasure: '0,07 a 0,15 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Kennox',
      activeIngredient: 'cletodim(240 g/L)+haloxifope-P-metílico (123,6 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Off Road',
      activeIngredient: 'Glufosinato - sal de amônio (200 g/L)',
      unitOfMeasure: '2 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Panzer Max',
      activeIngredient: 'clorimurom-etílico (750 g/Kg)',
      unitOfMeasure: '0,02 a 0,04 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Prevent Gold',
      activeIngredient: 'S-metolacloro (950 g/l)',
      unitOfMeasure: '1,7 a 2 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Proof',
      activeIngredient: 'Atrazina (500 g/L)',
      unitOfMeasure: '4 a 5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Poquer',
      activeIngredient: 'cletodim (240 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Reglone',
      activeIngredient: 'Dibrometo de diquate (200 g/L)',
      unitOfMeasure: '1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Roundup WG',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/Kg)',
      unitOfMeasure: '1 a 3 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Select 240',
      activeIngredient: 'cletodim (240 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Select 3',
      activeIngredient: 'cletodim (360 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Senha WG',
      activeIngredient: 'glifosato (792,5 g/Kg)',
      unitOfMeasure: '1 a 3 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Siptran',
      activeIngredient: 'Atrazina (500 g/L)',
      unitOfMeasure: '4 a 5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'S-metolachlor',
      activeIngredient: 'S-metolacloro (950 g/l)',
      unitOfMeasure: '1,7 a 2 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Soldier',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/L)',
      unitOfMeasure: '1 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Soyaclean',
      activeIngredient: 'imazetapir (106 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Spraykill',
      activeIngredient: 'Dibrometo de diquate (200 g/L)',
      unitOfMeasure: '1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Sumisoya',
      activeIngredient: 'flumioxazina (500 g/Kg)',
      unitOfMeasure: '0,07 a 0,15 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Sumyzin 500',
      activeIngredient: 'flumioxazina (500 g/Kg)',
      unitOfMeasure: '0,07 a 0,15 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Sungain xtra',
      activeIngredient: 'Flumioxazina (800 g/kg)',
      unitOfMeasure: '0,025 kg'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Targa Max',
      activeIngredient: 'quizalofope-P-etílico (50 g/L)',
      unitOfMeasure: '0,5 a 2 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Ultimato',
      activeIngredient: 'Atrazina (500 g/L)',
      unitOfMeasure: '4 a 5 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Verdict',
      activeIngredient: 'haloxifope-P-metílico (540 g/L)',
      unitOfMeasure: '0,07 a 0,15 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Viance',
      activeIngredient: 'cletodim (240 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Xeque Mate',
      activeIngredient: 'glifosato-sal de potássio (620 g/L)',
      unitOfMeasure: '1,5 a 4 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Xeque Mate HT',
      activeIngredient: 'glifosato-sal de potássio (720 g/L)',
      unitOfMeasure: '1,5 a 3 lt'
    },
    {
      class: 'Herbicida',
      commercialBrand: 'Zafera',
      activeIngredient: 'glifosato-sal de amônio (792,5 g/Kg)',
      unitOfMeasure: '1,5 a 3 lt'
    }
  ]

  const insecticides = [
    {
      class: 'Inseticida',
      commercialBrand: 'Acefato',
      activeIngredient: 'acefato (970 g/Kg)',
      unitOfMeasure: '0,7 A 1 kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Aceway',
      activeIngredient: 'acetamiprido (250 g/L) + bifentrina (250 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Adver 240 SC',
      activeIngredient: 'clorfenapir (240 g/L)',
      unitOfMeasure: '0,5 a 1,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Acetamiprid',
      activeIngredient: 'acetamiprido (200 g/Kg)',
      unitOfMeasure: '0,3 kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Afiado',
      activeIngredient: 'acetamiprido (250 g/L) + bifentrina (250 g/L)',
      unitOfMeasure: '0,5 a 1,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Aslan SL',
      activeIngredient: 'acetamiprido (100 g/L) + bifentrina (67 g/L)',
      unitOfMeasure: '0,4 a 0,5'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Clopanto',
      activeIngredient: 'clorpirifós (480 g/L)',
      unitOfMeasure: '0,25 a 1,5 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Clorfenapir 240',
      activeIngredient: 'clorfenapir (240 g/L)',
      unitOfMeasure: '0,5 a 1,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Clorpirifós',
      activeIngredient: 'clorpirifós (480 g/L)',
      unitOfMeasure: '0,25 a 1,5 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Clorpirifós Nortox',
      activeIngredient: 'clorpirifós (480 g/L)',
      unitOfMeasure: '0,25 a 1,5 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Cofenrin',
      activeIngredient: 'bifentrina (400 g/L)',
      unitOfMeasure: '0,025 a 0,040 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Curbix 200',
      activeIngredient: 'Etiprole (200 g/L)',
      unitOfMeasure: '0,75 a 1 llt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Davos',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Dermacor',
      activeIngredient: 'clorantraniliprole (625 g/L)',
      unitOfMeasure: '0,1 kg/100'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Engeo Pleno S',
      activeIngredient: 'tiametoxam (141 g/L) + lambda-cialotrina (106 g/L)',
      unitOfMeasure: '0,150 a 0,2'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Expedition',
      activeIngredient: 'sulfoxaflor (100 g/L) + lambda-cialotrina (150 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Fipronil 250',
      activeIngredient: 'fipronil (250 g/L)',
      unitOfMeasure: '0,2 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Fipronil 500',
      activeIngredient: 'fipronil (500 g/L)',
      unitOfMeasure: '0,075 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Fipronil 800 WG',
      activeIngredient: 'fipronil (800 g/Kg)',
      unitOfMeasure: '0,04 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Fortenza 600',
      activeIngredient: 'Ciantraniliprole (600 g/L)',
      unitOfMeasure: '0,15 a 0,2 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Galeão',
      activeIngredient: 'imidacloprido (700 g/Kg)',
      unitOfMeasure: ''
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Galil',
      activeIngredient: 'imidacloprido (250 g/L) + bifentrina (50 g/L)',
      unitOfMeasure: '0,4 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Granary',
      activeIngredient: 'imidacloprido (700 g/Kg)',
      unitOfMeasure: ''
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Intrepid',
      activeIngredient: 'metoxifenozida (240 g/L)',
      unitOfMeasure: '0,4 a 06 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Inzaka Zeon',
      activeIngredient: 'acetamiprido (200 g/L) + Lambida Cialotrina (80 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Judoka Super',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Kaiso',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Karate Zeon',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Kraton',
      activeIngredient: 'lufenurom (100 g/L)',
      unitOfMeasure: '0,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Lannate',
      activeIngredient: 'metomil (215 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Legion',
      activeIngredient: 'fenitrotiona (800 g/L) + Esfenvalerato (40 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Lufenuron',
      activeIngredient: 'lufenurom (100 g/L)',
      unitOfMeasure: '0,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Magnum',
      activeIngredient: 'acefato (970 g/Kg)',
      unitOfMeasure: '0,8 a 1 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Match',
      activeIngredient: 'lufenurom (98 g/L)',
      unitOfMeasure: '0,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Metomil',
      activeIngredient: 'metomil (215 g/L)',
      unitOfMeasure: '0,5 a 1 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Nomolt 150',
      activeIngredient: 'teflubenzurom (150 g/L)',
      unitOfMeasure: '0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Notório',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Orthene',
      activeIngredient: 'acefato (750 g/Kg)',
      unitOfMeasure: '0,8 a 1 kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Perito',
      activeIngredient: 'acefato (970 g/Kg)',
      unitOfMeasure: '0,7 a 1 kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Pirate',
      activeIngredient: 'clorfenapir (240 g/L)',
      unitOfMeasure: '0,5 a 1,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Pirephos EC',
      activeIngredient: 'Esfenvalerato (40 g/L) + fenitrotiona (800 g/L)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Piriproxifem CCAB',
      activeIngredient: 'piriproxifem (100 g/L)',
      unitOfMeasure: '0,1 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Piriproxifen Nortox',
      activeIngredient: 'piriproxifem (200 g/L)',
      unitOfMeasure: '0,125 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Premio',
      activeIngredient: 'clorantraniliprole (200 g/L)',
      unitOfMeasure: '0,1 a 0,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Racio',
      activeIngredient: 'acefato (750 g/Kg)',
      unitOfMeasure: '0,7 a 1 kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Samurai',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 0,15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Seizer',
      activeIngredient: 'bifentrina (100 g/L)',
      unitOfMeasure: '0,1 a 0,16 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Sperto',
      activeIngredient: 'bifentrina (250 g/Kg) + acetamiprido (250 g/Kg)',
      unitOfMeasure: '0,25 a 0,3 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Squad',
      activeIngredient: 'acetamiprido (375 g/L) + bifentrina (165 g/L)',
      unitOfMeasure: '0,2 a 0,25'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Standak',
      activeIngredient: 'fipronil (250 g/L)',
      unitOfMeasure: '0,2 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Standak Duo',
      activeIngredient: 'acetamiprido (400 g/L) + fipronil (100 g/L)',
      unitOfMeasure: '0,6 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Talisman',
      activeIngredient: 'bifentrina (50 g/L) + carbossulfano (150 g/L)',
      unitOfMeasure: '0,25 a 0,6 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Terminus',
      activeIngredient: 'acetamiprido (200 g/L) + Lambida Cialotrina (250 g/L)',
      unitOfMeasure: '0,2 a 05 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Tiametoxan',
      activeIngredient: 'Tiametoxan',
      unitOfMeasure: '0,07kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Trigger 240',
      activeIngredient: 'clorfenapir (240 g/L)',
      unitOfMeasure: '0,5 a 1,2 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Trinca Caps',
      activeIngredient: 'lambda-cialotrina (250 g/L)',
      unitOfMeasure: '0,1 a 15 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Zeus',
      activeIngredient: 'Dinotefuram (84 g/L) + lambda-cialotrina (48 g/L)',
      unitOfMeasure: '0,5 lt'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Shelter',
      activeIngredient: 'fipronil (250 g/L)',
      unitOfMeasure: '0,2 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Cropstar',
      activeIngredient: 'imidacloprido (150 g/L) + tiodicarbe (450 g/L)',
      unitOfMeasure: '0,3 lt/100kg'
    },
    {
      class: 'Inseticida',
      commercialBrand: 'Engeo',
      activeIngredient: 'cipermetrina (220 g/L) + tiametoxam (110 g/L)',
      unitOfMeasure: '0,22 a 0,25 lt'
    }
  ]

  console.log('Inserindo fungicidas...')

  for (const fungicide of fungicides)
  {
    await prisma.input.upsert({
      where: {
        id: -1
      },
      update: {},
      create: fungicide
    })
  }

  console.log(`${fungicides.length} fungicidas foram inseridos com sucesso!`)

  console.log('Inserindo herbicidas...')

  for (const herbicide of herbicides)
  {
    await prisma.input.upsert({
      where: {
        id: -1
      },
      update: {},
      create: herbicide
    })
  }

  console.log(`${herbicides.length} herbicidas foram inseridos com sucesso!`)

  console.log('Inserindo inseticidas...')

  for (const insecticide of insecticides)
  {
    await prisma.input.upsert({
      where: {
        id: -1
      },
      update: {},
      create: insecticide
    })
  }

  console.log(`${insecticides.length} inseticidas foram inseridos com sucesso!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })