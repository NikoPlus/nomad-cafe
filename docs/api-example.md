# Dynamic Layout System - API Response Example

This document shows an example API response from the dynamic layout system.

## Endpoint
```
GET /api/tenants/1/layout/home
```

## Response

The API returns a complete page layout with all components and resolved data:

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
      "order": 0,
      "type": "Topbar",
      "active": true,
      "props": {
        "logoUrl": "/placeholder.svg?height=32&width=32",
        "brandName": "Nomad-Cafe",
        "menu": [
          { "label": "All", "target": "/?category=all" },
          { "label": "Coffee", "target": "/?category=coffee" },
          { "label": "Tea", "target": "/?category=tea" },
          { "label": "Bakery", "target": "/?category=bakery" }
        ],
        "walletButton": true
      }
    },
    {
      "id": 2,
      "order": 1,
      "type": "Hero",
      "active": true,
      "props": {
        "title": "Welcome to Nomad-Cafe",
        "subtitle": "Experience specialty coffee and pastries delivered to your location via TON blockchain",
        "ctaText": "Browse Menu",
        "imageUrl": "/caffe-latte.jpg"
      }
    },
    {
      "id": 3,
      "order": 2,
      "type": "CategoryTabs",
      "active": true,
      "props": {
        "categoriesSource": "db",
        "maxVisible": 6,
        "categories": [
          { "slug": "coffee", "title": "Coffee" },
          { "slug": "tea", "title": "Tea" },
          { "slug": "bakery", "title": "Bakery" }
        ]
      }
    },
    {
      "id": 4,
      "order": 3,
      "type": "ProductList",
      "active": true,
      "props": {
        "source": "all",
        "layout": "card",
        "showPrice": true,
        "products": [
          {
            "id": "latte",
            "title": "Caffè Latte",
            "description": "Rich espresso with steamed milk",
            "priceTon": 0.85,
            "imageUrl": "/caffe-latte.jpg",
            "category": "Coffee"
          },
          {
            "id": "americano",
            "title": "Americano",
            "description": "Smooth espresso diluted with hot water",
            "priceTon": 0.65,
            "imageUrl": "/americano-coffee.png",
            "category": "Coffee",
            "discount": 10
          }
          // ... more products
        ]
      }
    },
    {
      "id": 99,
      "order": 99,
      "type": "Footer",
      "active": true,
      "props": {
        "links": [
          { "label": "About", "url": "/about" },
          { "label": "Contact", "url": "/contact" },
          { "label": "Terms", "url": "/terms" }
        ],
        "copyright": "© 2025 Nomad-Cafe"
      }
    }
  ]
}
```

## Key Features Demonstrated

1. **Tenant Isolation**: Each tenant has its own configuration
2. **Server-Side Resolution**: Categories and products are resolved server-side
3. **Ordered Components**: Components are sorted by their `order` field
4. **Active Filtering**: Only active components are returned
5. **Type-Specific Props**: Each component type has its own prop structure
6. **Data Integration**: Products and categories are included in the response

## Usage in Frontend

```typescript
// Fetch the layout
const response = await fetch('/api/tenants/1/layout/home')
const layout = await response.json()

// Render with DynamicRenderer
<DynamicRenderer layout={layout} />
```

The DynamicRenderer will automatically map component types to React components and render them in order.
