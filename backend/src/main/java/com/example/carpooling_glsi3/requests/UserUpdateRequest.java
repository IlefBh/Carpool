package com.example.carpooling_glsi3.requests;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    private String email;
}