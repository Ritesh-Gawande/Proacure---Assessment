import React, { useState } from 'react';
import axios from 'axios';
// import './TopBar.css';

const TopBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/sample_products?search=${e.target.value}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setResults([]);
      }
    }else {
      setResults([]);
    } 
  };

  return (
    <div className="top-bar">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map(product => (
            <li key={product.id} className="search-result-item">
              <strong>{product.name}</strong>: {product.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopBar;
