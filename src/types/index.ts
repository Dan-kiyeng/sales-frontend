  export interface Product {
  _id: string;
  name: string;
  category?: string;
  price: number;
  stock: number;
  reorderLevel: number;
  createdAt?: string;
  updatedAt?: string;
}

// {
//     "_id": "69b3bf17b2936aa9b052822f",
//     "productId": {
//         "_id": "69a965d4094879774b7d2714",
//         "name": "Laptop",
//         "price": 800,
//         "stock": 3,
//         "reorderLevel": 10,
//         "createdAt": "2026-03-05T11:15:32.576Z",
//         "__v": 0
//     },
//     "quantitySold": 2,
//     "totalPrice": 1600,
//     "saleDate": "2026-03-13T07:39:03.102Z",
//     "__v": 0
// }


export interface Sale {
  _id: string;
  productId: Product;
  quantitySold: number;
  totalPrice: number;
  saleDate: string;
  createdAt?: string;
}

export interface Alert {
  productId: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  alertLevel: string;
  message: string;
}

export interface Prediction {
  productId: string;
  productName: string;
  predictedDemand: number;
  confidence: number;
  recommendedStock: number;
}
