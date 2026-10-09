# 02 - Login Flow: Step-by-Step Architecture Guide

This guide walks through the complete end-to-end authentication flow when a user logs into SmartBus Travel.

---

## 1. High-Level Flowchart

```
       [ USER ]
          │
          │ Enters Email & Password
          ▼
   [ React Login Page ]
          │
          │ POST /api/auth/login
          ▼
    [ API Gateway ]  (Port 8080)
          │
          │ Routes to 'auth-service' via Eureka
          ▼
    [ Auth Service ] (Port 8081)
          │
          │ 1. Find User by Email
          ▼
     [ MongoDB ]     (Port 27017)
          │
          │ Returns User Record with BCrypt Hash & Role
          ▼
    [ Auth Service ]
          │
          │ 2. BCrypt.matches(rawPassword, storedHash)
          │    - If invalid: Return 401 Unauthorized
          │    - If valid: Retrieve User Role (ROLE_USER / ROLE_DRIVER / ROLE_ADMIN)
          │ 3. Generate Signed JWT (containing userId, email, role)
          ▼
    [ API Gateway ]
          │
          │ Returns 200 OK with { accessToken, userId, fullName, email, role }
          ▼
   [ React Frontend ]
          │
          │ 1. Stores Token in localStorage & AuthContext
          │ 2. Inspects user.role
          ▼
  [ Role-Based Dashboard ]
     ├── ROLE_USER   ──► /user/dashboard
     ├── ROLE_DRIVER ──► /driver/dashboard
     └── ROLE_ADMIN  ──► /admin/dashboard
```

---

## 2. Step-by-Step Explanation in Plain English

### Step 1: User Input on React Login Form
- The user navigates to `/login`.
- The user types their registered **Email** and **Password** into the input fields.
- **Important Design Choice**: Notice there is **no role dropdown** on the login page! Users do not choose whether they are a passenger, driver, or admin on the frontend. The backend owns the truth about identity and privileges.

### Step 2: React Dispatches Login Request
- Upon clicking "Login", React's `login()` function sends an HTTP POST request to:
  `http://localhost:8080/api/auth/login`
- The payload sent is JSON:
  ```json
  {
    "email": "sarah@example.com",
    "password": "Password123!"
  }
  ```

### Step 3: API Gateway Forwards Request
- The **API Gateway** receives the request on port `8080`.
- It matches the route `/api/auth/**`.
- It consults **Eureka Service Discovery** to get an active instance of `auth-service` (port `8081`) and proxies the request seamlessly.

### Step 4: Auth Service Queries MongoDB
- Inside `AuthController.java`, the incoming request is mapped to a `LoginRequest` DTO.
- `AuthService.java` calls `userRepository.findByEmail("sarah@example.com")`.
- If no user is found with this email, the server returns a `401 Unauthorized` ("Invalid email or password").

### Step 5: Password Verification with BCrypt
- If the user document exists, the service extracts the stored password hash.
- The plain-text password from the user is checked using `passwordEncoder.matches(rawPassword, storedHash)`.

### Step 6: Automatic Role Detection
- Upon successful password verification, the Auth Service reads the user's assigned role from MongoDB:
  - `ROLE_USER` (Regular passenger)
  - `ROLE_DRIVER` (Bus transit driver)
  - `ROLE_ADMIN` (Fleet and system administrator)

### Step 7: JWT Generation
- `JwtService` builds a signed JSON Web Token (JWT) with subject (userId), email, role, and expiration timestamp.
- The token is cryptographically signed using HMAC SHA-256.

### Step 8: Response Returned to Client
- The Auth Service sends back an HTTP `200 OK` response:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "6705...",
    "fullName": "Sarah Connor",
    "email": "sarah@example.com",
    "role": "ROLE_USER"
  }
  ```

### Step 9: React Auth State Management & Role Navigation
- React's `AuthContext` receives the payload, saves the token and user to state & `localStorage`.
- Based on `role`, React Router navigates:
  - `ROLE_USER` -> `/user/dashboard`
  - `ROLE_DRIVER` -> `/driver/dashboard`
  - `ROLE_ADMIN` -> `/admin/dashboard`
