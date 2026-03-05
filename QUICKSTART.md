# Quick Start Guide

## Step 1: Verify Backend is Running

Make sure your Node.js backend is running on `http://localhost:5000`

```bash
# In your backend directory
npm start
```

## Step 2: Install Frontend Dependencies

```bash
npm install
```

## Step 3: Configure Environment

The `.env` file is already configured. Verify it points to your backend:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Step 4: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

## Step 5: Test the Application

1. **Add Products**
   - Go to Products page
   - Click "Add Product"
   - Fill in product details
   - Save

2. **Record a Sale**
   - Navigate to "Record Sale"
   - Select a product
   - Enter quantity
   - Submit

3. **View Dashboard**
   - Check analytics
   - View charts
   - See real-time stats

4. **Check AI Features**
   - Visit "Low Stock Alerts" for AI-powered warnings
   - Visit "Demand Prediction" to forecast demand

## Folder Structure Overview

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # API integration layer
├── types/              # TypeScript definitions
├── App.tsx            # Router configuration
└── main.tsx           # Entry point
```

## Available Pages

- `/` - Dashboard with analytics
- `/products` - Product management
- `/sales` - Record new sales
- `/sales-history` - View all transactions
- `/ai-alerts` - AI low stock alerts
- `/ai-predictions` - AI demand forecasting

## Common Issues

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `.env` configuration
- Verify CORS is enabled on backend

**Port 5173 already in use:**
- Vite will automatically use the next available port
- Check the terminal output for the actual URL

## Production Build

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Need Help?

Check the full README.md for detailed documentation.
