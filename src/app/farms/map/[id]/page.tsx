import { Map } from '@/components/map';
import prisma from '@/lib/prisma';

export default async function FarmMapPage(props: PageProps<'/farms/map/[id]'>) {
  const { id } = await props.params;
  const farmId = parseInt(id);

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

  const geoJSONFeatures = farm.plots
    .filter(plot => plot.geometry)
    .map(plot => JSON.parse(plot.geometry as string));

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