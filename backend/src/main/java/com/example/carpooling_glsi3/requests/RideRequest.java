package com.example.carpooling_glsi3.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideRequest {
    private String departureLocation;
    private String destination;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime departureDateTime;
    private int availableSeats;
    private double pricePerSeat;
    private String restrictions;
}