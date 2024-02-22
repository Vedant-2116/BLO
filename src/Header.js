// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="header-icons left-icons">
        {/* Use Link component for navigation */}
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </Link>
        {/* Use Link component for navigation */}
        <Link to="/Profile">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
      </div>
      <Link to="/Home" className="header-title">
        BLO
      </Link>
      <div className="header-icons right-icons">
        {/* Use Link component for navigation */}
        <Link to="/Checkout">
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
