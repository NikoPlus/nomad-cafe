"use client";

import { useEffect, useState } from "react";

export default function MapClient() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return (
      <div className="w-full h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map…</p>
      </div>
    );
  }

  // You can later replace this placeholder with your actual map component
  return (
    <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Interactive map will be added here.</p>
    </div>
  );
}