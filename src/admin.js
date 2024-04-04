import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './A-Dashboard';
import Users from './A-Users';
import Products from './A-Products';
import Orders from './A-Orders';
import './admin.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-sidebar">
        <ul>
          <li onClick={() => handleTabClick('DASHBOARD')}>DASHBOARD</li>
          <li onClick={() => handleTabClick('USERS')}>USERS</li>
          <li onClick={() => handleTabClick('PRODUCTS')}>PRODUCTS</li>
          <li onClick={() => handleTabClick('ORDERS')}>ORDERS</li>
          <div className="admin-bottom-icons">
            <li>
              <button className="admin-dropdown-toggle" type="button" id="alertsDropdown">
                <span className="icon"><FontAwesomeIcon icon={faBell} /></span>
              </button>
            </li>
            <li>
              <button className="admin-dropdown-toggle" type="button" id="messagesDropdown">
                <span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>
              </button>
            </li>
            <li>
              <div className="admin-dropdown">
                <button className="admin-dropdown-toggle" type="button" id="settingsDropdown" onClick={toggleSettingsMenu}>
                  <span className="icon"><FontAwesomeIcon icon={faCog} /></span>
                </button>
                {isSettingsMenuOpen && (
                  <div className="admin-dropdown-menu" aria-labelledby="settingsDropdown">
                  <Link className="dropdown-item" to="/forgot">FORGOT PASSWORD</Link>
                  <Link className="dropdown-item" to="/logout">LOG OUT</Link>
                </div>
                )}
              </div>
            </li>
          </div>
        </ul>
      </div>
      <div className="admin-main-content">
        {activeTab === 'DASHBOARD' && <Dashboard />}
        {activeTab === 'USERS' && <Users />}
        {activeTab === 'PRODUCTS' && <Products />}
        {activeTab === 'ORDERS' && <Orders />}
      </div>
    </div>
  );
};

export default AdminPanel;
