package com.example.carpooling_glsi3.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchRideRequest {
    private String departureLocation;
    private String destination;
    private LocalDateTime departureDateTime;
    private int availableSeats;
    private double pricePerSeat;

}