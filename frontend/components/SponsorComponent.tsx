'use client'
import { useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { useAccount } from 'wagmi'
import { writeContract, waitForTransaction, getPublicClient } from '@wagmi/core'

import { 
    servicesTypes, 
    servicesTypeIndex, 
    contractAddress, 
    contractBlock, 
    abi } from '@/constants'

export default function SponsorComponent() {
    const [addressToSponsor, setAddressToSponsor] = useState("");

    const { toast } = useToast()

    // Viem public client déjà défini dans le layout 
    const { address, isConnected } = useAccount();

    async function sponsorAddress() {
        if(addressToSponsor===""){
            toast({
                variant: "destructive",
                title: "No address specified",
                description: "Enter the user's public address to sponsor.",
              })
              return;
        }

        try{            
            const { hash } = await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: "sponsorUser",
                args: [
                    addressToSponsor],
                account: address
            })
            const data = await waitForTransaction({
                hash: hash,
            })

            toast({
                title: "Address sponsored successfully.",
            })

        } catch(error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: 'Error sponsoring the address.',
                description: error.message,
            })
        }

    }


    return (
        <>
            <div className="gap-4 mt-4">  
                <div>
                    <div className="flex items-center">
                        <Input 
                            value={addressToSponsor} 
                            placeholder="Address to sponsor" 
                            className="mr-2"
                            onChange = {(event)=> setAddressToSponsor(event.target.value)} /> 
                        <Button onClick={() => sponsorAddress()}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
        
  )
}

