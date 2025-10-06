import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";

import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/navbar/Home";
import Vivo from "./components/Header/Vivo";
import Iphone from "./components/Header/Iphone";
import Sumsing from "./components/Header/Sumsing";
import About from "./components/navbar/About";
import Blog from "./components/navbar/Blog";
import AddToCart from "./components/navbar/AddToCart";
import Checkout from "../src/components/navbar/Checkout";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vivo" element={<Vivo />} />
            <Route path="/iphone" element={<Iphone />} />
            <Route path="/sumsing" element={<Sumsing />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
