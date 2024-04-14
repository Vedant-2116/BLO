import React, { useState, useEffect } from 'react';
import './Home.css'; // This will be your CSS file for styling
import CloudImage from './img/cloud.jpg'; // Import the image file

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the backend when the component mounts
    fetchProducts();
  }, []);

  // Function to fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="home">
      <div className="img-container">
        {/* Use the imported image directly */}
        <img src={CloudImage} alt="Cloud" />
        <div className="overlay-text">BLO</div>
        <button className="collection-button">Collection</button>
        <div className="quote">“MADE BY CREATIVE MINDS”</div>
        <div className="credit">FOR</div>
        <div className="cred">“UNIQUE INDIVIDUALS”</div>
      </div>
      
      <div className="video-row">
        {products.map((product, index) => (
          <a href={`/product/${product._id}`} className="video-link" key={index}>
            <div className="video">
              <video autoPlay loop muted className="fit-video" width="560" height="315">
                <source src={product.videoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
