import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import './Payment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay, faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [saveCard, setSaveCard] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Decode JWT token and extract userId
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); // Assuming 'userId' is the key in the token payload
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSaveCardChange = (event) => {
    setSaveCard(event.target.checked);
  };

  const handleCardholderNameChange = (event) => {
    setCardholderName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make API request to save card details if saveCard is true
      if (saveCard) {
        const response = await fetch(`/api/users/${userId}/payment-card`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardholderName,
            cardNumber,
            expirationDate,
            cvv,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to save card details');
        }
      }

      // Handle payment flow based on the selected payment method
      if (paymentMethod === 'applepay') {
        // Handle Apple Pay flow
      } else if (paymentMethod === 'paypal') {
        // Handle PayPal flow
      } else {
        // Handle other payment methods
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="payment-container">
      <div className="checkout-header">
        <StepIndicator currentStep={2} style={{ width: '100%' }} />
        <h1>Checkout</h1>
        <p>To finish your transaction, enter your Payment information</p>
        <div className="payment-method">
          <h2>Select A Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <FontAwesomeIcon icon={faCreditCard} className="payment-icon" style={{ fontSize: '32px' }} />
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={handlePaymentMethodChange}
              />
            </label>
            <label className="payment-option">
              <FontAwesomeIcon icon={faPaypal} className="payment-icon" style={{ fontSize: '32px' }} />
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={handlePaymentMethodChange}
              />
            </label>
            <label className="payment-option">
              <FontAwesomeIcon icon={faApplePay} className="payment-icon" style={{ fontSize: '32px' }} />
              <input
                type="radio"
                name="payment"
                value="applepay"
                checked={paymentMethod === 'applepay'}
                onChange={handlePaymentMethodChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card-details">
        <h2>CARD DETAILS</h2>
        <input type="text" placeholder="Cardholder Name" value={cardholderName} onChange={handleCardholderNameChange} />
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange} />
        <input type="text" placeholder="Expiration Date" value={expirationDate} onChange={handleExpirationDateChange} />
        <input type="text" placeholder="CVV" value={cvv} onChange={handleCvvChange} />
        <label className="save-card">
          <input type="checkbox" checked={saveCard} onChange={handleSaveCardChange} /> Save this card securely for a quicker checkout next time
        </label>
        <button type="submit" className="confirm-btn" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};

export default Payment;
