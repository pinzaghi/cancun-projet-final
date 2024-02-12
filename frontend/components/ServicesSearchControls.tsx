'use client'

import { 
    Users, 
    Wifi, 
    GlassWater, 
    Wrench, 
    Wind, 
    CircleDollarSign, 
    LampDesk, 
    Search } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ServicesSearchControls({serviceRender}) {

    const serviceToDisplay = (serviceKind) => {
        if (serviceKind == "Other") {

        } else {
            serviceRender(serviceKind);
        } 
    }

    return (
        <div className="grid md:grid-cols-1 gap-4">  
            <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" onClick={() => serviceToDisplay("Bathroom")}> <Users/> Bathroom </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("WiFi")}> <Wifi/> WiFi </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Water")}> <GlassWater/> Water </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("BikeWorkshop")}> <Wrench/> Bike workshop </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("AirPump")}> <Wind/> Air pump </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Workstation")}> <LampDesk/> Workstation </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("ATM")}> <CircleDollarSign/> ATM </Button>
                <Button variant="outline" onClick={() => serviceToDisplay("Other")}> <Search/> Other </Button>
            </div>
            <div>
                <div className="flex items-center">
                    <Label htmlFor="otherServiceKind">Describe your service</Label>
                    <Input id="otherServiceKind"/> 
                </div>
            </div>
        </div>
    

  )
}

