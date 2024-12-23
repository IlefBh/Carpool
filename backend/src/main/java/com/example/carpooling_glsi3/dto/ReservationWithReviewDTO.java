package com.example.carpooling_glsi3.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReservationWithReviewDTO {
    private String passengerFirstName;
    private String passengerLastName;
    private int reservedSeats; // New field
    private String reviewComment;
    private Integer reviewRating; // Optional, if you want to include the rating
}
