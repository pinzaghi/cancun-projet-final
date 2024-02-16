'use client'
import { useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function SponsorComponent() {
    const [sponsorAddress, setSponsorAddress] = useState("");

    const { toast } = useToast()

    function submitNewService() {
        if(sponsorAddress===""){
            toast({
                variant: "destructive",
                title: "No address specified",
                description: "Enter the user's public address to sponsor.",
              })
        }else{
            toast({
                title: sponsorAddress,
              })
        }
    }

    return (
        <>
            <div className="gap-4 mt-4">  
                <div>
                    <div className="flex items-center">
                        <Input 
                            value={sponsorAddress} 
                            placeholder="Address to sponsor" 
                            className="mr-2"
                            onChange = {(event)=> setSponsorAddress(event.target.value)} /> 
                        <Button onClick={() => submitNewService()}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
        
  )
}

