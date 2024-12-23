package com.example.carpooling_glsi3.services.reservation;


import com.example.carpooling_glsi3.dto.ReservationWithReviewDTO;
import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.entities.Review;
import com.example.carpooling_glsi3.entities.Ride;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.ReservationRepository;
import com.example.carpooling_glsi3.repositories.ReviewRepository;
import com.example.carpooling_glsi3.repositories.RideRepository;
import com.example.carpooling_glsi3.dto.ReservationWithRideDTO;
import com.example.carpooling_glsi3.repositories.UserRepository;
import com.example.carpooling_glsi3.enums.ReservationStatus;

import com.example.carpooling_glsi3.requests.CreateReservationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService implements ReservationServiceInterface {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;


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
    public List<ReservationWithRideDTO> getReservationsByPassengerId(Long passengerId) {
        List<Reservation> reservations = reservationRepository.findByPassengerIdWithRide(passengerId);
        return reservations.stream()
                .map(ReservationWithRideDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<Reservation> getReservationsByRideId(Long rideId) {
        return reservationRepository.findByRideId(rideId);
    }
    public List<ReservationWithReviewDTO> getReservationsWithReviewsByRide(Long rideId) {
        List<Reservation> reservations = reservationRepository.findByRideId(rideId);

        return reservations.stream().map(reservation -> {
            String firstName = reservation.getPassenger().getFirstname();
            String lastName = reservation.getPassenger().getLastname();
            int reservedSeats = reservation.getNumberOfSeats(); // Extract reserved seats

            // Fetch review if it exists
            Review review = reviewRepository.findByRideIdAndReviewerId(
                    rideId, reservation.getPassenger().getId()
            );

            return new ReservationWithReviewDTO(
                    firstName,
                    lastName,
                    reservedSeats, // Include reserved seats
                    review != null ? review.getComment() : null,
                    review != null ? review.getRating() : null
            );
        }).collect(Collectors.toList());
    }

}
