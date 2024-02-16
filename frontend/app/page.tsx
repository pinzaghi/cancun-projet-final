'use client'
import SearcheableServiceMap from "@/components/SearcheableServiceMap"

import { Radar } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Page() {
    return <>
                <span className="flex items-center">
                        <Radar className="mr-2"/> 
                        <span className="font-bold">FreeNearMe</span>
                        <ConnectButton />
                    </span>
                <Separator />
                <SearcheableServiceMap/>
                <Toaster/>
            </>
}