import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';
import './Product.css';

// SizeButton Component
const SizeButton = ({ size, isSelected, onSelect }) => (
  <button
    className={`size-button ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(size)}
  >
    {size}
  </button>
);

const Product = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleLike = () => setIsLiked(!isLiked);
  const navigate = useNavigate(); 
  const handleAddToCart = () => {
    // Perform any necessary actions before redirecting to the checkout page
    navigate('/Checkout');
  };

  return (
    <div className="product-page">
      <div className="product-detail">
          <img src="https://picsum.photos/id/1015/200/300" alt="Product" />
          <div className="icon-bar">
          <FontAwesomeIcon icon={faVrCardboard} size="2x"/>
        </div>
          <div className="product-header">
              <div className="company-info">
                <span className="company-name">BLO</span>
                <span className="new-label">NEW!</span>
              </div>
              <h1>Logo Printed Crew Neck T-Shirt</h1>
              <div className="product-actions">
                <button className="like-button" aria-label="like" onClick={toggleLike}>
                  {isLiked ? '❤️' : '🤍'}
                </button>
              <div className="price-tag">$650</div>
              </div>
              </div>
              <div className="size-selector">
                {sizes.map(size => (
                  <SizeButton key={size} size={size} isSelected={selectedSize === size} onSelect={setSelectedSize} />
                ))}
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
      ADD TO CART
    </button>
      </div>
    </div>
  );
};

export default Product;