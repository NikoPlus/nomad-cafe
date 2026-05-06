"use client";   // must be first line

import * as React from "react";
import { useParams } from "next/navigation";

// Replace this with your actual interactive item component.
// This is a minimal example – keep your existing UI and logic.
export default function ItemClient() {
  const params = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Item Details</h1>
      <p className="mt-2">Item ID: {params.id}</p>
      {/* Add your existing item content here – e.g. image, price, add‑to‑cart button */}
    </div>
  );
}