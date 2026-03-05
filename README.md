# AI-Enhanced Sales and Inventory Management System

A modern, full-featured inventory management system with AI-powered demand prediction and low-stock alerts.

## Features

- **Dashboard Analytics** - Real-time overview with charts and statistics
- **Product Management** - Full CRUD operations for inventory products
- **Sales Recording** - Easy-to-use interface for recording transactions
- **Sales History** - Complete transaction history with analytics
- **AI Low Stock Alerts** - Intelligent alerts powered by Brain.js
- **AI Demand Prediction** - Future demand forecasting using machine learning
- **Responsive Design** - Works seamlessly on all devices

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React Icons

### Backend (Your Existing Backend)
- Node.js
- Express.js
- MongoDB
- Brain.js

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Sidebar.tsx      # Navigation sidebar
│   └── Modal.tsx        # Reusable modal component
├── pages/               # Page components
│   ├── Dashboard.tsx    # Analytics dashboard
│   ├── Products.tsx     # Product management
│   ├── Sales.tsx        # Record sales
│   ├── SalesHistory.tsx # Sales history
│   ├── AIAlerts.tsx     # Low stock alerts
│   └── AIPredictions.tsx # Demand predictions
├── services/            # API services
│   └── api.ts          # Axios configuration and API calls
├── types/               # TypeScript types
│   └── index.ts        # Type definitions
├── App.tsx             # Main app component with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Your backend server running on http://localhost:5000

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   The `.env` file is already configured with default settings:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   Update this if your backend runs on a different port.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## API Integration

The frontend connects to your backend through these endpoints:

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales
- `POST /api/sales` - Record new sale
- `GET /api/sales` - Get all sales

### AI Features
- `GET /api/ai/alerts` - Get low stock alerts
- `GET /api/ai/predict/:productId` - Get demand prediction

## Usage Guide

### Managing Products

1. Navigate to **Products** page
2. Click **Add Product** to create new products
3. Use the **Edit** button to update product details
4. Use the **Delete** button to remove products
5. Use the search bar to filter products

### Recording Sales

1. Go to **Record Sale** page
2. Select a product from the dropdown
3. Enter quantity to sell
4. View the calculated total amount
5. Click **Record Sale** to complete the transaction

### Viewing Analytics

1. Visit the **Dashboard** for overview metrics
2. View charts showing:
   - Top 5 products by stock
   - Recent sales trends
3. Check quick stats for:
   - Total products
   - Total stock
   - Total revenue
   - Low stock alerts

### AI Features

#### Low Stock Alerts
1. Navigate to **Low Stock Alerts**
2. View AI-generated alerts categorized by severity:
   - Critical (urgent restocking needed)
   - Warning (stock running low)
   - Low (approaching reorder level)

#### Demand Prediction
1. Go to **Demand Prediction** page
2. Select a product
3. Click **Predict** to get:
   - Predicted demand for upcoming period
   - Confidence level of prediction
   - Recommended stock level

## Customization

### Changing Colors

The application uses Tailwind CSS. To customize colors:

1. Edit `tailwind.config.js`
2. Modify the theme colors
3. Update component classes as needed

### Adding New Features

1. Create new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add menu item in `src/components/Sidebar.tsx`
4. Create API functions in `src/services/api.ts`

## Troubleshooting

### Backend Connection Issues

If the frontend can't connect to the backend:

1. Verify backend is running on `http://localhost:5000`
2. Check `.env` file for correct `VITE_API_BASE_URL`
3. Ensure CORS is enabled on your backend
4. Check browser console for error details

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Run `npm run typecheck` to find TypeScript issues
4. Run `npm run build` to test production build

## Production Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

3. **Update environment variables** in your hosting platform to point to your production backend API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your academic work.

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend API is responding correctly
3. Ensure all environment variables are set properly
