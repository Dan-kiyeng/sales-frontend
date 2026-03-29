import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import SalesHistory from './pages/SalesHistory';
import AIAlerts from './pages/AIAlerts';
import AIPredictions from './pages/AIPredictions';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Redirect to dashboard if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected routes — redirect to login if not authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales-history" element={<SalesHistory />} />
          <Route path="ai-alerts" element={<AIAlerts />} />
          <Route path="ai-predictions" element={<AIPredictions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;