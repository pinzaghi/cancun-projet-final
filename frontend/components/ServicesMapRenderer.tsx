'use client'
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function ServicesMapRenderer({markers, markersKind, markerHandler}) {  
  return (
    <main>
      <div id="map">
        <MapWithNoSSR markers={markers} markersKind={markersKind} markerHandler={markerHandler}/>
      </div>
    </main>
  );
}