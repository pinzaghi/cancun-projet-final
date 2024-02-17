'use client'
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function ServicesMapRenderer({markers, markerHandler}) {  
  return (
    <main>
      <div id="map">
        <MapWithNoSSR markers={markers} markerHandler={markerHandler}/>
      </div>
    </main>
  );
}