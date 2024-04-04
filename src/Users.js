import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Profile from "./Profile"; // Correct import name and case
import Wishlist from "./Wish"; // Assuming this is the correct filename
import "./Users.css"

const UserPanel = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };
  
    const toggleSettingsMenu = () => {
      setIsSettingsMenuOpen(!isSettingsMenuOpen);
    };
  
    return (
      <div className="user-panel-container">
        <div className="user-sidebar">
          <ul>
            <li onClick={() => handleTabClick('Profile')}>PROFILE</li>
            <li onClick={() => handleTabClick('Wishlist')}>WISHLIST</li>
            <div className="user-bottom-icons">
              <li>
                <div className="user-dropdown">
                  <button className="user-dropdown-toggle" type="button" id="settingsDropdown" onClick={toggleSettingsMenu}>
                    <span className="icon"><FontAwesomeIcon icon={faCog} /></span>
                  </button>
                  {isSettingsMenuOpen && (
                   <div className="user-dropdown-menu" aria-labelledby="settingsDropdown">
                   <Link className="dropdown-item" to="/forgot">FORGOT PASSWORD</Link>
                   <Link className="dropdown-item" to="/logout">LOG OUT</Link>
                 </div>
                  )}
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div className="user-main-content">
          {activeTab === 'Profile' && <Profile />} {/* Use lowercase 'Profile' */}
          {activeTab === 'Wishlist' && <Wishlist />} {/* Assuming this is the correct filename */}
        </div>
      </div>
    );
  };
  
  export default UserPanel;
