package com.example.carpooling_glsi3.controllers;

import com.example.carpooling_glsi3.entities.Review;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.requests.CreateReviewRequest;
import com.example.carpooling_glsi3.services.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create-review")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<Review> createReview(@RequestBody CreateReviewRequest request, @AuthenticationPrincipal User user) {
        // Ensure the reviewer ID matches the authenticated user's ID
//        if (!request.getReviewerId().equals(user.getId())) {
//            throw new RuntimeException("Reviewer ID mismatch");
//        }
        Review review = reviewService.createReview(request,user.getId());
        return ResponseEntity.ok(review);
    }

    @GetMapping("/ride/{rideId}")
    @PreAuthorize("hasRole('PASSENGER')")
    public ResponseEntity<List<Review>> getReviewsForRide(@PathVariable Long rideId) {
        List<Review> reviews = reviewService.getReviewsForRide(rideId);
        return ResponseEntity.ok(reviews);
    }

    // Optional: If you want to get reviews by a specific reviewer
    /*@GetMapping("/reviewer/{reviewerId}")
    @PreAuthorize("hasRole('ADMIN')") // Only admin can see all reviews by a user for privacy reasons
    public ResponseEntity<List<Review>> getReviewsByReviewer(@PathVariable Long reviewerId) {
        User reviewer = new User();
        reviewer.setId(reviewerId); // Here we're setting the ID to fetch reviews
        List<Review> reviews = reviewService.getReviewsByReviewer(reviewer);
        return ResponseEntity.ok(reviews);
    }*/
}