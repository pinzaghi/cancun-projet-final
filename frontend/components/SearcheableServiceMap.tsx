'use client'

import { useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls";
import SponsorComponent from "@/components/SponsorComponent";
import NewServiceComponent from "@/components/NewServiceComponent";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

import ServicesMapRenderer from "@/components/ServicesMapRenderer";

export default function SercheableServiceMap() {
    const [services, setServices] = useState<number[][]>([]);
    const [servicesKind, setServicesKind] = useState(null);
    const [newServiceLocation, setNewServiceLocation] = useState(null);

     const serviceSearch = (serviceKind, serviceDesc) => {
        if(serviceDesc != ""){

        }else{
            setServicesKind(serviceKind);
            if(serviceKind === "Bathroom"){
                setServices([[48.860673, 2.337514], [48.842946, 2.321943]]);
            }else{
                setServices([[48.873786, 2.294293]]);
            }
        }
    }

    const markerHandler = (location) => {
        setNewServiceLocation(location);
    }

    return  <>
                <div className="grid xl:grid-cols-4 gap-4">
                    <Card className="xl:order-1 order-2 xl:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer markers={services} markersKind={servicesKind} markerHandler={markerHandler}/>
                        </CardContent>
                    </Card>
                    <div className="grid xl:grid-cols-1 gap-4 xl:order-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Find services</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ServicesSearchControls serviceSearch={serviceSearch}/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Add a service</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <NewServiceComponent newServiceLocation={newServiceLocation}/>
                            </CardContent>
                        </Card>                    
                        <Card>
                            <CardHeader>
                                <CardTitle>Sponsor a user</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SponsorComponent/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </>
}