import { Map } from '@/components/map';
import prisma from '@/lib/prisma';

export default async function FarmMapPage({ params }: { params: { id: string } }) {
  const farmId = parseInt(params.id);

  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
    include: {
      plots: true,
    },
  });

  if (!farm) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-red-500">Fazenda não encontrada.</p>
      </div>
    );
  }

  // Prepara os dados de geometria dos talhões para o mapa
  const geoJSONFeatures = farm.plots
    .filter(plot => plot.geometry)
    .map(plot => JSON.parse(plot.geometry));

  const geoJSONData = {
    type: 'FeatureCollection',
    features: geoJSONFeatures.map(geom => ({
      type: 'Feature',
      properties: { name: geom.name },
      geometry: geom.geometry,
    })),
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mapa da Fazenda: {farm.name}</h1>
      <div className="mb-6">
        <Map geoJSONData={geoJSONData} />
      </div>
    </div>
  );
}