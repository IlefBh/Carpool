import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '.././assets/images/logo.png';
import carpool from '.././assets/images/carpool.png';
import '.././assets/css/SignIn-SignUp.css';
import '.././assets/css/SignIn-SignUp-mobile.css';

function SignUp() {
    const [showAlert, setShowAlert] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PASSENGER'); // Default role as PASSENGER

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if email format is correct (you can use a regex for this)
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                    firstname,
                    lastname,
                    email,
                    password,
                    role
                });
                console.log('Response:', response.data);
                localStorage.setItem('email', email);
                // Navigate to the '/register/account' route only after successful signup
                navigate('/');
            } catch (error) {
                console.error('Error signing up:', error.response?.data?.message || error.message);
                setShowAlert(true);
            }
        } else {
            // Handle incorrect email format
            console.log('Email format is incorrect');
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
                <div>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="text"
                            value={firstname}
                            onChange={handleFirstnameChange}
                            placeholder="Enter your first name"
                            required
                        />
                        <input
                            className='login-input'
                            type="text"
                            value={lastname}
                            onChange={handleLastnameChange}
                            placeholder="Enter your last name"
                            required
                        />
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
                        <select className='login-input form-select' value={role} onChange={handleRoleChange} required>
                            <option value="PASSENGER">Passenger</option>
                            <option value="DRIVER">Driver</option>
                        </select>
                        <button className='submit-button' type="submit">Sign Up</button>
                    </form>
                    {showAlert && <p className='error-message'>Error: Unable to sign up, please try again</p>}
                </div>
            </div>
            <div className='right-part'>
                <img className='carpool' src={carpool} alt="" />
            </div>
        </div>
    )
}

export default SignUp;
