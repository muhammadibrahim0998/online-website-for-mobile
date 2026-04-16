import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartProvider } from "./components/context/CartContext";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/navbar/Home";
import Vivo from "./components/navbar/vivo";
import Iphone from "./components/navbar/Iphone";
import Sumsing from "./components/navbar/sumsing";
import About from "./components/navbar/About";
import Blog from "./components/navbar/Blog";
import AddToCart from "./components/navbar/addToCart";
import Checkout from "../src/components/navbar/Checkout";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/login";
import Logout from "./components/pages/logout";

import Shipping from "./components/navbar/Shipping";
import Payment from "./components/navbar/Payment";
import PlaceOrder from "./components/navbar/PlaceOrder";
import BlogDetail from "./components/navbar/BlogDetail";

// Dashboards
import SuperAdminDashboard from "./components/pages/SuperAdminDashboard";
import ShopAdminDashboard from "./components/pages/ShopAdminDashboard";
import UserDashboard from "./components/pages/UserDashboard";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

// Animation wrapper for pages
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/blog/:id" element={<PageWrapper><BlogDetail /></PageWrapper>} />
        <Route path="/vivo" element={<PageWrapper><Vivo /></PageWrapper>} />
        <Route path="/iphone" element={<PageWrapper><Iphone /></PageWrapper>} />
        <Route path="/sumsing" element={<PageWrapper><Sumsing /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><AddToCart /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/logout" element={<PageWrapper><Logout /></PageWrapper>} />
        <Route path="/shipping" element={<PageWrapper><Shipping /></PageWrapper>} />
        <Route path="/payment" element={<PageWrapper><Payment /></PageWrapper>} />
        <Route path="/placeorder" element={<PageWrapper><PlaceOrder /></PageWrapper>} />

        {/* Protected Dashboards */}
        <Route
          path="/admin/super"
          element={
            <ProtectedRoute role="superadmin">
              <PageWrapper><SuperAdminDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/shop"
          element={
            <ProtectedRoute role="shopadmin">
              <PageWrapper><ShopAdminDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <PageWrapper><UserDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe with user's specific test key
const stripePromise = loadStripe("pk_test_51SIXRbAhqmHRqZVrIm9rgreKfxwIy6JIC3SdXMqEEVDZQqKggLYwCq85dwSjRjdnA1AMH5L1Ii2coHhe9IWZf9G900NLMCh40U");

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <Navbar />
            <main className="container py-4">
              <AnimatedRoutes />
            </main>
          </Router>
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}


// Global styles for 3D buttons and other premium effects
const globalStyles = `
  /* Universal transparent 3D buttons with blue border/shadow */
  .btn, button:not(.navbar-toggler) {
    background-color: transparent !important;
    border: 2px solid #0d6efd !important;
    color: #0d6efd !important;
    box-shadow: 0 4px 0 #0d6efd !important;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.27) !important;
    position: relative;
    font-weight: bold !important;
    border-radius: 50px !important;
    backdrop-filter: blur(5px);
    overflow: hidden;
  }

  .btn:hover, button:not(.navbar-toggler):hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 6px 0 #00b4d8 !important;
    background-color: rgba(0, 180, 216, 0.15) !important;
    color: #0077b6 !important;
  }

  .btn:active, button:not(.navbar-toggler):active {
    transform: translateY(2px) !important;
    box-shadow: 0 1px 0 #0d6efd !important;
  }

  /* Standardizing specific buttons to the new 3D transparent style */
  .btn-primary, .btn-success, .btn-dark, .btn-info, .btn-warning, .btn-3d-premium {
    /* Styles are inherited from the universal rule above */
    padding: 10px 24px !important;
  }


  .hover-up { 
    transition: all 0.4s ease !important; 
  }
  
  .hover-up:hover { 
    transform: translateY(-12px) scale(1.03) !important; 
    box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important; 
  }

  /* Attractive Card Background with Blue Border and Shadow Glow */
  .card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(230, 242, 255, 0.8) 100%) !important;
    backdrop-filter: blur(20px) !important;
    border: 2px solid rgba(0, 180, 216, 0.4) !important;
    border-radius: 24px !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06), 0 0 20px rgba(0, 180, 216, 0.1) !important;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
    overflow: hidden;
  }


  
  .card:hover {
    box-shadow: 0 20px 60px rgba(0, 180, 216, 0.15) !important;
    border: 1px solid rgba(0, 180, 216, 0.3) !important;
  }

  /* Animating text and contents inside cards */
  .card-body > * {
    transition: all 0.4s ease !important;
  }

  .card:hover .card-body h6 {
    color: #0077b6 !important;
    transform: translateY(-2px);
  }

  .card:hover .card-body p {
    color: #333 !important;
    opacity: 1 !important;
  }

  .card:hover .img-fluid {
    transform: scale(1.08) rotate(2deg);
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

`;


const StyleTag = () => <style>{globalStyles}</style>;

export default () => (
  <>
    <StyleTag />
    <App />
  </>
);


