'use client'

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
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => serviceToDisplay("Bathroom")}> <Users/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Bathroom</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("WiFi")}> <Wifi/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">WiFi</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Water")}> <GlassWater/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Water</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("BikeWorkshop")}> <Wrench/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Bike SOS</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("AirPump")}> <Wind/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Air pump</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Workstation")}> <LampDesk/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Workstation</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("ATM")}> <CircleDollarSign/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">ATM</span> </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("ChargingStation")}> <PlugZap/> <span className="hidden sm:block lg:hidden xl:hidden 3xl:block">Charging</span> </Button>
            </div>
            <span className="font-bold">Or describe it:</span>
            <div>
                <div className="flex items-center">
                    <Search className="mr-2"/>
                    <Input placeholder="Service keywords" className="mr-2" id="otherServiceKind"/> 
                    <Button>Search</Button>
                </div>
            </div>
        </div>
    

  )
}

