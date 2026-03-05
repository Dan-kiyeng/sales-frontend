# Complete Setup Guide

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js (v16 or higher) installed
- ✅ npm or yarn package manager
- ✅ Your backend server ready and running
- ✅ Backend running on `http://localhost:5000`

## Backend Requirements

Your backend must have the following endpoints:

### Products API
```
GET    /api/products        - Get all products
POST   /api/products        - Create product
PUT    /api/products/:id    - Update product
DELETE /api/products/:id    - Delete product
```

### Sales API
```
POST   /api/sales          - Record sale
GET    /api/sales          - Get all sales
```

### AI API
```
GET    /api/ai/alerts              - Get low stock alerts
GET    /api/ai/predict/:productId  - Get demand prediction
```

## Frontend Setup

### 1. Dependencies Installation

All required packages are already included in `package.json`:

**Core Dependencies:**
- `react` & `react-dom` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `recharts` - Charts and graphs
- `lucide-react` - Icons

**Dev Dependencies:**
- `typescript` - Type safety
- `tailwindcss` - Styling
- `vite` - Build tool
- `eslint` - Code linting

Install everything:
```bash
npm install
```

### 2. Environment Configuration

The `.env` file contains:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Important:** Vite requires environment variables to be prefixed with `VITE_`

If your backend runs on a different port, update accordingly:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Development Server

Start the development server:
```bash
npm run dev
```

Expected output:
```
VITE v5.4.8  ready in 423 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Verify Build

Test production build:
```bash
npm run build
```

This will:
- Type check all TypeScript files
- Bundle and optimize code
- Output to `dist/` folder

## Project Architecture

### Component Hierarchy

```
App (BrowserRouter)
└── Layout
    ├── Sidebar (Navigation)
    └── Outlet (Page Content)
        ├── Dashboard
        ├── Products
        ├── Sales
        ├── SalesHistory
        ├── AIAlerts
        └── AIPredictions
```

### Data Flow

```
User Action
    ↓
Component Handler
    ↓
API Service (axios)
    ↓
Backend API
    ↓
Response
    ↓
Component State Update
    ↓
UI Re-render
```

## Component Details

### Layout Components

**Layout.tsx**
- Main wrapper with flex layout
- Contains Sidebar + main content area
- Uses React Router's `<Outlet>` for nested routes

**Sidebar.tsx**
- Fixed navigation menu
- Active route highlighting
- Icon + label for each menu item

**Modal.tsx**
- Reusable modal component
- Used for Add/Edit product forms
- Backdrop click to close

### Page Components

**Dashboard.tsx**
- Analytics overview
- 4 stat cards (products, stock, revenue, alerts)
- 2 charts (bar chart, line chart)
- Fetches data from multiple APIs on mount

**Products.tsx**
- Product listing table
- Search/filter functionality
- Add/Edit/Delete operations
- Modal-based forms
- Real-time stock status badges

**Sales.tsx**
- Sale recording form
- Product dropdown with stock info
- Real-time total calculation
- Stock validation
- Success feedback

**SalesHistory.tsx**
- Transaction history table
- Summary statistics
- Date formatting
- Revenue calculations

**AIAlerts.tsx**
- Low stock alert cards
- Color-coded by severity
- Alert statistics
- Auto-refresh capability

**AIPredictions.tsx**
- Product selection dropdown
- Prediction request handler
- Results visualization
- Confidence level display
- AI insights and recommendations

### Service Layer

**api.ts**
- Centralized axios instance
- Base URL configuration
- Grouped API methods:
  - `productAPI.*`
  - `salesAPI.*`
  - `aiAPI.*`

### Type Definitions

**types/index.ts**
- TypeScript interfaces for:
  - Product
  - Sale
  - Alert
  - Prediction

## Styling

### Tailwind CSS Configuration

The project uses a custom Tailwind setup:

**Color Palette:**
- Blue: Primary actions, links
- Green/Emerald: Success, positive metrics
- Red: Alerts, delete actions
- Yellow/Orange: Warnings
- Gray/Slate: Neutral, text

**Design System:**
- Spacing: Consistent padding/margin
- Shadows: Subtle elevation
- Borders: Minimal, gray-100
- Rounded corners: Large (xl)
- Typography: Clear hierarchy

## Features Walkthrough

### 1. Product Management

**Add Product:**
```typescript
1. Click "Add Product" button
2. Modal opens with form
3. Fill: name, category, price, stock, reorder level
4. Submit → POST /api/products
5. Table refreshes with new product
```

**Edit Product:**
```typescript
1. Click edit icon on product row
2. Modal opens pre-filled with data
3. Modify fields
4. Submit → PUT /api/products/:id
5. Table updates
```

**Delete Product:**
```typescript
1. Click delete icon
2. Confirmation dialog
3. Confirm → DELETE /api/products/:id
4. Product removed from table
```

### 2. Sales Recording

**Record Sale:**
```typescript
1. Select product from dropdown
2. View product details (price, stock)
3. Enter quantity
4. See calculated total
5. Submit → POST /api/sales
6. Success message shown
7. Stock automatically updated
```

### 3. AI Features

**Low Stock Alerts:**
```typescript
1. Page loads → GET /api/ai/alerts
2. Alerts displayed by severity
3. Color-coded cards
4. Refresh button for latest data
```

**Demand Prediction:**
```typescript
1. Select product
2. Click "Predict"
3. GET /api/ai/predict/:productId
4. Display:
   - Predicted demand
   - Confidence level
   - Recommended stock
   - AI insights
```

## Development Tips

### Adding New Features

1. **Create new page component**
   ```bash
   src/pages/NewFeature.tsx
   ```

2. **Add route in App.tsx**
   ```typescript
   <Route path="new-feature" element={<NewFeature />} />
   ```

3. **Add sidebar menu item**
   ```typescript
   { path: '/new-feature', icon: Icon, label: 'New Feature' }
   ```

4. **Create API methods**
   ```typescript
   export const newAPI = {
     getData: () => api.get('/new-endpoint'),
   };
   ```

### Code Organization

- Keep components under 300 lines
- Extract reusable logic to custom hooks
- Use TypeScript interfaces for all data
- Follow existing naming conventions

## Testing Checklist

Before presenting your project:

- [ ] Backend is running
- [ ] Frontend starts without errors
- [ ] All pages load correctly
- [ ] Can add/edit/delete products
- [ ] Can record sales
- [ ] Sales history displays
- [ ] AI alerts show data
- [ ] AI predictions work
- [ ] Charts render properly
- [ ] Responsive on mobile
- [ ] No console errors

## Common Errors & Solutions

### Error: "Failed to fetch"
**Solution:** Backend not running or wrong URL in `.env`

### Error: "Cannot find module"
**Solution:** Run `npm install` again

### Error: CORS issues
**Solution:** Enable CORS in your backend:
```javascript
const cors = require('cors');
app.use(cors());
```

### Error: Port already in use
**Solution:** Kill process or use different port:
```bash
kill -9 $(lsof -t -i:5173)
```

## Performance Optimization

The build is optimized but can be improved:

1. **Code splitting** - Dynamic imports for routes
2. **Lazy loading** - Load components on demand
3. **Image optimization** - Use WebP format
4. **Bundle analysis** - Check chunk sizes

## Deployment Checklist

- [ ] Update `VITE_API_BASE_URL` to production backend
- [ ] Run `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Deploy `dist/` folder to hosting service
- [ ] Configure redirects for SPA routing
- [ ] Test all features in production
- [ ] Set up error monitoring

## Recommended Hosting

- **Netlify** - Free tier, easy deployment
- **Vercel** - Optimized for React apps
- **AWS S3 + CloudFront** - Scalable solution
- **GitHub Pages** - Free for public repos

## Next Steps

1. Test all features thoroughly
2. Add more products and sales data
3. Explore AI predictions with different products
4. Customize colors and branding
5. Add authentication (if needed)
6. Deploy to production

## Support Resources

- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Recharts: https://recharts.org
- React Router: https://reactrouter.com

Good luck with your academic project! 🚀
