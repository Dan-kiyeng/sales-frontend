import { useEffect, useState } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { productAPI, salesAPI } from '../services/api';
import { Product } from '../types';

const Sales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const product = products.find(p => p._id === selectedProduct);
    if (!product) return;

    const saleData = {
      productId: selectedProduct,
      quantitySold: parseInt(quantity),
      totalAmount: product.price * parseInt(quantity),
      saleDate: new Date().toISOString(),
    };

    try {
      await salesAPI.create(saleData);
      setSuccess(true);
      setSelectedProduct('');
      setQuantity('');
      fetchProducts();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error recording sale:', error);
      alert('Error recording sale. Please check if stock is sufficient.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProductData = products.find(p => p._id === selectedProduct);
  const totalAmount = selectedProductData && quantity
    ? selectedProductData.price * parseInt(quantity)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Record Sale</h1>
        <p className="text-gray-600 mt-2">Create a new sale transaction</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="text-green-800 font-medium">Sale recorded successfully!</p>
                <p className="text-green-600 text-sm">Inventory has been updated.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <select
                required
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a product...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - Stock: {product.stock} - ${product.price}
                  </option>
                ))}
              </select>
            </div>

            {selectedProductData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Product Name</p>
                    <p className="font-medium text-gray-900">{selectedProductData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category</p>
                    <p className="font-medium text-gray-900">{selectedProductData.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Price per Unit</p>
                    <p className="font-medium text-gray-900">${selectedProductData.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Available Stock</p>
                    <p className="font-medium text-gray-900">{selectedProductData.stock}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                required
                min="1"
                max={selectedProductData?.stock || undefined}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity..."
              />
              {selectedProductData && quantity && parseInt(quantity) > selectedProductData.stock && (
                <p className="text-red-600 text-sm mt-2">
                  Insufficient stock! Available: {selectedProductData.stock}
                </p>
              )}
            </div>

            {quantity && selectedProductData && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedProduct || !quantity}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={20} />
              {loading ? 'Recording Sale...' : 'Record Sale'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sales;
