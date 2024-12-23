package com.example.carpooling_glsi3.dto;

import com.example.carpooling_glsi3.entities.Reservation;
import com.example.carpooling_glsi3.enums.ReservationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationWithRideDTO {

    private Long reservationId;
    private LocalDateTime reservationTime;
    private int numberOfSeats;
    private ReservationStatus status;

    // Ride details
    private Long rideId;
    private String departureLocation;
    private String destination;
    private LocalDateTime departureDateTime;
    private int availableSeats;
    private double pricePerSeat;
    private String driverName;

    public ReservationWithRideDTO(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.reservationTime = reservation.getReservationTime();
        this.numberOfSeats = reservation.getNumberOfSeats();
        this.status = reservation.getStatus();

        this.rideId = reservation.getRide().getId();
        this.departureLocation = reservation.getRide().getDepartureLocation();
        this.destination = reservation.getRide().getDestination();
        this.departureDateTime = reservation.getRide().getDepartureDateTime();
        this.availableSeats = reservation.getRide().getAvailableSeats();
        this.pricePerSeat = reservation.getRide().getPricePerSeat();
        this.driverName = reservation.getRide().getDriver().getFirstname() + " " + reservation.getRide().getDriver().getLastname();
    }
}
