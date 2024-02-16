'use client'
import SearcheableServiceMap from "@/components/SearcheableServiceMap"

import { Toaster } from "@/components/ui/toaster"

export default function Page() {
    return <>   
                <SearcheableServiceMap/>
                <Toaster/>
            </>
}