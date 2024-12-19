package com.example.carpooling_glsi3.services.user;

import com.example.carpooling_glsi3.dto.UserDto;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.requests.UserUpdateRequest;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface UserServiceInterface {
    User getUserById(Long userId);

    User updateUser(UserUpdateRequest request, Long userId);


    void deleteUser(Long userId);

    UserDto convertUserToDto(User user);
}
