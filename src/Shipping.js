import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import StepIndicator from './StepIndicator';

function Shipping() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically handle the form submission, like sending it to a server
  };

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
        <StepIndicator currentStep={1} />
      <form onSubmit={handleSubmit}>
        <h2>Enter Shipping Details</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          style={{ margin: '10px 0', padding: '10px',width: '100%' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <span style={{ padding: '10px' }}>+1</span>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Your Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            style={{ width: '100%',padding: '10px', flexGrow: 1 }}
          />
        </div>

        <select
          name="province"
          value={formData.province}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        >
          <option value="">Select Province</option>
          {/* Map through provinces options here */}
        </select>

        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        >
          <option value="">Select City</option>
          {/* Map through city options here */}
        </select>

        <input
          type="text"
          name="streetAddress"
          placeholder="Enter Street Address"
          value={formData.streetAddress}
          onChange={handleInputChange}
          style={{width: '100%', margin: '10px 0', padding: '10px' }}
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Enter Postal Code"
          value={formData.postalCode}
          onChange={handleInputChange}
          style={{width: '100%', margin: '10px 0', padding: '10px' }}
        />

      <Link to="/payment" style={{ display: 'block', textAlign: 'center', marginTop: '20px', textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px', border: 'none', cursor: 'pointer' }}>
              Confirm
            </Link>
      </form>
    </div>
  );
}

export default Shipping;
