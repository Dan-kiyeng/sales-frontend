import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { aiAPI } from '../services/api';
import { Alert } from '../types';

const AIAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await aiAPI.getAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertColor = (alertLevel: string) => {
    switch (alertLevel.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getAlertBadgeColor = (alertLevel: string) => {
    switch (alertLevel.toLowerCase()) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading AI alerts...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Low Stock Alerts</h1>
            <p className="text-gray-600 mt-2">Intelligent alerts powered by AI</p>
          </div>
          <button
            onClick={fetchAlerts}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={20} />
            Refresh Alerts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{alerts.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {alerts.filter(a => a.alertLevel.toLowerCase() === 'critical').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warning Alerts</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {alerts.filter(a => a.alertLevel.toLowerCase() === 'warning').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Good!</h3>
            <p className="text-gray-600">No low stock alerts at the moment. Your inventory levels are healthy.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.productId}
              className={`rounded-xl shadow-sm border p-6 ${getAlertColor(alert.alertLevel)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{alert.productName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlertBadgeColor(alert.alertLevel)}`}>
                        {alert.alertLevel.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{alert.message}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Current Stock:</span>{' '}
                        <span className="font-bold">{alert.currentStock}</span>
                      </div>
                      <div>
                        <span className="font-medium">Reorder Level:</span>{' '}
                        <span className="font-bold">{alert.reorderLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIAlerts;
