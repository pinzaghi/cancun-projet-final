'use client'

import { useState } from 'react';

import { 
    Users, 
    Wifi, 
    GlassWater, 
    Wrench, 
    Wind, 
    CircleDollarSign, 
    LampDesk, 
    PlugZap,
    Search } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ServicesSearchControls({serviceSearch}) {

    const serviceToDisplay = (serviceKind) => {
        serviceSearch(serviceKind, "");
    }

    return (
        <div className="grid md:grid-cols-1 gap-4 mt-4">  
            <span className="font-bold">Select a service:</span>
            <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => serviceToDisplay("Bathroom")}> <Users/> <span className="md:hidden">Bathroom</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("WiFi")}> <Wifi/> <span className="md:hidden">WiFi</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Water")}> <GlassWater/> <span className="md:hidden">Water</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("BikeWorkshop")}> <Wrench/> <span className="md:hidden">Bike workshop</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("AirPump")}> <Wind/> <span className="md:hidden">Air pump</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Workstation")}> <LampDesk/> <span className="md:hidden">Workstation</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("ATM")}> <CircleDollarSign/> <span className="md:hidden">ATM</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("ChargingStation")}> <PlugZap/> <span className="md:hidden">Charging station</span> </Button>
            </div>
            <span className="font-bold">Or describe it:</span>
            <div>
                <div className="flex items-center">
                    <Search className="mr-2"/>
                    <Input id="otherServiceKind"/> 
                </div>
            </div>
        </div>
    

  )
}

