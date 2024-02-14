'use client'
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function ServicesMapRenderer({coords}) {  
  return (
    <main>
      <div id="map">
        <MapWithNoSSR coords={coords}/>
      </div>
    </main>
  );
}