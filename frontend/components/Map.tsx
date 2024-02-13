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
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  if(position === null){
    map.locate()
  }
  
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Map = () => {
  return (
    <>
      <MapContainer center={[48.8551921,2.3415163]} zoom={13} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <LocationMarker />

        {/* {services.map((service, index) => (
          <Marker key={index} position={service}>
            <Popup>test</Popup>
          </Marker>
        ))} */}
      </MapContainer>
    </>
    
  )
}

export default Map