package com.example.carpooling_glsi3.repositories;

import com.example.carpooling_glsi3.entities.Review;
import com.example.carpooling_glsi3.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List <Review> findByReviewer(User reviewer);
    List <Review> findByRideId(Long rideId);
}
