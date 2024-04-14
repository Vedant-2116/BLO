// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import logoImage from '../src/img/BLO MAIN LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  // Function to handle search icon click
  const handleSearchIconClick = () => {
    // Navigate to the search page when search icon is clicked
    window.location.href = '/Search';
  };
  return (
    <header className="header">
      <div className="header-icons left-icons">
        {/* Use Link component for navigation */}
        <FontAwesomeIcon icon={faSearch} size="2x" onClick={handleSearchIconClick} />
        {/* Use Link component for navigation */}
        <Link to="/User">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
      </div>
      {/* Link with the imported logo image */}
      <Link to="/Home" className="header-title">
        <img src={logoImage} alt="BLO Logo" className="header-logo" /> 
      </Link>
      <div className="header-icons right-icons">
        {/* Use Link component for navigation */}
        <Link to="/Shipping">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        </Link>
        {/* Use Link component for navigation */}
        <Link to="/Category">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
