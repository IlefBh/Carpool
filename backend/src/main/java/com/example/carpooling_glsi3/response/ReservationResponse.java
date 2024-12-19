package com.example.carpooling_glsi3.response;

import com.example.carpooling_glsi3.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    private Long id;
    private RideResponse ride;
    private UserDto passenger;

}
