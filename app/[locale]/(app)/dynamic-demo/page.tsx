"use client"

import React from 'react'
import { DynamicRenderer } from '@/components/dynamic-layout'
import { PageLayout } from '@/lib/types/layout'
import { LoadingScreen } from '@/components/loading-screen'

/**
 * Dynamic Demo Page
 * 
 * This page demonstrates the dynamic layout system by fetching
 * a layout configuration from the API and rendering it.
 */
export default function DynamicDemoPage() {
  const [layout, setLayout] = React.useState<PageLayout | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchLayout() {
      try {
        // Fetch layout for tenant 1, home page
        const response = await fetch('/api/tenants/1/layout/home')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch layout: ${response.statusText}`)
        }

        const data = await response.json()
        setLayout(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load layout')
        console.error('Error fetching layout:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLayout()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-800">Error Loading Layout</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!layout) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-yellow-50 p-6 text-center">
          <p className="text-yellow-800">No layout found</p>
        </div>
      </div>
    )
  }

  return (
    <main className="pb-24">
      <div className="mb-4 rounded-lg bg-blue-50 p-4">
        <h2 className="text-lg font-semibold text-blue-900">
          Dynamic Layout Demo
        </h2>
        <p className="text-sm text-blue-700">
          This page is rendered using the dynamic layout system. The components below
          are configured via the API at <code>/api/tenants/1/layout/home</code>
        </p>
        <p className="mt-2 text-xs text-blue-600">
          Tenant: {layout.tenant.name} | Page: {layout.page.title}
        </p>
      </div>
      
      <DynamicRenderer layout={layout} />
    </main>
  )
}
