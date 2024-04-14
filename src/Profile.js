import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    username: "",
    shippingDetails: {
      phoneNumber: "",
      province: "",
      city: "",
      streetAddress: "",
      postalCode: ""
    },
    paymentCard: {
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: ""
    }
  });

  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);

      const response = await axios.get(`http://localhost:5001/api/users/${decodedToken.userId}`);
      setUserInfo(response.data);
      setEditedUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);

      await axios.put(`http://localhost:5001/api/users/${decodedToken.userId}`, editedUserInfo);
      setIsEditing(false);
      setUserInfo(editedUserInfo); // Update userInfo with the editedUserInfo
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-details">
          <h2>ACCOUNT DETAILS</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            {isEditing ? (
              <input type="text" id="fullName" name="fullName" value={editedUserInfo.fullName} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.fullName}</div>
            )}

            <label htmlFor="email">Email:</label>
            {isEditing ? (
              <input type="email" id="email" name="email" value={editedUserInfo.email} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.email}</div>
            )}
            
            <label htmlFor="username">Username:</label>
            {isEditing ? (
              <input type="text" id="username" name="username" value={editedUserInfo.username} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.username}</div>
            )}

            <h3>SHIPPING ADDRESS</h3>
            <label htmlFor="phoneNumber">Phone Number:</label>
            {isEditing ? (
              <input type="text" id="phoneNumber" name="shippingDetails.phoneNumber" value={editedUserInfo.shippingDetails.phoneNumber} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.shippingDetails.phoneNumber}</div>
            )}
            
            <label htmlFor="province">Province:</label>
            {isEditing ? (
              <input type="text" id="province" name="shippingDetails.province" value={editedUserInfo.shippingDetails.province} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.shippingDetails.province}</div>
            )}
            
            <label htmlFor="city">City:</label>
            {isEditing ? (
              <input type="text" id="city" name="shippingDetails.city" value={editedUserInfo.shippingDetails.city} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.shippingDetails.city}</div>
            )}
            
            <label htmlFor="streetAddress">Street Address:</label>
            {isEditing ? (
              <input type="text" id="streetAddress" name="shippingDetails.streetAddress" value={editedUserInfo.shippingDetails.streetAddress} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.shippingDetails.streetAddress}</div>
            )}
            
            <label htmlFor="postalCode">Postal Code:</label>
            {isEditing ? (
              <input type="text" id="postalCode" name="shippingDetails.postalCode" value={editedUserInfo.shippingDetails.postalCode} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.shippingDetails.postalCode}</div>
            )}

            <h3>PAYMENT CARD DETAILS</h3>
            <label htmlFor="cardholderName">Cardholder Name:</label>
            {isEditing ? (
              <input type="text" id="cardholderName" name="paymentCard.cardholderName" value={editedUserInfo.paymentCard?.cardholderName} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.paymentCard?.cardholderName}</div>
            )}

            <label htmlFor="cardNumber">Card Number:</label>
            {isEditing ? (
              <input type="text" id="cardNumber" name="paymentCard.cardNumber" value={editedUserInfo.paymentCard?.cardNumber} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.paymentCard?.cardNumber}</div>
            )}

            <label htmlFor="expirationDate">Expiration Date:</label>
            {isEditing ? (
              <input type="text" id="expirationDate" name="paymentCard.expirationDate" value={editedUserInfo.paymentCard?.expirationDate} onChange={handleInputChange} />
            ) : (
              <div>{userInfo.paymentCard?.expirationDate}</div>
            )}

            {isEditing ? (
              <div>
                <button name="edit-button" type="submit">Save</button>
                <button name="edit-button" type="button" onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <button name="edit-button" type="button" onClick={handleEditClick}>Edit</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
