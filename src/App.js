import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCommentDots } from '@fortawesome/free-solid-svg-icons'; 

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import User from './Users';
import Product from './Product';
import './App.css';
import Category from './Category';
import Checkout from './Checkout';
import Shipping from './Shipping';
import Payment from './Payment';
import Profile from './Profile';
import Admin from  './admin';
import Forgot from './Forgot'
import Logout from './Logout'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/User" element={<User />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/forgot" element={<Forgot/>} />
        {/* Redirect to login page if no matching route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <div className="chat-icon">
          <FontAwesomeIcon icon={faCommentDots} alt="chatbot" size='3x'/>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


