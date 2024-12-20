import React, { useState, useEffect } from 'react';
import NavigationMenu from '.././shared/Navbar/Navbar';
import dateUp from '.././assets/images/calendar-up.png';
import dateDown from '.././assets/images/calendar-down.png';
import axios from 'axios';
import '.././assets/css/Rides-tab.css';
import '.././assets/css/Mobile-viewer-style.css';

const RidesTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterDeparture, setFilterDeparture] = useState('All');
    const [filterDestination, setFilterDestination] = useState('All');
    const [ridesData, setRidesData] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const token = localStorage.getItem('token');  // Ensure token is in localStorage
                const response = await axios.get('http://localhost:8080/api/v1/rides/get-rides', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Add JWT token here
                    }
                });
                setRidesData(response.data);
            } catch (error) {
                console.error('Error fetching ride data:', error);
            }
        };
        fetchRides();
    }, []);

    // Filter the ridesData based on the selected filters
    const filteredRides = ridesData.filter((ride) => {
        const matchesDeparture = filterDeparture === 'All' || ride.departureLocation === filterDeparture;
        const matchesDestination = filterDestination === 'All' || ride.destination === filterDestination;

        // Search logic: check if the search term matches any field in the ride
        const matchesSearch = (
            ride.departureLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(ride.departureDateTime).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.pricePerSeat.toFixed(2).includes(searchTerm) ||
            ride.availableSeats.toString().includes(searchTerm) ||
            ride.restrictions.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ride.driver.firstname + " " + ride.driver.lastname).toLowerCase().includes(searchTerm.toLowerCase())
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
                                <th>Price per seat</th>
                                <th>Available Seats</th>
                                <th>Restrictions</th>
                                <th>Driver</th>
                                <th>Reserve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRides.map((ride) => (
                                <tr key={ride.id}>
                                    <td>{ride.departureLocation}</td>
                                    <td>{ride.destination}</td>
                                    <td>{new Date(ride.departureDateTime).toLocaleString()}</td>
                                    <td>${ride.pricePerSeat.toFixed(2)}</td>
                                    <td>{ride.availableSeats}</td>
                                    <td>{ride.restrictions}</td>
                                    <td>{ride.driver.firstname + " " + ride.driver.lastname}</td>
                                    <td><button className='ride-reserve'>Reserve</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RidesTable;
