import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '.././shared/Navbar/Navbar';
import axios from 'axios';
import upload from '.././assets/images/upload.png';
import '.././assets/css/Upload.css';
import '.././assets/css/Mobile-viewer-style.css';

function CreateRide() {
    const [showAlert, setShowAlert] = useState(false);
    const [departureLocation, setDepartureLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDateTime, setDepartureDateTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [pricePerSeat, setPricePerSeat] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    const handleDepartureLocationChange = (e) => {
        setDepartureLocation(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleDepartureDateTimeChange = (e) => {
        setDepartureDateTime(e.target.value);
    };

    const handleAvailableSeatsChange = (e) => {
        setAvailableSeats(e.target.value);
    };

    const handlePricePerSeatChange = (e) => {
        setPricePerSeat(e.target.value);
    };

    const handleRestrictionsChange = (e) => {
        setRestrictions(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (departureLocation && destination && departureDateTime && availableSeats && pricePerSeat && restrictions) {
            const token = localStorage.getItem('token'); // Assumes token exists in localStorage

            const rideData = {
                departureLocation,
                destination,
                departureDateTime,
                availableSeats: parseInt(availableSeats),
                pricePerSeat: parseFloat(pricePerSeat),
                restrictions,
            };

            try {
                const response = await axios.post('http://localhost:8080/api/v1/rides/create-ride', rideData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response:', response.data);
                setShowMessage(true);
            } catch (error) {
                console.error('Error creating ride:', error.response?.data?.message || error.message);
                setShowAlert(true);
            }
        } else {
            console.log('All fields are required.');
        }
    };

    return (
        <div className="usermenu">
            <div>
                <NavigationMenu />
            </div>
            <div className="user-upload">
                <div className='upload-img-cont'>
                    <img className='upload-img' src={upload} alt="" />
                </div>
                <div className="upload-form-cont">
                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            className="login-input upload"
                            type="text"
                            value={departureLocation}
                            onChange={handleDepartureLocationChange}
                            placeholder="Enter departure location"
                            required
                        />
                        <input
                            className="login-input upload"
                            type="text"
                            value={destination}
                            onChange={handleDestinationChange}
                            placeholder="Enter destination"
                            required
                        />
                        <input
                            className="login-input upload cal"
                            type="datetime-local"
                            value={departureDateTime}
                            onChange={handleDepartureDateTimeChange}
                            required
                        />
                        <input
                            className="login-input upload"
                            type="number"
                            value={availableSeats}
                            onChange={handleAvailableSeatsChange}
                            placeholder="Enter available seats"
                            required
                        />
                        <input
                            className="login-input upload"
                            type="number"
                            step="0.01"
                            value={pricePerSeat}
                            onChange={handlePricePerSeatChange}
                            placeholder="Enter price per seat"
                            required
                        />
                        <textarea
                            className="login-input upload"
                            value={restrictions}
                            onChange={handleRestrictionsChange}
                            placeholder="Enter restrictions"
                            required
                        />
                        <button className="submit-button" type="submit">Create Ride</button>
                    </form>
                    {showAlert && <p className="error-message">Error: Unable to create ride, please try again</p>}
                    {showMessage && <p className="true-message">Ride created successfully!</p>}
                </div>
            </div>
        </div>
    );
}

export default CreateRide;
