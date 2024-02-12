'use client'
import dynamic from "next/dynamic";

export default function ServicesMapRenderer({serviceToRender}) {

    const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
      ssr: false
    });

    return (
      <main>
        <div id="map">
          <MapWithNoSSR />
        </div>
      </main>
    );
    
}

