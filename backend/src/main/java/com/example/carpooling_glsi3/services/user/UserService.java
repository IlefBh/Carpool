package com.example.carpooling_glsi3.services.user;


import com.example.carpooling_glsi3.dto.UserDto;
import com.example.carpooling_glsi3.requests.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.carpooling_glsi3.entities.User;
import com.example.carpooling_glsi3.repositories.UserRepository;
import org.modelmapper.ModelMapper;


@Service
@RequiredArgsConstructor
public class UserService implements UserServiceInterface{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;



    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void updateUserRating(Long userId, Integer newRating) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.updateRating(newRating);
        userRepository.save(user);
    }

    @Override
    public User updateUser(UserUpdateRequest request, Long userId) {
        return userRepository.findById(userId).map(existingUser -> {
            if (request.getFirstName() != null) {
                existingUser.setFirstname(request.getFirstName());
            }
            if (request.getLastName() != null) {
                existingUser.setLastname(request.getLastName());
            }
            if (request.getEmail() != null && !request.getEmail().equals(existingUser.getEmail())) {
                if (userRepository.existsByEmail(request.getEmail())) {
                    throw new RuntimeException("Email is already in use");
                }
                existingUser.setEmail(request.getEmail());
            }
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found!"));
    }


    @Override
    public void deleteUser(Long userId) {
        userRepository.findById(userId).ifPresentOrElse(userRepository :: delete, () ->{
            throw new RuntimeException("User not found!");
        });
    }

    @Override
    public UserDto convertUserToDto(User user) {
        return new UserDto(user);  // Directly use the constructor that manually maps the fields
    }




}
