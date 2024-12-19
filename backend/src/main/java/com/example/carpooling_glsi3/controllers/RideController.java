package com.example.carpooling_glsi3.controllers;

import com.example.carpooling_glsi3.dto.UserDto;
import com.example.carpooling_glsi3.entities.Ride;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.RideRepository;
import com.example.carpooling_glsi3.requests.RideRequest;
import com.example.carpooling_glsi3.requests.SearchRideRequest;
import com.example.carpooling_glsi3.response.RideResponse;
import com.example.carpooling_glsi3.services.ride.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.carpooling_glsi3.requests.SearchRideRequest;
import java.util.List;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rides")
public class RideController {

    private final com.example.carpooling_glsi3.services.ride.RideService rideService;
    private final RideRepository rideRepository;
    @PostMapping("create-ride")
    @PreAuthorize("hasRole('DRIVER')")
    public ResponseEntity<RideResponse> createRide(@RequestBody RideRequest rideRequest, @AuthenticationPrincipal User user) {
        Ride ride = new Ride();
        BeanUtils.copyProperties(rideRequest, ride);
        Ride createdRide = rideService.createRide(ride, user.getId());
        return ResponseEntity.ok(RideResponse.builder()
                .id(createdRide.getId())
                .origin(createdRide.getDepartureLocation())
                .destination(createdRide.getDestination())
                .departureTime(createdRide.getDepartureDateTime())
                .availableSeats(createdRide.getAvailableSeats())
                .driver(new UserDto(createdRide.getDriver()))
                .build());
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<List<RideResponse>> searchRides(@RequestBody SearchRideRequest  searchRequest) {
        List<Ride> rides = rideService.searchRides(searchRequest);
        List<RideResponse> responses = rides.stream()
                .map(ride -> RideResponse.builder()
                        .id(ride.getId())
                        .origin(ride.getDepartureLocation())
                        .destination(ride.getDestination())
                        .departureTime(ride.getDepartureDateTime())
                        .availableSeats(ride.getAvailableSeats())
                        .driver(new UserDto(ride.getDriver()))
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/delete/{rideId}")
    @PreAuthorize("hasRole('DRIVER')")
    public ResponseEntity<Void> deleteRide(@PathVariable Long rideId, @AuthenticationPrincipal User user) {
        rideService.deleteRide(rideId, user.getId());
        return ResponseEntity.noContent().build();
    }
}