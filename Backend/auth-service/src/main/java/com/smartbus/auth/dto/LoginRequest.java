package com.smartbus.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * LoginRequest models credentials sent by any client (User, Driver, Admin).
 *
 * Notice:
 * No role selection field exists. The backend queries MongoDB to determine the role.
 */
public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
