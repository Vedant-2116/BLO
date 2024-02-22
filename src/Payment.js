import React from 'react';
import StepIndicator from './StepIndicator';
import './Payment.css'; // Make sure to create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPaypal,faApplePay,faCcVisa, faCcMastercard, faCcAmex, } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';


const Payment = () => {
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
            <input type="radio" name="payment" value="credit" checked />
            </label>
            <label className="payment-option">
            <FontAwesomeIcon icon={faPaypal} className="payment-icon" style={{ fontSize: '32px' }} /> 
            <input type="radio" name="payment" value="paypal" />
            </label>
            <label className="payment-option">
            <FontAwesomeIcon icon={faApplePay} className="payment-icon" style={{ fontSize: '32px' }} />
            <input type="radio" name="payment" value="applepay" />
            </label>
            </div>
        </div>
        </div>


      <div className="card-details">
        <h2>CARD TYPE</h2>
        <div className="card-type-icons">
          <FontAwesomeIcon icon={faCcVisa} size="2x" />
          <FontAwesomeIcon icon={faCcMastercard} size="2x" />
          <FontAwesomeIcon icon={faCcAmex} size="2x" />
        </div>
        <input type="text" placeholder="Cardholder name" />
        <input type="text" placeholder="Card number" />
        <input type="text" placeholder="Exp Date" />
        <input type="text" placeholder="CVC Code" />
        <label className="save-card">
          <input type="checkbox" /> Save this card securely for a quicker checkout the next time
        </label>
        <button type="submit" className="confirm-btn">Confirm</button>
      </div>
    </div>
  );
}

export default Payment;
