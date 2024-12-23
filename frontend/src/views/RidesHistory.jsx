import React, { useState, useEffect } from 'react';
import NavigationMenu from '.././shared/Navbar/Navbar';
import axios from 'axios';
import '.././assets/css/Rides-tab.css';
import '.././assets/css/Mobile-viewer-style.css';
import { jwtDecode } from 'jwt-decode';

const RidesHistory = () => {
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

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const token = localStorage.getItem('token');  // Ensure token is in localStorage
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Check the structure of the token

                const userId = decodedToken.userId;
                const response = await axios.get(`http://localhost:8080/api/v1/reservations/passenger/${userId}`, {
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
    const submitReview = async () => {
        try {
            const token = localStorage.getItem('token');  // Ensure token is in localStorage
            const reviewData = {
                rideId: rideToReview,
                comment: reviewComment,
                rating: reviewRating,
            };

            await axios.post('http://localhost:8080/api/v1/reviews/create-review', reviewData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert('Review submitted successfully!');
            setShowReviewPopup(false); // Close the popup
            setReviewComment('');
            setReviewRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }
    };
    const cancelReservation = async (reservationId) => {
        try {
            const token = localStorage.getItem('token'); // Ensure token is available
            await axios.delete(`http://localhost:8080/api/v1/reservations/cancel/${reservationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Reservation cancelled successfully!');
            setRidesData((prevData) => prevData.filter((ride) => ride.reservationId !== reservationId)); // Update state
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            alert('Failed to cancel reservation. Please try again.');
        }
    };

    const filteredRides = ridesData.filter((ride) => {
        const matchesDeparture = filterDeparture === 'All' || ride.departureLocation === filterDeparture;
        const matchesDestination = filterDestination === 'All' || ride.destination === filterDestination;

        // Search logic: check if the search term matches any field in the ride
        const matchesSearch = (
            ride.departureLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(ride.departureDateTime).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.driverName.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <th>Driver</th>
                                <th>Review</th>
                                <th>Cancel Reservation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRides.map((ride) => (
                                <tr key={ride.rideId}>
                                    <td>{ride.departureLocation}</td>
                                    <td>{ride.destination}</td>
                                    <td>{new Date(ride.departureDateTime).toLocaleString()}</td>
                                    <td>{ride.driverName}</td>
                                    <td>
                                        <button
                                            className="ride-reserve"
                                            onClick={() => {
                                                setShowReviewPopup(true);
                                                setRideToReview(ride.rideId); // Set the ride ID for the review
                                            }}
                                        >
                                            Rate
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="ride-reserve"
                                            onClick={() => cancelReservation(ride.reservationId)}
                                        >
                                            Canacel
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showReviewPopup && (
                <div className="dark-overlay">
                    <div className="confirmation-popup1">
                        <h4>Rate Your Ride</h4>
                        <div>
                            <label>
                                <p className='pop-nom'>Your Comment:</p>
                            </label>
                            <textarea
                                className='pop-input'
                                placeholder="Add your comment..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>
                                <p className='pop-nom'>Rating:</p>
                            </label>
                            <select
                                className='pop-input'
                                value={reviewRating}
                                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                            >
                                <option value="0">Select Rating</option>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>{rating}</option>
                                ))}
                            </select>
                        </div>
                        <div className="popup-actions">
                            <button className='ride-reserve' onClick={() => setShowReviewPopup(false)}>Cancel</button>
                            <button className='ride-reserve' onClick={submitReview}>Submit</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default RidesHistory;
