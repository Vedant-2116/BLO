import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import StepIndicator from './StepIndicator';
import './Checkout.css'; // This is where your styles would be defined

const Checkout = () => {
  // Assuming you have the items in state or props
  const items = [
    { id: 1, name: 'Logo printed T-shirt', stock: 'Limited Stock', price:29.49, quantity: 1 },
    { id: 2, name: 'Logo printed hoodie', stock: 'Limited Stock', price: 49.99, quantity: 1,  }
  ];

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFees = 8;

  return (
    <div className="checkout-container">
      <StepIndicator currentStep={0} />
      <h2>Review</h2>
      <div className="items-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <div className="item-image" /> {/* Add the image as a background in CSS */}
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.stock}</p>
            </div>
            <div className="item-price">
              {item.multiplied ? `${item.multiplied} x ${item.quantity}` : `$${item.price}`}
            </div>
            <div className="item-quantity">
              {/* Implement increment and decrement functionality */}
              <button>-</button>
              <span>{item.quantity}</span>
              <button>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="summary">
        <div className="total">
          <h3>Total</h3>
          <p>${total}</p>
        </div>
        <div className="shipping">
          <h4>Shipping Fees</h4>
          <p>${shippingFees}</p>
        </div>
        <div className="subtotal">
          <h3>Sub Total</h3>
          <p>${total + shippingFees}</p>
        </div>
      </div>
      {/* Use Link component to navigate to the shipping page */}
      <Link to="/shipping" className="confirm-order">Confirm Order</Link>
    </div>
  );
};

export default Checkout;
