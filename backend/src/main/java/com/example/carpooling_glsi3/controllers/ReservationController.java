package com.example.carpooling_glsi3.controllers;

import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.requests.CreateReservationRequest;
import com.example.carpooling_glsi3.services.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/create-res")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<Reservation> createReservation(@RequestBody CreateReservationRequest request, @AuthenticationPrincipal User user) {
        // Here, we're assuming that the passenger ID in the request matches the authenticated user's ID
//        if (!request.getPassengerId().equals(user.getId())) {
//            throw new RuntimeException("Passenger ID mismatch");
//        }
        Reservation reservation = reservationService.createReservation(request,user.getId());
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("cancel/{reservationId}")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long reservationId, @AuthenticationPrincipal User user) {
        reservationService.cancelReservation(reservationId, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/passenger/{passengerId}")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<List<Reservation>> getReservationsByPassenger(@PathVariable Long passengerId, @AuthenticationPrincipal User user) {
        if (!passengerId.equals(user.getId())) {
            throw new RuntimeException("You can only access your own reservations");
        }
        List<Reservation> reservations = reservationService.getReservationsByPassengerId(passengerId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/ride/{rideId}")
    @PreAuthorize("hasRole('DRIVER')")
    public ResponseEntity<List<Reservation>> getReservationsByRide(@PathVariable Long rideId, @AuthenticationPrincipal User user) {
        // Assuming this method checks if the user is the driver of the ride before allowing access
        List<Reservation> reservations = reservationService.getReservationsByRideId(rideId);
        return ResponseEntity.ok(reservations);
    }
}