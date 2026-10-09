# Auth Service (Authentication & Authorization Microservice)

The **Auth Service** handles passenger registration, credential validation, role assignment, password hashing, and JSON Web Token (JWT) issuance for SmartBus Travel.

---

## 1. Purpose of Auth Service
- **User Signup**: Validates new passenger registrations and enforces the `ROLE_USER` privilege restriction.
- **User Login**: Verifies incoming credentials with BCrypt, detects the user's role from MongoDB, and generates cryptographically signed JWTs.
- **Admin Seeding**: Automatically seeds a bootstrap administrator on first startup if no admin account exists in MongoDB.
- **Token Validation**: Provides a verification endpoint for downstream services.

---

## 2. Package & Layer Structure
```
auth-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/smartbus/auth/
│   │   │       ├── AuthServiceApplication.java
│   │   │       ├── config/
│   │   │       │   └── DataInitializer.java      # Seeds default admin on boot
│   │   │       ├── controller/
│   │   │       │   └── AuthController.java       # Endpoints: /register, /login, /validate
│   │   │       ├── dto/
│   │   │       │   ├── LoginRequest.java         # email, password
│   │   │       ├── dto/
│   │   │       │   ├── LoginResponse.java        # success, message, accessToken, userId, role...
│   │   │       ├── dto/
│   │   │       │   ├── RegisterRequest.java      # fullName, email, phone, password, confirmPassword
│   │   │       ├── dto/
│   │   │       │   └── ApiResponse.java          # success, message
│   │   │       ├── exception/
│   │   │       │   └── GlobalExceptionHandler.java
│   │   │       ├── model/
│   │   │       │   ├── Role.java                 # ROLE_USER, ROLE_DRIVER, ROLE_ADMIN
│   │   │       │   └── User.java                 # MongoDB Document in 'users' collection
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.java       # MongoRepository interface
│   │   │       ├── security/
│   │   │       │   ├── JwtService.java           # Token generation, parsing, validation
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   └── SecurityConfig.java       # Spring Security 6 filter chain & BCrypt bean
│   │   │       └── service/
│   │   │           └── AuthService.java          # Core signup, login & BCrypt logic
│   │   └── resources/
│   │       └── application.yml                   # Database URI, JWT secret, Eureka client
│   └── test/
├── pom.xml
└── README.md
```

---

## 3. API Endpoints

### 1. Passenger Signup
- **URL**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "fullName": "Jane Passenger",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully! Please log in."
  }
  ```

### 2. User Login
- **URL**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "userId": "6705ab...",
    "fullName": "Jane Passenger",
    "email": "jane@example.com",
    "role": "ROLE_USER"
  }
  ```

### 3. Token Validation
- **URL**: `GET /api/auth/validate`
- **Header**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "valid": true,
    "userId": "6705ab...",
    "email": "jane@example.com",
    "role": "ROLE_USER"
  }
  ```

---

## 4. How to Run Locally

```bash
cd backend/auth-service
mvn spring-boot:run
```

- **Port**: `8081`
- **Prerequisites**:
  - MongoDB running on `mongodb://localhost:27017`
  - Service Discovery running on `http://localhost:8761`
