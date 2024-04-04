import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wish.css'; // Import the CSS file for the Wish component

const Wish = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      const allProducts = response.data;
      const likedProducts = allProducts.filter(product => product.liked === true);
      setLikedProducts(likedProducts);
    } catch (error) {
      console.error('Error fetching liked products:', error);
    }
  };
  

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <div className="wish-product-card-wrapper">
      {likedProducts.map((product) => (
        <div
          key={product._id}
          className="wish-product-card"
          onClick={() => handleProductClick(product._id)}
          onMouseEnter={() => handleMouseEnter(product._id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="wish-product-image-container">
            {product.imagePath && (
              <img src={product.imagePath} alt={product.name} className="wish-product-image" />
            )}
            {hoveredProductId === product._id && product.videoPath && (
              <video
                title={product.name}
                className="wish-product-video"
                width="560"
                loop
                muted
                autoPlay
              >
                <source src={product.videoPath} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="wish-product-details">
            <span className="wish-company-name">{product.company}</span>
            <h3 className="wish-product-name">{product.name}</h3>
            <p className="wish-price">${product.price}</p>
            {product.isNew && <span className="wish-new-badge">New</span>}
            <button className="wish-like-button" aria-label="like">
              {product.liked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wish;
