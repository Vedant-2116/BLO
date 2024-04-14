import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch all products
  async function fetchAllProducts() {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      setSearchResults(products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  // Function to perform product search by name
  async function searchProductsByName(query) {
    try {
      const response = await fetch(`http://localhost:5001/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search for products');
      }
      const searchResults = await response.json();
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  }

  // Function to handle search button click
  function handleSearchButtonClick() {
    if (searchTerm.trim()) {
      searchProductsByName(searchTerm);
    } else {
      fetchAllProducts();
    }
  }

  // Function to handle product item click
  function handleProductItemClick(productId) {
    // Redirect to product page with the product ID
    window.location.href = `http://localhost:3000/product/${productId}`;
  }

  return (
    <div>
      {/* Input box for searching products */}
      <div id="searchContainer">
        <input
          type="text"
          id="searchInput"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button id="searchButton" onClick={handleSearchButtonClick}>Search</button>
      </div>

      {/* Display area for search results */}
      <div id="searchResults">
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {searchResults.map(product => (
              <li key={product._id} onClick={() => handleProductItemClick(product._id)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
