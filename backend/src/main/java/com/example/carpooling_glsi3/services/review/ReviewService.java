package com.example.carpooling_glsi3.services.review;


import com.example.carpooling_glsi3.entities.Review;
import com.example.carpooling_glsi3.entities.Ride;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.ReservationRepository;
import com.example.carpooling_glsi3.repositories.ReviewRepository;
import com.example.carpooling_glsi3.repositories.RideRepository;
import com.example.carpooling_glsi3.repositories.UserRepository;
import com.example.carpooling_glsi3.requests.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements ReviewServiceInterface {
    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    public Review createReview(CreateReviewRequest request, Long ReviewerId) {
        Ride ride = rideRepository.findById(request.getRideId()).orElseThrow(() -> new RuntimeException("Ride not found"));
        User reviewer = userRepository.findById(ReviewerId).orElseThrow(() -> new RuntimeException("Reviewer not found"));

        Review review = new Review();
        review.setRide(ride);
        review.setReviewer(reviewer);
        review.setComment(request.getComment());
        review.setRating(request.getRating());
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsForRide(Long rideId) {
        return reviewRepository.findByRideId(rideId);
    }

    public List<Review> getReviewsByReviewer(User reviewer) {
        return reviewRepository.findByReviewer(reviewer);
    }
}
