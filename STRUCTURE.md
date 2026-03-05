# Project Structure

## Complete Folder Structure

```
ai-inventory-frontend/
│
├── node_modules/              # Dependencies (auto-generated)
│
├── dist/                      # Production build (auto-generated)
│
├── public/                    # Static assets
│   └── vite.svg
│
├── src/                       # Source code
│   │
│   ├── components/            # Reusable components
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   └── Modal.tsx         # Reusable modal
│   │
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx     # Analytics dashboard
│   │   ├── Products.tsx      # Product CRUD
│   │   ├── Sales.tsx         # Record sales
│   │   ├── SalesHistory.tsx  # Sales history
│   │   ├── AIAlerts.tsx      # Low stock alerts
│   │   └── AIPredictions.tsx # Demand predictions
│   │
│   ├── services/             # API layer
│   │   └── api.ts           # Axios config & API calls
│   │
│   ├── types/                # TypeScript types
│   │   └── index.ts         # Type definitions
│   │
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite types
│
├── .env                      # Environment variables
├── .env.example             # Env template
├── .gitignore               # Git ignore rules
│
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── package-lock.json        # Lock file
│
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.ts           # Vite configuration
│
├── tsconfig.json            # TypeScript config
├── tsconfig.app.json        # App TypeScript config
├── tsconfig.node.json       # Node TypeScript config
│
├── eslint.config.js         # ESLint rules
│
├── README.md                # Main documentation
├── QUICKSTART.md            # Quick start guide
├── SETUP.md                 # Complete setup guide
└── STRUCTURE.md             # This file
```

## File Purposes

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, dependencies, scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `vite.config.ts` | Vite bundler settings |
| `tailwind.config.js` | Tailwind CSS customization |
| `eslint.config.js` | Code linting rules |
| `.env` | Environment variables (API URL) |

### Source Files

#### Components (`src/components/`)

| Component | Lines | Purpose |
|-----------|-------|---------|
| `Layout.tsx` | ~15 | Main layout with sidebar + content |
| `Sidebar.tsx` | ~60 | Navigation menu with routing |
| `Modal.tsx` | ~35 | Reusable modal dialog |

#### Pages (`src/pages/`)

| Page | Lines | Purpose | Key Features |
|------|-------|---------|--------------|
| `Dashboard.tsx` | ~150 | Analytics overview | Charts, stats, metrics |
| `Products.tsx` | ~250 | Product management | CRUD, search, table |
| `Sales.tsx` | ~150 | Record sales | Form, validation, calc |
| `SalesHistory.tsx` | ~120 | View transactions | Table, statistics |
| `AIAlerts.tsx` | ~140 | Low stock alerts | AI-powered warnings |
| `AIPredictions.tsx` | ~160 | Demand forecasting | AI predictions, insights |

#### Services (`src/services/`)

| File | Purpose | Exports |
|------|---------|---------|
| `api.ts` | API integration | `productAPI`, `salesAPI`, `aiAPI` |

#### Types (`src/types/`)

| File | Purpose | Types |
|------|---------|-------|
| `index.ts` | Type definitions | `Product`, `Sale`, `Alert`, `Prediction` |

## Component Dependencies

### Layout Hierarchy

```
App.tsx (Router)
│
└─ Layout.tsx
   ├─ Sidebar.tsx
   │  └─ React Router Link
   │
   └─ Outlet (Route Content)
      ├─ Dashboard.tsx
      │  └─ Recharts (Bar, Line)
      │
      ├─ Products.tsx
      │  └─ Modal.tsx (Form)
      │
      ├─ Sales.tsx
      │
      ├─ SalesHistory.tsx
      │
      ├─ AIAlerts.tsx
      │
      └─ AIPredictions.tsx
```

### Import Flow

```
main.tsx
  ↓
App.tsx
  ↓
├─ components/Layout
├─ components/Sidebar
├─ pages/Dashboard
├─ pages/Products
├─ pages/Sales
├─ pages/SalesHistory
├─ pages/AIAlerts
└─ pages/AIPredictions
    ↓
  services/api
    ↓
  types/index
```

## Size Information

| Category | Count | Total Lines |
|----------|-------|-------------|
| Components | 3 | ~110 |
| Pages | 6 | ~970 |
| Services | 1 | ~30 |
| Types | 1 | ~30 |
| Config | 7 | ~100 |
| **Total** | **18** | **~1,240** |

## Route Structure

```
/ (Layout)
├─ / (Dashboard)
├─ /products
├─ /sales
├─ /sales-history
├─ /ai-alerts
└─ /ai-predictions
```

## API Integration Map

### Products Page
```
Products.tsx
  ↓
productAPI.getAll()     → GET /api/products
productAPI.create()     → POST /api/products
productAPI.update(id)   → PUT /api/products/:id
productAPI.delete(id)   → DELETE /api/products/:id
```

### Sales Pages
```
Sales.tsx
  ↓
productAPI.getAll()     → GET /api/products
salesAPI.create()       → POST /api/sales

SalesHistory.tsx
  ↓
salesAPI.getAll()       → GET /api/sales
```

### AI Pages
```
AIAlerts.tsx
  ↓
aiAPI.getAlerts()       → GET /api/ai/alerts

AIPredictions.tsx
  ↓
productAPI.getAll()     → GET /api/products
aiAPI.getPrediction(id) → GET /api/ai/predict/:id
```

### Dashboard
```
Dashboard.tsx
  ↓
productAPI.getAll()     → GET /api/products
salesAPI.getAll()       → GET /api/sales
aiAPI.getAlerts()       → GET /api/ai/alerts
```

## State Management

Each page manages its own state using React hooks:

```typescript
// Common state patterns

// Loading state
const [loading, setLoading] = useState(true);

// Data state
const [products, setProducts] = useState<Product[]>([]);
const [sales, setSales] = useState<Sale[]>([]);

// UI state
const [isModalOpen, setIsModalOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

// Form state
const [formData, setFormData] = useState({...});
```

## Styling Architecture

### Tailwind Classes Organization

```
Component
├─ Layout classes
│  ├─ Positioning (flex, grid)
│  ├─ Spacing (p-*, m-*, gap-*)
│  └─ Size (w-*, h-*)
│
├─ Visual classes
│  ├─ Background (bg-*)
│  ├─ Border (border-*, rounded-*)
│  └─ Shadow (shadow-*)
│
└─ Interactive classes
   ├─ Hover (hover:*)
   ├─ Focus (focus:*)
   └─ Transition (transition-*)
```

### Color Scheme

```
Primary: blue-600    (#2563eb)
Success: green-600   (#16a34a)
Warning: yellow-600  (#ca8a04)
Danger: red-600      (#dc2626)
Neutral: gray-*      (multiple shades)
Background: slate-*  (for dark elements)
```

## Build Output

```
dist/
├─ index.html              # Entry HTML
├─ assets/
│  ├─ index-[hash].js     # Bundled JavaScript (~620KB)
│  └─ index-[hash].css    # Bundled CSS (~16KB)
└─ vite.svg               # Static assets
```

## Development vs Production

### Development Mode
- Hot Module Replacement (HMR)
- Source maps for debugging
- Unminified code
- Fast refresh
- Dev server on port 5173

### Production Build
- Minified JavaScript
- Tree-shaking (unused code removed)
- CSS optimization
- Asset optimization
- Static files for deployment

## Scripts Breakdown

```json
{
  "dev": "vite",
  // Starts dev server with HMR

  "build": "vite build",
  // Creates optimized production build

  "preview": "vite preview",
  // Preview production build locally

  "lint": "eslint .",
  // Check code quality

  "typecheck": "tsc --noEmit -p tsconfig.app.json"
  // Verify TypeScript types
}
```

## Key Dependencies

### Runtime Dependencies
```
react (18.3.1)              - UI library
react-dom (18.3.1)          - DOM rendering
react-router-dom (latest)    - Routing
axios (latest)               - HTTP client
recharts (latest)            - Charts
lucide-react (0.344.0)      - Icons
@supabase/supabase-js        - Database (if needed)
```

### Dev Dependencies
```
vite (5.4.2)                - Build tool
typescript (5.5.3)          - Type system
tailwindcss (3.4.1)         - Styling
eslint (9.9.1)              - Linting
@vitejs/plugin-react        - React support
```

## Performance Metrics

| Metric | Value |
|--------|-------|
| Initial Bundle Size | ~620 KB |
| CSS Size | ~16 KB |
| Build Time | ~13 seconds |
| Dev Server Start | ~400 ms |
| Hot Reload | < 100 ms |

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## Checklist for Understanding Structure

- [ ] Understand component hierarchy
- [ ] Know where to add new pages
- [ ] Understand API integration pattern
- [ ] Know how routing works
- [ ] Understand state management approach
- [ ] Familiar with Tailwind classes
- [ ] Understand build process
- [ ] Know how to add new features

This structure provides a scalable, maintainable frontend application ready for your academic project presentation! 🎓
