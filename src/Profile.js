import React, { useState } from 'react';
import './Profile.css'; // Make sure to create a corresponding CSS file to style your components
import UserPayment from './UserPayment'; // Import your PaymentPage component

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('ACCOUNT_DETAILS'); // Manage active tab state
  const [userInfo, setUserInfo] = useState({
    name: 'Vedantsinh Gohel',
    email: 'vedqntgohel@gmail.com',
    language: 'English',
    address: '62 Pynford Crescent Toronto ON M3A 1W8 Canada',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, like sending data to a server
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="profile-container">
      <div className="left-container">
        <div className="sidebar">
          {/* Mock sidebar navigation */}
          <ul>
            <li onClick={() => handleTabClick('ACCOUNT_DETAILS')}>ACCOUNT DETAILS</li>
            <li onClick={() => handleTabClick('PAYMENT')}>PAYMENT</li>
          </ul>
        </div>
      </div>
      <div className="right-container">
        <div className="profile-content">
          {activeTab === 'ACCOUNT_DETAILS' && (
            <div className="profile-details">
              <h2>ACCOUNT DETAILS</h2>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">NAME:</label>
                  <input type="text" id="name" name="name" value={userInfo.name} onChange={handleInputChange} />
                  
                  <label htmlFor="email">EMAIL:</label>
                  <input type="email" id="email" name="email" value={userInfo.email} onChange={handleInputChange} />
                  <label htmlFor="language">Language:</label>
                  <input type="text" id="language" name="language" value={userInfo.language} onChange={handleInputChange} />
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name="address" value={userInfo.address} onChange={handleInputChange} />
                  

                  {/* Add more fields as needed */}
                  
                  <button type="submit">SAVE</button>
                </form>
              ) : (
                <>
                  <p>NAME: {userInfo.name}</p>
                  <p>EMAIL: {userInfo.email}</p>
                  <p>LANGUAGE: {userInfo.language}</p>
                  <p>SAVED ADDRESS: {userInfo.address}</p>
                  <button onClick={handleEditClick}>EDIT</button>
                </>
              )}
              <div className="profile-image-section">
            <div className="profile-image-placeholder">
              {/* Placeholder for profile image */}
            </div>
            <button className="change-image-button">CHANGE IMAGE</button>
          </div>
            </div>
          )}
          {activeTab === 'PAYMENT' && (
            <div className="payment-details">
              <UserPayment /> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
