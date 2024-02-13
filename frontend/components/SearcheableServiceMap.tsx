'use client'

import { useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls"
import {
    Card,
    CardContent
  } from "@/components/ui/card"

import ServicesMapRenderer from "@/components/ServicesMapRenderer";

export default function SercheableServiceMap() {
    const [services, setServices] = useState<number[][]>([]);

     const serviceSearch = (serviceKind, serviceDesc) => {
        if(serviceDesc != ""){

        }else{
            console.log(serviceKind);

            if(serviceKind === "Bathroom"){
                setServices([[48.860673, 2.337514], [48.842946, 2.321943]]);
            }else{
                setServices([[48.873786, 2.294293]]);
            }
        }
    }

    return  <>
                <div className="grid xl:grid-cols-4 gap-4">
                    <Card className="xl:order-1 order-2 xl:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer coords={services}/>
                        </CardContent>
                    </Card>
                    <Card className="xl:order-2 order-1">
                        <CardContent>
                            <ServicesSearchControls serviceSearch={serviceSearch}/>
                        </CardContent>
                    </Card>
                </div>
            </>
}