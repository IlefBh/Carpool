import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateRide from '../views/CreateRide';
import MyRides from '../views/MyRides';
import Profile from '../views/Profile';
import RidesHistory from '../views/RidesHistory';
import Rides from '../views/RidesTable';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/rides" element={<Rides />} />
                <Route path="/history" element={<RidesHistory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/myrides" element={<MyRides />} />
                <Route path="/create-ride" element={<CreateRide />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
