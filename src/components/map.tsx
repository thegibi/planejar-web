'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

interface MapProps {
  geoJSONData: GeoJSON.GeoJsonObject;
}

export function Map({ geoJSONData }: MapProps) {
  const defaultPosition: [number, number] = [-9.8795908, -56.1227369];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: '800px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {geoJSONData && (
        <GeoJSON
          data={geoJSONData}
          style={() => ({
            color: '#4a83ec',
            weight: 2,
            fillOpacity: 0.5,
          })}
        />
      )}
    </MapContainer>
  );
}