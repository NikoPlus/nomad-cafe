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

// app/[locale]/(app)/map/page.tsx
import { locales } from '@/i18n';
import MapClient from './MapClient';

// 1. Provide all possible static paths for export
export async function generateStaticParams() {
  const params: Array<{ locale: string }> = [];
  for (const locale of locales) {
    params.push({ locale });
  }
  return params;
}

// 2. Ensure this page is treated as static
export const dynamic = 'force-static';

export default function MapPage() {
  return <MapClient />;
}