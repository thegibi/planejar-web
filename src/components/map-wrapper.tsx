'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./map').then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg">
      <p className="text-gray-500">Carregando mapa...</p>
    </div>
  )
});

interface MapWrapperProps {
  geoJSONData: GeoJSON.FeatureCollection;
  farmName: string;
  farmCenter?: [number, number];
}

export default function MapWrapper(props: MapWrapperProps) {
  return <DynamicMap {...props} />;
}