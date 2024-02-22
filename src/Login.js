import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css'; // Make sure to create a corresponding CSS file

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the login logic, 
        // perhaps sending a request to your backend server
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-logo">
                    <FontAwesomeIcon icon={faUsers} size="10x"/> {/* Font Awesome logo */}
                </div>
                <input type="text" placeholder="USER NAME" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">LOGIN</button>
                <a href="/forgot-password">FORGOT PASSWORD ?</a>
                <Link to="/signup"><button>SIGNUP</button></Link> {/* Use Link component to navigate to the signup page */}
            </form>
        </div>
    );
};

export default Login;




