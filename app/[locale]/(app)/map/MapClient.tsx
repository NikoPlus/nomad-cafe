// app/[locale]/(app)/map/MapClient.tsx
"use client";

import { useEffect, useState } from "react";

export default function MapClient() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [MapComponent, setMapComponent] = useState<any>(null);

  useEffect(() => {
    setIsBrowser(true);
    // Dynamically import your map component and set to state
    import("@/app/[locale]/(app)/map/page").then((mod) => setMapComponent(() => mod.default));
  }, []);

  if (!isBrowser || !MapComponent) {
    return <div className="w-full h-96 animate-pulse bg-muted">Loading map...</div>;
  }

  return <MapComponent />;
}