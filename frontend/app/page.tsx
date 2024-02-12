'use client'

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

import { useState } from 'react';

export default function Page() {
    const [displayedService, setDisplayedService] = useState(null);

    const serviceRender = (serviceKind) => {
        setDisplayedService(serviceKind);
    }

    return  <>
                
                    <span className="flex items-center"><Radar className="mr-2"/> FreeNearMe </span>
                

                <Separator />

                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="md:col-span-2">
                        <CardContent>
                            {displayedService}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ServicesSearchControls serviceRender={serviceRender}/>
                        </CardContent>
                    </Card>
                </div>
            </>
}