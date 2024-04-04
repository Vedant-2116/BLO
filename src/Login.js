// Login.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Add a class to the body when the component mounts
        document.body.classList.add('login-page');

        // Remove the class from the body when the component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5001/login', { username, password });
            const { token, role } = response.data;
            localStorage.setItem('token', token);
            
            // Redirect user based on role
            if (role === 'admin') {
                window.location.href = '/Admin'; // Redirect to profile page for admin
            } else {
                window.location.href = '/home'; // Redirect to home page for user
            }
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
            if (error.response && error.response.status === 401) {
                setError('Incorrect username or password');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            // Clear input fields
            setUsername('');
            setPassword('');
        }
    };
    
    

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-logo">
                    <FontAwesomeIcon icon={faUsers} size="10x"/>
                </div>
                {error && <div className="error">{error}</div>}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
                <div className="login-links">
                    <a href="/forgot">Forgot Password?</a>
                    <span> | </span>
                    <a href="/signup">Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
