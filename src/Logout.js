import React from 'react';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        // Remove token from local storage
        localStorage.removeItem('token');
  
        // Redirect the user to the login page
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any error that might occur during logout
      alert('An error occurred during logout. Please try again later.');
    }
  };
  
  

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
