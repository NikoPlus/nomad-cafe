# Dynamic Layout System

A headless CMS-style dynamic layout system that enables per-tenant UI configuration for the Nomad Cafe application.

## Overview

This system allows each tenant/client to configure their UI components (headers, footers, categories, content blocks, etc.) independently. Components are stored in a configurable format and delivered to the frontend as a dynamic schema that can be rendered on demand.

## Architecture

### Components

1. **Data Models** (`lib/types/layout.ts`)
   - `Tenant`: Represents a client/organization
   - `Page`: Represents a page within a tenant's site
   - `ComponentInstance`: A configured instance of a UI component
   - `Category`: Product/content categories per tenant
   - `PageLayout`: The complete layout response for a page

2. **Data Store** (`lib/data/layout-store.ts`)
   - Mock data store with sample configurations
   - Helper functions to fetch tenants, pages, and layouts
   - Resolves database references (categories, products) server-side

3. **API Routes**
   - `GET /api/tenants/[id]/layout/[slug]` - Fetches layout configuration for a tenant's page

4. **UI Components** (`components/dynamic-layout/`)
   - `DynamicRenderer`: Main component that renders layouts dynamically
   - `Topbar`: Configurable header with logo, menu, and wallet button
   - `Hero`: Hero section with title, subtitle, CTA, and image
   - `CategoryTabs`: Category navigation tabs
   - `ProductList`: Product grid/list display
   - `Footer`: Footer with links and copyright

## Usage

### 1. Fetching a Layout

```typescript
const response = await fetch('/api/tenants/1/layout/home')
const layout: PageLayout = await response.json()
```

### 2. Rendering a Layout

```tsx
import { DynamicRenderer } from '@/components/dynamic-layout'

function MyPage({ layout }: { layout: PageLayout }) {
  return <DynamicRenderer layout={layout} />
}
```

### 3. Example Layout Response

```json
{
  "tenant": {
    "id": 1,
    "name": "Nomad-Cafe",
    "domain": "nomad.example"
  },
  "page": {
    "slug": "home",
    "title": "Welcome to Nomad-Cafe"
  },
  "components": [
    {
      "id": 1,
      "type": "Hero",
      "order": 1,
      "active": true,
      "props": {
        "title": "Welcome to Nomad-Cafe",
        "subtitle": "Experience specialty coffee...",
        "ctaText": "Order Now"
      }
    }
  ]
}
```

## Adding New Components

1. Create the component in `components/dynamic-layout/`:

```tsx
// components/dynamic-layout/my-component.tsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div>{/* your component */}</div>
}
```

2. Add props interface to `lib/types/layout.ts`:

```typescript
export interface MyComponentProps {
  title?: string
  // ... other props
}
```

3. Register in the component map (`components/dynamic-layout/dynamic-renderer.tsx`):

```typescript
const componentMap: Record<string, React.FC<any>> = {
  // ... existing components
  MyComponent,
}
```

4. Add to data store (`lib/data/layout-store.ts`):

```typescript
{
  id: 5,
  order: 5,
  type: 'MyComponent',
  active: true,
  props: {
    title: 'My Custom Component'
  }
}
```

## Demo Page

Visit `/dynamic-demo` to see the dynamic layout system in action. This page:
- Fetches layout from the API
- Renders components dynamically
- Shows loading and error states

## Future Enhancements

### Database Integration
Replace the mock data store with a real database (e.g., Prisma):

```typescript
// prisma/schema.prisma
model Tenant {
  id        Int       @id @default(autoincrement())
  name      String
  domain    String?
  isActive  Boolean   @default(true)
  pages     Page[]
}

model Page {
  id          Int       @id @default(autoincrement())
  tenantId    Int
  slug        String
  title       String
  isPublished Boolean   @default(false)
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  components  ComponentInstance[]
}

model ComponentInstance {
  id     Int     @id @default(autoincrement())
  pageId Int
  order  Int
  type   String
  props  Json
  active Boolean @default(true)
  page   Page    @relation(fields: [pageId], references: [id])
}
```

### Admin Interface
Build an admin UI for managing layouts:
- Page editor with drag-and-drop component ordering
- Component property forms
- Preview mode
- Publish/unpublish functionality

### Caching
Add Redis caching for layout responses:

```typescript
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function getPageLayout(tenantId: number, slug: string) {
  const cacheKey = `layout:${tenantId}:${slug}`
  const cached = await redis.get(cacheKey)
  
  if (cached) {
    return JSON.parse(cached)
  }
  
  const layout = // ... fetch from database
  await redis.set(cacheKey, JSON.stringify(layout), 'EX', 3600)
  
  return layout
}
```

### Versioning
Implement version control for layouts:
- Draft vs. published versions
- Rollback capability
- Change history

### Targeting Rules
Add conditional rendering based on:
- User location
- Feature flags
- A/B testing segments
- Time-based activation

## Security Considerations

1. **Input Validation**: Sanitize all props to prevent XSS attacks
2. **Authorization**: Ensure users can only edit their tenant's layouts
3. **Rate Limiting**: Prevent abuse of the layout API
4. **Prop Size Limits**: Limit JSON prop size to prevent DoS

## Performance Tips

1. **Server-Side Resolution**: Resolve database references on the server to reduce client API calls
2. **Lazy Loading**: Use React.lazy() for large components
3. **Caching**: Cache layout responses aggressively
4. **CDN**: Serve static assets (images) from a CDN
5. **Incremental Static Regeneration**: Use ISR for frequently accessed layouts
