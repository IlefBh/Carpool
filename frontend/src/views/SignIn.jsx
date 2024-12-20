import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '.././assets/images/logo.png';
import carpool from '.././assets/images/carpool.png';
import '.././assets/css/SignIn-SignUp.css';
import '.././assets/css/SignIn-SignUp-mobile.css';

function SignIn() {
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email: email,
                password: password,
            });
            console.log("Response:", response.data);

            const { token } = response.data;
            localStorage.setItem('token', token);

            // Manually define the redirect path
            const redirectPath = '/rides'; // Change this to the desired path
            window.location.href = redirectPath;
        } catch (error) {
            console.error('Error:', error.response?.data?.message || 'An error occurred');
            setShowAlert(true);
        }
    };

    return (
        <div className='login-view'>
            <div className='left-part'>
                <div className='logolang'>
                    <div className='logo'>
                        <img className='nobg-logo' src={logo} alt="Logo" />
                    </div>
                </div>
                <h1 className='title'>Welcome!</h1>
                <div className='d-flex flex-column align-items-center'>
                    {showAlert && (
                        <div className="alert alert-danger" role="alert">
                            Incorrect email or password. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            required
                        />
                        {/* <div className='lost-password'>
                            <p className='mdp'>Forgot your password?</p>
                            <Link className='mdp' to="/account/reset/request">Reset Password</Link>
                        </div> */}
                        <button className='submit-button' type="submit">Sign In</button>
                        <div className='signup'>
                            <span className='mdp'>
                                Don't have an account? <Link className='mdp' to="/register">Create Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='carpool' src={carpool} alt="Carpool" />
            </div>
        </div>
    );
}

export default SignIn;
