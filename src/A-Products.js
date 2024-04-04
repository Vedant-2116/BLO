import React, { useState, useEffect } from 'react';
import "./Ap.css";

const AProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editFormVisible, setEditFormVisible] = useState(false); // State variable for edit form visibility
  const [message, setMessage] = useState(''); // State variable for message
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    isNew: false,
    liked: false,
    collection: '',
    company: '',
    imagePath: '',
    videoPath: '',
    description: ''
  });

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle product card click
  const handleProductClick = (product) => {
    // Set selected product and show the edit form
    setSelectedProduct(product);
    setEditFormData(product);
    setEditFormVisible(true); // Show the edit form
    setMessage(''); // Clear any existing message
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Function to handle form submission
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    // Implement logic to update the product data in the backend
    console.log('Edit form submitted:', editFormData);
    // Show success message
    setMessage('Changes saved successfully.');
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    // Close the edit form
    setEditFormVisible(false);
    setMessage('Edit canceled.');
  };

  // Function to handle form submission for adding a product
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    // Implement logic to add the product to the backend
    console.log('Form submitted:', formData);
    // Show success message
    setMessage('Product added successfully.');
    // Clear the form data
    setFormData({
      productName: '',
      price: '',
      isNew: false,
      liked: false,
      collection: '',
      company: '',
      imagePath: '',
    });
  };

  return (
    <div className="AProducts-container">
      <div className="AProducts-product-list">
        {products.map((product, index) => (
          <div key={product._id} className="AProducts-product-card" onClick={() => handleProductClick(product)}>
            <>
              <h2>{product.name}</h2>
              <div className="AProducts-product-details">
                <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Is New:</strong> {product.isNew ? 'True' : 'False'}</p>
                <p><strong>Liked:</strong> {product.liked ? 'True' : 'False'}</p>
                <p><strong>Collection:</strong> {product.collection}</p>
                <p><strong>Company:</strong> {product.company}</p>
              </div>
              <div className="AProducts-product-media">
                <img src={product.imagePath} alt="Product Photo" />
                <video controls>
                  <source src={product.videoPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </>
          </div>
        ))}
      </div>

      {editFormVisible && selectedProduct && (
        <div className="AProducts-edit-form">
          <h2>Edit Product</h2>
          <form onSubmit={handleEditFormSubmit}>
            {Object.entries(selectedProduct).map(([key, value]) => (
              <div key={key}>
                <label>{key}</label>
                <input type="text" name={key} value={editFormData[key] || ''} onChange={handleInputChange} />
              </div>
            ))}
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {!editFormVisible && (
        <div className="AProducts-add-product">
          <h2>Add Product</h2>
          <form onSubmit={handleAddProductSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleInputChange} />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />

            <label htmlFor="isNew">Is New:</label>
            <select id="isNew" name="isNew" value={formData.isNew} onChange={handleInputChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>

            <label htmlFor="liked">Liked:</label>
            <select id="liked" name="liked" value={formData.liked} onChange={handleInputChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>

            <label htmlFor="collection">Collection:</label>
            <input type="text" id="collection" name="collection" value={formData.collection} onChange={handleInputChange} />

            <label htmlFor="company">Company:</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} />

            <label htmlFor="imagePath">Image Path:</label>
            <input type="text" id="imagePath" name="imagePath" value={formData.imagePath} onChange={handleInputChange} />

            <label htmlFor="videoPath">Video Path:</label>
            <input type="text" id="videoPath" name="videoPath" value={formData.videoPath} onChange={handleInputChange} />

            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AProducts;
