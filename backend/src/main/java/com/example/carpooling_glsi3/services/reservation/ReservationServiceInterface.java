package com.example.carpooling_glsi3.services.reservation;

import com.example.carpooling_glsi3.dto.ReservationWithRideDTO;
import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.requests.CreateReservationRequest;

import java.util.List;

public interface ReservationServiceInterface {
    Reservation createReservation(CreateReservationRequest request, Long passengerId);
    void cancelReservation(Long reservationId, Long passengerId);
    List<Reservation> getReservationsByRideId(Long rideId);
    List<ReservationWithRideDTO> getReservationsByPassengerId(Long passengerId);
}
