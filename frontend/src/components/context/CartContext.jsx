import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Save cart to localStorage & trigger navbar update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist) {
      increaseQty(item.id);
    } else {
      setCartItems((prev) => [...prev, { ...item, qty: 1 }]);
    }
  };

  // Remove product
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total price
  const getTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
      return acc + price * (item.qty || 1);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
