package com.example.carpooling_glsi3.dto;

import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.enums.Role;
import lombok.Data;


@Data
public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Double rating;
    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.role = user.getRole();
        this.rating = user.getRating();
    }

}