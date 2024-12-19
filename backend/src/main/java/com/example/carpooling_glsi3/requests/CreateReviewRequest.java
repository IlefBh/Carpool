package com.example.carpooling_glsi3.requests;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewRequest {
    private Long rideId;
//    private Long reviewerId;
    private String comment;
    int rating ;

}