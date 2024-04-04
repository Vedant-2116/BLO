import React from 'react';

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Perform any logout logic here (e.g., clear session, remove tokens, etc.)
      localStorage.removeItem('accessToken'); // Example: Remove access token from local storage
      
      // You can also make an API call to log the user out on the server side if needed
      // await axios.post('/logout');

      // After logout logic is complete, redirect the user to the login page or any other desired route
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any error that might occur during logout
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
