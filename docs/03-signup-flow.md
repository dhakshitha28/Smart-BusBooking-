# 03 - Signup Flow: Step-by-Step Architecture Guide

This document describes how new passengers register accounts on SmartBus Travel, how credentials are protected, and why public registration is strictly locked down to passenger roles.

---

## 1. High-Level Flowchart

```
             [ USER / VISITOR ]
                     │
                     │ Fills: Full Name, Email, Phone, Password, Confirm Password
                     ▼
           [ React Signup Page ]
                     │
                     │ 1. Validate Form (Matching passwords, email format, minimum length)
                     │ 2. POST /api/auth/register (NO role field sent)
                     ▼
             [ API Gateway ]  (Port 8080)
                     │
                     │ Routes to 'auth-service'
                     ▼
             [ Auth Service ] (Port 8081)
                     │
                     │ 1. Server-side Validation (@Valid annotations)
                     │ 2. Check if Email Already Registered in MongoDB
                     │    - If exists: Return 400 Bad Request
                     │ 3. Hash Password using BCrypt (Salt + 10 rounds)
                     │ 4. HARDCODE Role = "ROLE_USER" (Strict rule: no privilege escalation)
                     ▼
               [ MongoDB ]    (Port 27017)
                     │
                     │ Saves Document to 'users' collection
                     ▼
             [ Auth Service ]
                     │
                     │ Returns 201 Created with { success: true, message: "User registered successfully" }
                     ▼
             [ API Gateway ]
                     ▼
            [ React Frontend ]
                     │
                     │ Shows Success Notification
                     │ Automatically redirects to /login
                     ▼
            [ React Login Page ]
```

---

## 2. Step-by-Step Explanation in Plain English

### Step 1: User Navigates to Signup Page
- The user visits `/signup`.
- The form displays 5 inputs:
  1. Full Name
  2. Email Address
  3. Phone Number
  4. Password
  5. Confirm Password
- **Critical Architectural Rule**: **No Role Selector!** Ordinary visitors cannot select `ROLE_ADMIN` or `ROLE_DRIVER`.

### Step 2: Client-side Validation in React
- Verifies all fields are completed, password is at least 6 characters, and password matches confirmPassword.

### Step 3: Dispatching Registration Request
- Dispatches HTTP POST to `http://localhost:8080/api/auth/register` with:
  ```json
  {
    "fullName": "Sarah Connor",
    "email": "sarah@example.com",
    "phone": "+1987654321",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }
  ```

### Step 4: Routing & Backend Verification
- Forwarded by Gateway to `auth-service`.
- `userRepository.existsByEmail(...)` prevents duplicate registrations.
- `passwordEncoder.encode(password)` secures the secret.
- Role is set explicitly to `Role.ROLE_USER.name()`.
- Document is saved in MongoDB.
- HTTP `201 Created` is returned without the password.
- React redirects to `/login`.
