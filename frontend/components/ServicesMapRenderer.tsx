import React from "react";
import dynamic from "next/dynamic";

export default function ServicesMapRenderer({markers}) {
  const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
    ssr: false
  });

  return (
    <main>
      <div id="map">
        <MapWithNoSSR Markers={markers}/>
      </div>
    </main>
  );
}