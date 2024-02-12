'use client'

import { useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Radar } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

import ServicesMapRenderer from "@/components/ServicesMapRenderer";

export default function Page() {
    const [servicesFilter, setServicesFilter] = useState(null);
    const [services, setServices] = useState([]);

    const serviceSearch = (serviceKind, serviceDesc) => {
        if(serviceDesc != ""){

        }else{
            setServicesFilter(serviceKind);
            setServices(["test1","test2"]);
        }
        
    }

    return  <>
                <span className="flex items-center">
                    <Radar className="mr-2"/> 
                    <span className="font-bold">FreeNearMe</span>
                </span>
                <Separator />
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="md:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer serviceToRender={services}/>
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