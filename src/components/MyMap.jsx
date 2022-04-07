import React from 'react';
import { Map, Marker } from "pigeon-maps";


export default function MyMap({userLocation}) {
  return (
    <Map
      width={400}
      height={300}
      defaultCenter={[userLocation.lat, userLocation.lng]}
      defaultZoom={11}
    >
      <Marker width={50} anchor={[userLocation.lat, userLocation.lng]} />
    </Map>
  );
}
