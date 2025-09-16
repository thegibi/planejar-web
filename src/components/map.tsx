'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button } from './ui/button';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

// Ícone personalizado para a localização do usuário
const userLocationIcon = new L.Icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconRetinaUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

interface MapProps {
  geoJSONData: GeoJSON.FeatureCollection;
  farmName: string;
  farmCenter?: [number, number];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

// Função para calcular distância entre dois pontos usando a fórmula de Haversine
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function Map({ geoJSONData, farmName, farmCenter }: MapProps) {
  const defaultPosition: [number, number] = farmCenter || [-9.8795908, -56.1227369];
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Calcular distância até a fazenda
  const distanceToFarm = userLocation && farmCenter 
    ? calculateDistance(userLocation.latitude, userLocation.longitude, farmCenter[0], farmCenter[1])
    : null;

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setLocationError(null);
          setIsLoadingLocation(false);

          // Centralizar o mapa na localização do usuário
          if (mapRef.current) {
            mapRef.current.setView([newLocation.latitude, newLocation.longitude], 15);
          }
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setIsLoadingLocation(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError('Permissão de localização negada pelo usuário.');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError('Informações de localização não estão disponíveis.');
              break;
            case error.TIMEOUT:
              setLocationError('Tempo limite para obter localização excedido.');
              break;
            default:
              setLocationError('Erro desconhecido ao obter localização.');
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000, // Cache por 1 minuto
        }
      );
    } else {
      setLocationError('Geolocalização não é suportada neste navegador.');
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <div className="mb-4 flex gap-2 items-center">
        <Button 
          onClick={getUserLocation}
          disabled={isLoadingLocation}
          variant="outline"
          size="sm"
        >
          {isLoadingLocation ? '📍 Obtendo localização...' : '📍 Minha Localização'}
        </Button>
        
        {userLocation && (
          <div className="text-sm text-gray-600 flex items-center gap-4">
            <span>📍 {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}</span>
            {distanceToFarm && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                📏 {distanceToFarm.toFixed(2)} km da fazenda
              </span>
            )}
          </div>
        )}
      </div>

      {locationError && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <p className="text-sm">⚠️ {locationError}</p>
        </div>
      )}
      
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: '800px', width: '100%' }}
        ref={mapRef}
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

        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-blue-600">📍 Sua Localização</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lat: {userLocation.latitude.toFixed(6)}<br />
                  Lng: {userLocation.longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}