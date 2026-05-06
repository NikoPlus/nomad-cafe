import MapClient from './MapClient';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Prevent static generation of this route
export async function generateStaticParams() {
  return [];
}

export default function MapPage() {
  return <MapClient />;
}