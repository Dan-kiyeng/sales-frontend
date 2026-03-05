# Backend API Reference

This document describes the exact API responses expected by the frontend application.

## Base URL

```
http://localhost:5000/api
```

---

## Products API

### GET /api/products

Get all products.

**Request:**
```http
GET /api/products
```

**Expected Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "category": "Electronics",
    "price": 999.99,
    "stock": 50,
    "reorderLevel": 10,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mouse",
    "category": "Accessories",
    "price": 29.99,
    "stock": 5,
    "reorderLevel": 15,
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
]
```

### POST /api/products

Create a new product.

**Request:**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Keyboard",
  "category": "Accessories",
  "price": 79.99,
  "stock": 30,
  "reorderLevel": 10
}
```

**Expected Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Keyboard",
  "category": "Accessories",
  "price": 79.99,
  "stock": 30,
  "reorderLevel": 10,
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

### PUT /api/products/:id

Update an existing product.

**Request:**
```http
PUT /api/products/507f1f77bcf86cd799439013
Content-Type: application/json

{
  "name": "Mechanical Keyboard",
  "category": "Accessories",
  "price": 89.99,
  "stock": 25,
  "reorderLevel": 10
}
```

**Expected Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Mechanical Keyboard",
  "category": "Accessories",
  "price": 89.99,
  "stock": 25,
  "reorderLevel": 10,
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

### DELETE /api/products/:id

Delete a product.

**Request:**
```http
DELETE /api/products/507f1f77bcf86cd799439013
```

**Expected Response:**
```json
{
  "message": "Product deleted successfully"
}
```

Or simply:
```json
{
  "success": true
}
```

---

## Sales API

### POST /api/sales

Record a new sale.

**Request:**
```http
POST /api/sales
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "quantitySold": 2,
  "totalAmount": 1999.98,
  "saleDate": "2024-01-15T14:30:00.000Z"
}
```

**Expected Response:**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "productId": "507f1f77bcf86cd799439011",
  "quantitySold": 2,
  "totalAmount": 1999.98,
  "saleDate": "2024-01-15T14:30:00.000Z",
  "createdAt": "2024-01-15T14:30:00.000Z"
}
```

**Important Notes:**
- Backend should automatically update product stock (reduce by quantitySold)
- Should validate that stock is sufficient before recording sale

### GET /api/sales

Get all sales.

**Request:**
```http
GET /api/sales
```

**Expected Response (Option 1 - Populated):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "productId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "category": "Electronics",
      "price": 999.99
    },
    "quantitySold": 2,
    "totalAmount": 1999.98,
    "saleDate": "2024-01-15T14:30:00.000Z",
    "createdAt": "2024-01-15T14:30:00.000Z"
  }
]
```

**Expected Response (Option 2 - Not Populated):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "productId": "507f1f77bcf86cd799439011",
    "productName": "Laptop",
    "quantitySold": 2,
    "totalAmount": 1999.98,
    "saleDate": "2024-01-15T14:30:00.000Z",
    "createdAt": "2024-01-15T14:30:00.000Z"
  }
]
```

**Frontend Compatibility:**
The frontend handles both formats. If using Option 2, include `productName` field.

---

## AI Features API

### GET /api/ai/alerts

Get low stock alerts.

**Request:**
```http
GET /api/ai/alerts
```

**Expected Response:**
```json
[
  {
    "productId": "507f1f77bcf86cd799439012",
    "productName": "Mouse",
    "currentStock": 5,
    "reorderLevel": 15,
    "alertLevel": "critical",
    "message": "Critical: Stock is below reorder level. Immediate restocking required."
  },
  {
    "productId": "507f1f77bcf86cd799439013",
    "productName": "Keyboard",
    "currentStock": 12,
    "reorderLevel": 10,
    "alertLevel": "warning",
    "message": "Warning: Stock is approaching reorder level."
  }
]
```

**Alert Levels:**
- `"critical"` - Stock <= 50% of reorder level
- `"warning"` - Stock <= 80% of reorder level
- `"low"` - Stock <= reorder level

**Frontend Expectations:**
- Array of alert objects
- Each alert has: productId, productName, currentStock, reorderLevel, alertLevel, message
- alertLevel should be: "critical", "warning", or "low" (lowercase)

### GET /api/ai/predict/:productId

Get demand prediction for a specific product.

**Request:**
```http
GET /api/ai/predict/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "productName": "Laptop",
  "predictedDemand": 15,
  "confidence": 0.85,
  "recommendedStock": 25
}
```

**Field Descriptions:**
- `predictedDemand`: Number of units predicted to be sold (integer)
- `confidence`: Confidence score between 0 and 1 (float)
- `recommendedStock`: Recommended inventory level (integer)

**Confidence Levels:**
- 0.8 - 1.0: High confidence (green)
- 0.6 - 0.79: Medium confidence (yellow)
- 0.0 - 0.59: Low confidence (red)

---

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages.

### 400 Bad Request
```json
{
  "error": "Invalid input data",
  "message": "Price must be a positive number"
}
```

### 404 Not Found
```json
{
  "error": "Product not found",
  "message": "Product with ID 507f1f77bcf86cd799439999 does not exist"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Database connection failed"
}
```

---

## CORS Configuration

Your backend MUST enable CORS to allow frontend requests.

**Express.js Example:**
```javascript
const cors = require('cors');
app.use(cors());
```

Or with specific origin:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## Testing Your Backend

### Using curl

**Test Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Test Create Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "Test",
    "price": 99.99,
    "stock": 100,
    "reorderLevel": 20
  }'
```

**Test Record Sale:**
```bash
curl -X POST http://localhost:5000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "YOUR_PRODUCT_ID",
    "quantitySold": 5,
    "totalAmount": 499.95,
    "saleDate": "2024-01-15T10:00:00.000Z"
  }'
```

**Test AI Alerts:**
```bash
curl http://localhost:5000/api/ai/alerts
```

**Test AI Prediction:**
```bash
curl http://localhost:5000/api/ai/predict/YOUR_PRODUCT_ID
```

### Using Postman

1. Import this collection:
   - Base URL: `http://localhost:5000/api`
   - Create requests for each endpoint
   - Test all CRUD operations

2. Verify responses match the format above

---

## Sample Test Data

### Products
```json
[
  {
    "name": "Laptop",
    "category": "Electronics",
    "price": 999.99,
    "stock": 50,
    "reorderLevel": 10
  },
  {
    "name": "Mouse",
    "category": "Accessories",
    "price": 29.99,
    "stock": 5,
    "reorderLevel": 15
  },
  {
    "name": "Keyboard",
    "category": "Accessories",
    "price": 79.99,
    "stock": 30,
    "reorderLevel": 10
  },
  {
    "name": "Monitor",
    "category": "Electronics",
    "price": 299.99,
    "stock": 20,
    "reorderLevel": 5
  },
  {
    "name": "USB Cable",
    "category": "Accessories",
    "price": 9.99,
    "stock": 100,
    "reorderLevel": 50
  }
]
```

---

## Backend Validation Checklist

- [ ] GET /api/products returns array of products
- [ ] POST /api/products creates and returns new product
- [ ] PUT /api/products/:id updates and returns product
- [ ] DELETE /api/products/:id removes product
- [ ] POST /api/sales creates sale and updates stock
- [ ] GET /api/sales returns array of sales
- [ ] GET /api/ai/alerts returns low stock alerts
- [ ] GET /api/ai/predict/:id returns prediction
- [ ] CORS is enabled
- [ ] All responses are valid JSON
- [ ] Error responses include proper status codes
- [ ] Date fields use ISO 8601 format

---

## Frontend-Backend Integration

The frontend expects:

1. **Consistent field names** - Use exact field names shown above
2. **Proper data types** - Numbers for price/stock, strings for IDs
3. **ISO date format** - `"2024-01-15T14:30:00.000Z"`
4. **Array responses** - For list endpoints (products, sales, alerts)
5. **Object responses** - For single item endpoints (create, update)
6. **CORS enabled** - Frontend runs on different port

---

## Quick Verification

Run this command to test all endpoints:

```bash
# Test products endpoint
curl http://localhost:5000/api/products | json_pp

# Test sales endpoint
curl http://localhost:5000/api/sales | json_pp

# Test AI alerts endpoint
curl http://localhost:5000/api/ai/alerts | json_pp
```

All should return valid JSON without errors.

---

## Need Help?

If frontend shows errors:

1. **"Network Error"** → Backend not running or wrong URL
2. **"CORS Error"** → Enable CORS on backend
3. **"404 Not Found"** → Check endpoint URLs
4. **"500 Server Error"** → Check backend logs
5. **Data not displaying** → Verify response format matches above

Check browser DevTools Network tab to see actual API responses.

---

**Your backend should now be fully compatible with the frontend!** 🚀
