import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

const CategoriesPage = () => {
  const categories = ['ALL', 'MALE', 'FEMALE']; // Add more categories as needed
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      imageUrl: "https://picsum.photos/id/1015/200/300",
      isNew: true,
    },
    {
      id: 2,
      name: "Product 2",
      price: 39.99,
      imageUrl: "https://picsum.photos/id/1016/200/300",
      isNew: false,
    },
    {
      id: 3,
      name: "Product 3",
      price: 49.99,
      imageUrl: "https://picsum.photos/id/1018/200/300",
      isNew: true,
    },
    {
      id: 4,
      name: "Product 4",
      price: 59.99,
      imageUrl: "https://picsum.photos/id/1020/200/300",
      isNew: false,
    },
    {
      id: 5,
      name: "Product 5",
      price: 69.99,
      imageUrl: "https://picsum.photos/id/1024/200/300",
      isNew: true,
    },
    {
      id: 6,
      name: "Product 6",
      price: 79.99,
      imageUrl: "https://picsum.photos/id/1031/200/300",
      isNew: false,
    },
    // Add more product objects as needed
  ];
  
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle like button click
  const toggleLike = () => {
    setIsLiked(!isLiked); // Toggle isLiked state
  };

  return (
    <div className="categories-page">
      <aside className="sidebar">
        <h2>CATEGORIES</h2>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        {products.map((product, index) => (
          <Link to={`/product`} key={index} className={`product-card ${index % 2 === 0 ? 'large' : 'small'}`}>
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-details">
              <span className="company-name">BLO</span>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              {product.isNew && <span className="new-badge">New</span>}
              <button className="like-button" aria-label="like" onClick={toggleLike}>
                {isLiked ? '❤️' : '🤍'}
              </button>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default CategoriesPage;