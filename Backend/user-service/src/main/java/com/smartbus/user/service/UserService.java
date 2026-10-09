package com.smartbus.user.service;

import com.smartbus.user.dto.UserProfileDto;
import com.smartbus.user.model.User;
import com.smartbus.user.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * UserService provides business operations for retrieving and updating user profiles.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDto getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        return toDto(user);
    }

    public UserProfileDto getProfileById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        return toDto(user);
    }

    private UserProfileDto toDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getAccountStatus(),
                user.getCreatedAt()
        );
    }
}
