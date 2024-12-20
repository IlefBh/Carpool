package com.example.carpooling_glsi3.services.ride;


import com.example.carpooling_glsi3.enums.Role;
import com.example.carpooling_glsi3.requests.SearchRideRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.entities.Ride;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.ReservationRepository;
import com.example.carpooling_glsi3.repositories.ReviewRepository;
import com.example.carpooling_glsi3.repositories.RideRepository;
import com.example.carpooling_glsi3.repositories.UserRepository;
import com.example.carpooling_glsi3.enums.ReservationStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService implements RideServiceInterface {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    public Ride createRide(Ride ride, Long driverId) {
        User driver = userRepository.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));
        if (!driver.getRole().equals(Role.DRIVER)) {
            throw new RuntimeException("Only drivers can create rides");
        }
        ride.setDriver(driver);
        ride.setCreatedAt(LocalDateTime.now());
        ride.setUpdatedAt(LocalDateTime.now());
        return rideRepository.save(ride);
    }

    public List<Ride> searchRides(SearchRideRequest request) {
        return rideRepository.findByDepartureLocationOrDestinationOrDepartureDateTimeAfterOrPricePerSeatLessThanEqual(
                request.getDepartureLocation(), request.getDestination(), request.getDepartureDateTime(), request.getPricePerSeat());
    }

    public void deleteRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findById(rideId).orElseThrow(() -> new RuntimeException("Ride not found"));
        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("Only the driver can delete this ride");
        }
        rideRepository.delete(ride);
    }
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }



}
