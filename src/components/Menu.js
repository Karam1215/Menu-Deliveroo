// src/Menu.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { getMenuItems } from './api';
import { FaSearch } from 'react-icons/fa';
import './styles/Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?name=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleAddToCart = (clickedItem) => {
    addToCart(clickedItem);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading menu items. {error.message}</p>;

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="search-bar">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Search for a menu item..." 
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <div className="products">
        {menuItems.map((item) => (
          <div className="product" key={item.id}>
            <img src={item.photo_url} alt={item.name} className="menu-item-photo" />
            <div className="description">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₽{item.price.toFixed(2)}</p>
              <p>Available: {item.quantity} left</p>
              <button 
                onClick={() => handleAddToCart(item)} 
                disabled={item.quantity === 0}
              >
                {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Address: 123 Food Street, Food City, FC 12345</p>
        <p>Phone: +7 (234) 567-8901</p>
        <p>Email: contact@foodmenu.com</p>
      </div>
    </div>
  );
};

export default Menu;
