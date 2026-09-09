import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AllCycles from './pages/AllCycles';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
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
      </Routes>
    </>
  );
}