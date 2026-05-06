// import MapClient from './MapClient';
//
// // Force dynamic rendering for this route
// export const dynamic = 'force-dynamic';
//
// // Prevent static generation of this route
// export async function generateStaticParams() {
//   return [];
// }
//
// export default function MapPage() {
//   return <MapClient />;
// }
import { locales } from '@/i18n';
import MapClient from './MapClient';

// Generate static paths for every locale
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force static rendering (no server‑side dynamic behaviour)
export const dynamic = 'force-static';

export default function MapPage() {
  return <MapClient />;
}