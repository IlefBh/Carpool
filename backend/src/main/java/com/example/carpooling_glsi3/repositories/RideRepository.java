package com.example.carpooling_glsi3.repositories;
import com.example.carpooling_glsi3.entities.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByDepartureLocationOrDestinationOrDepartureDateTimeAfterOrPricePerSeatLessThanEqual(String departureLocation, String destination, LocalDateTime departureDateTime, double pricePerSeat);
    List<Ride> findByDriverId(Long driverId);
//    Long findRideByRiderId(Long id);
}
