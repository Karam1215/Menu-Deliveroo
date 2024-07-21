import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Contact from './components/Contact';
import SearchResults from './components/SearchResults'; // Import SearchResults component
import './App.css';
import { CartProvider } from './components/CartContext';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart items={cart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults addToCart={addToCart} />} /> {/* Add SearchResults route */}
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;