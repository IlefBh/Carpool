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
public class ReviewResponse {
    private Long id;
    private String comment;
    private Integer rating;
    private UserDto reviewer;

}
