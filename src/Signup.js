import React from 'react';
import './Signup.css'; // Assuming you will have similar styles to the Login
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-logo">
          <FontAwesomeIcon icon={faUserPlus} size="4x" />
        </div>
        <form className="signup-form">
          <input type="text" placeholder="FULL NAME" />
          <input type="email" placeholder="EMAIL" />
          <input type="text" placeholder="USERNAME" />
          <input type="password" placeholder="PASSWORD" />
          <input type="password" placeholder="CONFIRM PASSWORD" />
          <button type="submit">SIGN UP</button>
          <div className="signup-links">
            <a href="/login">ALREADY HAVE AN ACCOUNT? 
            <p>LOGIN</p></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;