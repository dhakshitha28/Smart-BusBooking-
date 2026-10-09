package com.smartbus.user.controller;

import com.smartbus.user.dto.UserProfileDto;
import com.smartbus.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * UserController exposes profile endpoints.
 * All endpoints require a valid JWT Bearer token.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Retrieves the profile of the currently logged-in user using the token's authenticated email.
     */
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getCurrentUserProfile(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).build();
        }
        String email = authentication.getName();
        UserProfileDto profile = userService.getProfileByEmail(email);
        return ResponseEntity.ok(profile);
    }

    /**
     * Retrieves a user profile by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDto> getUserById(@PathVariable String id) {
        UserProfileDto profile = userService.getProfileById(id);
        return ResponseEntity.ok(profile);
    }
}
