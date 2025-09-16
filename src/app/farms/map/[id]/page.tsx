import MapWrapper from '@/components/map-wrapper';
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

  const geoJSONData: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: geoJSONFeatures.map(geom => ({
      type: 'Feature',
      properties: { name: geom.name },
      geometry: geom.geometry,
    })),
  };

  // Calcular centro da fazenda baseado nos talhões
  let farmCenter: [number, number] | undefined;
  if (geoJSONFeatures.length > 0) {
    const allCoordinates: number[][] = [];
    
    geoJSONFeatures.forEach(feature => {
      if (feature.geometry?.type === 'Polygon') {
        allCoordinates.push(...feature.geometry.coordinates[0]);
      }
    });

    if (allCoordinates.length > 0) {
      const avgLat = allCoordinates.reduce((sum, coord) => sum + coord[1], 0) / allCoordinates.length;
      const avgLng = allCoordinates.reduce((sum, coord) => sum + coord[0], 0) / allCoordinates.length;
      farmCenter = [avgLat, avgLng];
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mapa da Fazenda: {farm.name}</h1>
      <div className="mb-6">
              <MapWrapper 
        geoJSONData={geoJSONData} 
        farmName={farm.name}
        farmCenter={farmCenter}
      />
      </div>
    </div>
  );
}