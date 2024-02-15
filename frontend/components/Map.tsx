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
import 'leaflet-defaulticon-compatibility';

import { 
  iconBathroom, 
  iconWifi, 
  iconWater, 
  iconBikeWorkshop,
  iconAirPump,
  iconWorkstation,
  iconATM,
  iconChargingStation} from '@/components/Icons';

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

function ServiceMarkers({markers, markersKind}) {
  let icon = iconBathroom;

  switch (markersKind) {
    case "Bathroom":
      icon = iconBathroom;
      break;
    case "WiFi":
      icon = iconWifi;
      break;
    case "Water":
      icon = iconWater;
      break;
    case "BikeWorkshop":
      icon = iconBikeWorkshop;
      break;
    case "AirPump":
      icon = iconAirPump;
      break;
    case "Workstation":
      icon = iconWorkstation;
      break;
    case "ATM":
      icon = iconATM;
      break;
    case "ChargingStation":
      icon = iconChargingStation;
  }

  return markers.map((position, index) => (
      <Marker key={index} position={position} icon={icon}></Marker>
    ))
}

function AddMarker({markerHandler}) {
  const [position, setPosition] = useState(null)
  useMapEvents({
    dblclick(e) {
      markerHandler([e.latlng.lat, e.latlng.lng]);
      setPosition(e.latlng)
    },
    click(e){
      setPosition(null)
      markerHandler(null);
    }
  })

  return position === null ? null : (
    <Marker position={position}></Marker>
  )
}

export default function Map({markers, markersKind, markerHandler}) {
  return (
        <MapContainer 
          center={[48.8551921,2.3415163]} 
          zoom={13} 
          scrollWheelZoom={true} 
          doubleClickZoom={false}
          style={{height: "100%", width: "100%"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <ServiceMarkers markers={markers} markersKind={markersKind} />
        <LocationMarker />
        <AddMarker markerHandler={markerHandler}/>
      </MapContainer>
    
  )
}
