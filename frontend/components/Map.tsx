'use client'
import { useState } from 'react';

import { 
    MapContainer, 
    TileLayer,
    Marker,
    Popup, 
    useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      //TODO: remove comment
      //map.flyTo(e.latlng, map.getZoom())
    },
  })

  if(position === null){
    map.locate()
  }
  
  return null
}

export default function Map({Markers}) {
  return (
    <main>
        <div id="map">
        <MapContainer center={[48.8551921,2.3415163]} zoom={13} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Markers />
        <LocationMarker />
      </MapContainer>
        </div>
      </main>

  )
}