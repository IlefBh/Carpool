package com.example.carpooling_glsi3.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateReservationRequest {
    private Long rideId;
//    private Long passengerId;
    private int numberOfSeats;
}