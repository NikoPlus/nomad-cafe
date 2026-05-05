import { NextResponse } from 'next/server'
import { getApiDocs } from '@/lib/swagger'

// Force static generation for this route (required for static export)
export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const spec = getApiDocs()
  return NextResponse.json(spec)
}
