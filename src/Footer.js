// Footer.js
import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebookF, faPinterestP } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
          <FontAwesomeIcon icon={faPinterestP} size="2x" />
        </a>
      </div>
      <div className="copy-right">
        BLO &copy; 2024
      </div>
    </footer>
  );
};

export default Footer;
