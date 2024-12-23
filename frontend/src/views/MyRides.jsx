import React, { useState, useEffect } from 'react';
import NavigationMenu from '.././shared/Navbar/Navbar';
import axios from 'axios';
import '.././assets/css/Rides-tab.css';
import '.././assets/css/Mobile-viewer-style.css';
import { jwtDecode } from 'jwt-decode';

const MyRides = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDeparture, setFilterDeparture] = useState('All');
    const [filterDestination, setFilterDestination] = useState('All');
    const [ridesData, setRidesData] = useState([]);
    const [selectedRideId, setSelectedRideId] = useState(null); // Store the selected ride ID
    const [showPopup, setShowPopup] = useState(false); // Manage the popup visibility
    const [seats, setSeats] = useState(1); // Number of seats to reserve
    const [showReviewPopup, setShowReviewPopup] = useState(false); // Manage the review popup visibility
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [rideToReview, setRideToReview] = useState(null); // Track the ride being reviewed
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const token = localStorage.getItem('token');  // Ensure token is in localStorage
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Check the structure of the token

                const response = await axios.get(`http://localhost:8080/api/v1/rides/my-rides`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setRidesData(response.data);
            } catch (error) {
                console.error('Error fetching ride data:', error);
            }
        };
        fetchRides();
    }, []);
    const handleDeleteRide = async (rideId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/v1/rides/delete/${rideId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRidesData((prevRides) => prevRides.filter((ride) => ride.id !== rideId));
            alert('Ride deleted successfully!');
        } catch (error) {
            console.error('Error deleting ride:', error.response?.data?.message || error.message);
            alert('Failed to delete ride. Please try again.');
        }
    };
    const handleViewReservations = async (rideId) => {
        setSelectedRideId(rideId);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reservations/ride/${rideId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservations(response.data);
            setShowPopup(true);
        } catch (error) {
            console.error('Error fetching reservations:', error.response?.data?.message || error.message);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setReservations([]);
        setSelectedRideId(null);
    };
    const filteredRides = ridesData.filter((ride) => {
        const matchesDeparture = filterDeparture === 'All' || ride.origin === filterDeparture;
        const matchesDestination = filterDestination === 'All' || ride.destination === filterDestination;

        // Search logic: check if the search term matches any field in the ride
        const matchesSearch = (
            ride.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(ride.departureTime).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesDeparture && matchesDestination && matchesSearch;
    });

    // List of departure and destination locations
    const locations = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sfax', 'Sousse', 'Kairouan', 'Kasserine',
        'Gabès', 'Medenine', 'Nabeul', 'Bizerte', 'Zaghouan', 'Mahdia', 'Monastir', 'Tataouine',
        'El Kef', 'Tozeur', 'Siliana', 'Gafsa', 'Jendouba', 'Sidi Bouzid', 'Beja', 'Le Kef'
    ];


    return (
        <div className="usermenu">
            <div>
                <NavigationMenu />
            </div>
            <div className="doc-user-tab">
                <div className='recherche-nb'>
                    <div className='recherche-wrapper'>
                        <input
                            className='recherche'
                            type="text"
                            placeholder="Search all fields..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icone-recherche" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>

                    <div>
                        <span className='nb-total'>{filteredRides.length} Total Rides</span>

                    </div>
                </div>
                <div className="filters">
                    <div className="filters2">
                        <label>
                            Departure:
                            <select className='filter select-filter' value={filterDeparture} onChange={(e) => setFilterDeparture(e.target.value)}>
                                <option value="All">All</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Destination:
                            <select className='filter select-filter' value={filterDestination} onChange={(e) => setFilterDestination(e.target.value)}>
                                <option value="All">All</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                </div>

                <div className="d-flex flex-column users-tab-wrapper">
                    <table className="users-tab">
                        <thead>
                            <tr>
                                <th>Departure</th>
                                <th>Destination</th>
                                <th>Departure Time</th>
                                <th>Available seats</th>
                                <th>Delete Ride</th>
                                <th>Reservations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRides.map((ride) => (
                                <tr key={ride.rideId}>
                                    <td>{ride.origin}</td>
                                    <td>{ride.destination}</td>
                                    <td>{new Date(ride.departureTime).toLocaleString()}</td>
                                    <td>{ride.availableSeats}</td>
                                    <td>
                                        <button
                                            className="ride-reserve"
                                            onClick={() => handleDeleteRide(ride.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="ride-reserve" onClick={() => handleViewReservations(ride.id)}>Reservations</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPopup && (
                <div className="dark-overlay">
                    <div className="confirmation-popup-review">
                        <h5 className='pop-nom'>Reservations for Ride {selectedRideId}</h5>
                        <table className="users-tab">
                            <thead>
                                <tr>
                                    <th>Passenger Name</th>
                                    <th>Seats Reserved</th>
                                    <th>Rating</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.length > 0 ? (
                                    reservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td>{reservation.passengerFirstName + " " + reservation.passengerLastName}</td>
                                            <td>{reservation.reservedSeats}</td>
                                            <td>{reservation.reviewRating}</td>
                                            <td>{reservation.reviewComment}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No reservations found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="popup-actions">
                            <button className="ride-reserve" onClick={closePopup}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
};

export default MyRides;
