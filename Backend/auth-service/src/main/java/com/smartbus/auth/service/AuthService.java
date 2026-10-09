package com.smartbus.auth.service;

import com.smartbus.auth.dto.ApiResponse;
import com.smartbus.auth.dto.LoginRequest;
import com.smartbus.auth.dto.LoginResponse;
import com.smartbus.auth.dto.RegisterRequest;
import com.smartbus.auth.model.Role;
import com.smartbus.auth.model.User;
import com.smartbus.auth.repository.UserRepository;
import com.smartbus.auth.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * AuthService implements core business logic for user registration, credential verification,
 * and token generation.
 *
 * Why this class exists:
 * Keeps controllers thin and maintains separation of concerns. Controllers only receive HTTP
 * requests and map responses; all validation, password hashing, and token logic live here.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Registers a new passenger.
     * Enforces:
     * 1. Password confirmation match.
     * 2. Unique email in database.
     * 3. BCrypt password encryption.
     * 4. Automatic assignment of ROLE_USER.
     */
    public ApiResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Password and confirmation password do not match");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email is already registered. Please login instead.");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(normalizedEmail);
        user.setPhone(request.getPhone().trim());
        user.setPassword(hashedPassword);
        user.setRole(Role.ROLE_USER.name()); // Strictly forced to ROLE_USER
        user.setAccountStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return new ApiResponse(true, "User registered successfully! Please log in.");
    }

    /**
     * Authenticates a user against MongoDB.
     * Detects role automatically without requiring the frontend to pass the role.
     */
    public LoginResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!"ACTIVE".equalsIgnoreCase(user.getAccountStatus())) {
            throw new IllegalArgumentException("Account is not active. Please contact support.");
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole()
        );

        return new LoginResponse(
                true,
                "Login successful",
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
