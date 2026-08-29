import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllCycles from './pages/AllCycles';
import ProductDetails from './pages/ProductDetails';
import ScrollToHash from './components/ScrollToHash';

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cycles" element={<AllCycles />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}