import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Category.css';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        const cleanedData = response.data.map(product => ({
          ...product,
          imagePath: product.imagePath ? product.imagePath.trim() : '', // Check if imagePath is defined before trimming
          videoPath: product.videoPath ? product.videoPath.trim() : '' // Check if videoPath is defined before trimming
        }));
        setProducts(cleanedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, []);

  const handleProductHover = (productId) => {
    setHoveredProductId(productId);
  };

  const handleProductLeave = () => {
    setHoveredProductId(null);
  };

  const handleLike = async (event, productId) => {
    event.stopPropagation();
    console.log('Like button clicked for product ID:', productId);
    try {
      await axios.post(`http://localhost:5001/api/products/${productId}/like`);
      console.log('Like toggled successfully for product ID:', productId);
  
      // Update the local state or UI if needed
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, liked: true };
        }
        return product;
      });
      setProducts(updatedProducts);
  
      // Reload the current page to trigger re-render
      window.location.reload();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  



  const handleProductClick = (productId) => {
    // Navigate to the product page
    window.location.href = `/product/${productId}`;
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  // Filter products based on selected collection
  const filteredProducts = selectedCollection ?
    products.filter(product => product.collection === selectedCollection) :
    products;

  return (
    <div className="categories-page">
      <aside className="sidebar">
        <h2>Collections</h2>
        <ul className="collection-list">
          {Array.from(new Set(products.map(product => product.collection))).map(collection => (
            <li key={collection}>
              <button onClick={() => handleCollectionClick(collection)}>
                <h3>{collection}</h3>
              </button>
            </li>
          ))}
          {/* Clear selection button */}
          {selectedCollection && (
            <li>
              <button onClick={() => setSelectedCollection(null)}>
                <h3>Clear Selection</h3>
              </button>
            </li>
          )}
        </ul>
      </aside>
      <main className="main-content">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
            <div
              className="product-image-container"
              onMouseEnter={() => handleProductHover(product._id)}
              onMouseLeave={handleProductLeave}
            >
              {hoveredProductId === product._id ? (
                <video
                  title={product.name}
                  className="product-video"
                  width="560"
                  loop
                  muted
                  autoPlay
                >
                  <source src={product.videoPath} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </div>
            <div className="product-details">
              <span className="company-name">{product.company}</span>
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              {product.isNew && <span className="new-badge">New</span>}
              <button className="like-button" aria-label="like" onClick={(event) => handleLike(event, product._id)}>
                {product.liked ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CategoryPage;
