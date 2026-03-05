import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import SalesHistory from './pages/SalesHistory';
import AIAlerts from './pages/AIAlerts';
import AIPredictions from './pages/AIPredictions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
