"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically load Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export default function MapView({ spot }: { spot: TeaSpot }) {
  const position: [number, number] = [spot.lat, spot.lng];
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{spot.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
