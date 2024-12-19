package com.example.carpooling_glsi3.repositories;

import com.example.carpooling_glsi3.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRideIdAndPassengerId(Long rideId, Long passengerId);
    List<Reservation> findByPassengerId(long id);
    List<Reservation> findByRideId(Long rideId);
}
