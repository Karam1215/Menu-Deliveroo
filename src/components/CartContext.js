// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(i => i.id === item.id);
      if (existingItemIndex !== -1) {
        return prevCartItems.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCartItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter(item => item.id !== itemId);
    });
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map(item => 
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
