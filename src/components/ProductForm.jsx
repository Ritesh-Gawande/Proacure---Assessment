import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';




const ProductForm = () => {
  const [formData, setFormData] = useState({
    supplier: '',
    productInfo: '',
    productUrl: '',
    category: '',
    quantity: 0,
    timeline: '',
    location: '',
    requiredFor: ''
  });

  

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    };

    const fetchLocations = async () => {
      const response = await axios.get('http://localhost:5000/api/locations');
      setLocations(response.data);
    };

    fetchCategories();
    fetchLocations();
  }, []);

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/products', formData);
    alert("your Data has been Submitted") 
    setFormData({
      supplier: '',
      productInfo: '',
      productUrl: '',
      category: '',
      quantity: '',
      timeline: '',
      location: '',
      requiredFor: ''
    });  
  };

  

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label className="block">Supplier Name</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Product Information</label>
        <input type="text" name="productInfo" value={formData.productInfo} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Product URL</label>
        <input type="text" name="productUrl" value={formData.productUrl} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Quantity</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Timeline</label>
        <input type="date" name="timeline" value={formData.timeline} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label>Location:</label>
        <select name="location" value={formData.location} onChange={handleChange}>
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location.id} value={location.name}>{location.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Required For</label>
        <input type="text" name="requiredFor" value={formData.requiredFor} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default ProductForm;
