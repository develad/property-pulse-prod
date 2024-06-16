'use client';

import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { setDefaults, fromAddress } from 'react-geocode';
import Image from 'next/image';
import Spinner from './Spinner';

import markerIcon2x from '@/assets/images/map-marker-icon.png';
import markerIcon from '@/assets/images/map-marker-icon.png';
const PropertyMap = ({ property }) => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
  });

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 17,
    width: '100%',
    height: '500px',
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        // Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;

        setViewport((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  // Handle case geocoding failed
  if (geocodeError) {
    return <div className="text-xl font-bold">No location data found</div>;
  }

  return (
    !loading && (
      <div>
        <MapContainer
          className={`h-[500px] w-full`}
          center={[viewport.latitude, viewport.longitude]}
          zoom={viewport.zoom}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png	"
          />
          <Marker position={[viewport.latitude, viewport.longitude]}>
            <Popup>
              <div className="font-bold text-lg text-center">
                {property.name}
              </div>
              <br />
              <Image
                src={property.images[0]}
                height={0}
                width={0}
                sizes="100vw"
                alt="property image"
                className="w-full h-32 object-cover rounded-2xl"
              />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  );
};

export default PropertyMap;
