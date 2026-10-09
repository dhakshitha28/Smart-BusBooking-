package com.smartbus.auth.dto;

/**
 * LoginResponse returned upon successful authentication.
 *
 * Notice:
 * Returns the JWT accessToken, userId, fullName, email, and the detected role.
 * Passwords or hashes are STRICTLY omitted.
 */
public class LoginResponse {

    private boolean success;
    private String message;
    private String accessToken;
    private String tokenType = "Bearer";
    private String userId;
    private String fullName;
    private String email;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message, String accessToken, String userId, String fullName, String email, String role) {
        this.success = success;
        this.message = message;
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
