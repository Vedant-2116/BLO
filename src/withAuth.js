import React, { useEffect } from 'react';

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    const redirectToLogin = () => {
      // Redirect to the login page
      window.location.href = '/login';
    };

    const isLoggedIn = localStorage.getItem('token'); // Moved declaration here

    useEffect(() => {
      // Check if the user is logged in (you can replace this logic with your actual authentication logic)
      if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        redirectToLogin();
      }
    }, []); // Empty dependency array to run effect only once

    return isLoggedIn ? <Component {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
