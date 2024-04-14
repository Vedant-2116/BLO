import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import StepIndicator from './StepIndicator';
import withAuth from './withAuth';
import "./Shipping.css";

function Shipping() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [shippingCharge, setShippingCharge] = useState(0); // State to hold shipping charge
  const [totalCost, setTotalCost] = useState(0); // State to hold total cost
  const [userId, setUserId] = useState(''); // State to hold the user's unique identifier

  // Effect to retrieve userId when component mounts or user authentication changes
  // Effect to retrieve userId when component mounts or user authentication changes
useEffect(() => {
  // Fetch userId from the token stored in localStorage
  const fetchUserId = async () => {
      try {
          // Decode the token to extract user ID
          const token = localStorage.getItem('token');
          if (token) {
              const decodedToken = jwtDecode(token);
              const userId = decodedToken.userId;
              setUserId(userId); // Set the userId state

              console.log('Fetching user ID...');
              console.log('userId:', userId); // Log userId before making the request

              // Fetch shipping details for the user if userId is available
              const response = await fetch(`http://localhost:5001/api/users/${userId}/shipping-details`);
              if (response.ok) {
                  const shippingData = await response.json();
                  // If shipping data exists, populate the form fields
                  if (shippingData) {
                      setFormData({
                          fullName: shippingData.fullName || '',
                          phoneNumber: shippingData.phoneNumber || '',
                          province: shippingData.province || '',
                          city: shippingData.city || '',
                          streetAddress: shippingData.streetAddress || '',
                          postalCode: shippingData.postalCode || ''
                      });
                  }
              } else {
                  console.error('Failed to fetch shipping data');
              }
          } else {
              console.error('Token not found in localStorage');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };

  fetchUserId();
}, []); // Empty dependency array to run the effect only once


  const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

  const cities = {
    Alberta: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    'British Columbia': ['Vancouver', 'Victoria', 'Kelowna', 'Burnaby'],
    Manitoba: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson'],
    'New Brunswick': ['Fredericton', 'Saint John', 'Moncton', 'Miramichi'],
    'Newfoundland and Labrador': ['St. John\'s', 'Corner Brook', 'Mount Pearl', 'Gander'],
    'Nova Scotia': ['Halifax', 'Sydney', 'Dartmouth', 'Truro'],
    Ontario: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton'],
    'Prince Edward Island': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall'],
    Quebec: ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    Saskatchewan: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any form field is empty
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.province ||
      !formData.city ||
      !formData.streetAddress ||
      !formData.postalCode
    ) {
      setErrorMessage('Please fill out all the fields');
      return; // Exit early if any field is empty
    }
    try {
      // Clear any previous error message
      setErrorMessage('');
      const response = await fetch(`http://localhost:5001/api/users/${userId}/shipping-details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Data saved successfully
        console.log('Shipping data saved successfully');
        // Redirect the user to the next step or page
        window.location.href = '/Checkout'; // Redirecting to payment page
      } else {
        // Handle error
        console.error('Failed to save shipping data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      province: selectedProvince
    }));
    // Fetch shipping charge based on selected province
    // This can be from an API endpoint or a predefined mapping
    const fetchedShippingCharge = getShippingCharge(selectedProvince);
    setShippingCharge(fetchedShippingCharge);
  };

  const getShippingCharge = (province) => {
    // Define shipping charges for every province
    const shippingCharges = {
      'Alberta': 10,
      'British Columbia': 12,
      'Manitoba': 11,
      'New Brunswick': 13,
      'Newfoundland and Labrador': 14,
      'Nova Scotia': 13,
      'Ontario': 10,
      'Prince Edward Island': 12,
      'Quebec': 11,
      'Saskatchewan': 11,
      'Northwest Territories': 15,
      'Nunavut': 16,
      'Yukon': 15
    };
    
    return shippingCharges[province] || 0; // Default to 0 if province not found
  };

  return (
    <div className="shipping-container">
      <StepIndicator currentStep={0} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="shipping-form" onSubmit={handleSubmit}>
        <h2>Enter Shipping Details</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="shipping-input"
        />

        <div className="phone-number-container">
          <span className="country-code">+1</span>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Your Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="shipping-input"
          />
        </div>

        <select
          name="province"
          value={formData.province}
          onChange={handleProvinceChange}
          className="shipping-select"
        >
          <option value="">Select Province</option>
          {provinces.map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>

        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="shipping-select"
        >
          <option value="">Select City</option>
          {formData.province && cities[formData.province].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="text"
          name="streetAddress"
          placeholder="Enter Street Address"
          value={formData.streetAddress}
          onChange={handleInputChange}
          className="shipping-input"
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Enter Postal Code"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="shipping-input"
        />

        <button type="submit" className="confirm-button">
          Confirm 
        </button>
      </form>
    </div>
  );
}

export default withAuth(Shipping);
