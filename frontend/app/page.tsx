'use client'
import dynamic from "next/dynamic";

const SearcheableServiceMap = dynamic(() => import("@/components/SearcheableServiceMap"), {
  ssr: false
});

//import SearcheableServiceMap from "@/components/SearcheableServiceMap"

import { Toaster } from "@/components/ui/toaster"

export default function Page() {
    return <>   
                <SearcheableServiceMap/>
                <Toaster/>
            </>
}