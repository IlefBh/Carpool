package com.example.carpooling_glsi3.controllers;

import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.dto.UserDto;
import com.example.carpooling_glsi3.requests.UserUpdateRequest;
import com.example.carpooling_glsi3.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Endpoint to get user by ID
    @GetMapping("/user/{id}")
//    @PreAuthorize("hasRole('PASSENGER') or hasRole('DRIVER')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserDto userDto = userService.convertUserToDto(user);
        return ResponseEntity.ok(userDto);
    }


    // Endpoint to update user details (firstname, lastname, email)
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest request) {
        User updatedUser = userService.updateUser(request, id);
        UserDto userDto = userService.convertUserToDto(updatedUser);
        return ResponseEntity.ok(userDto);
    }

    // Endpoint to update user rating
    @PutMapping("/{id}/rating")
    public ResponseEntity<Void> updateUserRating(
            @PathVariable Long id,
            @RequestParam Integer newRating) {
        userService.updateUserRating(id, newRating);
        return ResponseEntity.ok().build();
    }

    // Endpoint to delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
