'use client'

import { useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls"
import {
    Card,
    CardContent
  } from "@/components/ui/card"

import ServicesMapRenderer from "@/components/ServicesMapRenderer";

import { 
    MapContainer, 
    TileLayer,
    Marker,
    Popup, 
    useMapEvents } from 'react-leaflet'
import { LatLng } from 'leaflet';

export default function SercheableServiceMap({ServiceMarkers}) {
    const [servicesFilter, setServicesFilter] = useState(null);
    const [services, setServices] = useState<LatLng[]>([]);

    const serviceSearch = (serviceKind, serviceDesc) => {
        if(serviceDesc != ""){

        }else{
            console.log(serviceKind);
            setServicesFilter(serviceKind);
        }
    }

    let markers = () => {
        const [serviceMarkers, setServiceMarkers] = useState([]);
        const [test, setTest] = useState(null);

        if(test !== servicesFilter){
            console.log("change");
            if(servicesFilter == "Bathroom"){
                setServiceMarkers([[48.860673, 2.337514], [48.842946, 2.321943]]);
            }else{
                setServiceMarkers([[48.873786, 2.294293]]);
            }
            setTest(servicesFilter);
        }
        
        
        return serviceMarkers.map((position, index) => (
            <Marker key={index} position={position}>
                <Popup>test</Popup>
            </Marker>
            ))
    }

    return  <>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="md:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer markers={markers}/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <ServicesSearchControls serviceSearch={serviceSearch}/>
                        </CardContent>
                    </Card>
                </div>
            </>
}