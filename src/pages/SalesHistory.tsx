import { useEffect, useState } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { salesAPI } from '../services/api';
import { Sale } from '../types';

const SalesHistory = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await salesAPI.getAll();
      setSales(response.data.reverse());
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantitySold, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading sales history...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
        <p className="text-gray-600 mt-2">View all your sales transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{sales.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Items Sold</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalQuantity}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <DollarSign className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Transactions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(sale.saleDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {typeof sale.productId === 'object' && sale.productId !== null
                      ? sale.productId.name
                      : sale.productName || 'Unknown Product'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sale.quantitySold}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ${sale.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sales.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No sales recorded yet. Start by recording your first sale!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
