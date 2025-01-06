import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Fetch the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
            lat: latitude,
            lng: longitude
        });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
            lat: latitude,
            lng: longitude
        });
    });

    return () => navigator.geolocation.clearWatch(watchId);
}, []);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {currentPosition ? (
        <MapContainer
          center={currentPosition}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition}>
            <Popup>
              You are here: {currentPosition.lat}, {currentPosition.lng}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
}

export default LiveTracking;
