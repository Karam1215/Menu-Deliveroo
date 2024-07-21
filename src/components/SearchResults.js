import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMenuItems } from './api'; // Ensure correct path
import './styles/SearchResults.css'; // Ensure the path matches your file structure

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = ({ addToCart }) => {
  const query = useQuery();
  const searchQuery = query.get('name');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await searchMenuItems(searchQuery);
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results: ", error);
        setError(error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading search results. {error.message}</p>;
  if (!searchQuery) return <p>No search query provided.</p>;

  return (
    <div className="menu">
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="products">
        {searchResults.map((item) => (
          <div className="product" key={item.id}>
            <img src={item.photo_url} alt={item.name} className="menu-item-photo" />
            <div className="description">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₽{item.price.toFixed(2)}</p>
              <p>Available: {item.quantity} left</p>
              <button onClick={() => addToCart(item)} disabled={item.quantity === 0}>
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

export default SearchResults;
