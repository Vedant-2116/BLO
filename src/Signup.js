import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Signup.css';

const Signup = ({ onSignup }) => {
    useEffect(() => {
        // Add 'signup-body' class to body element when component mounts
        document.body.classList.add('signup-body');

        // Remove 'signup-body' class from body element when component unmounts
        return () => {
            document.body.classList.remove('signup-body');
        };
    }, []);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Check if password and confirm password match
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Send signup data to the backend
            const response = await axios.post('http://localhost:5001/signup', {
                fullName,
                email,
                username,
                password
            });

            console.log('Signup successful:', response.data);
            // Redirect user to login page after successful signup
            window.location.href = '/login';
        } catch (error) {
            console.error('Signup failed:', error.message);
            setError(error.message);
            setFullName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-logo">
                <FontAwesomeIcon icon={faUserPlus} size="4x" />
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <input type="text" placeholder="FULL NAME" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="CONFIRM PASSWORD" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">SIGN UP</button>
                <span> | </span>
                <div className="signup-links">
                    <p>ALREADY HAVE AN ACCOUNT? <a href="/login">LOGIN</a></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
