'use client'

import { useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls"
import {
    Card,
    CardContent
  } from "@/components/ui/card"

import ServicesMapRenderer from "@/components/ServicesMapRenderer";
import { LatLng } from 'leaflet';

export default function SercheableServiceMap() {
    const [servicesFilter, setServicesFilter] = useState(null);
    const [services, setServices] = useState<LatLng[]>([]);

    const serviceSearch = (serviceKind, serviceDesc) => {
        if(serviceDesc != ""){

        }else{
            console.log(serviceKind);
            //setServicesFilter(serviceKind);
            //setServices([[48.860673, 2.337514], [48.842946, 2.321943], [48.873786, 2.294293]]);
        }
    }

    return  <>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="md:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer/>
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