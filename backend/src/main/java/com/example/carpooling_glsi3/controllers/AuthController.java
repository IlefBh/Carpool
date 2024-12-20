package com.example.carpooling_glsi3.controllers;


import com.example.carpooling_glsi3.requests.AuthenticationRequest;
import com.example.carpooling_glsi3.requests.RegisterRequest;
import com.example.carpooling_glsi3.response.AuthenticationResponse;
import com.example.carpooling_glsi3.services.auth.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    // Logout endpoint
    // Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // If you're using JWT stored in a cookie, you can expire it
        Cookie cookie = new Cookie("JWT", null); // Set JWT cookie to null to invalidate it
        cookie.setHttpOnly(true);  // Ensure cookie is only accessible via HTTP, not JavaScript
        cookie.setSecure(true);    // Set to true if using HTTPS
        cookie.setPath("/");       // Set path to root to ensure the cookie is cleared for the entire domain
        cookie.setMaxAge(0);       // Set max age to 0 to immediately expire the cookie
        response.addCookie(cookie); // Add the cookie to the response to instruct the client to delete it

        return ResponseEntity.ok("Logged out successfully");  // Respond with a success message
    }

//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        service.refreshToken(request, response);
//    }


}


