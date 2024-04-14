import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faTshirt, faCalendar, faBox } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [monthlyEarnings, setMonthlyEarnings] = useState('');
  const [annualEarnings, setAnnualEarnings] = useState('');
  const [totalProducts, setTotalProducts] = useState('');
  const [totalOrders, setTotalOrders] = useState('');

  useEffect(() => {
    fetchMonthlyEarnings();
    fetchAnnualEarnings();
    fetchTotalProducts();
    fetchTotalOrders();
  }, []);

  const fetchMonthlyEarnings = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders');
      const orders = await response.json();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const monthlyEarnings = orders.reduce((total, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getMonth() === currentMonth && order.status === 'paid') {
          return total + order.total;
        }
        return total;
      }, 0);
      setMonthlyEarnings(monthlyEarnings);
    } catch (error) {
      console.error('Error fetching monthly earnings:', error);
    }
  };
  
  


  const fetchAnnualEarnings = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders');
      const orders = await response.json();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const annualEarnings = orders.reduce((total, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate > oneYearAgo && order.status === 'paid') {
          return total + order.total;
        }
        return total;
      }, 0);
      setAnnualEarnings(annualEarnings);
    } catch (error) {
      console.error('Error fetching annual earnings:', error);
    }
  };
  

  const fetchTotalProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const products = await response.json();
      setTotalProducts(products.length);
    } catch (error) {
      console.error('Error fetching total products:', error);
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders');
      const orders = await response.json();
      setTotalOrders(orders.length);
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  return (
    <div className="users-section">
      <h2>ADMIN DASHBOARD</h2>
      <div className="card-container">
        {/* Earnings (Monthly) Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card custom-card monthly-card">
            <div className="card-body">
              <h5 className="card-title">Earnings (Monthly)</h5>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    ${monthlyEarnings}
                    <FontAwesomeIcon icon={faCalendar} className="fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings (Annual) Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card custom-card annual-card">
            <div className="card-body">
              <h5 className="card-title">Earnings (Annual)</h5>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    ${annualEarnings}
                    <FontAwesomeIcon icon={faDollarSign} className="fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card custom-card tasks-card">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    {totalProducts}
                    <FontAwesomeIcon icon={faTshirt} className="fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card custom-card requests-card">
            <div className="card-body">
              <h5 className="card-title">ORDERS</h5>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    {totalOrders}
                    <FontAwesomeIcon icon={faBox} className="fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
