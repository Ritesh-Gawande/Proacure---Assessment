import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
      
    fetchProducts();
  }, []);

  return (
    <>
    <TopBar />
    <div className='product-list'>
      <h1>Dashboard</h1>
      <ul className='product-item'>
        {products.map((product) => (
          <li key={product.id}>{product.productInfo}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Home;
