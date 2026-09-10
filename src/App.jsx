import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AllCycles from './pages/AllCycles';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DashboardProducts from './pages/DashboardProducts';
import DashboardCategories from './pages/DashboardCategories';
import DashboardOrders from './pages/DashboardOrders';
import DashboardCustomers from './pages/DashboardCustomers';
import DashboardInventory from './pages/DashboardInventory';
import DashboardBanners from './pages/DashboardBanners';
import DashboardCoupons from './pages/DashboardCoupons';
import DashboardReviews from './pages/DashboardReviews';
import DashboardReports from './pages/DashboardReports';
import DashboardSettings from './pages/DashboardSettings';
import DashboardThemes from './pages/DashboardThemes';
import ScrollToHash from './components/ScrollToHash';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cycles" element={<AllCycles />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <ProtectedRoute>
              <DashboardProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <ProtectedRoute>
              <DashboardCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <DashboardOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customers"
          element={
            <ProtectedRoute>
              <DashboardCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/inventory"
          element={
            <ProtectedRoute>
              <DashboardInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/banners"
          element={
            <ProtectedRoute>
              <DashboardBanners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/coupons"
          element={
            <ProtectedRoute>
              <DashboardCoupons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reviews"
          element={
            <ProtectedRoute>
              <DashboardReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute>
              <DashboardReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/themes"
          element={
            <ProtectedRoute>
              <DashboardThemes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}