'use client'
import { useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { servicesTypes } from '@/constants'

export default function NewServiceComponent({newServiceLocation}) {

    const [serviceDesc, setServiceDesc] = useState(null);

    const { toast } = useToast()

    function submitNewService() {
        if(newServiceLocation===null){
            toast({
                variant: "destructive",
                title: "No position selected for the service",
                description: "Double click (or tap) in the map to select it.",
              })
        }
    }

    return (
        <>
            <div className="gap-4 mt-4">  
                <div className="flex items-center">
                    <div className="mr-2">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Service type" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(servicesTypes).map( ([key, value]) => (
                                        <SelectItem key={key} value={value}> {value}</SelectItem>
                                      ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <Input 
                        placeholder="Description" 
                        className="mr-2"
                        onChange = {(event)=> setServiceDesc(event.target.value)} /> 
                    <Button onClick={() => submitNewService()}>Submit</Button>
                </div>
            </div>
        </>
        
  )
}

