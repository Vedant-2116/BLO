import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCommentDots } from '@fortawesome/free-solid-svg-icons'; 

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link  } from 'react-router-dom';
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
import Forgot from './Forgot';
import Logout from './Logout';
import Search from './Search';
import Chatbot from './Chatbot';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/User" element={<User />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Logout" element={<Logout/>} />
        <Route path="/Forgot" element={<Forgot/>} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/Chatbot" element={<Chatbot/>} />
        {/* Redirect to login page if no matching route */}
        <Route path="*" element={<Navigate to="/Home" replace />} />
      </Routes>
      <Link to="/chatbot"> {/* Add Link component with the destination path */}
        <div className="chat-icon">
          <FontAwesomeIcon icon={faCommentDots} alt="chatbot" size='3x'/>
        </div>
      </Link>
      <Footer />
    </Router>
  );
}

export default App;


