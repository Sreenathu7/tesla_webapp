import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import BuildPricePage from './pages/BuildPricePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import ContactDealerPage from './pages/ContactDealerPage';
import { restoreUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<ProductsPage />} />
            <Route path="/cars/:slug" element={<CarDetailsPage />} />
            <Route path="/build" element={<BuildPricePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-dealer" element={<ContactDealerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
