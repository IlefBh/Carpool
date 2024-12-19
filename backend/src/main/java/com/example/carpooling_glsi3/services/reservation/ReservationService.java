package com.example.carpooling_glsi3.services.reservation;


import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.entities.Ride;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.ReservationRepository;
import com.example.carpooling_glsi3.repositories.RideRepository;
import com.example.carpooling_glsi3.repositories.UserRepository;
import com.example.carpooling_glsi3.enums.ReservationStatus;

import com.example.carpooling_glsi3.requests.CreateReservationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService implements ReservationServiceInterface {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final ReservationRepository reservationRepository;


    @Override
    public Reservation createReservation(CreateReservationRequest request, Long PassengerId) {
        Ride ride = rideRepository.findById(request.getRideId()).orElseThrow(() -> new RuntimeException("Ride not found"));
        User passenger = userRepository.findById(PassengerId).orElseThrow(() -> new RuntimeException("Passenger not found"));

        if (ride.getAvailableSeats() < request.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        ride.setAvailableSeats(ride.getAvailableSeats() - request.getNumberOfSeats());
        Reservation reservation = new Reservation();
        reservation.setRide(ride);
        reservation.setPassenger(passenger);
        reservation.setNumberOfSeats(request.getNumberOfSeats());
        reservation.setReservationTime(LocalDateTime.now());
        reservation.setStatus(ReservationStatus.confirmed);
        return reservationRepository.save(reservation);
    }

    @Override
    public void cancelReservation(Long reservationId, Long passengerId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new RuntimeException("Reservation not found"));
        if (!reservation.getPassenger().getId().equals(passengerId)) {
            throw new RuntimeException("Only the passenger can cancel their reservation");
        }
        Ride ride = reservation.getRide();
        ride.setAvailableSeats(ride.getAvailableSeats() + reservation.getNumberOfSeats());
        reservationRepository.delete(reservation);
    }

    @Override
    public List<Reservation> getReservationsByPassengerId(Long passengerId) {
        return reservationRepository.findByPassengerId(passengerId);
    }

    @Override
    public List<Reservation> getReservationsByRideId(Long rideId) {
        return reservationRepository.findByRideId(rideId);
    }

}
