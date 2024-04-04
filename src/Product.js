import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import './Product.css';

const SizeButton = ({ size, isSelected, onSelect }) => (
  <button
    className={`size-button ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(size)}
  >
    {size}
  </button>
);

const Product = () => {
  const [product, setProduct] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState(''); // State to hold the user's unique identifier
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const { productId } = useParams();

  // Effect to retrieve userId when component mounts or user authentication changes
  useEffect(() => {
    // Fetch userId from the token stored in localStorage
    const fetchUserId = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      } else {
        console.error('Token not found in localStorage');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [productId]);

  const toggleLike = async () => {
    try {
      await axios.post(`http://localhost:5001/api/products/${productId}/like`);
      setIsLiked(prevIsLiked => !prevIsLiked);
      // Reload the current page to trigger re-render
      window.location.reload();

    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const getUserId = () => {
    // Implement logic to retrieve userId from your application
    // For example, you might retrieve it from localStorage or from the state
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } else {
      console.error('Token not found in localStorage');
      return null; // Or handle the absence of userId in a different way
    }
  };
  
  // Update the handleAddToCart function in the Product component
  const handleAddToCart = async (productId) => {
    try {
        if (typeof productId !== 'string') {
            console.error('Invalid productId:', productId);
            return;
        }

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const token = localStorage.getItem('token');
        const userId = getUserId(); // You need to implement this function to get the userId

        // Construct the cart object with product ID and selected size
        const cartItem = {
            productId: productId,
            size: selectedSize,
            quantity: 1, // Default quantity is 1, you can change this as needed
        };

        // Make the PUT request to update the user's cart
        const response = await axios.put(
            `http://localhost:5001/api/users/${userId}/cart`,
            cartItem, // Sending a single cart item, not an array
            {
                headers: {
                    Authorization: `Bearer ${token}` // Add authorization header if using JWT
                }
            }
        );

        if (response.status === 200) {
            // Cart updated successfully
            console.log('Cart updated successfully');
            window.location.href = '/shipping';
        } else {
            // Handle unexpected responses
            console.error('Failed to update cart');
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        // Handle errors such as network issues or server errors
    }
};

  


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="column">
        <div
          className="image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <video autoPlay loop muted className="product-video">
              <source src={product.videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={product.imagePath} alt="Product" />
          )}
        </div>
      </div>
      <div className="column">
        <div className="company-info">
          <span className="company-name">{product.company}</span>
          {product.isNew && <span className="new-label">NEW!</span>}
        </div>
        <h1 className="product-header">{product.name}</h1>
        <div className="product-actions">
          <button className="like-button" aria-label="like" onClick={toggleLike}>
            {product.liked ? '❤️' : '🤍'}
          </button>
          <div className="icon-bar">
            <div className="price-tag">${product.price}</div>
            <FontAwesomeIcon icon={faVrCardboard} size="2x" className="vr-icon" />
          </div>
          <div className="size-selector">
            {sizes.map(size => (
              <SizeButton key={size} size={size} isSelected={selectedSize === size} onSelect={setSelectedSize} />
            ))}
          </div>
          <button className="add-to-cart" onClick={() => handleAddToCart(productId)}>
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="column">
        <div className="smoke-animation"></div>
      </div>
    </div>
  );
};

export default Product;
