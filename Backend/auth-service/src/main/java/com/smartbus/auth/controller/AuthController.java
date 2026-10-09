package com.smartbus.auth.controller;

import com.smartbus.auth.dto.ApiResponse;
import com.smartbus.auth.dto.LoginRequest;
import com.smartbus.auth.dto.LoginResponse;
import com.smartbus.auth.dto.RegisterRequest;
import com.smartbus.auth.security.JwtService;
import com.smartbus.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * AuthController exposes HTTP endpoints for passenger registration, login, and token validation.
 *
 * Annotations:
 * - @RestController: Marks this as a REST controller returning serialized JSON responses.
 * - @RequestMapping("/api/auth"): Base path prefix for all endpoints in this controller.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    /**
     * Public registration endpoint for passengers.
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        ApiResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Login endpoint for all users (Passengers, Drivers, Admins).
     * Automatically returns the user's role determined from MongoDB.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Validates an existing token. Useful for Gateway filters and client session checks.
     */
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, Object> result = new HashMap<>();

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            result.put("valid", false);
            result.put("message", "Missing or invalid Authorization header");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

        String token = authHeader.substring(7);
        boolean isValid = jwtService.validateToken(token);

        result.put("valid", isValid);
        if (isValid) {
            result.put("userId", jwtService.extractUserId(token));
            result.put("email", jwtService.extractEmail(token));
            result.put("role", jwtService.extractRole(token));
            return ResponseEntity.ok(result);
        } else {
            result.put("message", "Token expired or signature invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
}
