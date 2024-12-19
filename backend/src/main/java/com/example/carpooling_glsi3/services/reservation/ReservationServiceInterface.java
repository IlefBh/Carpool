package com.example.carpooling_glsi3.services.reservation;

import com.example.carpooling_glsi3.dto.UserDto;
import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.requests.CreateReservationRequest;

import java.util.List;

public interface ReservationServiceInterface {
    Reservation createReservation(CreateReservationRequest request,Long PassengerId);
    void cancelReservation(Long reservationId, Long passengerId);
    public List<Reservation> getReservationsByRideId(Long rideId);
    public List<Reservation> getReservationsByPassengerId(Long passengerId);
}
