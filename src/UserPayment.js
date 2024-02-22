import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApplePay, faPaypal } from '@fortawesome/free-brands-svg-icons';
import './UserPayment.css'; // Ensure to create a UserPayment.css file in the same directory

const UserPayment = () => {
  return (
    <div className="payment-container">
      <div className="payment-header">PAYMENT</div>
      <div className="preferred-payment">
        <div className="payment-instructions">
        <h3>PREFERRED PAYMENT</h3>
          To enjoy faster checkout, save your payment card(s) here. Once you've saved a
          card, you can set it as preferred by selecting a heart.
        </div>
        <div className="add-card-button">
          <span className="plus-icon">+</span>
          ADD A NEW CARD
        </div>
        <div className="or-section">OR</div>
        <div className="payment-options">
      <div className="apple-pay">
        <FontAwesomeIcon icon={faApplePay} size="3x" />
      </div>
      <div className="paypal">
        <FontAwesomeIcon icon={faPaypal} size="3x" />
      </div>
    </div>
      </div>
    </div>
  );
};

export default UserPayment;
