import React, { useState, useEffect } from 'react';
import '.././assets/css/Profile.css';
import NavigationMenu from '.././shared/Navbar/Navbar';
import logo from '.././assets/images/logo.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

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
            setNewFirstName(user.firstName || '');
            setNewLastName(user.lastName || '');
            setNewEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {};

            // Include only non-empty fields in the payload
            if (newFirstName.trim()) payload.firstName = newFirstName;
            if (newLastName.trim()) payload.lastName = newLastName;
            if (newEmail.trim()) payload.email = newEmail;

            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).userId;

            await axios.put(
                `http://localhost:8080/api/v1/user/${userId}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setShowMessage(true);
            setShowAlert(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
            setShowAlert(true);
            setShowMessage(false);
        }
    };

    return (
        <div className="usermenu">
            <NavigationMenu />
            <div className="tab">
                <div className="profile-page">
                    <form onSubmit={handleSubmit}>
                        <div className="profile-forms">
                            <div className="profile-img-btn">
                                <img
                                    src={logo}
                                    alt="Profile"
                                    className="profile-picture"
                                />
                            </div>
                            <div className="profile-form">
                                <label className="prof-label">
                                    <div className="profile-label">First Name: </div>
                                    <input
                                        className="profile-input"
                                        type="text"
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                </label>
                                <label className="prof-label">
                                    <div className="profile-label">Last Name:</div>
                                    <input
                                        className="profile-input"
                                        type="text"
                                        value={newLastName}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                </label>
                                <label className="prof-label">
                                    <div className="profile-label">Email:</div>
                                    <input
                                        className="profile-input"
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="profile-btns">
                            <button
                                className="reset-btn"
                                type="button"
                                onClick={() => {
                                    setNewFirstName(user?.firstName || '');
                                    setNewLastName(user?.lastName || '');
                                    setNewEmail(user?.email || '');
                                }}
                            >
                                Cancel
                            </button>
                            <button className="save-btn" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                    {showAlert && <p className="error-message">An error occurred while editing the profile</p>}
                    {showMessage && <p className="true-message">Your profile has been successfully edited</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
