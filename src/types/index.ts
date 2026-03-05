export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Sale {
  _id: string;
  productId: Product | string;
  productName?: string;
  quantitySold: number;
  totalAmount: number;
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
