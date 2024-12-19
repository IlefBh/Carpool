package com.example.carpooling_glsi3.response;

import com.example.carpooling_glsi3.dto.UserDto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RideResponse {
    private Long id;
    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private Integer availableSeats;
    private UserDto driver;

}