import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import StepIndicator from './StepIndicator';
import { fetchUserId } from './Shipping';
import './Checkout.css';

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [shippingFees, setShippingFees] = useState(8);
  const [taxes, setTaxes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
  
        const [userDataResponse, cartResponse, shippingResponse] = await Promise.all([
          fetch(`http://localhost:5001/api/users/${userId}`),
          fetch(`http://localhost:5001/api/users/${userId}/cart`),
          fetch(`http://localhost:5001/api/users/${userId}/shipping-details`)
        ]);
  
        if (!userDataResponse.ok || !cartResponse.ok || !shippingResponse.ok) {
          throw new Error('Failed to fetch user data, cart data, or shipping details');
        }
  
        const [userData, cartData, shippingData] = await Promise.all([
          userDataResponse.json(),
          cartResponse.json(),
          shippingResponse.json()
        ]);
  
        console.log('User Data:', userData); // Log user data
  
        const itemDetails = await Promise.all(
          cartData.cart.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            return {
              ...item,
              product: productDetails,
              size: item.size // Include the size information in the item object
            };
          })
        );
  
        setUser(userData); // Set user data in state
        setItems(itemDetails);
        calculateTotal(itemDetails);
        const province = shippingData.province;
        const shippingCharge = await getShippingCharge(province);
        setShippingFees(shippingCharge);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  const calculateTotal = (items) => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += item.product.price * item.quantity;
    });
    setTotal(subTotal);
    calculateTax(subTotal);
  };

  const calculateTax = (subTotal) => {
    const taxRate = 0.05; // 5% tax rate for Canada
    const tax = subTotal * taxRate;
    setTaxes(tax);
  };

  const getShippingCharge = async (province) => {
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

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    if (newQuantity <= 0) {
      updatedItems.splice(index, 1); // Remove item if quantity is zero or negative
    } else {
      updatedItems[index].quantity = newQuantity;
    }
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: user.shippingDetails.fullName,
          phoneNumber: user.shippingDetails.phoneNumber,
          shippingDetails: {
            streetAddress: user.shippingDetails.streetAddress,
            city: user.shippingDetails.city,
            province: user.shippingDetails.province,
            postalCode: user.shippingDetails.postalCode,
          },
          products: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            name: item.product.name, // Include product name
            price: item.product.price // Include product price
          })),
          total: total,
          shippingFees: shippingFees,
          taxes: taxes,
          subTotal: total + shippingFees + taxes,
        }),
      });
      if (response.ok) {
        // Order created successfully
        console.log('Order created successfully');
        // Redirect the user to the next step or page
        window.location.href = '/payment'; 
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  
  
  
  


  return (
    <div className="checkout-container">
      <StepIndicator currentStep={1} />
      <h2>Review</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className="items-list">
            {items.map((item, index) => (
              <div key={item._id} className="item">
                {item.product && (
                  <>
                    <div className="item-image" style={{ backgroundImage: `url(${item.product.imagePath})` }} />
                    <div className="item-info">
                      <h3>{item.product.name}</h3>
                      <p>{item.product.isNew ? 'New' : 'Not New'}</p>
                      <p>{item.product.collection}</p>
                      <p>{item.product.company}</p>
                      <p>Size: {item.size}</p> {/* Display the size from the cart */}
                    </div>
                    <div className="item-price">
                      ${item.product.price.toFixed(2)}
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="summary">
            <div className="summary-item">
              <h4>Total</h4>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <h4>Shipping Fees</h4>
              <p>${shippingFees.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <h4>Taxes</h4>
              <p>${taxes.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <h3>Sub Total</h3>
              <p>${(total + shippingFees + taxes).toFixed(2)}</p>
            </div>
          </div>
          <button className="confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;

