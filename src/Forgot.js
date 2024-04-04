import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/api/users');
      const { users } = response.data;
      const user = users.find(user => user.email === email && user.username === username);
      
      if (user) {
        setShowNewPasswordForm(true);
      } else {
        setError('Invalid email or username');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/api/users');
      const { users } = response.data;
      const user = users.find(user => user.email === email && user.username === username);
      
      if (user) {
        const userId = user._id;
        await axios.put(`http://localhost:5001/api/users/${userId}`, { password: newPassword });
        setPasswordUpdated(true);
      } else {
        setError('Invalid email or username');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.error('Error:', error);
    }
  };

  // Function to handle redirection to login page
  const redirectToLogin = () => {
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      {!showNewPasswordForm && (
        <form onSubmit={handleForgotPassword}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      )}
      {showNewPasswordForm && !passwordUpdated && (
        <form onSubmit={handleSetNewPassword}>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      )}
      {passwordUpdated && (
        <div>
          <p>Password updated successfully! Redirecting to login page...</p>
          {redirectToLogin()}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
