import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from './../../assets/images/logo.png';
import './../../assets/css/Navbar.css';
import axios from 'axios';

const NavigationMenu = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null); // Updated state to store user data
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;

                    if (!userId) {
                        throw new Error('User ID is missing from token');
                    }

                    // Fetch user data
                    const response = await axios.get(
                        `http://localhost:8080/api/v1/user/user/${userId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (user) {
            setUserRole(user.role);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className='navig-menu'>
            <div className="logo-cont">
                <img className='nav-logo' src={logo} alt="Logo" />
            </div>
            <div className='navs'>
                {userRole === "DRIVER" && (
                    <NavLink className='nav' to="/myrides" activeClassName="active">My Rides</NavLink>
                )}
                {userRole === "DRIVER" && (
                    <NavLink className='nav' to="/create-ride" activeClassName="active">Create a Ride</NavLink>
                )}
                {userRole === "PASSENGER" && (
                    <NavLink className='nav' exact to="/history" activeClassName="active">Rides History</NavLink>
                )}
                {userRole === "PASSENGER" && (
                    <NavLink className='nav' to="/rides" activeClassName="active">Rides</NavLink>
                )}
            </div>
            <div>
                <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {userRole === "DRIVER" && (
                    <NavLink className='nav' to="/create-ride" activeClassName="active">Create a ride</NavLink>
                )}
                {userRole === "PASSENGER" && (
                    <NavLink className='nav' exact to="/history" activeClassName="active">Rides History</NavLink>
                )}
                {userRole === "PASSENGER" && (
                    <NavLink className='nav' to="/rides" activeClassName="active">Rides</NavLink>
                )}
                <div className="profile-lang">
                    <NavLink className='profile' to="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e4a357" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    </NavLink>
                    <div className="logout">
                        <button className='gestion-btn' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e4a357" className="bi bi-power" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1z" />
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile-lang log-mobile">
                <NavLink className='profile' to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e4a357" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </NavLink>
                <div className="logout log-mobile">
                    <button className='gestion-btn' onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e4a357" className="bi bi-power" viewBox="0 0 16 16">
                            <path d="M7.5 1v7h1V1z" />
                            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMenu;
