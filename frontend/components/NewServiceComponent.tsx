'use client'
import { useState } from 'react';

import { useAccount } from 'wagmi'
import { prepareWriteContract, writeContract, readContract, waitForTransaction, getPublicClient } from '@wagmi/core'

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

  import { 
    servicesTypes, 
    servicesTypeIndex, 
    contractAddress, 
    contractBlock, 
    coordinatesPrecision,
    abi } from '@/constants'

export default function NewServiceComponent({newServiceLocation}) {

    const [serviceDesc, setServiceDesc] = useState("");
    const [serviceType, setServiceType] = useState(null);

    const { toast } = useToast()

    // Viem public client déjà défini dans le layout 
    const client = getPublicClient();
    const { address, isConnected } = useAccount();

    async function submitNewService() {
        if(newServiceLocation===null){
            toast({
                variant: "destructive",
                title: "No position selected for the service",
                description: "Double click (or tap) in the map to select it.",
              })
              return;
        }
        
        if(serviceType===null){
            toast({
                variant: "destructive",
                title: "No service type selected for the service",
                description: "Select one from the dropdown.",
              })
            return;
        }
  

        try{            
            console.log(Math.trunc(newServiceLocation[0]*coordinatesPrecision));
            console.log(Math.trunc(newServiceLocation[1]*coordinatesPrecision));
            const { hash } = await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: "submitService",
                args: [
                    servicesTypeIndex[serviceType], 
                    serviceDesc, 
                    Math.trunc(newServiceLocation[0]*coordinatesPrecision), 
                    Math.trunc(newServiceLocation[1]*coordinatesPrecision)],
                account: address
            })
            const data = await waitForTransaction({
                hash: hash,
            })

            toast({
                title: "Service submitted successfully.",
            })

        } catch(error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: 'Error submiting the service',
                description: error.message,
            })
        }

    }

    return (
        <>
            <div className="gap-4 mt-4">  
                <div className="flex items-center">
                    <div className="mr-2">
                        <Select onValueChange={setServiceType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Service type" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(servicesTypes).map( ([key, value]) => (
                                        <SelectItem key={key} value={key}>{value}</SelectItem>
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

