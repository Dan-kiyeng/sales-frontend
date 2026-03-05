import { useEffect, useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';
import { productAPI, aiAPI } from '../services/api';
import { Product, Prediction } from '../types';

const AIPredictions = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handlePredict = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      const response = await aiAPI.getPrediction(selectedProduct);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      alert('Error getting prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Demand Prediction</h1>
        <p className="text-gray-600 mt-2">Predict future demand using AI</p>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Product for Prediction</h2>

          <div className="flex gap-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - Current Stock: {product.stock}
                </option>
              ))}
            </select>

            <button
              onClick={handlePredict}
              disabled={!selectedProduct || loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Search size={20} />
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </div>

        {prediction && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Prediction Results</h2>
                <p className="text-gray-600">{prediction.productName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">Predicted Demand</p>
                <p className="text-4xl font-bold text-blue-600">{prediction.predictedDemand}</p>
                <p className="text-xs text-gray-500 mt-1">units</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">Confidence Level</p>
                <p className={`text-4xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {(prediction.confidence * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {getConfidenceLabel(prediction.confidence)} confidence
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">Recommended Stock</p>
                <p className="text-4xl font-bold text-green-600">{prediction.recommendedStock}</p>
                <p className="text-xs text-gray-500 mt-1">units</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">AI Insights</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    The AI predicts a demand of <strong>{prediction.predictedDemand} units</strong> for the upcoming period.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Based on historical sales data, the prediction has a{' '}
                    <strong className={getConfidenceColor(prediction.confidence)}>
                      {getConfidenceLabel(prediction.confidence).toLowerCase()} confidence level
                    </strong>{' '}
                    of {(prediction.confidence * 100).toFixed(1)}%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    To meet demand and maintain safety stock, we recommend keeping{' '}
                    <strong>{prediction.recommendedStock} units</strong> in inventory.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {!prediction && !loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Prediction Yet</h3>
            <p className="text-gray-600">Select a product and click "Predict" to see AI-powered demand forecasts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPredictions;
