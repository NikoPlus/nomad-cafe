# Dynamic Layout System - Component Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Dynamic Demo Page                         │    │
│  │         /[locale]/(app)/dynamic-demo                │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     │ Fetches layout via API                 │
│                     ▼                                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │           DynamicRenderer                           │    │
│  │   components/dynamic-layout/dynamic-renderer.tsx    │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     │ Maps component types                   │
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          Component Map                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  "Topbar"        → Topbar Component                 │   │
│  │  "Hero"          → Hero Component                   │   │
│  │  "CategoryTabs"  → CategoryTabs Component           │   │
│  │  "ProductList"   → ProductList Component            │   │
│  │  "Footer"        → Footer Component                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                                ▲
                                │
                                │ HTTP GET Request
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                        API Layer                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │    GET /api/tenants/[id]/layout/[slug]             │    │
│  │      app/api/tenants/[id]/layout/[slug]/route.ts   │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     │ Calls data layer                       │
│                     ▼                                        │
└─────────────────────────────────────────────────────────────┘
                                ▲
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                      Data Layer                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Layout Store                              │    │
│  │         lib/data/layout-store.ts                    │    │
│  ├─────────────────────────────────────────────────────┤   │
│  │  • getTenant(id)                                    │   │
│  │  • getPage(tenantId, slug)                          │   │
│  │  • getCategories(tenantId)                          │   │
│  │  • getPageLayout(tenantId, slug)                    │   │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     │ Resolves references                    │
│                     ▼                                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Mock Data Store                             │    │
│  ├─────────────────────────────────────────────────────┤   │
│  │  • TENANTS[]                                        │   │
│  │  • PAGES[]                                          │   │
│  │  • CATEGORIES[]                                     │   │
│  │  • COMPONENT_INSTANCES[]                            │   │
│  │  • SAMPLE_MENU[]                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Note: Can be replaced with database (Prisma, etc.)         │
└─────────────────────────────────────────────────────────────┘

```

## Request Flow

```
1. User visits /dynamic-demo
   │
   ▼
2. Page component mounts
   │
   ▼
3. Fetch GET /api/tenants/1/layout/home
   │
   ▼
4. API route validates tenant ID
   │
   ▼
5. Calls getPageLayout(1, "home")
   │
   ▼
6. Layout store:
   • Finds tenant
   • Finds page
   • Gets components
   • Resolves categories from DB
   • Resolves products from DB
   │
   ▼
7. Returns complete PageLayout JSON
   │
   ▼
8. Frontend receives layout
   │
   ▼
9. DynamicRenderer processes components:
   • Filters active components
   • Sorts by order
   • Maps types to React components
   │
   ▼
10. Renders components in sequence:
    Topbar → Hero → CategoryTabs → ProductList → Footer
```

## Data Flow

```
┌──────────────┐
│   Tenant     │  Has many pages
│  id: 1       ├──────────┐
│  name: ...   │          │
└──────────────┘          │
                          ▼
                   ┌──────────────┐
                   │    Page      │  Has many components
                   │  slug: home  ├──────────┐
                   │  title: ...  │          │
                   └──────────────┘          │
                                             ▼
                                      ┌─────────────────┐
                                      │ ComponentInstance│
                                      │  type: "Hero"    │
                                      │  order: 1        │
                                      │  props: {...}    │
                                      └─────────────────┘
                                             │
                                             │ References
                                             ▼
                                      ┌─────────────────┐
                                      │   Categories    │
                                      │   Products      │
                                      │   (Resolved)    │
                                      └─────────────────┘
```

## Component Prop Flow

```
┌─────────────────────────────────────────────────┐
│            PageLayout (from API)                 │
├─────────────────────────────────────────────────┤
│  components: [                                   │
│    {                                             │
│      type: "Hero",                               │
│      props: {                                    │
│        title: "Welcome",                         │
│        subtitle: "...",                          │
│        ctaText: "Browse",                        │
│        imageUrl: "/image.jpg"                    │
│      }                                           │
│    }                                             │
│  ]                                               │
└──────────────────┬──────────────────────────────┘
                   │
                   │ DynamicRenderer
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│            Hero Component                        │
├─────────────────────────────────────────────────┤
│  function Hero({                                 │
│    title,                                        │
│    subtitle,                                     │
│    ctaText,                                      │
│    imageUrl                                      │
│  }: HeroProps)                                   │
│                                                  │
│  Returns: JSX with title, subtitle, CTA, image  │
└─────────────────────────────────────────────────┘
```

## Extensibility

### Adding a New Component

```
1. Create component file:
   components/dynamic-layout/my-component.tsx
   
2. Define props interface:
   lib/types/layout.ts
   export interface MyComponentProps { ... }
   
3. Register in component map:
   components/dynamic-layout/dynamic-renderer.tsx
   const componentMap = {
     ...
     MyComponent,
   }
   
4. Add to data store:
   lib/data/layout-store.ts
   {
     type: 'MyComponent',
     props: { ... }
   }
```

### Future: Database Integration

```
┌─────────────────────────────────────────────────┐
│           Current: Mock Store                    │
├─────────────────────────────────────────────────┤
│  TENANTS = [...]                                 │
│  PAGES = [...]                                   │
│  COMPONENTS = [...]                              │
└─────────────────────────────────────────────────┘
                    │
                    │ Replace with
                    ▼
┌─────────────────────────────────────────────────┐
│           Future: Prisma + PostgreSQL            │
├─────────────────────────────────────────────────┤
│  await prisma.tenant.findUnique(...)             │
│  await prisma.page.findFirst(...)                │
│  await prisma.component.findMany(...)            │
└─────────────────────────────────────────────────┘
```

## Type Safety Flow

```
┌────────────────────────────────────┐
│   TypeScript Interfaces             │
│   (lib/types/layout.ts)             │
├─────────────────────────────────────┤
│  • Tenant                           │
│  • Page                             │
│  • ComponentInstance                │
│  • PageLayout                       │
│  • ComponentProps (per type)        │
└────────────┬────────────────────────┘
             │
             │ Ensures type safety
             ▼
┌────────────────────────────────────┐
│   Data Store                        │
│   (lib/data/layout-store.ts)        │
├─────────────────────────────────────┤
│  Functions return typed data        │
└────────────┬────────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   API Routes                        │
│   (app/api/.../route.ts)            │
├─────────────────────────────────────┤
│  NextResponse.json(layout)          │
│  // layout is PageLayout type       │
└────────────┬────────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   React Components                  │
│   (components/dynamic-layout/)      │
├─────────────────────────────────────┤
│  Props validated by TypeScript      │
│  Component<SpecificProps>           │
└─────────────────────────────────────┘
```

This architecture ensures:
- ✅ Type safety throughout the stack
- ✅ Clear separation of concerns
- ✅ Easy to extend with new components
- ✅ Testable individual layers
- ✅ Performance optimization points (caching, lazy loading)
